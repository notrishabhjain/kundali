import React from 'react';

export function Yantra({ name, className = "" }: { name: string, className?: string }) {
  const genericBase = (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="yantraGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#fffdef" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* Outer Border */}
      <rect x="5" y="5" width="190" height="190" fill="url(#yantraGrad)" stroke="#b45309" strokeWidth="2" />
      <rect x="15" y="15" width="170" height="170" fill="none" stroke="#b45309" strokeWidth="1" />
      
      {/* Gates */}
      <path d="M 80 15 L 80 5 M 120 15 L 120 5 M 80 185 L 80 195 M 120 185 L 120 195 M 15 80 L 5 80 M 15 120 L 5 120 M 185 80 L 195 80 M 185 120 L 195 120" stroke="#b45309" strokeWidth="2" />
      
      <circle cx="100" cy="100" r="70" fill="none" stroke="#b45309" strokeWidth="1"/>
      
      {/* Petals */}
      <path d="M 100 30 Q 115 65 100 100 Q 85 65 100 30 Z" fill="none" stroke="#b45309" strokeWidth="1"/>
      <path d="M 100 170 Q 115 135 100 100 Q 85 135 100 170 Z" fill="none" stroke="#b45309" strokeWidth="1"/>
      <path d="M 30 100 Q 65 115 100 100 Q 65 85 30 100 Z" fill="none" stroke="#b45309" strokeWidth="1"/>
      <path d="M 170 100 Q 135 115 100 100 Q 135 85 170 100 Z" fill="none" stroke="#b45309" strokeWidth="1"/>

      {/* Cross petals */}
      <path d="M 50 50 Q 80 80 100 100 Q 70 70 50 50 Z" fill="none" stroke="#b45309" strokeWidth="1"/>
      <path d="M 150 150 Q 120 120 100 100 Q 130 130 150 150 Z" fill="none" stroke="#b45309" strokeWidth="1"/>
      <path d="M 50 150 Q 80 120 100 100 Q 70 130 50 150 Z" fill="none" stroke="#b45309" strokeWidth="1"/>
      <path d="M 150 50 Q 120 80 100 100 Q 130 70 150 50 Z" fill="none" stroke="#b45309" strokeWidth="1"/>

      <circle cx="100" cy="100" r="40" fill="#fff" stroke="#b45309" strokeWidth="1"/>
    </svg>
  );

  const getInnerYantra = () => {
    if (name.includes("Vyapar") || name.includes("Siddhachakra")) {
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={"absolute inset-0 z-10 " + className}>
           <text x="100" y="105" textAnchor="middle" fontSize="32" fill="#991b1b" fontWeight="bold">ॐ</text>
           <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#991b1b">अर्हं</text>
           <text x="100" y="135" textAnchor="middle" fontSize="12" fill="#991b1b">नमः</text>
           <circle cx="100" cy="100" r="10" fill="#991b1b" />
        </svg>
      );
    }
    if (name.includes("Padmavati")) {
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={"absolute inset-0 z-10 " + className}>
          <polygon points="100,60 135,120 65,120" fill="none" stroke="#b45309" strokeWidth="1.5" />
          <polygon points="100,140 65,80 135,80" fill="none" stroke="#b45309" strokeWidth="1.5" />
          <text x="100" y="105" textAnchor="middle" fontSize="24" fill="#991b1b" fontWeight="bold">श्रीं</text>
        </svg>
      );
    }
    if (name.includes("Ambika")) {
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={"absolute inset-0 z-10 " + className}>
          <circle cx="100" cy="100" r="30" fill="none" stroke="#b45309" strokeWidth="1.5" />
          <text x="100" y="105" textAnchor="middle" fontSize="22" fill="#991b1b">ह्रीं</text>
           {/* Magic squares */}
           <line x1="75" y1="85" x2="125" y2="85" stroke="#b45309" strokeWidth="0.5" />
           <line x1="75" y1="115" x2="125" y2="115" stroke="#b45309" strokeWidth="0.5" />
        </svg>
      );
    }
    if (name.includes("Bhairav")) {
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={"absolute inset-0 z-10 " + className}>
          <path d="M100 65 L 130 115 L 70 115 Z M 100 135 L 70 85 L 130 85 Z" fill="#fecaca" fillOpacity="0.4" stroke="#991b1b" strokeWidth="2" />
          <text x="100" y="105" textAnchor="middle" fontSize="20" fill="#991b1b" fontWeight="bold">भं</text>
        </svg>
      );
    }
    if (name.includes("Ghantakarna")) {
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={"absolute inset-0 z-10 " + className}>
          <ellipse cx="100" cy="100" rx="20" ry="30" fill="none" stroke="#800000" strokeWidth="1.5"/>
          <text x="100" y="105" textAnchor="middle" fontSize="16" fill="#800000" fontWeight="bold">घं</text>
          {/* Numbers grid around it */}
          <text x="75" y="85" fontSize="10" fill="#800000">54</text>
          <text x="120" y="85" fontSize="10" fill="#800000">18</text>
          <text x="75" y="125" fontSize="10" fill="#800000">27</text>
          <text x="120" y="125" fontSize="10" fill="#800000">45</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={"absolute inset-0 z-10 " + className}>
        <text x="100" y="105" textAnchor="middle" fontSize="24" fill="#991b1b">ॐ</text>
      </svg>
    )
  };

  return (
    <div className="relative w-full h-full drop-shadow-md">
      {genericBase}
      {getInnerYantra()}
    </div>
  );
}
