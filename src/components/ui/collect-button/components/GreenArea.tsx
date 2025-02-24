import React from "react";

export const GreenArea = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={31}
    viewBox="0 0 60 31"
    fill="none"
  >
    <mask
      id="mask0_7192_10772"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={60}
      height={31}
    >
      <path
        d="M0 6C0 2.68629 2.68629 0 6 0H54C57.3137 0 60 2.68629 60 6V16.6754C60 19.258 58.3474 21.5509 55.8974 22.3675L31.8974 30.3675C30.6658 30.7781 29.3342 30.7781 28.1026 30.3675L4.10263 22.3675C1.65258 21.5509 0 19.258 0 16.6754V6Z"
        fill="#02DB07"
      />
    </mask>
    <g mask="url(#mask0_7192_10772)">
      <path
        d="M0 6C0 2.68629 2.68629 0 6 0H54C57.3137 0 60 2.68629 60 6V16.6754C60 19.258 58.3474 21.5509 55.8974 22.3675L31.8974 30.3675C30.6658 30.7781 29.3342 30.7781 28.1026 30.3675L4.10263 22.3675C1.65258 21.5509 0 19.258 0 16.6754V6Z"
        fill="#009F00"
      />
      <g filter="url(#filter0_i_7192_10772)">
        <path
          className="animate-collect-button-coloring"
          d="M0 6C0 2.68629 2.68629 0 6 0H54C57.3137 0 60 2.68629 60 6V14.6754C60 17.258 58.3474 19.5509 55.8974 20.3675L31.8974 28.3675C30.6658 28.7781 29.3342 28.7781 28.1026 28.3675L4.10263 20.3675C1.65258 19.5509 0 17.258 0 14.6754V6Z"
          fill="#02DB07"
        />
      </g>
      <rect opacity="0.6" width="60" height="2" fill="#00FF00" />
      <path
        d="M0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H54C57.1756 0.25 59.75 2.82436 59.75 6V16.6754C59.75 19.1504 58.1663 21.3477 55.8183 22.1304L31.8183 30.1304C30.638 30.5238 29.362 30.5238 28.1817 30.1304L4.18169 22.1304C1.83372 21.3477 0.25 19.1504 0.25 16.6754V6Z"
        stroke="black"
        strokeOpacity="0.6"
        strokeWidth="0.5"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_7192_10772"
        x={0}
        y={-0.5}
        width={60}
        height={29.1758}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-1" />
        <feGaussianBlur stdDeviation="0.25" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_7192_10772"
        />
      </filter>
    </defs>
  </svg>
);
