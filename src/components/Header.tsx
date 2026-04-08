"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="w-full" role="banner">
      {/* Top bar with contact info */}
      <div className="bg-foreground/95 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
          <a
            href="tel:+493026198 25"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            aria-label="Anrufen: 030 261 98 25"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>030 / 261 98 25</span>
          </a>
          <a
            href="mailto:ambulanz@nierenzentrum-in-berlin.de"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            aria-label="E-Mail senden"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">ambulanz@nierenzentrum-in-berlin.de</span>
            <span className="sm:hidden">E-Mail</span>
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Berlin-Wilmersdorf</span>
          </span>
        </div>
      </div>

      {/* Main header with logo */}
      <div className="bg-white border-b shadow-sm py-4 px-4 md:py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="https://nierenzentrum-in-berlin.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
            aria-label="Nierenzentrum Berlin - Zur Hauptseite"
          >
            {/* Kidney Icon / Logo */}
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                aria-hidden="true"
              >
                {/* Stylized kidney shape */}
                <defs>
                  <linearGradient id="kidneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
                <path
                  d="M70,20 C85,25 90,45 85,65 C80,85 60,90 50,85 C40,80 35,70 40,55 C45,40 35,35 30,40 C25,45 20,55 25,70 C30,85 20,95 10,85 C0,75 5,50 15,35 C25,20 45,15 70,20 Z"
                  fill="url(#kidneyGradient)"
                  className="group-hover:scale-105 transition-transform origin-center"
                />
                {/* Refresh arrow overlay */}
                <path
                  d="M55,45 L65,35 L65,42 C72,44 77,50 77,58 C77,68 69,76 59,76 C54,76 50,74 47,71 L52,66 C54,68 56,69 59,69 C65,69 70,64 70,58 C70,53 67,49 62,48 L62,55 Z"
                  fill="#ec9f02"
                  className="opacity-90"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                Nierenzentrum
              </h1>
              <p className="text-primary text-sm md:text-base font-medium">
                Berlin
              </p>
            </div>
          </a>

          {/* Title */}
          <div className="text-center md:text-right">
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              Online-Terminbuchung
            </h2>
            <p className="text-sm text-muted-foreground">
              Dr. med. Thomas Dietz - Facharzt für Nephrologie
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
