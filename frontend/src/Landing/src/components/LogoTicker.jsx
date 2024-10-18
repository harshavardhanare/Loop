"use client";

import { motion } from 'framer-motion';
import { 
  ShieldBan, 
  EarthLock, 
  CircleFadingPlus, 
  User, 
  ShieldHalf, 
  HandHelping, 
  RadioTower ,MessageCircle
} from 'lucide-react';

const features = [
  { icon: <ShieldBan />, label: "Account Security" },
  { icon: <MessageCircle/>, label: "Secure Chating" },
  { icon: <EarthLock />, label: "Privacy Controls" },
  { icon: <CircleFadingPlus />, label: "Content Moderation" },
  { icon: <User />, label: "User Profiles" },
  { icon: <ShieldHalf />, label: "Safety Monitoring" },
  { icon: <HandHelping />, label: "User Support" },
  { icon: <RadioTower />, label: "Live Reporting" },
];

export const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-lg text-center text-white/70 mb-16">Features Provided by Loop</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <LogoCarousel features={features} />
        </div>
      </div>
    </div>
  );
}

const LogoCarousel = ({ features }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex space-x-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 flex-shrink-0">
            <div className="text-2xl">{feature.icon}</div>
            <span className="text-sm">{feature.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
