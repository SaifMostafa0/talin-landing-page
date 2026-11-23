import { useRouterState } from "@tanstack/react-router";
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


const SPOTLIGHT = ".glass-card, .why-grid, .person-tile, .profile-card, .pillar-card, .principle-card, .brings-card, .contact-detail";

// React marks a DOM node once it has hydrated (or rendered) it. Touching a
// server-rendered node before that triggers a hydration mismatch, so reveal
// targets wait until React owns them.
const isOwnedByReact = (element: Element) => Object.keys(element).some((key) => key.startsWith("__reactFiber$"));

export function MotionController() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  /*
   * Scroll reveals, built so content is never hidden while it is off-screen.
   *
   * Screenshot tools (DevTools "capture full size", full-page extensions)
   * render the parts of the page below the window without scrolling to them,
   * so anything still waiting to fade in would come out blank. Instead:
   * 1. As soon as React owns a block, it is shown (`is-revealed`). Blocks below
   *    the fold fade in off-screen, where nobody sees it.
   * 2. Once the visitor has scrolled, a block that comes within a short band
   *    below the window is hidden again ("armed") without a transition.
   * 3. When it enters the window it fades and rises in, once.
   * A capture therefore sees at most one armed block just under the window,
   * and none at all before the first scroll. Fast or programmatic jumps skip
   * the band, so those blocks simply stay visible.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    root.classList.add("motion-ready");

    const started = performance.now();
    const tracked = new WeakSet<Element>();
    const waiting = new Set<HTMLElement>();
    const eligible = new Set<HTMLElement>(); // shown, may still be armed later
    const armed = new Set<HTMLElement>(); // hidden, waiting to enter the window
    let scrolled = false;

    const show = (element: HTMLElement) => element.classList.add("is-revealed");

    const arm = (element: HTMLElement) => {
      eligible.delete(element);
      // Hide instantly: the block and its parts skip their fade-out.
      element.classList.add("is-arming");
      element.classList.remove("is-revealed");
      void element.offsetWidth;
      element.classList.remove("is-arming");
      armed.add(element);
    };

    const track = (element: HTMLElement) => {
      tracked.add(element);
      // Stagger within the sibling group.
      const siblings = element.parentElement ? [...element.parentElement.children].filter((child) => child.hasAttribute("data-reveal")) : [element];
      element.style.setProperty("--reveal-order", String(Math.max(0, siblings.indexOf(element)) % 6));
      if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
        show(element); // in view: plays its entrance
        return;
      }
      // Below the fold: shown straight away with no fade. (Chrome pauses
      // animations off-screen, so a fade here would leave captures half-drawn.)
      element.classList.add("is-arming");
      show(element);
      void element.offsetWidth;
      element.classList.remove("is-arming");
      eligible.add(element);
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
      const height = window.innerHeight;
      const enter = height * 0.94;
      armed.forEach((element) => {
        if (!element.isConnected) armed.delete(element);
        else if (element.getBoundingClientRect().top < enter) {
          armed.delete(element);
          show(element);
        }
      });
      if (scrolled) {
        eligible.forEach((element) => {
          if (!element.isConnected) return void eligible.delete(element);
          const top = element.getBoundingClientRect().top;
          if (top < enter) eligible.delete(element); // skipped past: stays shown
          else if (top < height * 1.3) arm(element);
        });
      }
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

    // Page-sized jumps (capture tools stepping through the page, printing):
    // show everything at once and stop arming.
    let lastInput = 0;
    let lastY = window.scrollY;
    const markInput = () => {
      lastInput = performance.now();
    };
    let capturing = false;
    const showEverything = () => {
      if (capturing) return;
      capturing = true;
      root.classList.add("motion-instant");
      root.classList.remove("motion");
      armed.forEach(show);
      armed.clear();
      eligible.clear();
      waiting.forEach(show);
      waiting.clear();
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((image) => (image.loading = "eager"));
      window.setTimeout(() => root.classList.remove("motion-instant"), 600);
    };
    // Only downward jumps count: going back to the top after a page change is
    // normal, and capture tools always step down the page.
    const onScroll = () => {
      const y = window.scrollY;
      const jump = y - lastY;
      lastY = y;
      if (jump > window.innerHeight * 0.75 && performance.now() - lastInput > 1500) return showEverything();
      if (jump !== 0) scrolled = true;
      schedule();
    };
    // Capture mode lasts for one page: the next page gets its entrances back.
    const onPageChange = () => {
      lastY = window.scrollY;
      scrolled = false;
      if (!capturing) return;
      capturing = false;
      root.classList.add("motion");
    };
    window.addEventListener("talin:page-change", onPageChange);
    const inputEvents = ["wheel", "keydown", "touchstart", "pointerdown"] as const;
    inputEvents.forEach((type) => window.addEventListener(type, markInput, { passive: true, capture: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("beforeprint", showEverything);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      inputEvents.forEach((type) => window.removeEventListener(type, markInput, { capture: true }));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("beforeprint", showEverything);
      window.removeEventListener("talin:page-change", onPageChange);
      mutations.disconnect();
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("talin:page-change"));
  }, [pathname]);

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
