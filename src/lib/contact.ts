export const WHATSAPP_NUMBER = "573138089642";
export const WHATSAPP_DISPLAY = "+57 313 808 9642";
// Placeholder until the real contact email is provided.
export const CONTACT_EMAIL = "hola@listo.menu";

export function isMobileUserAgent(ua: string): boolean {
  return /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua);
}

/** Desktop opens WhatsApp Web; phones open the WhatsApp app. */
export function whatsappUrl(message: string, mobile: boolean): string {
  const text = encodeURIComponent(message);
  return mobile
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
