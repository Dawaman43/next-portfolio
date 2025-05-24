"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "ASTU Students Portal",
    tech: ["Next.js", "Tailwind CSS"],
    link: "https://astu-portal.vercel.app",
    preview: "/assets/images/astu-portal.png",
  },
  {
    id: "02",
    title: "Hoodie Store",
    tech: ["Next.js", "Tailwind CSS"],
    link: "https://hoddie.vercel.app",
    preview: "/assets/images/hoddie-store.png",
  },
  {
    id: "03",
    title: "Movie DB",
    tech: ["React", "Tailwind CSS", "Movie API"],
    link: "https://dave-movie-db.vercel.app/",
    preview: "/assets/images/movie-db.png",
  },
  {
    id: "04",
    title: "Fitness Tracker",
    tech: ["Next.js", "Tailwind CSS"],
    link: "https://fitness-alpha-liart.vercel.app/",
    preview: "/assets/images/fitness.png",
  },
];

export default function Projects() {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRefs = useRef<(GSAPTimeline | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize GSAP timelines for each project
    projectRefs.current.forEach((project, index) => {
      if (project) {
        const tl = gsap.timeline({ paused: true });
        tl.to(project.querySelector(".fill-line"), { width: "100%", duration: 0.6, ease: "power3.out" })
          .to(project.querySelector("h3"), { color: "#00ff6a", duration: 0.4 }, "-=0.3")
          .to(project.querySelector(".glow"), { opacity: 1, duration: 0.4 }, "-=0.3");

        timelineRefs.current[index] = tl;

        // ScrollTrigger for project entrance animation
        gsap.fromTo(
          project,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: project,
              start: "top 90%", // Adjusted for mobile
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Handle interaction (click for mobile, hover for desktop)
    const handleInteraction = (index: number) => () => {
      // Reset previous active timeline if it exists and not the current index
      if (activeIndex !== null && activeIndex !== index) {
        timelineRefs.current[activeIndex]?.reverse();
        projectRefs.current[activeIndex]?.classList.remove("active");
      }

      // Dim all non-active projects and highlight the active one
      projectRefs.current.forEach((p, i) => {
        if (p) {
          if (i !== index) {
            gsap.to(p.querySelector("h3"), { color: "#666666", duration: 0.4 });
            gsap.to(p.querySelector(".fill-line"), { width: "0%", duration: 0.4 });
            gsap.to(p.querySelector(".glow"), { opacity: 0, duration: 0.4 });
            gsap.to(p, { opacity: 0.5, duration: 0.4 });
            p.classList.remove("active");
          } else {
            gsap.to(p, { opacity: 1, duration: 0.4 });
            p.classList.add("active");
          }
        }
      });

      // Set new active index and play its timeline
      setActiveIndex(index);
      timelineRefs.current[index]?.play();
    };

    // Add event listeners based on device capabilities
    const listeners: Array<() => void> = [];
    const isHoverSupported = window.matchMedia("(hover: hover)").matches;

    projectRefs.current.forEach((project, index) => {
      if (project) {
        const interactionListener = handleInteraction(index);
        const eventType = isHoverSupported ? "mouseenter" : "click";
        project.addEventListener(eventType, interactionListener);
        listeners.push(() => project.removeEventListener(eventType, interactionListener));
      }
    });

    // Cleanup event listeners and ScrollTriggers
    return () => {
      listeners.forEach((remove) => remove());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      timelineRefs.current.forEach((tl) => tl?.kill());
    };
  }, [activeIndex]);

  return (
    <section
      className="min-h-screen w-full text-white relative overflow-hidden"
      id="projects"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]/80">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 1}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 mb-8 sm:mb-12 text-center tracking-wide flex items-center justify-center gap-2">
          <img
            src="https://media.tenor.com/0oF6qL7z3s4AAAAd/spinning-star.gif"
            alt="Rotating Star"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          SELECTED PROJECTS
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/3 space-y-6">
            {projects.map((project, index) => (
              <div key={project.id}>
                <div
                  ref={(el) => (projectRefs.current[index] = el)}
                  className="group relative bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-400/20 rounded-lg p-4 sm:p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">{project.id}</span>
                    <div className="relative">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="glow absolute inset-0 -z-10 opacity-0 blur-2xl bg-green-400/20 rounded-lg" />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block bg-green-400/10 text-green-400 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full border border-green-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 w-0 h-0.5 bg-green-400 fill-line" />
                </div>
                {/* Mobile: Show preview below the active project */}
                {activeIndex === index && !window.matchMedia("(hover: hover)").matches && (
                  <div className="mt-4 w-full">
                    <div className="relative rounded-lg overflow-hidden border border-green-400/30 shadow-xl">
                      <img
                        src={projects[activeIndex].preview}
                        alt={`${projects[activeIndex].title} preview`}
                        className="w-full h-auto max-h-[50vh] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <a
                        href={projects[activeIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-green-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-green-300 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Visit Project
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Show preview on the right */}
          {activeIndex !== null && window.matchMedia("(hover: hover)").matches && (
            <div className="hidden lg:block w-full lg:w-2/3 relative">
              <div className="w-full transform">
                <div className="relative rounded-lg overflow-hidden border border-green-400/30 shadow-xl">
                  <img
                    src={projects[activeIndex].preview}
                    alt={`${projects[activeIndex].title} preview`}
                    className="w-full h-auto max-h-[60vh] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <a
                    href={projects[activeIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-green-400 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-green-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Visit Project
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          from {
            opacity: 0.2;
          }
          to {
            opacity: 0.6;
          }
        }
        .fill-line {
          transition: width 0.6s ease;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        ::-webkit-scrollbar-thumb {
          background: #00ff6a;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00cc55;
        }
      `}</style>
    </section>
  );
}
