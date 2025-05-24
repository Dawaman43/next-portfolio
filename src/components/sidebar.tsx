'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Facebook, History, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

interface SidebarProps {
  className?: string;
  onClose: () => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ className, onClose }, ref) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => sidebarRef.current as HTMLDivElement);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sidebar-item', {
        opacity: 0,
        x: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(section, true);
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      onClose();
    }
  };

  return (
    <div ref={sidebarRef} className={`sidebar ${className}`}>
      {/* Close Icon */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors"
        aria-label="Close sidebar"
      >
        <X size={28} />
      </button>

      <div className="flex flex-col h-full justify-between mt-10 p-10">
        <div className="flex flex-row justify-between gap-10">
          {/* Social Links */}
          <div>
            <h3 className="text-sm text-gray-400 mb-4">SOCIAL</h3>
            <ul className="space-y-4 text-white">
              <li className="sidebar-item">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <Github />
                  Github
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <Linkedin />
                  Linkedin
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <Facebook />
                  Facebook
                </a>
              </li>
              <li className="sidebar-item">
                <Link
                  href="/old-version"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <History />
                  Old Version
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Links */}
          <ul className="space-y-4 text-white">
            <li className="sidebar-item flex items-center gap-2 cursor-pointer">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              <button
                onClick={() => scrollToSection('about')}
                className="focus:outline-none hover:text-green-400 transition-colors"
              >
                About Me
              </button>
            </li>
            <li className="sidebar-item flex items-center gap-2 cursor-pointer">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <button
                onClick={() => scrollToSection('skills')}
                className="focus:outline-none hover:text-green-400 transition-colors"
              >
                Skills
              </button>
            </li>
            <li className="sidebar-item flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
              <Link
                href="/projects"
                className="hover:text-green-400 transition-colors"
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div>
          <h3 className="text-sm text-gray-400 mb-2">GET IN TOUCH</h3>
          <p className="text-white text-sm select-all cursor-text">Dawitworkujima@gmail.com</p>
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;