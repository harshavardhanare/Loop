import React from "react";
import { Navbar } from "./src/components/Navbar";
import { Hero } from "./src/components/Hero";
import { LogoTicker } from "./src/components/LogoTicker";
import { Features } from "./src/components/Features";
import { ProductShowcase } from "./src/components/ProductShowcase";
import { FAQs } from "./src/components/FAQs";
import { Pricing } from "./src/components/Pricingdemo";
import { CallToAction } from "./src/components/CallToAction";
import { Footer } from "./src/components/Footer";
import { Banner } from "./src/components/Banner";

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
