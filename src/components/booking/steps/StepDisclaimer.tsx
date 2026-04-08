"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, Lock, ChevronRight } from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepDisclaimerProps {
  onNext: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

export function StepDisclaimer({ onNext, updateData, data }: StepDisclaimerProps) {
  const [isChecked, setIsChecked] = useState(data.disclaimerAccepted);

  const handleAccept = () => {
    if (isChecked) {
      updateData({ disclaimerAccepted: true });
      onNext();
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    updateData({ disclaimerAccepted: checked });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Online-Terminbuchung
        </h1>
        <p className="text-muted-foreground">
          Willkommen beim Nierenzentrum Berlin. Bitte lesen Sie die folgenden
          Datenschutzhinweise sorgfältig durch.
        </p>
      </header>

      {/* Disclaimer Card */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-full shrink-0">
            <Shield className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Datenschutzhinweis
            </h2>
            <p className="text-muted-foreground text-sm">
              Ihre Privatsphäre ist uns wichtig
            </p>
          </div>
        </div>

        <Alert className="bg-secondary/50 border-primary/30">
          <Lock className="h-5 w-5 text-primary" aria-hidden="true" />
          <AlertDescription className="text-base leading-relaxed mt-1">
            <strong className="block mb-2">Wichtiger Hinweis:</strong>
            Die Daten werden in hochverschlüsselter Form ausschließlich für
            diesen Termin übertragen. Sie werden nicht gesammelt oder an Dritte
            weitergegeben.
          </AlertDescription>
        </Alert>

        {/* Additional information */}
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" aria-hidden="true" />
            <p>
              Alle Daten werden nach EU-DSGVO-Standards verarbeitet und
              gespeichert.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" aria-hidden="true" />
            <p>
              Die Übertragung erfolgt über eine SSL-verschlüsselte Verbindung.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" aria-hidden="true" />
            <p>
              Ihre Daten werden ausschließlich zur Terminvereinbarung verwendet.
            </p>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
              aria-describedby="consent-description"
            />
            <Label
              htmlFor="consent"
              id="consent-description"
              className="text-sm leading-relaxed cursor-pointer text-foreground"
            >
              Ich habe die Hinweise zum Datenschutz bezüglich dieser Terminbuchung
              zur Kenntnis genommen und erkläre mich mit der ausschließlichen
              Verwendung meiner Daten für diesen Zweck einverstanden.
            </Label>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleAccept}
          disabled={!isChecked}
          size="lg"
          className="w-full md:w-auto min-w-[200px] h-12 text-base font-semibold"
        >
          Weiter zur Terminbuchung
          <ChevronRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
