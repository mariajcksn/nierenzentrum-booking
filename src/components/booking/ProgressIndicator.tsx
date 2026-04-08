"use client";

import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepTitles,
}: ProgressIndicatorProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full" role="navigation" aria-label="Fortschritt der Buchung">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Schritt {currentStep} von {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {stepTitles[currentStep - 1]}
          </span>
        </div>
        <Progress
          value={progressPercentage}
          className="h-3"
          aria-label={`Fortschritt: ${Math.round(progressPercentage)}%`}
        />
      </div>

      {/* Step indicators for larger screens */}
      <div className="hidden md:flex justify-between items-center mt-6" role="list">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={title}
              className="flex flex-col items-center flex-1"
              role="listitem"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300
                  ${isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                    : "bg-muted text-muted-foreground"
                  }
                `}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`
                  mt-2 text-xs text-center max-w-[80px] leading-tight
                  ${isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}
                `}
              >
                {title}
              </span>
              {/* Connector line */}
              {index < totalSteps - 1 && (
                <div
                  className={`
                    absolute top-5 left-1/2 w-full h-0.5 -z-10
                    ${isCompleted ? "bg-primary" : "bg-muted"}
                  `}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile step list */}
      <div className="md:hidden mt-4">
        <details className="group">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
            Alle Schritte anzeigen
          </summary>
          <ol className="mt-3 space-y-2 pl-4" role="list">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <li
                  key={title}
                  className={`
                    flex items-center gap-2 text-sm
                    ${isCompleted ? "text-primary" : isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}
                  `}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <span className="w-4 text-center" aria-hidden="true">
                      {stepNumber}.
                    </span>
                  )}
                  {title}
                  {isCurrent && (
                    <span className="sr-only">(aktueller Schritt)</span>
                  )}
                </li>
              );
            })}
          </ol>
        </details>
      </div>
    </div>
  );
}
