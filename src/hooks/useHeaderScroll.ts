import { useEffect, useRef, useState } from "react";

export function useHeaderScroll() {
  const [showBar, setShowBar] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY < 10) {
        setShowBar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowBar(false);
      } else {
        setShowBar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { showBar };
}
