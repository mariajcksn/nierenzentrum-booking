"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  Check,
} from "lucide-react";
import type { BookingData } from "../BookingForm";

interface StepAdditionalInfoProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (updates: Partial<BookingData>) => void;
  data: BookingData;
}

export function StepAdditionalInfo({
  onNext,
  onBack,
  updateData,
  data,
}: StepAdditionalInfoProps) {
  const [notes, setNotes] = useState(data.notes);
  const [files, setFiles] = useState<File[]>(data.documents);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    updateData({ notes: value });
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB

    Array.from(selectedFiles).forEach((file) => {
      const isValidType =
        file.type === "application/pdf" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      const isValidSize = file.size <= maxSize;

      if (isValidType && isValidSize) {
        validFiles.push(file);
      }
    });

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);
    updateData({ documents: newFiles });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    updateData({ documents: newFiles });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Anmerkungen
        </h1>
        <p className="text-muted-foreground">
          Teilen Sie uns weitere Details zu Ihrem Anliegen mit und laden Sie
          relevante Dokumente hoch.
        </p>
      </header>

      {/* Info for new patients */}
      {data.isExistingPatient === false && (
        <Alert className="bg-primary/5 border-primary/30">
          <Info className="h-5 w-5 text-primary" aria-hidden="true" />
          <AlertDescription className="text-foreground">
            <strong>Empfehlung für neue Patienten:</strong> Bitte laden Sie wenn
            möglich Vorbefunde, den letzten Krankenhausbericht oder aktuelle
            Laboruntersuchungen hoch. Dies hilft uns, Ihren Fall schneller zu
            bewerten.
          </AlertDescription>
        </Alert>
      )}

      {/* Notes Section */}
      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Text Notes */}
        <div className="space-y-3">
          <Label
            htmlFor="notes"
            className="text-lg font-semibold text-foreground"
          >
            Zusätzliche Notizen (optional)
          </Label>
          <p className="text-sm text-muted-foreground">
            Beschreiben Sie Ihr Anliegen oder teilen Sie uns wichtige
            Informationen mit.
          </p>
          <Textarea
            id="notes"
            value={notes}
            onChange={handleNotesChange}
            placeholder="z.B. aktuelle Beschwerden, Medikamente, Vorerkrankungen..."
            className="min-h-[150px] resize-y"
            aria-describedby="notes-hint"
          />
          <p id="notes-hint" className="text-xs text-muted-foreground">
            {notes.length}/1000 Zeichen
          </p>
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-foreground">
            Medizinische Dokumente hochladen (optional)
          </Label>
          <p className="text-sm text-muted-foreground">
            Akzeptierte Formate: PDF, JPEG. Maximale Dateigröße: 10 MB pro
            Datei.
          </p>

          {/* Drop Zone */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Dateien zum Hochladen hierher ziehen oder klicken"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                fileInputRef.current?.click();
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              aria-hidden="true"
            />
            <Upload
              className="w-10 h-10 mx-auto text-muted-foreground mb-3"
              aria-hidden="true"
            />
            <p className="text-foreground font-medium mb-1">
              Dateien hierher ziehen
            </p>
            <p className="text-sm text-muted-foreground mb-3">oder</p>
            <Button type="button" variant="outline" className="pointer-events-none">
              Dateien auswählen
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium text-foreground">
                Ausgewählte Dateien ({files.length}):
              </p>
              <ul className="space-y-2" role="list">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText
                        className="w-5 h-5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      aria-label={`${file.name} entfernen`}
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
        <Button
          onClick={onNext}
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
