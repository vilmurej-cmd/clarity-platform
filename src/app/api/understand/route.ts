import { NextRequest, NextResponse } from "next/server";
import { demoReport } from "@/lib/demo-report";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      description,
      ageRange,
      diagnosedWhen,
      currentTreatments,
      otherConditions,
    } = body;

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide a description of your condition." },
        { status: 400 }
      );
    }

    // If no API key, return the demo report
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ success: true, report: demoReport });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Build user message with optional context
    let userMessage = `Patient description: "${description}"`;
    if (ageRange) userMessage += `\nAge range: ${ageRange}`;
    if (diagnosedWhen) userMessage += `\nDiagnosed: ${diagnosedWhen}`;
    if (currentTreatments)
      userMessage += `\nCurrent treatments: ${currentTreatments}`;
    if (otherConditions)
      userMessage += `\nOther conditions: ${otherConditions}`;

    const systemPrompt = `You are CLARITY, a patient education assistant. Translate medical information into clear, compassionate, plain language.

CRITICAL RULES:
- EDUCATIONAL TOOL ONLY. Never provide medical advice or recommend specific treatments.
- Frame treatments as "options your doctor may discuss with you"
- Use empathetic, warm language. The patient may be scared.
- Avoid jargon. Define any medical term immediately in parentheses.
- Be honest about side effects but frame calmly: "some people experience..."
- Never promise outcomes. Use ranges: "helps approximately 6-8 out of 10 people"
- Include emotional validation: "It's completely normal to feel overwhelmed right now."
- Emphasize that healthcare team should make final treatment decisions.
- If the input suggests crisis or self-harm, include a compassionate note encouraging them to speak with a healthcare provider or trusted person.

Respond with ONLY valid JSON (no markdown, no backticks):
{
  "diagnosisSummary": "2-3 sentence plain language summary",
  "conditionName": "Standard name of the condition",
  "prevalence": "How common, normalizing statement",
  "causes": "Brief, non-scary explanation of causes",
  "keyTerms": [
    { "term": "medical term", "definition": "plain language", "whyItMatters": "1 sentence" }
  ],
  "treatmentOptions": [
    {
      "name": "Treatment name",
      "type": "medication|procedure|therapy|lifestyle",
      "howItWorks": "2-3 sentences plain language",
      "effectiveness": "Plain language effectiveness statement",
      "effectivenessScore": 7,
      "involves": "What patient actually does",
      "timeline": "How long treatment typically takes",
      "sideEffects": [
        { "effect": "side effect name", "severity": "mild|moderate|serious", "frequency": "common|uncommon|rare" }
      ],
      "questionsToAsk": ["specific question about this treatment"]
    }
  ],
  "questionsForDoctor": {
    "aboutDiagnosis": [{ "question": "...", "whyItMatters": "..." }],
    "aboutTreatment": [{ "question": "...", "whyItMatters": "..." }],
    "aboutDailyLife": [{ "question": "...", "whyItMatters": "..." }],
    "aboutOutlook": [{ "question": "...", "whyItMatters": "..." }],
    "aboutSupport": [{ "question": "...", "whyItMatters": "..." }]
  },
  "clinicalTrialSearchTerm": "suggested ClinicalTrials.gov search",
  "supportOrganizations": [
    { "name": "Organization name", "description": "What they offer", "website": "URL" }
  ],
  "livingWith": {
    "dailyTips": ["actionable tip 1", "actionable tip 2"],
    "watchFor": ["sign to call doctor"],
    "emotionalHealth": "Validating, compassionate paragraph",
    "forCaregivers": "Guidance paragraph for family/caregivers"
  },
  "kidsVersion": {
    "simpleExplanation": "Age-appropriate 2-3 sentence explanation for a child",
    "siblingNote": "What to tell siblings"
  }
}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    // Extract text content from Claude's response
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
    console.error("Understand API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate report";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
