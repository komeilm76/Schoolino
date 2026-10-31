# Quality standards

Run bun run check before delivery: strict typecheck, ESLint, Prettier check, Vitest and Vite production build. Run bun audit after dependency changes; keep one frozen Bun lockfile. CI runs both gates.

Changes to approved visual components require browser geometry regression at 320, 360, 390, 768, 800, 801, 1024, 1100, 1440, 1568 and 1920 pixels. The default browser suite uses reduced motion for stable screenshots and checks all five callout anchors, viewport bounds and pairwise overlap. It also verifies route reload/history, Escape dismissal, return focus, mobile menu, form validation and SPA navigation.

Use semantic headings/landmarks, explicit labels, button/link semantics, visible focus and meaningful alternative text. Name dialogs and do not intercept browser history twice. Respect reduced motion. Do not claim a complete WCAG audit or Lighthouse score without running one.

Use typed props/emits, no explicit any, local state unless sharing is genuinely needed, and documented composables. No runtime remote imagery, persistent animation loops, analytics or backend simulation. Assets and test screenshots must not pollute Git with generated browser artifacts.
