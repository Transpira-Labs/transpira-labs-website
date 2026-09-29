import { useEffect, useState } from "react";
import { CAL_URL } from "@/components/site-chrome";

/**
 * The nav's "Book a call", kept on screen once the (non-sticky) homepage nav
 * scrolls away. It sits where the nav button was, so it reads as the same button.
 */
export function FloatingCall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noreferrer"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed top-2.5 right-4 z-50 whitespace-nowrap rounded-md bg-forest px-3.5 py-2 text-sm font-medium text-white no-underline shadow-[0_6px_24px_rgba(0,0,0,0.45)] transition-[opacity,transform,background-color] duration-300 hover:bg-[#3a806d] sm:right-6 ${
        show ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      Book a call
    </a>
  );
}
