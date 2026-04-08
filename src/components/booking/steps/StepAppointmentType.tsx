"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ClipboardList,
  RefreshCw,
  Droplets,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepAppointmentTypeProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

// Appointment types for NEW patients
const newPatientAppointmentTypes = [
  {
    value: "erstgespraech",
    label: "Erstgespräch",
    description: "Erste Vorstellung und Beratung für neue Patienten",
    icon: ClipboardList,
  },
];

// Appointment types for EXISTING patients
const existingPatientAppointmentTypes = [
  {
    value: "kontrolltermin",
    label: "Kontrolltermin",
    description: "Regelmäßige Nachuntersuchung und Verlaufskontrolle",
    icon: RefreshCw,
  },
  {
    value: "dialysetermin",
    label: "Dialysetermin",
    description: "Termin für Dialysebehandlung",
    icon: Droplets,
  },
];

export function StepAppointmentType({
  onNext,
  onBack,
  updateData,
  data,
}: StepAppointmentTypeProps) {
  const [selection, setSelection] = useState<string>(data.appointmentType || "");

  // Filter appointment types based on patient status
  const availableAppointmentTypes = useMemo(() => {
    if (data.isExistingPatient === true) {
      return existingPatientAppointmentTypes;
    }
    return newPatientAppointmentTypes;
  }, [data.isExistingPatient]);

  const handleSelectionChange = (value: string) => {
    setSelection(value);
    updateData({ appointmentType: value });
  };

  const canProceed = selection !== "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Terminart auswählen
        </h1>
        <p className="text-muted-foreground">
          Bitte wählen Sie die Art des gewünschten Termins.
        </p>
      </header>

      {/* Selection Card */}
      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <fieldset>
          <legend className="text-lg font-semibold text-foreground mb-6">
            Welche Art von Termin benötigen Sie?
          </legend>

          <RadioGroup
            value={selection}
            onValueChange={handleSelectionChange}
            className="grid gap-4"
            aria-required="true"
          >
            {availableAppointmentTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selection === type.value;

              return (
                <div
                  key={type.value}
                  className={`
                    flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem
                      value={type.value}
                      id={`appointment-${type.value}`}
                      className="shrink-0 mt-1"
                    />
                    <Label
                      htmlFor={`appointment-${type.value}`}
                      className="cursor-pointer flex-1"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon
                          className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-foreground">
                          {type.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </Label>
                  </div>
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
