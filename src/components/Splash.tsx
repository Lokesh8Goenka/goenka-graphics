"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Splash() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    // Only show the splash once per browser session.
    if (sessionStorage.getItem("splashShown")) {
      setShow(false);
      return;
    }
    const fadeT = setTimeout(() => setFade(true), 1100);
    const doneT = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("splashShown", "1");
    }, 1900);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(doneT);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a20] transition-all duration-700 ease-in-out ${
        fade ? "scale-105 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo.png"
          alt=""
          onError={() => setImgOk(false)}
          className="splash-logo w-64 max-w-[72vw]"
        />
      ) : (
        <span className="splash-logo text-gradient font-display text-7xl font-semibold tracking-wide">
          {site.monogram}
        </span>
      )}
    </div>
  );
}
