'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin, SplitText } from 'gsap/all';
import {  Oswald } from 'next/font/google';
import './Welcome.css';

const oswald = Oswald({
  weight: "700",
  subsets: ['latin']
})

gsap.registerPlugin(TextPlugin, SplitText);

export default function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Split the text into individual characters for animation
    const splitText = new SplitText(textRef.current, { type: 'chars' });
    const chars = splitText.chars;

    const tl = gsap.timeline({
      onComplete: () => setIsHidden(true),
    });

    tl.set(chars, { visibility: 'visible' });

    // Container entrance: fade in, scale, and background color shift
    tl.from(containerRef.current, {
      opacity: 0,
      scale: 0.7,
      backgroundColor: '#1e3a8a',
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });

    // Letter-by-letter reveal with rotation and bounce
    tl.from(chars, {
      opacity: 0,
      y: 50,
      rotationX: 90,
      duration: 0.8,
      stagger: 0.1,
      ease: 'bounce.out',
    }, '-=0.7');

    // Subtext entrance: slide up with bounce
    tl.from(subTextRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'bounce.out',
    }, '-=0.5');

   

    // Exit animation: dissolve effect with characters sliding out
    tl.to(chars, {
      opacity: 0,
      x: () => gsap.utils.random(-200, 200), // Random horizontal slide
      y: () => gsap.utils.random(-100, 100), // Random vertical slide
      scale: 0.5,
      duration: 1,
      stagger: 0.05,
      ease: 'power3.out',
    }, '+=1.5');

    // Subtext exit: fade and slide up
    tl.to(subTextRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.8');

    // Container exit: fade out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, '-=0.5');

  }, []);

  if (isHidden) return null;

  return (
    <div className={`${oswald.className} welcome-container`} ref={containerRef}>
      <h1 className="welcome-text" ref={textRef}>DAWIT</h1>
    </div>
  );
}