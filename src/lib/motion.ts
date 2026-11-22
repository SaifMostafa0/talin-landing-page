import { useEffect, useRef } from "react";

// Runs before first paint: opts the page into reveal animations unless the
// visitor prefers reduced motion. Falls back to fully visible content if the
// app never starts.
export const MOTION_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motion");setTimeout(function(){if(!d.classList.contains("motion-ready"))d.classList.remove("motion")},3500)}catch(e){}})();`;

/* Hero parallax: layers drift gently against the pointer. */
export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const hero = ref.current;
    if (!hero || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--px", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
        hero.style.setProperty("--py", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
      });
    };
    const onLeave = () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

