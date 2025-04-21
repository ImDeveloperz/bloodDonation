import Header from "./components/Header";
import HeroSection from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from "./components/chatboot/Chatbot";
import Background from './components/Background';

export default function Home() {
  return (
    <>
    
      <Header />
      <main className="font-sans relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <HeroSection />
          <Services />
          <Testimonials />
          <Contact />
          <Footer />
          <Chatbot />
        </div>
      </main>
      <Background />
    </>
  );
}