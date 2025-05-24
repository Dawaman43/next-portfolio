"use client";
import { useEffect, useRef } from "react";
import { Roboto } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current || !textRef.current) return;

    gsap.fromTo(
      [headingRef.current, textRef.current],
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      className={`${roboto.className} min-h-screen w-full flex items-center justify-center snap-start text-gray-400`}
    >
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row gap-6 p-6 w-11/12 max-w-6xl mx-auto items-start"
      >
        <div ref={headingRef} className="text-3xl md:text-4xl font-bold w-full md:w-1/2">
          Hi, I am Dawit.
        </div>
        <div
          ref={textRef}
          className="text-base md:text-[18px] leading-relaxed w-full md:w-1/2"
        >
          I am a passionate web and app developer focused on building responsive,
          user-friendly digital experiences. With a strong foundation in front-end and
          back-end technologies, I love turning ideas into functional, scalable products.
          Constantly learning and adapting to new tools and trends, I strive to create clean,
          efficient, and impactful code.
        </div>
      </div>
    </section>
  );
}