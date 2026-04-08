"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building2, Briefcase, Wallet, ChevronRight, ChevronLeft } from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepInsuranceProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

const insuranceOptions = [
  {
    value: "gesetzlich",
    label: "Gesetzlich versichert",
    description: "AOK, TK, Barmer, DAK, etc.",
    icon: Building2,
  },
  {
    value: "privat",
    label: "Privat versichert",
    description: "Private Krankenversicherung",
    icon: Briefcase,
  },
  {
    value: "selbstzahler",
    label: "Selbstzahler",
    description: "Ohne Versicherung / Privatrechnung",
    icon: Wallet,
  },
] as const;

export function StepInsurance({
  onNext,
  onBack,
  updateData,
  data,
}: StepInsuranceProps) {
  const [selection, setSelection] = useState<string | undefined>(
    data.insuranceType ?? undefined
  );

  const handleSelectionChange = (value: string) => {
    setSelection(value);
    updateData({
      insuranceType: value as "gesetzlich" | "privat" | "selbstzahler",
    });
  };

  const canProceed = selection !== undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Versicherungsstatus
        </h1>
        <p className="text-muted-foreground">
          Bitte wählen Sie Ihre Art der Krankenversicherung.
        </p>
      </header>

      {/* Question Card */}
      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <fieldset>
          <legend className="text-lg font-semibold text-foreground mb-6">
            Wie sind Sie versichert?
          </legend>

          <RadioGroup
            value={selection}
            onValueChange={handleSelectionChange}
            className="space-y-4"
            aria-required="true"
          >
            {insuranceOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selection === option.value;

              return (
                <div
                  key={option.value}
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    }
                  `}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`insurance-${option.value}`}
                    className="shrink-0"
                  />
                  <Label
                    htmlFor={`insurance-${option.value}`}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <Icon
                      className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-foreground block">
                        {option.label}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </fieldset>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="mr-2 w-5 h-5" aria-hidden="true" />
          Zurück
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="w-full sm:w-auto min-w-[200px]"
        >
          Weiter
          <ChevronRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
