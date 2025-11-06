// FIX: Create the PulseChainLogoGraphic component with a custom SVG to resolve import errors.
import React from 'react';

const PulseChainLogoGraphic: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 300 75"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 40 H50 L65 25 L80 55 L95 40 H130"
      fill="none"
      stroke="#ef4444"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M170 40 H205 L220 25 L235 55 L250 40 H295"
      fill="none"
      stroke="#ef4444"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M150 7.5 C130 7.5, 120 27.5, 120 40 C120 55, 150 65, 150 70 C150 65, 180 55, 180 40 C180 27.5, 170 7.5, 150 7.5 Z"
      fill="#ef4444"
    />
  </svg>
);

export default PulseChainLogoGraphic;
