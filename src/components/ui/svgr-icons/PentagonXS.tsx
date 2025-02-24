import * as React from "react";
import { SVGProps } from "react";

export const PentagonXS = (props: SVGProps<SVGSVGElement>) => {
  const id = React.useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={32}
      fill="none"
      {...props}
    >
      <g filter={`url(#${id}-a)`}>
        <mask
          id={`${id}-b`}
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
            fill="#02DB07"
            d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v10.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 16.675V6Z"
          />
        </mask>
        <g mask={`url(#${id}-b)`}>
          <path
            fill="#009F00"
            d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v10.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 16.675V6Z"
          />
          <g filter={`url(#${id}-c)`}>
            <path
              fill="#02DB07"
              d="M0 6a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v8.675a6 6 0 0 1-4.103 5.692l-24 8a6 6 0 0 1-3.794 0l-24-8A6 6 0 0 1 0 14.675V6Z"
            />
          </g>
          <path fill="#0F0" d="M0 0h60v2H0z" opacity={0.6} />
          <path
            stroke="#000"
            strokeOpacity={0.6}
            strokeWidth={0.5}
            d="M.25 6A5.75 5.75 0 0 1 6 .25h48A5.75 5.75 0 0 1 59.75 6v10.675a5.75 5.75 0 0 1-3.932 5.455l-24 8a5.75 5.75 0 0 1-3.636 0l-24-8A5.75 5.75 0 0 1 .25 16.675V6Z"
          />
        </g>
      </g>
      <defs>
        <filter
          id={`${id}-a`}
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
            result="effect1_dropShadow_3322_4414"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3322_4414"
            result="shape"
          />
        </filter>
        <filter
          id={`${id}-c`}
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
          <feBlend in2="shape" result="effect1_innerShadow_3322_4414" />
        </filter>
      </defs>
    </svg>
  );
};
