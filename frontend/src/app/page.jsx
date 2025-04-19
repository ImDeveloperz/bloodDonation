import Header from "./components/Header";
import HeroSection from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotLauncher from "./components/chatboot/ChatbotLauncher";
import Chatbot from "./components/chatboot/Chatbot";
export default function Home() {
  return (
    <div className="mx-auto xl:w-[1400px] relative">
    <div className="font-sans">
      <Header />
      <HeroSection />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot /> {/* 👈 add the chatbot here */}
    </div>
  </div>
  );
}
