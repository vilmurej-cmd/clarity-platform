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
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: true, report: demoReport });
    }

    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  "severity": "manageable|moderate|serious|critical",
  "affectedBodyRegions": ["array of: brain, lungs, heart, liver, stomach, pancreas, kidneys, intestines, bones, skin, blood, thyroid, eyes, spine, muscles"],
  "mechanismSteps": [
    { "step": 1, "title": "Step title", "description": "Plain language", "icon": "emoji" }
  ],
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
      "costRange": "$|$$|$$$|$$$$",
      "sideEffects": [
        { "effect": "side effect name", "severity": "mild|moderate|serious", "frequency": "common|uncommon|rare" }
      ],
      "questionsToAsk": ["specific question about this treatment"]
    }
  ],
  "questionsForDoctor": {
    "askFirst": [{ "question": "...", "whyItMatters": "..." }],
    "alsoAsk": [{ "question": "...", "whyItMatters": "..." }],
    "ifTimeAllows": [{ "question": "...", "whyItMatters": "..." }]
  },
  "clinicalTrialSearchTerm": "suggested ClinicalTrials.gov search",
  "supportResources": {
    "medical": [{ "name": "...", "description": "...", "url": "real URL" }],
    "medication": [{ "name": "...", "description": "...", "url": "real URL" }],
    "supportGroups": [{ "name": "...", "description": "...", "url": "real URL" }],
    "financial": [{ "name": "...", "description": "..." }],
    "mentalHealth": [{ "name": "...", "description": "...", "url": "real URL" }],
    "nutrition": [{ "name": "...", "description": "...", "url": "real URL" }],
    "exercise": [{ "name": "...", "description": "..." }]
  },
  "livingWith": {
    "dailyChecklist": ["Specific daily task for this condition"],
    "foodGuide": {
      "eat": [{ "name": "food", "icon": "emoji", "reason": "why" }],
      "moderate": [{ "name": "food", "icon": "emoji", "reason": "why" }],
      "limit": [{ "name": "food", "icon": "emoji", "reason": "why" }]
    },
    "exercises": [
      { "name": "exercise", "icon": "emoji", "duration": "...", "frequency": "...", "difficulty": "easy|moderate|challenging", "safetyNote": "..." }
    ],
    "emotionalHealth": "Validating, compassionate paragraph",
    "copingStrategies": ["strategy 1", "strategy 2"],
    "watchFor": [{ "sign": "...", "action": "..." }],
    "forCaregivers": "Guidance paragraph for family/caregivers"
  },
  "kidsVersion": {
    "simpleExplanation": "Age-appropriate 2-3 sentence explanation for a child",
    "siblingNote": "What to tell siblings"
  }
}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 4500,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    // Extract text content from OpenAI's response
    const responseText = completion.choices[0]?.message?.content || "";
    if (!responseText) {
      return NextResponse.json(
        { success: false, error: "No response from AI." },
        { status: 500 }
      );
    }

    const report = JSON.parse(responseText);

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Understand API error:", error);
    // Fall back to demo report instead of returning error
    return NextResponse.json({ success: true, report: demoReport });
  }
}
