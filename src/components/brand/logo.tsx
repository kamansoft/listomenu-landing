// Copied from the listo.menu app: receipt mark + two-line wordmark lockup.
export function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path d="M12 6h40v44l-6.7 5-6.6-5-6.7 5-6.7-5-6.6 5-6.7-5z" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M20 27l8.5 8.5L45 19" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckO({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="3.4" />
      <path d="M7.5 12.5l3 3 6-7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="brand-word" aria-label="listo.menu">
      <span className="brand-word-top">
        List
        <CheckO />
      </span>
      <span className="brand-word-bottom">.menu</span>
    </span>
  );
}

export function BrandLockup() {
  return (
    <span className="brand">
      <span className="brand-icon">
        <LogoMark />
      </span>
      <Wordmark />
    </span>
  );
}
