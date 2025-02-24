/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler?: (data?: any) => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (!handler) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
};
