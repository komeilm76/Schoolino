# Approved design system

The SPA migration does not redesign these tokens or replace artwork.

| Role            | Value                         |
| --------------- | ----------------------------- |
| Page background | #001329                       |
| Surface         | #061e3e                       |
| Primary/cyan    | #00dce5                       |
| Vuetify primary | #00d9ed                       |
| Border          | #173d85                       |
| Main text       | #f5f5ff                       |
| Secondary text  | #c9c9e6                       |
| Font            | Local Vazirmatn, 400 and 700  |
| Service radius  | 15px                          |
| Buttons         | pill, outlined or cyan-filled |

Source of truth for actual responsive values: src/style.css. Desktop uses the existing 1392px maximum content area, two-column hero and three service columns; at 800px and below it reflows to stacked sections. Additional breakpoints 360, 400, 950, 1100, 1450 and 1600 preserve refined spacing. Orbit callouts share an intrinsic 1200×896 illustration stage and never animate.

Custom CSS owns approved geometry; Vuetify owns dialog/form components and the RTL dark theme. Tailwind handles small utility spacing already present (e.g. mt-6, mb-6) and the new 404 layout. Do not add VApp wrappers or global resets that change established geometry.
