// HeroSection.jsx
import React, { useEffect, useState } from "react";
import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car3 from "../../assets/car3.jpg";

const images = [car1, car2, car3];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((image, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image}
              alt={`Car background ${i + 1}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.parentElement.style.backgroundColor = '#1a1a1a';
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8">
          The Smarter Way to Buy & Sell Cars
        </h1>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Buy Cars */}
          <article className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
            <h2 className="text-2xl font-bold text-blue-300">Buy Cars</h2>
            <ul className="mt-4 space-y-2 text-white/90 text-left">
              <li>3,000+ cars added daily</li>
              <li>30,000+ cars in stock</li>
              <li>Reliable documentation of car condition</li>
            </ul>
            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl">
              Start Buying
            </button>
          </article>

          {/* Sell Cars */}
          <article className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
            <h2 className="text-2xl font-bold text-orange-300">Sell Cars</h2>
            <ul className="mt-4 space-y-2 text-white/90 text-left">
              <li>Sell within 24 hours for the highest prices</li>
              <li>Full transport and document handling</li>
              <li>60,000+ dealers bid on your car</li>
            </ul>
            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl">
              Start Selling
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;