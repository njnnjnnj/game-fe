import * as React from "react";
import { SVGProps } from "react";
export const PentagonLockedXS = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={32}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <g filter="url(#b)">
        <mask
          id="c"
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
        <g mask="url(#c)">
          <path
            fill="#A6552D"
            d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v10.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 16.675V6Z"
          />
          <g filter="url(#d)">
            <path
              fill="#EFC609"
              d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v8.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 14.675V6Z"
            />
          </g>
          <path
            fill="#FBEF44"
            d="M2 5a3 3 0 0 1 3-3h50a3 3 0 0 1 3 3v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5Z"
            opacity={0.6}
          />
          <path
            stroke="#000"
            strokeOpacity={0.6}
            strokeWidth={0.5}
            d="M.25 6A5.75 5.75 0 0 1 6 .25h48A5.75 5.75 0 0 1 59.75 6v10.675a5.75 5.75 0 0 1-3.932 5.455l-24 8a5.75 5.75 0 0 1-3.636 0l-24-8A5.75 5.75 0 0 1 .25 16.675V6Z"
          />
        </g>
      </g>
      <g filter="url(#e)">
        <path
          fill="#A6552D"
          d="M31.556 14.182c0-.402-.152-.745-.456-1.029a1.553 1.553 0 0 0-1.1-.426c-.43 0-.796.142-1.1.426a1.357 1.357 0 0 0-.456 1.029c0 .28.077.534.231.761.154.228.36.405.62.534l-.838 2.602c-.04.114-.02.22.06.319a.39.39 0 0 0 .316.148h2.334a.39.39 0 0 0 .316-.148.309.309 0 0 0 .06-.319l-.838-2.602c.26-.129.466-.306.62-.534.154-.227.23-.48.23-.761Zm-4.667-2.91h6.222V9.092c0-.803-.304-1.489-.911-2.057-.608-.568-1.341-.852-2.2-.852-.859 0-1.592.284-2.2.852-.607.568-.911 1.254-.911 2.057v2.182ZM37 12.365v6.545c0 .303-.113.56-.34.773a1.166 1.166 0 0 1-.827.318H24.167c-.324 0-.6-.106-.827-.318a1.018 1.018 0 0 1-.34-.773v-6.545c0-.303.113-.561.34-.773.227-.212.503-.318.827-.318h.389V9.09c0-1.394.534-2.591 1.604-3.591S28.51 4 30 4c1.49 0 2.77.5 3.84 1.5 1.07 1 1.604 2.197 1.604 3.59v2.183h.39c.323 0 .599.106.826.318.227.212.34.47.34.773Z"
        />
      </g>
    </g>
    <defs>
      <filter
        id="b"
        width={60}
        height={31.676}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3322_4421"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3322_4421"
          result="shape"
        />
      </filter>
      <filter
        id="d"
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
        <feBlend in2="shape" result="effect1_innerShadow_3322_4421" />
      </filter>
      <filter
        id="e"
        width={14}
        height={17}
        x={23}
        y={4}
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
        <feBlend in2="shape" result="effect1_innerShadow_3322_4421" />
      </filter>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h60v32H0z" />
      </clipPath>
    </defs>
  </svg>
);
