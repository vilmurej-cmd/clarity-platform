import { NextRequest, NextResponse } from "next/server";

const demoPrepPacket = {
  condition: "Type 2 Diabetes",
  appointmentType: "first-visit",
  whatToBring: [
    "Photo ID and insurance card",
    "List of all current medications (including supplements and over-the-counter)",
    "Any recent blood work or lab results",
    "A written list of your symptoms and when they started",
    "Questions prepared from your CLARITY report",
    "A notebook and pen to take notes",
    "A family member or friend for support (if you'd like)",
  ],
  whatToExpect: [
    { title: "Check-in and vitals", description: "The nurse will take your weight, blood pressure, and sometimes blood sugar. This is routine and helps establish a baseline." },
    { title: "Medical history review", description: "Your doctor will ask about your family history, lifestyle, symptoms, and any other health conditions. Be honest — everything helps." },
    { title: "Physical examination", description: "A basic exam including checking your heart, lungs, feet, and eyes. For diabetes, foot and eye exams are especially important." },
    { title: "Discussion of diagnosis", description: "Your doctor will explain your diagnosis, what your test results mean, and discuss initial treatment options." },
    { title: "Treatment plan", description: "Together you'll create a plan that may include medication, lifestyle changes, and follow-up appointments." },
  ],
  howToDescribeSymptoms: [
    "When did you first notice symptoms?",
    "How often do they occur?",
    "What makes them better or worse?",
    "Rate your symptoms on a scale of 1-10",
    "How are symptoms affecting your daily life?",
    "Have you tried anything to manage them?",
  ],
  patientRights: [
    "You have the right to understand your diagnosis in plain language",
    "You have the right to ask questions — there are no stupid questions",
    "You have the right to a second opinion",
    "You have the right to know the costs of treatments before agreeing",
    "You have the right to refuse a treatment and discuss alternatives",
    "You have the right to have a family member or advocate present",
    "You have the right to access your medical records",
  ],
  afterAppointment: [
    "Review your notes while they're fresh in your mind",
    "Fill any new prescriptions promptly",
    "Schedule any recommended follow-up appointments or tests",
    "Share important information with your family or caregiver",
    "Start any lifestyle changes your doctor recommended",
    "Call your doctor's office if you have questions that come up later",
    "Use CLARITY to look up any new terms or treatments discussed",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { condition, appointmentType } = body;

    if (!condition || !appointmentType) {
      return NextResponse.json(
        { success: false, error: "Please provide condition and appointment type." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: true, result: demoPrepPacket });
    }

    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `You are CLARITY's appointment preparation assistant. Generate a personalized preparation packet for a patient's upcoming doctor appointment.

Respond with ONLY valid JSON:
{
  "condition": "condition name",
  "appointmentType": "first-visit|follow-up|specialist|second-opinion",
  "whatToBring": ["item 1", "item 2"],
  "whatToExpect": [
    { "title": "step", "description": "plain language explanation" }
  ],
  "howToDescribeSymptoms": ["prompt 1", "prompt 2"],
  "patientRights": ["right 1", "right 2"],
  "afterAppointment": ["action 1", "action 2"]
}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 3000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Condition: ${condition}\nAppointment type: ${appointmentType}` },
      ],
    });

    const responseText = completion.choices[0]?.message?.content || "";
    if (!responseText) {
      return NextResponse.json({ success: true, result: demoPrepPacket });
    }

    const result = JSON.parse(responseText);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Prepare API error:", error);
    return NextResponse.json({ success: true, result: demoPrepPacket });
  }
}
