import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoTicker } from "./components/LogoTicker";
import { Features } from "./components/Features";
import { ProductShowcase } from "./components/ProductShowcase";
import { FAQs } from "./components/FAQs";
import { Pricing } from "./components/Pricingdemo";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Banner } from "./components/Banner";

function App() {
  return (
    <>
      <div className="h-screen overflow-y-auto overflow-x-hidden">
        <Banner/>
        <Navbar />
        <div id="Hero">
          <Hero />
        </div>
        <div id="LogoTicker">
        <LogoTicker />
        </div>
        <div id="Features">
        <Features />
        </div>
        <div id="ProductShowcase">
        <ProductShowcase />
        </div>
        <div id="FAQs">
          <FAQs />
        </div>
        <div id="Pricing">
          <Pricing />
        </div>
        <div id="CallToAction">
          <CallToAction />
        </div>
        <Footer />
      </div>
    </>
  );
}


export default App;
