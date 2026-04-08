"use client";

import { useState, useCallback } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepDisclaimer } from "./steps/StepDisclaimer";
import { StepPatientStatus } from "./steps/StepPatientStatus";
import { StepInsurance } from "./steps/StepInsurance";
import { StepAppointmentType } from "./steps/StepAppointmentType";
import { StepAdditionalInfo } from "./steps/StepAdditionalInfo";
import { StepContactData } from "./steps/StepContactData";
import { StepConfirmation } from "./steps/StepConfirmation";

export interface BookingData {
  disclaimerAccepted: boolean;
  isExistingPatient: boolean | null;
  insuranceType: "gesetzlich" | "privat" | "selbstzahler" | null;
  appointmentType: string;
  service: string;
  notes: string;
  documents: File[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  preferredDate: string;
  preferredTime: string;
}

// Step 0 = Disclaimer (intro), Steps 1-6 = actual booking steps
const TOTAL_STEPS = 6;

const STEP_TITLES = [
  "Patientenstatus",
  "Versicherung",
  "Terminart",
  "Zusätzliche Informationen",
  "Kontaktdaten",
  "Bestätigung",
];

export function BookingForm() {
  // currentStep 0 = disclaimer intro, 1-6 = actual steps
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    disclaimerAccepted: false,
    isExistingPatient: null,
    insuranceType: null,
    appointmentType: "",
    service: "",
    notes: "",
    documents: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    preferredDate: "",
    preferredTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateBookingData = useCallback(
    (updates: Partial<BookingData>) => {
      setBookingData((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    // Scroll to top of form for accessibility
    document.getElementById("booking-form-top")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    document.getElementById("booking-form-top")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(() => {
    // In a real app, this would submit to a backend
    console.log("Booking submitted:", bookingData);
    setIsSubmitted(true);
  }, [bookingData]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepDisclaimer
            onNext={nextStep}
            updateData={updateBookingData}
            data={bookingData}
          />
        );
      case 1:
        return (
          <StepPatientStatus
            onNext={nextStep}
            onBack={prevStep}
            updateData={updateBookingData}
            data={bookingData}
          />
        );
      case 2:
        return (
          <StepInsurance
            onNext={nextStep}
            onBack={prevStep}
            updateData={updateBookingData}
            data={bookingData}
          />
        );
      case 3:
        return (
          <StepAppointmentType
            onNext={nextStep}
            onBack={prevStep}
            updateData={updateBookingData}
            data={bookingData}
          />
        );
      case 4:
        return (
          <StepAdditionalInfo
            onNext={nextStep}
            onBack={prevStep}
            updateData={updateBookingData}
            data={bookingData}
          />
        );
      case 5:
        return (
          <StepContactData
            onNext={nextStep}
            onBack={prevStep}
            updateData={updateBookingData}
            data={bookingData}
          />
        );
      case 6:
        return (
          <StepConfirmation
            onBack={prevStep}
            onSubmit={handleSubmit}
            data={bookingData}
            isSubmitted={isSubmitted}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto" id="booking-form-top">
      {/* Skip link for accessibility */}
      <a href="#main-form" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* Progress Indicator - only show when past disclaimer */}
      {currentStep > 0 && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          stepTitles={STEP_TITLES}
        />
      )}

      {/* Main form content */}
      <main
        id="main-form"
        role="main"
        aria-label="Terminbuchungsformular"
        className={currentStep > 0 ? "mt-8" : ""}
      >
        <div className="step-animation" key={currentStep}>
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
