import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useViewportDemo } from "./use-viewport-demo";

let enterView: (visible: boolean) => void;
let reducedMotion = false;

function Example({ onStep }: { onStep: (step: number) => void }) {
  const demo = useViewportDemo(3, onStep);
  return <div ref={demo.ref} onPointerDown={demo.stop} data-testid="demo" />;
}

beforeEach(() => {
  vi.useFakeTimers();
  reducedMotion = false;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) {
      enterView = visible => callback([{ isIntersecting: visible } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    observe() {}
    disconnect() {}
  });
  vi.spyOn(window, "matchMedia").mockImplementation(query => ({
    matches: reducedMotion, media: query, onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("viewport demonstration", () => {
  it("waits for visibility, plays a finite sequence, and never replays", () => {
    const onStep = vi.fn();
    render(<Example onStep={onStep} />);
    act(() => { enterView(false); vi.advanceTimersByTime(6000); });
    expect(onStep).not.toHaveBeenCalled();
    act(() => { enterView(true); vi.advanceTimersByTime(5000); });
    expect(onStep.mock.calls).toEqual([[0], [1], [2]]);
    act(() => { enterView(false); enterView(true); vi.advanceTimersByTime(6000); });
    expect(onStep).toHaveBeenCalledTimes(3);
  });

  it("cancels remaining automatic changes when the visitor interacts", () => {
    const onStep = vi.fn();
    render(<Example onStep={onStep} />);
    act(() => { enterView(true); vi.advanceTimersByTime(800); });
    expect(onStep.mock.calls).toEqual([[0]]);
    act(() => { screen.getByTestId("demo").dispatchEvent(new Event("pointerdown", { bubbles: true })); });
    act(() => { vi.advanceTimersByTime(6000); enterView(true); vi.advanceTimersByTime(6000); });
    expect(onStep).toHaveBeenCalledTimes(1);
  });

  it("skips automatic changes for reduced motion", () => {
    reducedMotion = true;
    const onStep = vi.fn();
    render(<Example onStep={onStep} />);
    act(() => { enterView(true); vi.advanceTimersByTime(6000); });
    expect(onStep).not.toHaveBeenCalled();
  });

  it("clears pending changes on unmount", () => {
    const onStep = vi.fn();
    const view = render(<Example onStep={onStep} />);
    act(() => enterView(true));
    view.unmount();
    act(() => vi.advanceTimersByTime(6000));
    expect(onStep).not.toHaveBeenCalled();
  });
});