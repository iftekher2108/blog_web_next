"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// const slides = [
//   "/slider/slider-1767777045225-sfxz4mfs9bt.png",
//   "/slider/slider-1767850198829-u7ksck9y4wm.jpg",
//   "/slider/slider-1767850320827-adveq25dyxw.png",
// ];

export default function IndexSlider({ className = "w-full", slides }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    start();
    return () => stop();
  }, [index]);

  function start() {
    stop();
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
  }

  function stop() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  return (
    <div
      className={`carousel carousel-center rounded-box relative ${className}`}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`carousel-item w-full transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden">
            <Image src={src} alt={`slide-${i}`} fill style={{ objectFit: "cover" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute left-6 bottom-8 text-white">
              <h2 className="text-2xl sm:text-4xl font-bold">Featured Story #{i + 1}</h2>
              <p className="hidden sm:block opacity-90">A short description to entice readers.</p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          className="btn btn-circle border-primary btn-sm"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          aria-label="previous"
        >
          ❮
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          className="btn btn-circle border-primary btn-sm"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          aria-label="next"
        >
          ❯
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`btn btn-xs rounded-full border-primary ${i === index ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setIndex(i)}
            aria-label={`go-to-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
