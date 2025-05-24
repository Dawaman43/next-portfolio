"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const resumeData = {
  name: "Dawit Worku",
  education: {
    institution: "Adama Science and Technology University",
    degree: "BSc in Software Engineering",
    enrollment: "2022",
    expectedGraduation: "2028",
  },
  languages: ["Amharic (Fluent)", "English (Fluent)"],
};

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate section title
    gsap.fromTo(
      sectionRef.current?.querySelector("h2"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate resume cards
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const tl = gsap.timeline({ paused: true });
        tl.to(card.querySelector(".fill-line"), { width: "100%", duration: 0.6, ease: "power3.out" })
          .to(card.querySelector("h3"), { color: "#00ff6a", duration: 0.4 }, "-=0.3")
          .to(card.querySelector(".glow"), { opacity: 1, duration: 0.4 }, "-=0.3");

        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.3,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover animations
        card.addEventListener("mouseenter", () => {
          cardRefs.current.forEach((p, i) => {
            if (p && i !== index) {
              gsap.to(p.querySelector("h3"), { color: "#666666", duration: 0.4 });
              gsap.to(p.querySelector(".fill-line"), { width: "0%", duration: 0.4 });
              gsap.to(p.querySelector(".glow"), { opacity: 0, duration: 0.4 });
              gsap.to(p, { opacity: 0.5, duration: 0.4 });
            } else if (p) {
              gsap.to(p, { opacity: 1, duration: 0.4 });
              tl.play();
            }
          });
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cardRefs.current.forEach((card) => {
        if (card) {
          const listeners = card.getEventListeners?.("mouseenter") || [];
          listeners.forEach((listener: any) => card.removeEventListener("mouseenter", listener));
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full  text-white relative overflow-hidden"
     id="resume">
      <div className="absolute inset-0 ">
        {Array.from({ length: 70 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 1.5}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-300 mb-16 text-center tracking-wide flex items-center justify-center gap-2">
          <img
            src="https://media.tenor.com/0oF6qL7z3s4AAAAd/spinning-star.gif"
            alt="Rotating Star"
            className="w-8 h-8"
          />
          RESUME
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="relative bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-400/20 rounded-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-green-400">01</span>
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-300 transition-colors">
                  Personal Information
                </h3>
                <div className="glow absolute inset-0 -z-10 opacity-0 blur-2xl bg-green-400/20 rounded-lg" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="font-medium text-green-400">Name:</span> {resumeData.name}
              </p>
            </div>
            <div className="absolute bottom-2 left-2 right-2 w-0 h-0.5 bg-green-400 fill-line" />
          </div>

          {/* Education */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="relative bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-400/20 rounded-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-green-400">02</span>
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-300 transition-colors">
                  Education
                </h3>
                <div className="glow absolute inset-0 -z-10 opacity-0 blur-2xl bg-green-400/20 rounded-lg" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="font-medium text-green-400">Institution:</span>{" "}
                {resumeData.education.institution}
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="font-medium text-green-400">Degree:</span>{" "}
                {resumeData.education.degree}
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="font-medium text-green-400">Duration:</span>{" "}
                {resumeData.education.enrollment} - {resumeData.education.expectedGraduation}
              </p>
            </div>
            <div className="absolute bottom-2 left-2 right-2 w-0 h-0.5 bg-green-400 fill-line" />
          </div>

          {/* Languages */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="relative bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-400/20 rounded-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-green-400">03</span>
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-300 transition-colors">
                  Languages
                </h3>
                <div className="glow absolute inset-0 -z-10 opacity-0 blur-2xl bg-green-400/20 rounded-lg" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {resumeData.languages.map((language, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-400/10 text-green-400 text-xs sm:text-sm font-medium px-3 py-1 rounded-full border border-green-400/30"
                >
                  {language}
                </span>
              ))}
            </div>
            <div className="absolute bottom-2 left-2 right-2 w-0 h-0.5 bg-green-400 fill-line" />
          </div>
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
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        ::-webkit-scrollbar-thumb {
          background: #00ff6a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00cc55;
        }
      `}</style>
    </section>
  );
}
