import React from 'react';

export const RareRibbon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={110}
    height={24}
    fill="none"
    viewBox="0 0 110 24"
  >
    <path
      fill="#000"
      d="M103.854 15.625 110 7.251H97.506V4.043l-7.009-.437a570.345 570.345 0 0 0-71.066.004l-6.937.433v3.208H0l6.146 8.374L0 23.999h21.165v-3.793a570.398 570.398 0 0 1 67.67 0V24H110l-6.146-8.374Z"
    />
    <path
      fill="#883308"
      d="M103.854 14.633 110 6.259H97.506V3.05l-7.009-.437a570.345 570.345 0 0 0-71.066.004l-6.937.433V6.26H0l6.146 8.374L0 23.007h21.165v-3.794a570.398 570.398 0 0 1 67.67.001v3.793H110l-6.146-8.374Z"
    />
    <path
      fill="url(#rare-ribbon-a)"
      d="M21.165 21.498H0l6.146-8.374L0 4.75h21.165v16.748Z"
    />
    <path
      fill="url(#rare-ribbon-b)"
      d="M88.835 21.498H110l-6.146-8.374L110 4.75H88.835v16.748Z"
    />
    <path
      fill="url(#rare-ribbon-c)"
      d="m12.494 1.543 6.937-.433a570.345 570.345 0 0 1 71.066-.004l7.01.437v16.701l-7.01-.437a570.349 570.349 0 0 0-71.066.004l-6.937.433v-16.7Z"
    />
    <path
      fill="#883308"
      d="M21.165 17.703v3.794l-8.67-3.255.206-.012 6.73-.421a586.54 586.54 0 0 1 1.734-.106ZM97.506 18.25l-8.671 3.254V17.71l1.662.101 6.805.424c.068.006.136.01.204.013Z"
    />
    <defs>
      <linearGradient
        id="rare-ribbon-a"
        x1={0}
        x2={21.165}
        y1={13.124}
        y2={13.124}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE60" />
        <stop offset={1} stopColor="#FABF33" />
      </linearGradient>
      <linearGradient
        id="rare-ribbon-b"
        x1={88.835}
        x2={110}
        y1={13.124}
        y2={13.124}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE60" />
        <stop offset={1} stopColor="#FABF33" />
      </linearGradient>
      <linearGradient
        id="rare-ribbon-c"
        x1={12.494}
        x2={97.507}
        y1={9.122}
        y2={9.122}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE60" />
        <stop offset={1} stopColor="#FABF33" />
      </linearGradient>
    </defs>
  </svg>
);