<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 22 })
const paths: Record<string, string> = {
  arrow: 'M19 12H5m7 7-7-7 7-7',
  mail: 'M3 5h18v14H3z M3 5l9 8 9-8',
  education: 'm2 9 10-5 10 5-10 5L2 9Zm4 3v6c4 3 8 3 12 0v-6 M22 9v7',
  ai: 'M9 4a3 3 0 0 0-5 3 4 4 0 0 0-1 7 4 4 0 0 0 6 5V4Zm6 0a3 3 0 0 1 5 3 4 4 0 0 1 1 7 4 4 0 0 1-6 5V4ZM5 9l4 2m-4 4 4-1m6-3 4-2m-4 5 4 1',
  it: 'M5 3h14v6H5z M5 9h14v6H5z M5 15h14v6H5z M8 6h1m-1 6h1m-1 6h1m4-12h3m-3 6h3m-3 6h3',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
}
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.arrow" />
  </svg>
</template>
