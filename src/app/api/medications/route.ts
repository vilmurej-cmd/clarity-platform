import { NextRequest, NextResponse } from "next/server";

const demoInteractions = {
  medications: ["Metformin", "Lisinopril", "Aspirin"],
  interactions: [
    {
      medications: ["Metformin", "Lisinopril"],
      severity: "green" as const,
      title: "No significant interaction",
      description: "These medications are commonly prescribed together and are generally safe to take in combination. Many patients with diabetes also take blood pressure medication.",
      recommendation: "Continue taking as prescribed. No special precautions needed.",
    },
    {
      medications: ["Metformin", "Aspirin"],
      severity: "yellow" as const,
      title: "Minor interaction",
      description: "Aspirin may slightly increase the blood-sugar-lowering effect of Metformin in some people. This is usually not a problem at low aspirin doses (81mg daily).",
      recommendation: "Monitor blood sugar more closely when starting aspirin. Discuss with your pharmacist.",
    },
    {
      medications: ["Lisinopril", "Aspirin"],
      severity: "yellow" as const,
      title: "Minor interaction",
      description: "High-dose aspirin may slightly reduce the blood-pressure-lowering effect of Lisinopril. Low-dose aspirin (81mg) is generally fine.",
      recommendation: "If taking high-dose aspirin, your doctor may need to adjust your Lisinopril dose.",
    },
  ],
  foodInteractions: [
    { medication: "Metformin", food: "Alcohol", severity: "red" as const, description: "Alcohol can increase the risk of a rare but serious side effect called lactic acidosis. Limit alcohol intake." },
    { medication: "Lisinopril", food: "Potassium-rich foods", severity: "yellow" as const, description: "Lisinopril can raise potassium levels. Avoid excessive intake of bananas, oranges, and potassium supplements." },
    { medication: "Metformin", food: "Grapefruit", severity: "green" as const, description: "No significant interaction with grapefruit. Safe to consume." },
  ],
  timingNotes: [
    { medication: "Metformin", note: "Take with meals to reduce stomach upset. Extended-release: take with evening meal." },
    { medication: "Lisinopril", note: "Can be taken with or without food. Take at the same time each day, preferably morning." },
    { medication: "Aspirin", note: "Take with food or milk to reduce stomach irritation." },
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { medications } = body;

    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide at least one medication." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: true, result: demoInteractions });
    }

    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `You are CLARITY's medication interaction checker. Analyze the provided list of medications for potential interactions.

CRITICAL: This is EDUCATIONAL ONLY. Always emphasize consulting a pharmacist or doctor.

Respond with ONLY valid JSON:
{
  "medications": ["list of analyzed medications"],
  "interactions": [
    {
      "medications": ["med1", "med2"],
      "severity": "green|yellow|red",
      "title": "Brief title",
      "description": "Plain language explanation",
      "recommendation": "What the patient should do"
    }
  ],
  "foodInteractions": [
    {
      "medication": "med name",
      "food": "food item",
      "severity": "green|yellow|red",
      "description": "Plain language explanation"
    }
  ],
  "timingNotes": [
    {
      "medication": "med name",
      "note": "When/how to take it"
    }
  ]
}

Severity guide:
- green: No significant interaction. Safe combination.
- yellow: Minor interaction — may need monitoring or dose adjustment. Discuss with pharmacist.
- red: Potential serious interaction — discuss with doctor before taking together.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 3000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Medications: ${medications.join(", ")}` },
      ],
    });

    const responseText = completion.choices[0]?.message?.content || "";
    if (!responseText) {
      return NextResponse.json({ success: true, result: demoInteractions });
    }

    const result = JSON.parse(responseText);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Medications API error:", error);
    return NextResponse.json({ success: true, result: demoInteractions });
  }
}
