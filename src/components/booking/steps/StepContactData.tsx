"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, User, Mail, Phone, Calendar } from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepContactDataProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

export function StepContactData({
  onNext,
  onBack,
  updateData,
  data,
}: StepContactDataProps) {
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    birthDate: data.birthDate,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Bitte geben Sie Ihren Vornamen ein";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Bitte geben Sie Ihren Nachnamen ein";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Bitte geben Sie Ihre Telefonnummer ein";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Bitte geben Sie Ihr Geburtsdatum ein";
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = "Bitte wählen Sie einen Wunschtermin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const timeSlots = [
    { value: "morning", label: "Vormittag (8:00 - 12:00)" },
    { value: "afternoon", label: "Nachmittag (12:00 - 16:00)" },
    { value: "late", label: "Spät (16:00 - 18:00)" },
    { value: "flexible", label: "Flexibel" },
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Kontaktdaten
        </h1>
        <p className="text-muted-foreground">
          Bitte geben Sie Ihre Kontaktdaten für die Terminbestätigung ein.
        </p>
      </header>

      {/* Form Card */}
      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          {/* Name Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                Vorname <span className="text-destructive">*</span>
              </Label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-lg border bg-background
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.firstName ? "border-destructive" : "border-input"}
                `}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-sm text-destructive">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                Nachname <span className="text-destructive">*</span>
              </Label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-lg border bg-background
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.lastName ? "border-destructive" : "border-input"}
                `}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-sm text-destructive">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                E-Mail-Adresse <span className="text-destructive">*</span>
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-lg border bg-background
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.email ? "border-destructive" : "border-input"}
                `}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                Telefonnummer <span className="text-destructive">*</span>
              </Label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+49"
                className={`
                  w-full px-4 py-3 rounded-lg border bg-background
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.phone ? "border-destructive" : "border-input"}
                `}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              Geburtsdatum <span className="text-destructive">*</span>
            </Label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              max={today}
              className={`
                w-full px-4 py-3 rounded-lg border bg-background
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.birthDate ? "border-destructive" : "border-input"}
              `}
              aria-invalid={!!errors.birthDate}
              aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
            />
            {errors.birthDate && (
              <p id="birthDate-error" className="text-sm text-destructive">
                {errors.birthDate}
              </p>
            )}
          </div>

          {/* Preferred Appointment */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Terminwunsch
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  Wunschdatum <span className="text-destructive">*</span>
                </Label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={today}
                  className={`
                    w-full px-4 py-3 rounded-lg border bg-background
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.preferredDate ? "border-destructive" : "border-input"}
                  `}
                  aria-invalid={!!errors.preferredDate}
                  aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                />
                {errors.preferredDate && (
                  <p id="preferredDate-error" className="text-sm text-destructive">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Gewünschte Uhrzeit</Label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="text-destructive">*</span> Pflichtfelder
          </p>
        </form>
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
          onClick={handleNext}
          size="lg"
          className="w-full sm:w-auto min-w-[200px]"
        >
          Weiter zur Übersicht
          <ChevronRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
