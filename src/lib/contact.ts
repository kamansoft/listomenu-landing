import { SITE_CONFIG } from "./site-config";

export const WHATSAPP_DISPLAY = SITE_CONFIG.contact.whatsapp;
export const WHATSAPP_NUMBER = WHATSAPP_DISPLAY.replace(/\D/g, "");
export const CONTACT_EMAIL = SITE_CONFIG.contact.email;

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
