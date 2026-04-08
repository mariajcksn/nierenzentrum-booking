"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Activity,
  HeartPulse,
  Droplets,
  Syringe,
  TestTube,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepServiceProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

interface ServiceOption {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  appointmentTypes: string[];
}

const allServices: ServiceOption[] = [
  {
    value: "nierencheck",
    label: "Nierencheck",
    description: "Umfassende Untersuchung der Nierenfunktion",
    icon: Activity,
    appointmentTypes: ["erstgespraech", "kontrolltermin"],
  },
  {
    value: "dialyseberatung",
    label: "Dialyseberatung",
    description: "Beratung zu Dialyseverfahren und -optionen",
    icon: Droplets,
    appointmentTypes: ["erstgespraech", "kontrolltermin"],
  },
  {
    value: "transplantationsvorbereitung",
    label: "Transplantationsvorbereitung",
    description: "Vorbereitung und Begleitung für Nierentransplantation",
    icon: HeartPulse,
    appointmentTypes: ["erstgespraech", "kontrolltermin"],
  },
  {
    value: "bluthochdruck",
    label: "Bluthochdruck-Sprechstunde",
    description: "Diagnostik und Therapie von Bluthochdruck",
    icon: Stethoscope,
    appointmentTypes: ["erstgespraech", "kontrolltermin", "akuttermin"],
  },
  {
    value: "laboruntersuchung",
    label: "Laboruntersuchung",
    description: "Blut- und Urinanalysen",
    icon: TestTube,
    appointmentTypes: ["erstgespraech", "kontrolltermin", "akuttermin"],
  },
  {
    value: "lipidapherese",
    label: "Lipidapherese",
    description: "Blutwäsche zur Entfernung von Blutfetten",
    icon: Syringe,
    appointmentTypes: ["erstgespraech", "kontrolltermin"],
  },
];

export function StepService({
  onNext,
  onBack,
  updateData,
  data,
}: StepServiceProps) {
  const [selection, setSelection] = useState<string>(data.service || "");

  // Filter services based on appointment type
  const availableServices = useMemo(() => {
    if (!data.appointmentType) return allServices;
    return allServices.filter((service) =>
      service.appointmentTypes.includes(data.appointmentType)
    );
  }, [data.appointmentType]);

  const handleSelectionChange = (value: string) => {
    setSelection(value);
    updateData({ service: value });
  };

  const canProceed = selection !== "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Leistung auswählen
        </h1>
        <p className="text-muted-foreground">
          Bitte wählen Sie die gewünschte medizinische Leistung.
        </p>
      </header>

      {/* Selection Card */}
      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <fieldset>
          <legend className="text-lg font-semibold text-foreground mb-2">
            Welche Leistung benötigen Sie?
          </legend>
          {data.appointmentType && (
            <p className="text-sm text-muted-foreground mb-6">
              Basierend auf Ihrer Terminart werden passende Leistungen angezeigt.
            </p>
          )}

          <RadioGroup
            value={selection}
            onValueChange={handleSelectionChange}
            className="grid gap-3 md:grid-cols-2"
            aria-required="true"
          >
            {availableServices.map((service) => {
              const Icon = service.icon;
              const isSelected = selection === service.value;

              return (
                <div
                  key={service.value}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    }
                  `}
                >
                  <RadioGroupItem
                    value={service.value}
                    id={`service-${service.value}`}
                    className="shrink-0 mt-0.5"
                  />
                  <Label
                    htmlFor={`service-${service.value}`}
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                        aria-hidden="true"
                      />
                      <span className="font-medium text-foreground">
                        {service.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
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
