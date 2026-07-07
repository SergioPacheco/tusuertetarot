import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { allCards } from '@/data';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { cards, spread, question, locale } = await req.json();

    if (!cards || !spread) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const languageInstructions: Record<string, { instruction: string; systemRole: string }> = {
      es: { 
        instruction: 'IMPORTANTE: Responde COMPLETAMENTE en español. Todo el texto debe estar en español.',
        systemRole: 'Eres una tarotista profesional del Tarot de Marsella. Tus interpretaciones son profundas, personalizadas y conectan las cartas entre sí. SIEMPRE respondes en español.'
      },
      en: { 
        instruction: 'IMPORTANT: Respond ENTIRELY in English. All text must be in English.',
        systemRole: 'You are a professional Tarot de Marseille reader. Your interpretations are deep, personalized and connect the cards together. ALWAYS respond in English.'
      },
      pt: { 
        instruction: 'IMPORTANTE: Responda COMPLETAMENTE em português brasileiro. Todo o texto deve estar em português.',
        systemRole: 'Você é uma tarotista profissional do Tarot de Marselha. Suas interpretações são profundas, personalizadas e conectam as cartas entre si. SEMPRE responda em português brasileiro.'
      },
    };

    const lang = languageInstructions[locale || 'es'] || languageInstructions.es;

    // Construir el contexto de la tirada
    const cardsContext = cards.map((c: { cardId: number; position: string; isReversed: boolean }) => {
      const card = allCards.find((ac) => ac.id === c.cardId);
      if (!card) return '';
      const orientation = c.isReversed ? '(INVERTIDA)' : '(derecha)';
      return `- Posición "${c.position}": ${card.name} ${orientation}
  Significado base: ${c.isReversed ? card.reversed.general : card.meaning.general}`;
    }).join('\n');

    const prompt = `Eres una tarotista experta en el Tarot de Marsella con 30 años de experiencia. 
Tu estilo es profundo, empático, directo y poético. No usas clichés espirituales vacíos.
Hablas directamente a la persona con calidez pero sin rodeos.

TIRADA: ${spread}
${question ? `PREGUNTA: "${question}"` : 'Sin pregunta específica — lectura general'}

CARTAS SACADAS:
${cardsContext}

INSTRUCCIONES:
1. Comienza con una frase impactante que capture la esencia general de la tirada.
2. Interpreta CADA carta en su posición, conectándola con las demás (no interpretes aisladamente).
3. Revela el hilo narrativo: qué historia cuentan las cartas JUNTAS.
4. Si hay cartas invertidas, explica qué energía está bloqueada o en exceso.
5. Cierra con un CONSEJO PRÁCTICO concreto (no genérico).
6. Usa un tono conversacional, como si hablaras a la persona frente a ti.
7. Máximo 400 palabras.
8. ${lang.instruction}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: lang.systemRole },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const interpretation = completion.choices[0]?.message?.content || 'No pude generar una interpretación en este momento.';

    return NextResponse.json({ interpretation });
  } catch (error: unknown) {
    console.error('Error en interpretación:', error);
    const message = error instanceof Error ? error.message : 'Error interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
