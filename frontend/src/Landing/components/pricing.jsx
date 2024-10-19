"use client";

import { useState } from 'react';

export function PricingTab(props) {
  return (
    <div className={`h-full`}>
      <div className="relative flex flex-col h-full p-6 rounded-2xl bg-black border border-white/30 shadow shadow-black/80">
        {props.popular && (
          <div className="absolute top-0 right-0 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="text-white/70 font-semibold mb-1">{props.planName}</div>
          <div className="inline-flex items-baseline mb-2">
            <span className="text-white/70 font-bold text-3xl">$</span>
            <span className="text-white/50 font-bold text-4xl">{props.price.yearly}</span>
            <span className="text-white/70 font-medium">/year</span>
          </div>
          <div className="text-sm text-white/70 mb-5">{props.planDescription}</div>
          <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#5D2CA8] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-[#5D2CA2] focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
            Purchase Plan
          </a>
        </div>
        <div className="text-slate-200 font-medium mb-3">Includes:</div>
        <ul className="text-slate-400 text-sm space-y-3 grow">
          {props.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PricingTable() {
  return (
    <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
      {/* Advertising Plans */}
      <PricingTab
        planName="Basic Advertiser"
        price={{ yearly: 99 }}
        planDescription="Get started with essential advertising features."
        features={[
          'Targeted ad placements',
          'Basic analytics dashboard',
          'Support for campaign setup',
        ]}
      />

      <PricingTab
        popular={true}
        planName="Standard Advertiser"
        price={{ yearly: 199 }}
        planDescription="Enhance your reach with advanced advertising tools."
        features={[
          'All Basic features',
          'Advanced analytics',
          'A/B testing for ads',
          'Priority support',
        ]}
      />

      <PricingTab
        planName="Premium Advertiser"
        price={{ yearly: 299 }}
        planDescription="Maximize your impact with premium advertising features."
        features={[
          'All Standard features',
          'Custom campaign strategies',
          'Dedicated account manager',
          'Comprehensive performance reports',
        ]}
      />
    </div>
  );
}
