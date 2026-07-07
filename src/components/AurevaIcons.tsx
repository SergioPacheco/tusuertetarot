/**
 * Ícones dourados estilo Aureva — gradiente dourado + fundo púrpura escuro.
 * Baseados nos SVG symbols do aurevabot.online.
 */

const defs = `<defs><radialGradient id="av-fill" cx="36%" cy="28%" r="88%"><stop offset="0" stop-color="#3c2470"/><stop offset="0.55" stop-color="#241047"/><stop offset="1" stop-color="#140a2e"/></radialGradient><linearGradient id="av-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e2a6"/><stop offset="0.5" stop-color="#e8b852"/><stop offset="1" stop-color="#a57e2e"/></linearGradient></defs>`;

export function IconHeart({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<path d="M12 20.5l-1.6-1.5C5 14.2 2 11.5 2 8.1 2 5.5 4 3.5 6.6 3.5c1.5 0 2.9.7 3.8 1.9.9-1.2 2.3-1.9 3.8-1.9C16.5 3.5 18.5 5.5 18.5 8.1c0 3.4-3 6.1-8.4 10.9z" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1.3" stroke-linejoin="round"/>` }} />;
}

export function IconNatal({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<circle cx="12" cy="12" r="9.2" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1.3"/><circle cx="12" cy="12" r="6.6" fill="none" stroke="url(#av-g)" stroke-width="0.9" opacity="0.9"/><path d="M12 6.2 17.05 14.9 6.95 14.9Z" fill="none" stroke="url(#av-g)" stroke-width="1.1" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.15" fill="#f6dd9a"/>` }} />;
}

export function IconSpark({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<circle cx="12" cy="12" r="8.4" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1.2"/><path d="M12 4.8 14.1 9.9 19.2 12 14.1 14.1 12 19.2 9.9 14.1 4.8 12 9.9 9.9Z" fill="#f6dd9a" stroke="url(#av-g)" stroke-width="0.7" stroke-linejoin="round"/>` }} />;
}

export function IconCard({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<rect x="6" y="3.5" width="12" height="17" rx="2.6" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1.3"/><path d="M12 7.4Q12 11 15.6 11Q12 11 12 14.6Q12 11 8.4 11Q12 11 12 7.4Z" fill="url(#av-g)"/>` }} />;
}

export function IconMoon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<path d="M20.5 14.6A8.6 8.6 0 1 1 11 3.3a6.7 6.7 0 0 0 9.5 11.3Z" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1" stroke-linejoin="round"/><path d="M18.8 3.1Q18.8 5.2 20.9 5.2Q18.8 5.2 18.8 7.3Q18.8 5.2 16.7 5.2Q18.8 5.2 18.8 3.1Z" fill="url(#av-g)"/>` }} />;
}

export function IconSun({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<circle cx="12" cy="12" r="3.7" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1.2"/><g fill="url(#av-g)"><path d="M12 2.4 12.6 5.7 12 8.4 11.4 5.7Z"/><g transform="rotate(90 12 12)"><path d="M12 2.4 12.6 5.7 12 8.4 11.4 5.7Z"/></g><g transform="rotate(180 12 12)"><path d="M12 2.4 12.6 5.7 12 8.4 11.4 5.7Z"/></g><g transform="rotate(270 12 12)"><path d="M12 2.4 12.6 5.7 12 8.4 11.4 5.7Z"/></g></g><circle cx="12" cy="12" r="1.1" fill="#f6dd9a"/>` }} />;
}

export function IconPremium({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: `${defs}<path d="M12 2.6 17.6 9 12 21.4 6.4 9Z" fill="url(#av-fill)" stroke="url(#av-g)" stroke-width="1.3" stroke-linejoin="round"/><g stroke="url(#av-g)" stroke-width="0.9" opacity="0.85" fill="none"><path d="M6.4 9H17.6M12 2.6 9.3 9 12 21.4M12 2.6 14.7 9 12 21.4"/></g><path d="M19.6 5.2Q19.6 6.6 21 6.6Q19.6 6.6 19.6 8Q19.6 6.6 18.2 6.6Q19.6 6.6 19.6 5.2Z" fill="#f6dd9a"/>` }} />;
}
