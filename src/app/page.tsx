import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import Mission from "@/components/Mission";
import AIEngine from "@/components/AIEngine";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Founder from "@/components/Founder";
import FooterCTA from "@/components/FooterCTA";
import Popup from "@/components/Popup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Hero />
      <Marquee />
      <Products />
      <Mission />
      <AIEngine />
      <UseCases />
      <Testimonials />
      <WhyUs />
      <Founder />
      <FooterCTA />
      <Popup />
    </main>
  );
}
