import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  onClose: () => void,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref, onClose]);
}
