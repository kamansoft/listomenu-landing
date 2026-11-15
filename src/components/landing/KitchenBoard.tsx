import { useId, useState } from "react";
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useViewportDemo } from "@/hooks/use-viewport-demo";
import { createKitchenCards, KITCHEN_DEMO_STEPS, moveKitchenCard } from "@/lib/kitchen-demo";
import { dict, type Lang } from "@/lib/i18n";

const tones = ["bg-warning-surface text-warning", "bg-primary-surface text-primary", "bg-success-surface text-success"];

export function KitchenBoard({ lang }: { lang: Lang }) {
  const t = dict[lang].kitchen;
  const [cards, setCards] = useState(() => createKitchenCards(t.cards));
  const [dragged, setDragged] = useState<string | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const reduced = useReducedMotion();
  const group = useId();
  const demo = useViewportDemo(KITCHEN_DEMO_STEPS.length, step => {
    const target = KITCHEN_DEMO_STEPS[step];
    if (target !== undefined) setCards(current => moveKitchenCard(current, "0-0", target));
  });
  const move = (id: string, target: number) => {
    demo.stop();
    const card = cards.find(item => item.id === id);
    if (!card || Math.abs(card.column - target) !== 1) return;
    setCards(current => moveKitchenCard(current, id, target));
    setAnnouncement(`${t.cards[card.source]?.[card.item]}: ${t.cols[target]}`);
  };

  return (
    <div ref={demo.ref} onPointerDownCapture={demo.stop} onFocusCapture={demo.stop} className="overflow-x-auto pb-4">
      <LayoutGroup id={group}>
        <div className="grid min-w-[760px] grid-cols-3 gap-4" data-testid="kitchen-board">
          {t.cols.map((column, index) => {
            const canDrop = cards.some(card => card.id === dragged && Math.abs(card.column - index) === 1);
            return (
              <div key={column} data-column={index} aria-label={column}
                onDragOver={event => { if (canDrop) { event.preventDefault(); setOver(index); } }}
                onDragLeave={() => setOver(null)}
                onDrop={event => { event.preventDefault(); if (dragged && canDrop) move(dragged, index); setDragged(null); setOver(null); }}
                className={`flex min-h-[520px] flex-col gap-3 rounded-lg border bg-muted p-4 transition-colors ${over === index ? "border-primary bg-primary-surface" : "border-border"}`}>
                <div className="mb-1 flex min-h-8 items-center justify-between gap-2">
                  <h3 className="font-bold">{column}</h3>
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${tones[index]}`}>{cards.filter(card => card.column === index).length}</span>
                </div>
                {cards.filter(card => card.column === index).map(card => (
                  <motion.div key={card.id} layoutId={card.id} layout
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
                    draggable onDragStart={event => { demo.stop(); setDragged(card.id); if ("dataTransfer" in event) (event.dataTransfer as DataTransfer).setData("text/plain", card.id); }}
                    onDragEnd={() => { setDragged(null); setOver(null); }}
                    data-card={card.id}
                    className={`flex min-h-[104px] flex-col justify-between gap-2 rounded-lg border bg-card p-3 shadow-panel ${demo.activeStep !== null && card.id === "0-0" ? "border-primary ring-2 ring-ring" : "border-border"}`}>
                    <div className="flex items-start gap-2">
                      <GripVertical className="mt-0.5 size-4 shrink-0 cursor-grab text-muted-foreground" aria-hidden />
                      <p className="text-sm font-semibold">{t.cards[card.source]?.[card.item]}</p>
                    </div>
                    <div className="flex justify-between gap-2">
                      <Button variant="ghost" size="icon" className="size-11 text-muted-foreground" disabled={index === 0}
                        aria-label={`${t.moveTo} ${t.cols[index - 1] ?? column}`} title={`${t.moveTo} ${t.cols[index - 1] ?? column}`}
                        onClick={() => move(card.id, index - 1)}><ArrowLeft /></Button>
                      <Button variant="ghost" size="icon" className="size-11 text-primary" disabled={index === 2}
                        aria-label={`${t.moveTo} ${t.cols[index + 1] ?? column}`} title={`${t.moveTo} ${t.cols[index + 1] ?? column}`}
                        onClick={() => move(card.id, index + 1)}><ArrowRight /></Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </LayoutGroup>
      <p className="sr-only" role="status">{announcement}</p>
    </div>
  );
}