// components/SmoothScroll.jsx
"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis(
        {
            duration: 2.4,
            smoothWheel: true,
            smoothTouch: true,
            touch: true,
            touchMultiplier: 1,
        }
    );
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
