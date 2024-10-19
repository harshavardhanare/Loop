"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Monitor, Mic, BarChart3, Lock, Eye, Activity } from 'lucide-react';

const logos = [
  { icon: <Shield size={24} />, name: "Security" },
  { icon: <Smartphone size={24} />, name: "Mobile" },
  { icon: <Monitor size={24} />, name: "Screen" }
];

const featurePoints = [
  { value: 95, label: "Privacy Control", position: 1 },

  { value: 150, label: "User Monitoring", position: 2 },
  { value: 300, label: "Content Moderation", position: 4 },
  { value: 400, label: "Account Security", position: 6 },
];

const lineWidth = 80; 
const lineHeight = 2; 

const LogoBeam = () => {
  return (
    <div className="flex items-center justify-center min-h-52">
      <div className="relative flex items-center">
        {logos.map((logo, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="relative" style={{ width: `${lineWidth}px`, height: `${lineHeight}px`, backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
                <motion.div
                  className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
                  initial={{ x: index % 2 === 0 ? '-40px' : '40px' }}
                  animate={{ x: index % 2 === 0 ? `calc(${lineWidth}px + 40px)` : `calc(-${lineWidth}px - 40px)` }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    repeatDelay: 2.5 + index,
                    ease: 'linear',
                  }}
                  style={{ willChange: 'transform' }}
                />
              </div>
            )}
            <div className={`relative bg-black border-2 ${index === 1 ? 'border-white/70 w-16 h-16 shadow-[0_0_15px_5px_#dbe0e2]' : 'border-white/30 w-14 h-14'} rounded-2xl flex items-center justify-center p-4 overflow-hidden`}>
              {logo.icon}
              {index === 1 && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                  style={{ willChange: 'transform' }}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const data = [50, 100, 150, 200, 300, 350, 400, 450, 500];
const maxData = Math.max(...data);
const chartHeight = 400;
const chartWidth = 800;

const CardWithEffect = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="relative bg-[#000] flex-1 rounded-xl border border-white/30 p-4 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: 'transform' }}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            top: mousePosition.y - 150,
            left: mousePosition.x - 150,
            background: '#5D2CA8',
            filter: 'blur(100px)',
            transform: 'translate(-0%, -0%)',
            zIndex: 10,
            willChange: 'transform, top, left',
          }}
        />
      )}
      {children}
    </div>
  );
};

const SecurityFeatures = () => {
  return (
    <div className="flex flex-col justify-center h-full items-center relative">
      <div className="flex flex-row gap-8 justify-center h-full items-center relative">
        {[<Eye size={32} />, <Lock size={32} />, <Activity size={32} />].map((icon, index) => (
          <div key={index} className="relative bg-black border-2 border-white/70 rounded-2xl flex items-center justify-center w-16 h-16 p-4 overflow-hidden shadow-[0_0_15px_5px_#dbe0e2]">
            {icon}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }}
              style={{ willChange: 'transform' }}
            />
          </div>
        ))}
      </div>
      <div className="text-left p-6 mt-4">
        <h1 className="text-white text-2xl font-bold mb-2">User Interface</h1>
        <p className="text-gray-400 text-lg">
          Simple, Animated, Interactive, Secure, Intuitive, User-Friendly, Responsive
        </p>
      </div>
    </div>
  );
};

const BentoBox1 = () => {
  const chartRef = useRef(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsChartVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [chartRef]);

  return (
    <div className="bg-[#000000] flex justify-center items-center min-h-screen p-5 rounded-lg sm:py-24 ">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-7xl min-h-[800px] md:min-h-[800px] md:h-[800px]">
        <CardWithEffect>
          <div className="flex flex-col justify-between h-full">
            <div className="mb-4 px-6 mt-6">
              <div className="flex justify-between items-center mb-6 pb-2">
                <h2 className="text-white/70 text-xl">Security Impact</h2>
                <div className="flex items-center">
                  <BarChart3 size={24} className="text-white/70" />
                  <span className="ml-2 text-white/70 text-sm">High</span>
                </div>
              </div>
              <div ref={chartRef} className="relative w-full mt-12" style={{ height: chartHeight }}>
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full pl-11">
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#5D2CA8" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="url(#gradient)"
                    stroke="none"
                    points={`${(0 / (data.length - 1)) * chartWidth},${chartHeight} ${data
                      .map(
                        (value, index) =>
                          `${(index / (data.length - 1)) * chartWidth},${chartHeight - (value / maxData) * chartHeight}`
                      )
                      .join(' ')} ${(data.length - 1) * (chartWidth / (data.length - 1))},${chartHeight}`}
                  />
                  <motion.polyline
                    fill="none"
                    stroke="#5D2CA8"
                    strokeWidth="3"
                    points={data
                      .map(
                        (value, index) =>
                          `${(index / (data.length - 1)) * chartWidth},${chartHeight - (value / maxData) * chartHeight}`
                      )
                      .join(' ')}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isChartVisible ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                  {featurePoints.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={(point.position / (data.length - 1)) * chartWidth}
                        cy={chartHeight - (point.value / maxData) * chartHeight}
                        r={5} // radius of the circle
                        fill="#5D2CA8"
                      />
                      <text
                        x={(point.position / (data.length - 1)) * chartWidth}
                        y={chartHeight - (point.value / maxData) * chartHeight - 10} // adjust vertical position of label
                        fill="white"
                        fontSize="20"
                        textAnchor="middle"
                      >
                        {point.label}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
                  {Array.from(Array(6).keys()).map((i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-full flex items-center text-white/30 text-sm"
                      style={{ top: `${(100 / 5) * i}%` }}
                    >
                      <span className="mr-4">{`${100 - i * 20}%`}</span>
                      <div className="w-full border-t border-white/70"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-left p-6 mt-4">
              <h1 className="text-white text-2xl font-bold mb-2">Enhanced Privacy</h1>
              <p className="text-white/70 text-lg">Our strong privacy features empower users with control over their data and interactions.</p>
            </div>
          </div>
        </CardWithEffect>
        <div className="flex flex-col w-full md:w-1/2 gap-5 h-full md:h-[800px]">
          <CardWithEffect>
            <div className="flex flex-col justify-center h-full">
              <LogoBeam />
              <div className="text-left p-6">
                <h1 className="text-white text-2xl font-bold mb-2">Multiple Privacy Features</h1>
                <p className="text-white/70 text-lg">
                  <span className="flex flex-wrap">
                    <span className="inline-flex items-center mr-4">
                      <Shield className="inline-block mr-2" size={18} />
                      Privacy Control
                    </span>
                    <span className="inline-flex items-center mr-4">
                      <Monitor className="inline-block mr-2" size={18} />
                      User Monitoring
                    </span>
                    <span className="inline-flex items-center">
                      <Lock className="inline-block mr-2" size={18} />
                      Content Moderation
                    </span>
                  </span>
                  <span className="flex flex-wrap mt-2"> 
                    <span className="inline-flex items-center">
                      <Mic className="inline-block mr-2" size={18} />
                      Account Security
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </CardWithEffect>
          <CardWithEffect>
            <SecurityFeatures />
          </CardWithEffect>
        </div>
      </div>
    </div>
  );
};

function Bentodemo() {
  return (
    <div className="h-screen flex items-center justify-center">
      <BentoBox1 />
    </div>
  );
}

export default Bentodemo;
