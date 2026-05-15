"use client";

import { Button } from "@/components/ui/button";
import { Phone, ChevronLeft, Droplets } from "lucide-react";

interface StepDialysisEndProps {
  onBack: () => void;
}

export function StepDialysisEnd({ onBack }: StepDialysisEndProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Dialyse & Apherese
        </h1>
        <p className="text-muted-foreground">
          Vielen Dank für Ihr Interesse an einem Termin für Blutreinigungsverfahren.
        </p>
      </header>

      {/* Info Card */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-6 md:p-10 shadow-sm text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Droplets className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Persönliche Terminvereinbarung
        </h2>

        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Für Dialyse- und Apheresebehandlungen bieten wir Ihnen eine persönliche
          Terminvereinbarung unter unserer speziellen Rufnummer:
        </p>

        {/* Phone Button */}
        <a
          href="tel:+493025464045"
          className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xl md:text-2xl px-8 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
          aria-label="Anrufen: 030 2546 4045"
        >
          <Phone className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
          <span>030 2546 4045</span>
        </a>

        <p className="text-sm text-muted-foreground mt-6">
          Klicken Sie auf die Nummer, um uns direkt anzurufen.
        </p>
      </div>

      {/* Back Button */}
      <div className="flex justify-start pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="mr-2 w-5 h-5" aria-hidden="true" />
          Zurück
        </Button>
      </div>
    </div>
  );
}
