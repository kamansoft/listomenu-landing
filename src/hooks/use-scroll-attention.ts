import { useEffect, useRef } from "react";

/** Animate only visible links on an active page; throttle repeated scroll events. */
export function useScrollAttention() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let lastPulse = -Infinity;
    let animation: Animation | undefined;
    let frame = 0;
    const pulse = () => {
      if (!visible || document.visibilityState !== "visible" || preference.matches || element.matches(":hover, :focus-visible")) return;
      const now = performance.now();
      if (now - lastPulse < 1400) return;
      lastPulse = now;
      animation?.cancel();
      animation = element.animate([
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(-3px) scale(1.035)", offset: 0.45 },
        { transform: "translateY(0) scale(1)" },
      ], { duration: 1000, easing: "ease-in-out" });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) frame = requestAnimationFrame(pulse);
      else animation?.cancel();
    }, { threshold: 0.5 });
    const cancel = () => { animation?.cancel(); };
    observer.observe(element);
    window.addEventListener("scroll", pulse, { passive: true });
    document.addEventListener("visibilitychange", cancel);
    preference.addEventListener("change", cancel);
    element.addEventListener("pointerenter", cancel);
    element.addEventListener("focus", cancel);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancel();
      window.removeEventListener("scroll", pulse);
      document.removeEventListener("visibilitychange", cancel);
      preference.removeEventListener("change", cancel);
      element.removeEventListener("pointerenter", cancel);
      element.removeEventListener("focus", cancel);
    };
  }, []);
  return ref;
}