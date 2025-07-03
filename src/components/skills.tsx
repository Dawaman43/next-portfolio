"use client";
import Image from "next/image";
import { Roboto, Oswald } from "next/font/google";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const oswald = Oswald({ weight: "700", subsets: ["latin"] });

interface Skill {
  src: string;
  label: string;
  bg?: string;
}

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { src: "/assets/icons/react.png", label: "React" },
      { src: "/assets/icons/next-js.png", label: "Next.js", bg: "bg-white rounded-full" },
      { src: "/assets/icons/tailwind.png", label: "Tailwind CSS" },
      { src: "/assets/icons/gsap.png", label: "GSAP" },
      { src: "/assets/icons/expo.svg", label: "Expo" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { src: "/assets/icons/django.svg", label: "Django" },
      { src: "/assets/icons/php.svg", label: "PHP" },
      { src: "/assets/icons/expressjs.svg", label: "Express" },
      { src: "/assets/icons/nodejs.svg", label: "Node js" },
    ],
  },
  {
    title: "Database",
    skills: [
      { src: "/assets/icons/mysql.svg", label: "MySQL" },
      { src: "/assets/icons/mongodb.svg", label: "MongoDB" },
      { src: "/assets/icons/postgresql.svg", label: "POstgres" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { src: "/assets/icons/js.png", label: "JavaScript" },
      { src: "/assets/icons/python.png", label: "Python" },
      { src: "/assets/icons/java.png", label: "Java" },
    ],
  },
];

export default function Skills() {
  const categoryRefs = useRef<HTMLDivElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const skillRefs = useRef<HTMLDivElement[][]>([]);

  useEffect(() => {
    categoryRefs.current.forEach((section, index) => {
      const title = titleRefs.current[index];
      const skills = skillRefs.current[index] || [];

      if (!section || !title || skills.length === 0) return;

      const elements = [title, ...skills];

      gsap.fromTo(
        elements,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen w-full flex items-center justify-center snap-start py-16"
      aria-labelledby="skills-heading"
    >
      <div className="flex flex-col gap-16 px-4 w-11/12 max-w-7xl mx-auto">
        <h2 id="skills-heading" className="sr-only">
          Technical Skills
        </h2>
        {skillCategories.map(({ title, skills }, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) categoryRefs.current[idx] = el;
            }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 w-full"
            role="region"
            aria-label={`${title} skills`}
          >
            <h3
              ref={(el) => {
                if (el) titleRefs.current[idx] = el;
              }}
              className={`${oswald.className} text-3xl sm:text-4xl text-gray-300 uppercase whitespace-nowrap tracking-wide`}
            >
              {title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 flex-1">
              {skills.map(({ src, label, bg = "" }, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) {
                      if (!skillRefs.current[idx]) skillRefs.current[idx] = [];
                      skillRefs.current[idx][i] = el;
                    }
                  }}
                  className="flex items-center gap-4 group transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                >
                  <Image
                    src={src}
                    alt={`${label} logo`}
                    width={40}
                    height={40}
                    className={`w-10 h-10 object-contain ${bg} transition-transform duration-300 group-hover:scale-110`}
                    loading="lazy"
                  />
                  <span
                    className={`${roboto.className} text-white text-base sm:text-lg font-medium group-hover:text-gray-200`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}