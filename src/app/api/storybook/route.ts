import { NextRequest, NextResponse } from "next/server";
import { demoStory, getBookRecommendations } from "@/lib/storybook-data";
import type { GeneratedStory } from "@/lib/storybook-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      childName,
      childAge,
      condition,
      favorites,
      companion,
      storyTone,
      language,
    } = body;

    if (!childName || !condition) {
      return NextResponse.json(
        { success: false, error: "Please provide the child's name and condition." },
        { status: 400 }
      );
    }

    const age = Number(childAge) || 7;
    const recommendations = getBookRecommendations(condition);

    // If no API key, return the demo story personalized with the child's name
    if (!process.env.OPENAI_API_KEY) {
      const personalizedDemo: GeneratedStory = {
        ...demoStory,
        title: `${childName} and the Breathing Dragon`,
        dedication: `For ${childName}, who is braver than ${age <= 8 ? "they know" : "they know"}`,
        pages: demoStory.pages.map((p) => ({
          ...p,
          text: p.text.replace(/\bSam\b/g, childName).replace(/\bSam's\b/g, `${childName}'s`),
        })),
      };

      return NextResponse.json({
        success: true,
        story: personalizedDemo,
        recommendations,
      });
    }

    // Build the AI prompt
    const favoritesStr = favorites?.length ? favorites.join(", ") : "not specified";
    const companionStr = companion
      ? `${companion.name} (${companion.type})`
      : "none specified";

    let pageGuidance: string;
    if (age <= 5) {
      pageGuidance = "8 pages, very simple sentences (5-10 words each), repetition and rhyme encouraged";
    } else if (age <= 8) {
      pageGuidance = "10-12 pages, more complex sentences, clear narrative arc with beginning/middle/end";
    } else {
      pageGuidance = "12-14 pages, richer vocabulary, emotional depth, the child learns something about themselves";
    }

    const systemPrompt = `You are a beloved children's book author. You write with the warmth of Mr. Rogers, the imagination of Dr. Seuss, and the emotional truth of Pixar.

You are writing a personalized children's story for:
- Name: ${childName}
- Age: ${age}
- Condition: ${condition}
- Favorite things: ${favoritesStr}
- Special friend/pet: ${companionStr}
- Story tone: ${storyTone || "AI chooses based on favorites"}
${language && language !== "English" ? `- Language: Write the ENTIRE story in ${language}` : ""}

RULES:
1. ${childName} is the HERO. Not the patient. Not the victim. THE HERO.
2. The condition is part of who they are — it gives them a unique perspective, a special tool, or a secret strength. It is NEVER the enemy. The challenge might be a situation, a fear, or a misunderstanding — but the condition itself is reframed as something that makes ${childName} special.
3. Their treatment (inhaler, insulin pump, wheelchair, hearing aid, therapy, etc.) is their SUPERPOWER TOOL — like a wizard's wand or a knight's shield. Never a burden.
4. Their favorite things MUST appear naturally in the story. If they love dogs, the dog is a key character. If they love soccer, there's a soccer scene.
5. Their special friend/pet is their loyal companion throughout the story.
6. The story should be age-appropriate: ${pageGuidance}
7. The story must have a MOMENT OF BRAVERY — a scene where ${childName} uses their knowledge of their condition to help themselves or someone else. This is the climax.
8. End on a note of PRIDE and PEACE — ${childName} goes to bed knowing they are extraordinary.
9. NEVER be scary. NEVER make the child feel broken. NEVER suggest the condition will go away or be "fixed." Instead, show that ${childName} is COMPLETE, CAPABLE, and LOVED exactly as they are.
10. Each page includes an illustration description in a warm watercolor picture book style.

Respond with ONLY valid JSON (no markdown, no backticks):
{
  "title": "Story title incorporating ${childName}",
  "dedication": "For ${childName}, who is braver than they know",
  "pages": [
    {
      "pageNumber": 1,
      "text": "Story text for this page",
      "illustration": {
        "description": "Detailed scene description for a warm watercolor illustration",
        "mood": "emotional tone of this page",
        "colors": ["hex color 1", "hex color 2", "hex color 3"]
      }
    }
  ],
  "aboutTheCondition": {
    "forKids": "Simple 2-3 sentence explanation of the condition for the child, ending with something empowering",
    "forParents": "Context for parents about why the story was written this way and how metaphor helps children process their condition"
  }
}`;

    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 6000,
      temperature: 0.85,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Please write a personalized storybook for ${childName}, age ${age}, who has ${condition}. Make it magical, warm, and empowering.`,
        },
      ],
    });

    const responseText = completion.choices[0]?.message?.content || "";
    if (!responseText) {
      return NextResponse.json(
        { success: false, error: "No response from AI." },
        { status: 500 }
      );
    }

    const story: GeneratedStory = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      story,
      recommendations,
    });
  } catch (error) {
    console.error("Storybook API error:", error);
    // Fall back to demo story
    const childName = "Sam";
    try {
      const body = await request.clone().json().catch(() => ({})) as Record<string, string>;
      const name = body.childName || childName;
      const condition = body.condition || "asthma";
      const recommendations = getBookRecommendations(condition);
      const personalizedDemo: GeneratedStory = {
        ...demoStory,
        title: `${name} and the Breathing Dragon`,
        dedication: `For ${name}, who is braver than they know`,
        pages: demoStory.pages.map((p) => ({
          ...p,
          text: p.text.replace(/\bSam\b/g, name).replace(/\bSam's\b/g, `${name}'s`),
        })),
      };
      return NextResponse.json({ success: true, story: personalizedDemo, recommendations });
    } catch {
      return NextResponse.json({ success: true, story: demoStory, recommendations: getBookRecommendations("asthma") });
    }
  }
}
