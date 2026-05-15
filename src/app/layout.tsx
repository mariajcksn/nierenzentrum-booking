import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online-Terminbuchung | Nierenzentrum Berlin",
  description:
    "Buchen Sie Ihren Termin im Nierenzentrum Berlin online. Dr. med. Thomas Dietz - Facharzt für Innere Medizin und Nephrologie. Dialyse, Transplantation, Nierencheck.",
  keywords: [
    "Nierenzentrum",
    "Berlin",
    "Nephrologie",
    "Dialyse",
    "Terminbuchung",
    "Dr. Dietz",
    "Nierenerkrankung",
  ],
  authors: [{ name: "Nierenzentrum Berlin" }],
  openGraph: {
    title: "Online-Terminbuchung | Nierenzentrum Berlin",
    description:
      "Buchen Sie Ihren Termin im Nierenzentrum Berlin online.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
