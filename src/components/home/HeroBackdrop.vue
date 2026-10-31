<script setup lang="ts">
import { createWaveMesh } from '../../utils/backdrop'
const { rows, columns, particles } = createWaveMesh()
</script>

<template>
  <div class="hero-backdrop" aria-hidden="true">
    <div class="horizon-glow"></div>
    <svg class="mountain-horizon" viewBox="0 0 1568 240" preserveAspectRatio="none">
      <path
        d="M0 145 40 119 68 130 110 87 143 110 177 104 208 145 250 128 288 151 338 112 374 130 412 108 456 133 495 126 538 150 582 134 626 148 675 123 710 142 751 112 785 136 822 122 860 142 900 110 934 124 972 102 1008 121 1045 113 1091 150 1123 142 1165 154 1210 121 1247 135 1288 110 1325 133 1364 119 1402 139 1448 104 1490 124 1530 99 1568 122V240H0Z"
        fill="#06213e"
      />
      <path
        d="M0 173 67 148 110 167 157 139 211 169 267 159 324 185 382 153 437 177 497 162 550 186 617 168 674 187 737 154 794 179 850 161 913 190 971 168 1027 183 1090 160 1146 185 1204 161 1262 181 1319 157 1374 181 1435 151 1504 175 1568 153V240H0Z"
        fill="#02152b"
      />
    </svg>
    <svg class="wave-mesh" viewBox="0 0 1568 240" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient
          id="mesh-color"
          x1="0"
          y1="0"
          x2="1568"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00c9f3" />
          <stop offset=".3" stop-color="#1671ce" />
          <stop offset=".6" stop-color="#05a6c7" />
          <stop offset="1" stop-color="#00bff8" />
        </linearGradient>
        <filter id="particle-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <g stroke="url(#mesh-color)" stroke-width=".65">
        <path v-for="(d, i) in rows" :key="`row-${i}`" :d="d" :opacity="0.28 + i / 150" />
      </g>
      <g stroke="#1281b8" stroke-width=".45" opacity=".22">
        <path v-for="(d, i) in columns" :key="`column-${i}`" :d="d" />
      </g>
      <g fill="#79d5ff">
        <circle
          v-for="(p, i) in particles"
          :key="i"
          :cx="p.x"
          :cy="p.y"
          :r="p.radius"
          :opacity="p.opacity"
        />
      </g>
      <g fill="#9eeaff" filter="url(#particle-glow)">
        <circle
          v-for="(p, i) in particles.filter((p) => p.radius > 2)"
          :key="i"
          :cx="p.x"
          :cy="p.y"
          r="3"
          opacity=".75"
        />
      </g>
    </svg>
  </div>
</template>
