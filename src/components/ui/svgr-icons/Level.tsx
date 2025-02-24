export const Level = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 34 20" fill="none" className={className}>
    <path
      d="M4.79507 1H29.2049L32.8664 9.4L29.2049 19H4.79507L1.13359 9.4L4.79507 1Z"
      fill="#051625"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.0869 0H29.9131L34 9.37598L29.948 20H4.05205L0 9.37598L4.0869 0ZM29.2049 19H4.79507L1.13359 9.4L4.79507 1H29.2049L32.8664 9.4L29.2049 19Z"
      fill="black"
    />
    <g filter="url(#filter0_di_2220_12336)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.37211 1.9L2.06624 9.42086L5.40437 18.1H28.5956L31.9338 9.42086L28.6279 1.9H5.37211ZM29.3077 1H4.69231L1 9.4L4.69231 19H29.3077L33 9.4L29.3077 1Z"
        fill="url(#paint0_linear_2220_12336)"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_2220_12336"
        x="1"
        y="1"
        width="32.5"
        height="19"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="0.5" dy="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
        />
        <feBlend
          mode="soft-light"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2220_12336"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2220_12336"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="0.3" dy="0.3" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0"
        />
        <feBlend
          mode="hard-light"
          in2="shape"
          result="effect2_innerShadow_2220_12336"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2220_12336"
        x1="4.69231"
        y1="1.6"
        x2="22.1022"
        y2="18.8406"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFE364" />
        <stop offset="1" stopColor="#EFC609" />
      </linearGradient>
    </defs>
  </svg>
);
