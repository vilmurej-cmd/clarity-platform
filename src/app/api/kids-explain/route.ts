import { NextRequest, NextResponse } from "next/server";
import { demoKidsReport } from "@/lib/demo-report";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosis, ageRange, parentDescription } = body;

    if (!diagnosis || typeof diagnosis !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide a diagnosis to explain." },
        { status: 400 }
      );
    }

    const validAgeRanges = ["3-5", "6-8", "9-12", "13-17"];
    const age = validAgeRanges.includes(ageRange) ? ageRange : "6-8";

    // If no API key, return the demo kids report
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ success: true, report: demoKidsReport });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    let userMessage = `Diagnosis: "${diagnosis}"\nChild's age range: ${age}`;
    if (parentDescription) {
      userMessage += `\nParent's description of the situation: "${parentDescription}"`;
    }

    const systemPrompt = `You are CLARITY Kids, a specialist in explaining medical conditions to children and their families. Your job is to create age-appropriate, honest, non-scary explanations.

TARGET AGE RANGE: ${age} years old

AGE GUIDELINES:
- 3-5: Very simple language, use analogies to things they know (toys, animals, games). Short sentences. Focus on reassurance.
- 6-8: Simple but slightly more detailed. Can understand basic cause/effect. Use fun comparisons.
- 9-12: More mature explanations. Can handle some real terminology if defined simply. Want to feel informed, not babied.
- 13-17: Near-adult explanations but still warm and reassuring. Can handle complexity. Address social concerns (school, friends, activities).

CRITICAL RULES:
- NEVER be scary. Frame everything through the lens of "here's how we manage this."
- Be honest — kids can tell when adults are lying, and it breaks trust.
- Validate their feelings: "It's okay to feel scared/mad/confused."
- Emphasize they did NOT cause this and it's NOT their fault.
- Focus on what they CAN still do, not what they can't.
- Include humor or lightness where appropriate.

Respond with ONLY valid JSON (no markdown, no backticks):
{
  "simpleExplanation": "Age-appropriate explanation of the condition (3-5 sentences)",
  "whatToExpect": [
    {
      "title": "Short title",
      "description": "What will happen, framed positively and age-appropriately"
    }
  ],
  "siblingExplanation": "What to tell brothers/sisters about this condition (2-3 sentences)",
  "schoolAccommodationLetter": "A template letter parents can give to teachers/school explaining the condition and needed accommodations. Include: condition overview, specific accommodations needed, emergency protocols, activity modifications, and contact instructions. Format as a professional letter.",
  "copingActivities": [
    {
      "title": "Activity name",
      "description": "How to do it and why it helps",
      "ageRange": "appropriate age range"
    }
  ]
}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { success: false, error: "No response from AI." },
        { status: 500 }
      );
    }

    const report = JSON.parse(textBlock.text);

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Kids-explain API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate kids explanation";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
