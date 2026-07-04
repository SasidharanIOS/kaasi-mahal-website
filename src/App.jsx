import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Button from "./components/Button";

function NotFound() {
  return (
    <section className="section-pad min-h-[60vh]">
      <div className="container-pad text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">404</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold text-brand-ink">Page not found</h1>
        <p className="mx-auto mt-5 max-w-xl text-brand-ink/65">The page you are looking for is not available.</p>
        <Button to="/" variant="gold" className="mt-8">Back to Home</Button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-soft text-brand-ink">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
