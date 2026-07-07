import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { texts, targetLocale } = await req.json();

    if (!texts || !targetLocale) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const langNames: Record<string, string> = {
      en: 'English',
      pt: 'Brazilian Portuguese',
    };

    const targetLang = langNames[targetLocale] || 'English';

    const prompt = `Translate the following JSON object values from Spanish to ${targetLang}. 
Keep the JSON keys EXACTLY as they are. Only translate the string values.
Maintain the mystical/spiritual tone appropriate for Tarot card meanings.
Return ONLY valid JSON, no markdown, no explanation.

${JSON.stringify(texts)}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a professional translator specializing in esoteric/spiritual content. Translate accurately to ${targetLang} while preserving the mystical tone. Return ONLY valid JSON.` },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    
    // Limpar possível markdown wrapper
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const translated = JSON.parse(cleaned);
    return NextResponse.json({ translated });
  } catch (error: unknown) {
    console.error('Translation error:', error);
    const message = error instanceof Error ? error.message : 'Translation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
