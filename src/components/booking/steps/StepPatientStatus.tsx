"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, UserCheck, ChevronRight, ChevronLeft, Info } from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepPatientStatusProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

export function StepPatientStatus({
  onNext,
  onBack,
  updateData,
  data,
}: StepPatientStatusProps) {
  const [showNewPatientDialog, setShowNewPatientDialog] = useState(false);
  const [selection, setSelection] = useState<string | undefined>(
    data.isExistingPatient === null
      ? undefined
      : data.isExistingPatient
      ? "ja"
      : "nein"
  );

  const handleSelectionChange = (value: string) => {
    setSelection(value);
    const isExisting = value === "ja";
    updateData({ isExistingPatient: isExisting });

    if (!isExisting) {
      setShowNewPatientDialog(true);
    }
  };

  const handleDialogConfirm = () => {
    setShowNewPatientDialog(false);
  };

  const canProceed = selection !== undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Patientenstatus
        </h1>
        <p className="text-muted-foreground">
          Bitte geben Sie an, ob Sie bereits Patient bei uns sind.
        </p>
      </header>

      {/* Question Card */}
      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <fieldset>
          <legend className="text-lg font-semibold text-foreground mb-6">
            Waren Sie schon einmal bei uns?
          </legend>

          <RadioGroup
            value={selection}
            onValueChange={handleSelectionChange}
            className="space-y-4"
            aria-required="true"
          >
            {/* Existing Patient Option */}
            <div
              className={`
                flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer
                ${selection === "ja"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }
              `}
            >
              <RadioGroupItem
                value="ja"
                id="patient-existing"
                className="shrink-0"
              />
              <Label
                htmlFor="patient-existing"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <UserCheck
                  className={`w-6 h-6 ${selection === "ja" ? "text-primary" : "text-muted-foreground"}`}
                  aria-hidden="true"
                />
                <div>
                  <span className="font-medium text-foreground block">Ja</span>
                  <span className="text-sm text-muted-foreground">
                    Ich war bereits Patient im Nierenzentrum Berlin
                  </span>
                </div>
              </Label>
            </div>

            {/* New Patient Option */}
            <div
              className={`
                flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer
                ${selection === "nein"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }
              `}
            >
              <RadioGroupItem
                value="nein"
                id="patient-new"
                className="shrink-0"
              />
              <Label
                htmlFor="patient-new"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <UserPlus
                  className={`w-6 h-6 ${selection === "nein" ? "text-primary" : "text-muted-foreground"}`}
                  aria-hidden="true"
                />
                <div>
                  <span className="font-medium text-foreground block">Nein</span>
                  <span className="text-sm text-muted-foreground">
                    Ich bin ein neuer Patient
                  </span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </fieldset>

        {/* Inline notice for new patients */}
        {selection === "nein" && (
          <Alert className="mt-6 bg-amber-50 border-amber-200">
            <Info className="h-5 w-5 text-amber-600" aria-hidden="true" />
            <AlertDescription className="text-amber-800">
              <strong>Hinweis für neue Patienten:</strong> Bitte halten Sie
              gegebenenfalls medizinische Unterlagen bereit, die Sie im weiteren
              Verlauf hochladen können.
            </AlertDescription>
          </Alert>
        )}
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

      {/* New Patient Dialog */}
      <Dialog open={showNewPatientDialog} onOpenChange={setShowNewPatientDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Info className="w-6 h-6 text-primary" aria-hidden="true" />
              Wichtige Information für neue Patienten
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed pt-4">
              Aufgrund der hohen Patientenzahl können wir Ihnen nicht immer
              einen Termin garantieren. Wir bewerten jeden Fall individuell.
              Daher werden Sie möglicherweise in den weiteren Schritten
              aufgefordert, Ihre medizinischen Unterlagen (z.B. Vorbefunde,
              letzter Krankenhausbericht, letzte Laboruntersuchungen)
              einzureichen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button onClick={handleDialogConfirm} className="w-full sm:w-auto">
              Verstanden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
