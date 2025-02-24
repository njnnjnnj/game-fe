import React from "react";

export const Lock = () => (
  <svg
    className="absolute inset-x-0 top-1 m-auto"
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    viewBox="0 0 14 16"
  >
    <g filter="url(#lock_filter_a)">
      <path
        fill="#A6552D"
        d="M8.556 10.182c0-.402-.152-.745-.456-1.029A1.553 1.553 0 0 0 7 8.727c-.43 0-.796.142-1.1.426a1.357 1.357 0 0 0-.456 1.029c0 .28.077.534.231.761.154.228.36.405.62.534l-.838 2.602c-.04.114-.02.22.06.319a.39.39 0 0 0 .316.148h2.334a.39.39 0 0 0 .316-.148.309.309 0 0 0 .06-.319l-.838-2.602c.26-.129.466-.306.62-.534.154-.227.23-.48.23-.761Zm-4.667-2.91h6.222V5.092c0-.803-.304-1.489-.911-2.057-.608-.568-1.341-.852-2.2-.852-.859 0-1.592.284-2.2.852-.607.568-.911 1.254-.911 2.057v2.182ZM14 8.365v6.545c0 .303-.113.56-.34.773a1.166 1.166 0 0 1-.827.318H1.167c-.324 0-.6-.106-.827-.318a1.019 1.019 0 0 1-.34-.773V8.364c0-.303.113-.561.34-.773.227-.212.503-.318.827-.318h.389V5.09c0-1.394.534-2.591 1.604-3.591S5.51 0 7 0c1.49 0 2.77.5 3.84 1.5 1.07 1 1.604 2.197 1.604 3.59v2.183h.39c.323 0 .599.106.826.318.227.212.34.47.34.773Z"
      />
    </g>
    <defs>
      <filter
        id="lock_filter_a"
        width={14}
        height={17}
        x={0}
        y={0}
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
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
        <feBlend in2="shape" result="effect1_innerShadow_7192_10855" />
      </filter>
    </defs>
  </svg>
);
