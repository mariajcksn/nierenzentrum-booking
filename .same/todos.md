# Nierenzentrum Berlin - Terminbuchungssystem

## Aufgaben

- [x] Website analysieren und Branding verstehen
- [x] Projekt mit Next.js und shadcn/ui erstellen
- [x] Haupt-Buchungsformular mit mehrstufigem Prozess erstellen
- [x] Schritt 1: Datenschutz-Hinweis
- [x] Schritt 2: Patientenstatus (Neu/Bestehend)
- [x] Schritt 3: Versicherungsstatus
- [x] Schritt 4: Terminart auswählen
- [x] Schritt 5: Leistung auswählen
- [x] Schritt 6: Zusätzliche Informationen & Dokumenten-Upload
- [x] Schritt 7: Kontaktdaten
- [x] Schritt 8: Bestätigung/Übersicht
- [x] Fortschrittsbalken implementieren
- [x] WCAG 2.1 AA Barrierefreiheit-Unterstützung
- [x] Responsive Design implementieren
- [x] UI-Komponenten anpassen und stylen
- [x] Finale Überprüfung und Version erstellen

## Notizen

- Farbschema: Cyan/Teal (#5AADC9) als Primärfarbe
- PT Sans als Schriftart (wie Original-Website)
- Dialyse, Nephrologie, Transplantation als Hauptleistungen

## Implementierte Features

### Schritt 1: Datenschutzhinweis
- Prominenter Haftungsausschluss auf Deutsch
- SSL-Verschlüsselung und DSGVO-Konformität hervorgehoben
- "Ich habe verstanden" Button zum Fortfahren

### Schritt 2: Patientenstatus
- Radio-Buttons: "Ja" oder "Nein"
- Modal-Dialog bei "Nein" mit Hinweis auf Dokumentenanforderung
- Inline-Hinweis für neue Patienten

### Schritt 3: Versicherungsstatus
- Radio-Buttons: Gesetzlich, Privat, Selbstzahler
- Icons für jede Option

### Schritt 4: Terminart
- Erstgespräch, Kontrolltermin, Akuttermin, Nierensteinsprechstunde
- Zeitangaben für jede Terminart

### Schritt 5: Leistungsauswahl
- Kontextabhängige Filterung basierend auf Terminart
- Nierencheck, Dialyseberatung, Transplantationsvorbereitung, etc.

### Schritt 6: Zusätzliche Informationen
- Freitextfeld für Notizen
- Drag & Drop Dokumenten-Upload (PDF, JPEG)
- Dateigrößen- und Formatvalidierung

### Schritt 7: Kontaktdaten
- Vor-/Nachname, E-Mail, Telefon, Geburtsdatum
- Wunschdatum und Zeitpräferenz
- Formularvalidierung

### Schritt 8: Bestätigung
- Übersicht aller eingegebenen Daten
- Druckfunktion
- Erfolgsbestätigung nach Absendung
