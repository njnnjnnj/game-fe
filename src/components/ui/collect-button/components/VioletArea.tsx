import React from "react";

export const VioletArea = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={31}
    fill="none"
    viewBox="0 0 60 31"
  >
    <mask
      id="violet-mask-a"
      width={60}
      height={31}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path
        fill="#EFC609"
        d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v10.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 16.675V6Z"
      />
    </mask>
    <g mask="url(#violet-mask-a)">
      <path
        fill="#5658A7"
        d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v10.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 16.675V6Z"
      />
      <g filter="url(#violet-filter-b)">
        <path
          className="animate-collect-button-violet-coloring"
          fill="#7E81F3"
          d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v8.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 14.675V6Z"
        />
      </g>
      <path
        fill="#fff"
        d="M2 5a3 3 0 0 1 3-3h50a3 3 0 0 1 3 3v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5Z"
        opacity={0.2}
      />
      <path
        stroke="#000"
        strokeOpacity={0.6}
        strokeWidth={0.5}
        d="M.25 6A5.75 5.75 0 0 1 6 .25h48A5.75 5.75 0 0 1 59.75 6v10.675a5.75 5.75 0 0 1-3.932 5.455l-24 8a5.75 5.75 0 0 1-3.636 0l-24-8A5.75 5.75 0 0 1 .25 16.675V6Z"
      />
    </g>
    <defs>
      <filter
        id="violet-filter-b"
        width={60}
        height={29.176}
        x={0}
        y={-0.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-1} />
        <feGaussianBlur stdDeviation={0.25} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
        <feBlend in2="shape" result="effect1_innerShadow_8035_6412" />
      </filter>
    </defs>
  </svg>
);
