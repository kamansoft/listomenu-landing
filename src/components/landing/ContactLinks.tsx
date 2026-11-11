import type { ReactNode, MouseEvent } from "react";
import { isMobileUserAgent, mailtoUrl, whatsappUrl } from "@/lib/contact";

export function WhatsAppLink({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  // SSR href works everywhere; on click pick WhatsApp Web (desktop) or the app (phone).
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(whatsappUrl(message, isMobileUserAgent(navigator.userAgent)), "_blank", "noopener");
  };
  return (
    <a href={whatsappUrl(message, true)} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {children}
    </a>
  );
}

export function EmailLink({ subject, body, className, children }: { subject: string; body: string; className?: string; children: ReactNode }) {
  return <a href={mailtoUrl(subject, body)} className={className}>{children}</a>;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.42 1.3-1.96 1.35-.5.05-.98.24-3.3-.69-2.8-1.1-4.56-3.98-4.7-4.17-.14-.18-1.12-1.49-1.12-2.85 0-1.35.71-2.02.96-2.3.25-.27.55-.34.73-.34l.53.01c.17 0 .4-.06.62.48.24.56.8 1.94.86 2.08.07.14.12.3.02.48-.1.19-.14.3-.28.47-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.19.7-.82.89-1.1.18-.28.37-.23.62-.14.25.1 1.6.76 1.88.9.28.13.46.2.53.32.07.11.07.66-.17 1.33Z" />
    </svg>
  );
}
