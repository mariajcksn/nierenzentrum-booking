import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/booking/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary/30 to-background">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4">
        <BookingForm />
      </main>

      <Footer />
    </div>
  );
}
