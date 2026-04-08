"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Check,
  ChevronLeft,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Building2,
  Stethoscope,
  Printer,
  CheckCircle2,
} from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepConfirmationProps {
  onBack: () => void;
  onSubmit: () => void;
  data: BookingData;
  isSubmitted: boolean;
}

const appointmentTypeLabels: Record<string, string> = {
  erstgespraech: "Erstgespräch",
  kontrolltermin: "Kontrolltermin",
  dialysetermin: "Dialysetermin",
};

const insuranceLabels: Record<string, string> = {
  gesetzlich: "Gesetzlich versichert",
  privat: "Privat versichert",
  selbstzahler: "Selbstzahler",
};

const timeSlotLabels: Record<string, string> = {
  morning: "Vormittag (8:00 - 12:00)",
  afternoon: "Nachmittag (12:00 - 16:00)",
  late: "Spät (16:00 - 18:00)",
  flexible: "Flexibel",
};

export function StepConfirmation({
  onBack,
  onSubmit,
  data,
  isSubmitted,
}: StepConfirmationProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-card border-2 border-green-200 rounded-xl p-8 md:p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-lime-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Terminanfrage erfolgreich gesendet!
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
            Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei
            Ihnen melden, um den Termin zu bestätigen.
          </p>
          <Alert className="bg-primary/5 border-primary/30 text-left max-w-lg mx-auto">
            <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
            <AlertDescription className="text-foreground">
              Eine Bestätigungs-E-Mail wurde an <strong>{data.email}</strong>{" "}
              gesendet.
            </AlertDescription>
          </Alert>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Bei Fragen erreichen Sie uns unter:
            </p>
            <p className="font-medium text-foreground">
              Tel. 030 / 261 98 25
            </p>
            <p className="text-muted-foreground">
              ambulanz@nierenzentrum-in-berlin.de
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Zusammenfassung prüfen
        </h1>
        <p className="text-muted-foreground">
          Bitte überprüfen Sie Ihre Angaben vor dem Absenden der Terminanfrage.
        </p>
      </header>

      {/* Summary Card */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {/* Patient Info Section */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" aria-hidden="true" />
            Persönliche Daten
          </h2>
          <dl className="grid gap-3 md:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Name</dt>
              <dd className="font-medium text-foreground">
                {data.firstName} {data.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Geburtsdatum</dt>
              <dd className="font-medium text-foreground">
                {formatDate(data.birthDate)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" aria-hidden="true" />
                E-Mail
              </dt>
              <dd className="font-medium text-foreground">{data.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="w-3 h-3" aria-hidden="true" />
                Telefon
              </dt>
              <dd className="font-medium text-foreground">{data.phone}</dd>
            </div>
          </dl>
        </div>

        {/* Appointment Details Section */}
        <div className="p-6 border-b bg-secondary/20">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
            Termindetails
          </h2>
          <dl className="grid gap-3 md:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Patientenstatus</dt>
              <dd className="font-medium text-foreground">
                {data.isExistingPatient ? "Bestandspatient" : "Neuer Patient"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground flex items-center gap-1">
                <Building2 className="w-3 h-3" aria-hidden="true" />
                Versicherung
              </dt>
              <dd className="font-medium text-foreground">
                {data.insuranceType
                  ? insuranceLabels[data.insuranceType]
                  : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground flex items-center gap-1">
                <Stethoscope className="w-3 h-3" aria-hidden="true" />
                Terminart
              </dt>
              <dd className="font-medium text-foreground">
                {data.appointmentType
                  ? appointmentTypeLabels[data.appointmentType]
                  : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Wunschdatum</dt>
              <dd className="font-medium text-foreground">
                {formatDate(data.preferredDate)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Gewünschte Uhrzeit</dt>
              <dd className="font-medium text-foreground">
                {data.preferredTime
                  ? timeSlotLabels[data.preferredTime]
                  : "Nicht angegeben"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Additional Info Section */}
        {(data.notes || data.documents.length > 0) && (
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
              Zusätzliche Informationen
            </h2>
            {data.notes && (
              <div className="mb-4">
                <dt className="text-sm text-muted-foreground mb-1">Notizen</dt>
                <dd className="font-medium text-foreground bg-secondary/30 p-3 rounded-lg">
                  {data.notes}
                </dd>
              </div>
            )}
            {data.documents.length > 0 && (
              <div>
                <dt className="text-sm text-muted-foreground mb-2">
                  Hochgeladene Dokumente ({data.documents.length})
                </dt>
                <dd>
                  <ul className="space-y-1">
                    {data.documents.map((file, index) => (
                      <li
                        key={`${file.name}-${index}`}
                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                      >
                        <Check className="w-4 h-4 text-lime-600" aria-hidden="true" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </div>
        )}

        {/* Privacy Notice */}
        <div className="p-6 bg-primary/5">
          <p className="text-sm text-muted-foreground">
            Mit dem Absenden dieser Anfrage stimmen Sie der Verarbeitung Ihrer
            Daten gemäß unserer Datenschutzerklärung zu. Die Daten werden
            ausschließlich zur Terminvereinbarung verwendet.
          </p>
        </div>
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
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Printer className="mr-2 w-5 h-5" aria-hidden="true" />
            Drucken
          </Button>
          <Button
            onClick={onSubmit}
            size="lg"
            className="w-full sm:w-auto min-w-[200px] bg-lime-600 hover:bg-lime-700"
          >
            <Check className="mr-2 w-5 h-5" aria-hidden="true" />
            Termin anfragen
          </Button>
        </div>
      </div>
    </div>
  );
}
