import { useCallback, useEffect, useRef, useState } from "react";

/** Play once in view; any visitor interaction permanently hands over control. */
export function useViewportDemo(steps: number, onStep: (step: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(onStep);
  const played = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  useEffect(() => { callback.current = onStep; }, [onStep]);
  const stop = useCallback(() => {
    played.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActiveStep(null);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || played.current) return;
      played.current = true;
      if (motion.matches) return;
      for (let step = 0; step < steps; step++) {
        timers.current.push(setTimeout(() => {
          setActiveStep(step);
          callback.current(step);
        }, 750 + step * 1200));
      }
      timers.current.push(setTimeout(stop, 750 + steps * 1200));
    }, { threshold: 0.35 });
    observer.observe(element);
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stop);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [steps, stop]);

  return { ref, activeStep, stop };
}