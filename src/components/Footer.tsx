"use client";

import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground/95 text-white mt-12" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              Adresse
            </h3>
            <address className="not-italic text-gray-300 space-y-1">
              <p className="font-medium text-white">Nierenzentrum Berlin</p>
              <p>Dr. med. Thomas Dietz</p>
              <p>Facharzt für Innere Medizin und Nephrologie</p>
              <p className="pt-2">Landhaus Str. 22</p>
              <p>10717 Berlin</p>
            </address>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
              Kontakt
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="tel:+4930261 9825"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Tel. 030 / 261 98 25
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Fax 030 / 261 99 21
              </li>
              <li>
                <a
                  href="mailto:ambulanz@nierenzentrum-in-berlin.de"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  ambulanz@nierenzentrum-in-berlin.de
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
              Öffnungszeiten
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Mo - Fr:</span>
                <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sa:</span>
                <span>Nach Vereinbarung</span>
              </li>
            </ul>
            <a
              href="https://nierenzentrum-in-berlin.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Zur Hauptseite
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nierenzentrum Berlin. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a
              href="https://nierenzentrum-in-berlin.de/impressum"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Impressum & Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
