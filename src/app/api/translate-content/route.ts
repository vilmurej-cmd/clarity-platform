import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { content, targetLanguage, context } = await req.json();

    if (!content || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing content or targetLanguage' },
        { status: 400 }
      );
    }

    // If target is English, return as-is
    if (targetLanguage === 'en') {
      return NextResponse.json({ translated: content });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Graceful degradation — return original content
      return NextResponse.json({ translated: content });
    }

    const systemPrompt = `You are translating for CLARITY, a patient education platform. Follow these rules strictly:
- Use precise medical terminology appropriate for the target language
- Translate drug names using their International Nonproprietary Names (INN)
- Preserve warmth, compassion, and an encouraging tone
- Keep brand names unchanged: CLARITY, ARIA
- Keep proper nouns and URLs unchanged
- Return ONLY the translated text, no explanations or notes
- If the text contains HTML tags, preserve them exactly`;

    const userPrompt = context
      ? `Translate the following ${context} to ${targetLanguage}:\n\n${content}`
      : `Translate to ${targetLanguage}:\n\n${content}`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 4096,
      }),
    });

    if (!res.ok) {
      console.error('OpenAI API error:', res.status);
      return NextResponse.json({ translated: content });
    }

    const data = await res.json();
    const translated = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ translated: translated || content });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ translated: '' }, { status: 500 });
  }
}
