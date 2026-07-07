import type { Metadata } from 'next';
import { getCardById } from '@/data';
import CardDetailContent from './CardDetailContent';

// Gerar meta tags dinâmicas por carta (Open Graph para compartilhar)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const card = getCardById(parseInt(id));

  if (!card) {
    return { title: 'Carta no encontrada — Tu Suerte Tarot' };
  }

  const title = `${card.name} — Tu Suerte Tarot`;
  const description = card.meaning.general.slice(0, 160);
  const keywords = card.keywords.join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Tu Suerte Tarot',
      locale: 'es_ES',
      images: [
        {
          url: `/cards/major/${card.arcana === 'major' ? getOgImageName(card.number) : 'back'}.webp`,
          width: 520,
          height: 910,
          alt: card.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function getOgImageName(number: number): string {
  const names: Record<number, string> = {
    0: '00-fool', 1: '01-magician', 2: '02-high-priestess', 3: '03-empress',
    4: '04-emperor', 5: '05-hierophant', 6: '06-lovers', 7: '07-chariot',
    8: '08-justice', 9: '09-hermit', 10: '10-wheel', 11: '11-strength',
    12: '12-hanged-man', 13: '13-death', 14: '14-temperance', 15: '15-devil',
    16: '16-tower', 17: '17-star', 18: '18-moon', 19: '19-sun',
    20: '20-judgement', 21: '21-world',
  };
  return names[number] || '00-fool';
}

export default function CardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <CardDetailContent params={params} />;
}
