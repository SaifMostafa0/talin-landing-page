import { useEffect, useRef, useState } from "react";

/*
 * Site-wide motion. Works in every browser (no scroll-timeline dependency).
 *
 * - `[data-reveal]` elements fade and rise in as they enter the viewport,
 *   staggered within their sibling group. Hiding only happens once the inline
 *   boot script has put `motion` on <html>, so without JS (or with reduced
 *   motion) content is simply visible.
 * - Cards that opt in via SPOTLIGHT get a soft light that follows the pointer.
 */


const SPOTLIGHT = ".glass-card, .why-card, .person-tile, .profile-card, .pillar-card, .principle-card, .brings-card, .contact-detail";

// React marks a DOM node once it has hydrated (or rendered) it. Touching a
// server-rendered node before that triggers a hydration mismatch, so reveal
// targets wait until React owns them.
const isOwnedByReact = (element: Element) => Object.keys(element).some((key) => key.startsWith("__reactFiber$"));

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    root.classList.add("motion-ready");

    const started = performance.now();
    const tracked = new WeakSet<Element>();
    const waiting = new Set<HTMLElement>();
    const pending = new Set<HTMLElement>();

    const reveal = (element: HTMLElement) => {
      if (!pending.delete(element)) return;
      element.classList.add("is-revealed");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && reveal(entry.target as HTMLElement)),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const track = (element: HTMLElement) => {
      tracked.add(element);
      // Stagger within the sibling group.
      const siblings = element.parentElement ? [...element.parentElement.children].filter((child) => child.hasAttribute("data-reveal")) : [element];
      element.style.setProperty("--reveal-order", String(Math.max(0, siblings.indexOf(element)) % 6));
      pending.add(element);
      observer.observe(element);
    };

    let frame = 0;
    const tick = () => {
      frame = 0;
      const giveUp = performance.now() - started > 5000;
      waiting.forEach((element) => {
        if (!element.isConnected) waiting.delete(element);
        else if (giveUp || isOwnedByReact(element)) {
          waiting.delete(element);
          track(element);
        }
      });
      // Scroll-linked progress (rails, reading bar): 0 when the element's top
      // reaches 65% of the viewport, 1 when its bottom does.
      document.querySelectorAll<HTMLElement>("[data-progress]").forEach((element) => {
        if (!isOwnedByReact(element)) return;
        const rect = element.getBoundingClientRect();
        const anchor = window.innerHeight * 0.65;
        const progress = Math.min(1, Math.max(0, (anchor - rect.top) / Math.max(1, rect.height)));
        element.style.setProperty("--progress", progress.toFixed(4));
      });
      // A fast scroll or an anchor jump can skip past an element; anything above
      // the fold line is revealed so nothing is left hidden.
      const limit = window.innerHeight * 0.94;
      pending.forEach((element) => {
        if (!element.isConnected) pending.delete(element);
        else if (element.getBoundingClientRect().top < limit) reveal(element);
      });
      if (waiting.size) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const collect = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((element) => {
        if (!tracked.has(element)) waiting.add(element);
      });
      schedule();
    };

    // Picks up content that mounts later: route changes, filters, lazy chunks.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.hasAttribute("data-reveal") && !tracked.has(node)) waiting.add(node);
          collect(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    collect(document);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const update = () => {
      frame = 0;
      if (!last) return;
      const card = (last.target as Element | null)?.closest?.<HTMLElement>(SPOTLIGHT);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      card.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };
    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}

/* Counts a figure such as "500+" up from zero the first time it is seen. */
export function CountUp({ value }: { value: string }) {
  const match = /^(\D*)([\d,]+)(.*)$/.exec(value);
  const target = match?.[2] ? Number(match[2].replace(/,/g, "")) : NaN;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !match || !Number.isFinite(target)) return;
    if (!document.documentElement.classList.contains("motion")) return;
    setShown(`${match[1]}0${match[3]}`);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 4);
          setShown(`${match[1]}${Math.round(target * eased).toLocaleString("en-US")}${match[3]}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

/*
 * Splits a sentence into words that resolve one after another when the nearest
 * [data-reveal] ancestor is revealed. Screen readers still get the plain text.
 */
export function RevealText({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, index) => (
        <span key={index} className="word" style={{ "--w": Math.min(start + index, 70) } as React.CSSProperties}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
