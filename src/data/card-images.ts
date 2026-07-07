/**
 * URLs de imágenes del Tarot de Marsella (Jean Dodal / Nicolas Conver).
 * Fuente: Wikimedia Commons — Tarot de Marseille Single Cards
 * Licencia: Public Domain (obras anteriores a 1900)
 *
 * Para producción comercial, verificar la licencia individual de cada imagen.
 * Recomendado: Usar solo cartas marcadas como Public Domain, CC0 o CC-BY.
 */

// Wikimedia Commons base URL for Tarot de Marseille cards (Jean Dodal, 1701-1715)
const WIKI_BASE = 'https://upload.wikimedia.org/wikipedia/commons/thumb';

export const cardImages: Record<number, string> = {
  // === ARCANOS MAYORES (Jean Dodal Tarot de Marseille) ===
  0: `${WIKI_BASE}/d/d7/Jean_Dodal_Tarot_trump_22.jpg/200px-Jean_Dodal_Tarot_trump_22.jpg`, // Le Mat / El Loco
  1: `${WIKI_BASE}/1/1f/Jean_Dodal_Tarot_trump_01.jpg/200px-Jean_Dodal_Tarot_trump_01.jpg`, // Le Bateleur / El Mago
  2: `${WIKI_BASE}/9/9f/Jean_Dodal_Tarot_trump_02.jpg/200px-Jean_Dodal_Tarot_trump_02.jpg`, // La Papesse
  3: `${WIKI_BASE}/4/4a/Jean_Dodal_Tarot_trump_03.jpg/200px-Jean_Dodal_Tarot_trump_03.jpg`, // L'Impératrice
  4: `${WIKI_BASE}/0/07/Jean_Dodal_Tarot_trump_04.jpg/200px-Jean_Dodal_Tarot_trump_04.jpg`, // L'Empereur
  5: `${WIKI_BASE}/e/e4/Jean_Dodal_Tarot_trump_05.jpg/200px-Jean_Dodal_Tarot_trump_05.jpg`, // Le Pape
  6: `${WIKI_BASE}/6/6e/Jean_Dodal_Tarot_trump_06.jpg/200px-Jean_Dodal_Tarot_trump_06.jpg`, // L'Amoureux
  7: `${WIKI_BASE}/f/fb/Jean_Dodal_Tarot_trump_07.jpg/200px-Jean_Dodal_Tarot_trump_07.jpg`, // Le Chariot
  8: `${WIKI_BASE}/d/d7/Jean_Dodal_Tarot_trump_08.jpg/200px-Jean_Dodal_Tarot_trump_08.jpg`, // La Justice
  9: `${WIKI_BASE}/5/57/Jean_Dodal_Tarot_trump_09.jpg/200px-Jean_Dodal_Tarot_trump_09.jpg`, // L'Hermite
  10: `${WIKI_BASE}/7/70/Jean_Dodal_Tarot_trump_10.jpg/200px-Jean_Dodal_Tarot_trump_10.jpg`, // La Roue de Fortune
  11: `${WIKI_BASE}/b/b8/Jean_Dodal_Tarot_trump_11.jpg/200px-Jean_Dodal_Tarot_trump_11.jpg`, // La Force
  12: `${WIKI_BASE}/c/c1/Jean_Dodal_Tarot_trump_12.jpg/200px-Jean_Dodal_Tarot_trump_12.jpg`, // Le Pendu
  13: `${WIKI_BASE}/2/2a/Jean_Dodal_Tarot_trump_13.jpg/200px-Jean_Dodal_Tarot_trump_13.jpg`, // (La Mort)
  14: `${WIKI_BASE}/0/0e/Jean_Dodal_Tarot_trump_14.jpg/200px-Jean_Dodal_Tarot_trump_14.jpg`, // La Tempérance
  15: `${WIKI_BASE}/1/14/Jean_Dodal_Tarot_trump_15.jpg/200px-Jean_Dodal_Tarot_trump_15.jpg`, // Le Diable
  16: `${WIKI_BASE}/6/64/Jean_Dodal_Tarot_trump_16.jpg/200px-Jean_Dodal_Tarot_trump_16.jpg`, // La Maison Dieu
  17: `${WIKI_BASE}/3/3d/Jean_Dodal_Tarot_trump_17.jpg/200px-Jean_Dodal_Tarot_trump_17.jpg`, // L'Étoile
  18: `${WIKI_BASE}/1/10/Jean_Dodal_Tarot_trump_18.jpg/200px-Jean_Dodal_Tarot_trump_18.jpg`, // La Lune
  19: `${WIKI_BASE}/c/ce/Jean_Dodal_Tarot_trump_19.jpg/200px-Jean_Dodal_Tarot_trump_19.jpg`, // Le Soleil
  20: `${WIKI_BASE}/d/d1/Jean_Dodal_Tarot_trump_20.jpg/200px-Jean_Dodal_Tarot_trump_20.jpg`, // Le Jugement
  21: `${WIKI_BASE}/c/ca/Jean_Dodal_Tarot_trump_21.jpg/200px-Jean_Dodal_Tarot_trump_21.jpg`, // Le Monde
};

/**
 * Devuelve la URL de la imagen para una carta.
 * Si no tiene imagen externa, devuelve null (se usará el placeholder visual).
 */
export function getCardImageUrl(cardId: number): string | null {
  return cardImages[cardId] || null;
}
