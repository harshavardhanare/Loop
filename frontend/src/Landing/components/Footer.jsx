"use client";
import { Instagram, X, Linkedin, Youtube } from "lucide-react"; // Importing icons

export const Footer = () => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="w-screen flex justify-center">
        <div className="flex w-full flex-col gap-5 lg:justify-around sm:flex-row sm:justify-between">
          <div className="text-center">2024 Loop. All rights reserved.</div>
          <ul className="flex justify-center gap-2.5">
            <li><X size={24} /></li>
            <li><Linkedin size={24} /></li>
            <li><Instagram size={24} /></li>
            <li><Youtube size={24} /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
