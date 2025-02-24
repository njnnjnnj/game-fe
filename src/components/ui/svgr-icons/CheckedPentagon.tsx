import { FunctionComponent, SVGProps } from "react";

export const CheckedPentagon: FunctionComponent<SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={112}
    height={44}
    fill="none"
    viewBox="0 0 112 44"
    {...props}
  >
    <g clipPath="url(#checked-pentagon-a)">
      <g filter="url(#checked-pentagon-b)">
        <path
          fill="#EFC609"
          d="M0 8a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v19.535a8 8 0 0 1-6.786 7.907l-48 7.371a8 8 0 0 1-2.428 0l-48-7.37A8 8 0 0 1 0 27.534V8Z"
        />
      </g>
      <path fill="#F6DF2C" d="M0 0h112v4H0z" opacity={0.6} />
      <path
        stroke="#000"
        d="M.5 8A7.5 7.5 0 0 1 8 .5h96a7.5 7.5 0 0 1 7.5 7.5v20.359a7.5 7.5 0 0 1-6.336 7.409l-48 7.543a7.502 7.502 0 0 1-2.328 0l-48-7.543A7.5 7.5 0 0 1 .5 28.359V8Z"
      />
      <g>
        <path
          fill="#3CEE40"
          fillRule="evenodd"
          d="M25.69 15.247a.892.892 0 0 1 .05 1.305l-6.017 6.154a.995.995 0 0 1-.709.294.994.994 0 0 1-.71-.29l-3.04-3.078a.892.892 0 0 1 .042-1.305 1.006 1.006 0 0 1 1.372.04l2.33 2.358 5.31-5.43c.366-.374.98-.395 1.372-.048Z"
          clipRule="evenodd"
        />
        <path
          stroke="#175F18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.5}
          d="M25.919 16.727a1.142 1.142 0 0 0-.063-1.667 1.256 1.256 0 0 0-1.716.06l-5.133 5.249-2.151-2.177a1.256 1.256 0 0 0-1.717-.051 1.142 1.142 0 0 0-.053 1.667l3.04 3.077c.233.235.555.366.889.365.334 0 .655-.133.886-.37l6.018-6.153Z"
        />
      </g>
    </g>
    <defs>
      <filter
        id="checked-pentagon-b"
        width={112}
        height={43.406}
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
        <feBlend in2="shape" result="effect1_innerShadow_7254_7815" />
      </filter>
      <clipPath id="checked-pentagon-a">
        <rect width={112} height={44} fill="#fff" rx={8} />
      </clipPath>
    </defs>
  </svg>
);
