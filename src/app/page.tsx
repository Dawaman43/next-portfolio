"use client";
import React, { useEffect, useRef, useState } from "react";
import { Oswald } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Resume from "@/components/resume";

gsap.registerPlugin(ScrollTrigger);

const oswald = Oswald({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar animation
  useEffect(() => {
    if (sidebarRef.current) {
      if (isSidebarOpen) {
        gsap.fromTo(
          sidebarRef.current,
          {
            clipPath: "circle(0% at 100% 0%)",
            x: "100%",
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            x: "0%",
            duration: 1,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(sidebarRef.current, {
          clipPath: "circle(0% at 100% 0%)",
          x: "100%",
          duration: 0.8,
          ease: "power3.in",
        });
      }
    }
  }, [isSidebarOpen]);

  // Hero section animations
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector("h1"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        heroRef.current.querySelector("p"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 0.6,
        }
      );
      gsap.fromTo(
        heroRef.current.querySelector("button"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.9,
        }
      );
    }
  }, []);

  // Custom cursor effect (disabled on mobile)
  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor && window.innerWidth > 768) {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 15,
          y: e.clientY - 15,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const hoverEffect = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("button, a")) {
          gsap.to(cursor, { scale: 1.5, backgroundColor: "#00ff6a", duration: 0.3 });
        } else {
          gsap.to(cursor, { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.3)", duration: 0.3 });
        }
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", hoverEffect);
      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseover", hoverEffect);
      };
    }
  }, []);

  // Custom scrollbar
  useEffect(() => {
    document.body.style.overflowY = "auto";
    document.body.style.scrollbarWidth = "thin";
    document.body.style.scrollbarColor = "#00ff6a #2a2a2a";
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="relative w-full text-white overflow-x-hidden bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
      {/* Custom Cursor (hidden on mobile) */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
      />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center snap-start bg-[url('/circuit-pattern.png')] bg-cover bg-center py-8"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto w-full text-center">
          <h1
            className={`${oswald.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] font-extrabold tracking-tight`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff6a] to-[#00cc55]">
              DEV
            </span>
            <span className="text-[#b8b8b8]">ELOPER</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-[#b8b8b8]">
            Hi! I'm{" "}
            <span className="text-[#ffffff] font-semibold bg-gradient-to-r from-[#00ff6a]/30 to-[#00cc55]/30 px-2 py-1 rounded">
              Dawit
            </span>
            . A passionate Website and Application Developer creating innovative digital solutions.
          </p>
          <button className="mt-6 sm:mt-8 bg-[#00ff6a] text-black px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-full shadow-lg hover:brightness-125 transition-transform hover:scale-105">
            <a
            href="mailto:dawitworkujima@gmail.com"
            className={`${oswald.className} text-4xl sm:text-4xl font-extrabold text-white `}
          >HIRE ME</a>
            
          </button>
        </div>

        {/* Stats Section */}
        <div className="md:absolute right-2 sm:right-4 md:right-8 top-1/3 md:flex md:flex-col md:space-y-10 flex flex-col sm:flex-row sm:justify-center md:justify-end space-y-6 sm:space-y-0 sm:space-x-8 text-[#00ff6a] text-lg sm:text-xl md:text-2xl font-bold z-10 mt-8 sm:mt-12 md:mt-0">
          <div className="group text-center sm:text-center md:text-right">
            1+<br />
            <span className="text-sm sm:text-base md:text-sm text-gray-300 font-normal group-hover:text-white transition">
              Years of Experience
            </span>
          </div>
          <div className="group text-center sm:text-center md:text-right">
            5+<br />
            <span className="text-sm sm:text-base md:text-sm text-gray-300 font-normal group-hover:text-white transition">
              Completed Projects
            </span>
          </div>
          <div className="group text-center sm:text-center md:text-right">
            2K+<br />
            <span className="text-sm sm:text-base md:text-sm text-gray-300 font-normal group-hover:text-white transition">
              Hours Worked
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* resume section */}
      <Resume />

      {/* Email Section */}
      <section className="relative w-full py-12 sm:py-16 bg-[radial-gradient(ellipse_at_top,_#1a1a1a_0%,_#000000_70%)]">
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
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-base sm:text-lg mb-4">Have a project in mind?</p>
          <a
            href="mailto:dawitworkujima@gmail.com"
            className={`${oswald.className} text-5xl sm:text-4xl font-extrabold text-gray-500 `}
          >
            dawitworkujima@gmail.com
          </a>
          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            Designed & built by Dawit Worku
          </p>
        </div>
      </section>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-4/5 md:w-[28%] bg-[#2a2a2a]/95 backdrop-blur-md z-30 translate-x-full shadow-2xl border-l border-[#00ff6a]/20"
      >
        <div className="flex flex-col md:flex-row justify-around h-full py-8 md:py-16">
          {/* Social Section */}
          <div className="flex flex-col items-start space-y-6 w-full md:w-auto px-4 md:px-0">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">Social</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="https://github.com/Dawaman43"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105 flex items-center"
              >
                <i className="fab fa-github mr-2"></i> Github
              </a>
              <a
                href="https://linkedin.com/in/dawit-worku-jima"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105 flex items-center"
              >
                <i className="fab fa-linkedin-in mr-2"></i> LinkedIn
              </a>
              <a
                href="https://t.me/daw9t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105 flex items-center"
              >
              <i className="fab fa-telegram-plane mr-2"></i>Telegram
              </a>
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col items-start space-y-6 w-full md:w-auto px-4 md:px-0 mt-8 md:mt-0">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">Menu</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="flex items-center text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105"
                onClick={toggleSidebar}
              >
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                Home
              </a>
              <a
                href="#about"
                className="flex items-center text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105"
                onClick={toggleSidebar}
              >
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                About
              </a>
              <a
                href="#skills"
                className="flex items-center text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105"
                onClick={toggleSidebar}
              >
                <span className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></span>
                Skills
              </a>
              <a
                href="#projects"
                className="flex items-center text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105"
                onClick={toggleSidebar}
              >
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                Projects
              </a>
              <a
                href="#resume"
                className="flex items-center text-lg text-[#b8b8b8] hover:text-white transition-transform hover:scale-105"
                onClick={toggleSidebar}
              >
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Icon */}
      <div
        className="fixed top-6 right-6 z-40 cursor-pointer group"
        onClick={toggleSidebar}
      >
        <div
          className={`w-8 h-1 bg-[#00ff6a] mb-2 transform transition-transform duration-300 group-hover:bg-white ${
            isSidebarOpen ? "rotate-45 translate-y-3" : ""
          }`}
        ></div>
        <div
          className={`w-8 h-1 bg-[#00ff6a] mb-2 transition-opacity duration-300 group-hover:bg-white ${
            isSidebarOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-8 h-1 bg-[#00ff6a] transform transition-transform duration-300 group-hover:bg-white ${
            isSidebarOpen ? "-rotate-45 -translate-y-3" : ""
          }`}
        ></div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #2a2a2a;
        }
        ::-webkit-scrollbar-thumb {
          background: #00ff6a;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00cc55;
        }
        @keyframes twinkle {
          from {
            opacity: 0.2;
          }
          to {
            opacity: 0.6;
          }
        }
      `}</style>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
    </main>
  );
}
