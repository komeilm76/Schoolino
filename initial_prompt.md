# Schoolino — Project Execution Master Prompt

## 1. Project Overview

You are a Senior Frontend Engineer, UI/UX Designer, Design System Architect, Motion Designer, and Technical Project Manager.

Your mission is to design and develop **Schoolino**, a modern, visually outstanding educational website focused on teaching and learning.

This project is a challenge: the goal is to deliver a high-quality demo with exceptional UI/UX, professional animations, excellent responsiveness, clean architecture, and maintainable code in a short development timeframe.

Do not treat this as an ordinary landing page. Approach it as the foundation of a future educational platform that could become a production-ready product.

### Project Identity

- Project name: Schoolino
- Product category: Online Education / E-Learning
- Current delivery: Frontend-only demo
- Initial scope: Main landing page
- Design quality target: Premium, modern, polished, and memorable
- Development priority: Quality + Speed + Maintainability
- Future objective: Expand into a complete educational platform

### Reference Websites

**Product and content reference:**
https://ino.school/

Study its educational business model, content organization, navigation, landing-page sections, teaching presentation, teachers, grades, educational plans, and FAQ structure.

Use it as inspiration for Schoolino's information architecture and educational experience.

**UI/UX and design intelligence reference:**
https://uupm.cc/

Study its design intelligence, UI styles, color systems, typography combinations, landing-page patterns, animation guidelines, accessibility rules, and technology-specific recommendations.

Use its design principles to make informed design decisions.

Important:
- Do not copy either website.
- Do not reproduce their branding, logos, or exact layouts.
- Create an original Schoolino identity.
- Combine the educational experience of Ino with a superior, contemporary design approach.

---

# 2. Mandatory Technology Stack

Use the following technologies:

| Technology | Purpose |
|---|---|
| Vue 3 | Frontend framework |
| TypeScript | Strictly typed development |
| Bun | Runtime and package manager |
| Vite | Development server and bundler |
| Vuetify | UI components and theming |
| Tailwind CSS | Utility-first styling |
| Vitest | Unit and component testing |
| Vue DevTools | Development inspection and debugging |
| VueUse | Reusable Vue utilities |
| @vueuse/motion | Declarative animations |
| JSDoc | Code documentation |

### Additional Tools and Libraries

Research and select additional libraries where they provide meaningful value.

Consider:

- GSAP: Advanced timelines and scroll-driven animations.
- Lenis: Smooth scrolling, if it improves the experience.
- Iconify: Consistent, professional iconography.
- VueUse: Scroll tracking, intersection observers, and reactive utilities.
- Vue Router: Only if the project architecture needs routing.
- Pinia: Only when shared application state justifies it.
- Zod: Typed validation for future-ready data structures.
- ESLint + Prettier: Code quality and formatting.

Do not install every available library.

Evaluate compatibility, bundle size, maintenance status, performance, and integration complexity before selecting additional dependencies.

### Technology Rules

1. Use Vue 3 Composition API and `<script setup lang="ts">`.
2. Enable TypeScript strict mode.
3. Avoid `any` and unnecessary type assertions.
4. Prefer reusable, strongly typed components.
5. Use Bun for package management and scripts.
6. Use Vitest for meaningful automated tests.
7. Document public utilities, composables, and complex functions with JSDoc.
8. Avoid unnecessary dependencies and duplicated functionality.
9. Keep Vuetify and Tailwind responsibilities clearly separated.
10. Use the official, currently compatible integration methods for all dependencies.

---

# 3. Development Strategy

Development MUST be divided into clearly defined phases.

Do not skip phases.

## PHASE 0 — Research, Architecture & Planning

<mandatory>This phase must be completed before implementation begins.</mandatory>

The objective is to establish a complete technical, visual, and organizational foundation.

Do not start building the website immediately.

### 0.1 — Repository and Environment Inspection

Inspect the existing project before making changes.

Determine:

- Current repository structure.
- Existing technologies and dependencies.
- Existing configuration files.
- Available scripts.
- Existing design assets.
- Current development environment.
- Potential technical conflicts.

If the repository is empty, establish an appropriate project structure.

Do not overwrite existing work without understanding its purpose.

### 0.2 — Reference Website Research

Perform a detailed analysis of both reference websites.

For Ino:
- Information architecture.
- Navigation and header.
- Hero section.
- Educational content organization.
- Grade selection.
- Teacher presentation.
- Pricing and subscription presentation.
- FAQ structure.
- Footer and conversion sections.
- Responsive behavior.
- Interactive elements and animations.

For UI UX Pro Max:
- Recommended UI styles.
- Education-related color palettes.
- Typography combinations.
- Landing-page structures.
- Component design principles.
- Animation and motion guidelines.
- Accessibility recommendations.
- Responsive design principles.
- UX anti-patterns.

Do not limit research to the initial homepage viewport.

Inspect relevant sections, interactions, and mobile layouts where possible.

Record useful findings and explain how each finding influences Schoolino.

### 0.3 — Product Definition

Define:

- Product vision.
- Target audience.
- Main user personas.
- Primary user problems.
- Value proposition.
- Website objectives.
- Primary conversion actions.
- Brand personality.
- Product positioning.

Consider students, parents, and teachers as potential audiences.

Prioritize the student and parent experience for the initial landing page.

### 0.4 — Design Research and Design System

Create an original Schoolino design direction.

Define:

**Color system**
- Primary color.
- Secondary color.
- Accent color.
- CTA color.
- Background colors.
- Surface colors.
- Text hierarchy.
- Border colors.
- Semantic colors.

**Typography**
- Persian typography.
- English typography.
- Heading scale.
- Body text scale.
- Font weights.
- Line heights.

**Visual language**
- Border radius.
- Shadows.
- Card styles.
- Buttons.
- Inputs.
- Navigation.
- Section spacing.
- Grid system.
- Iconography.
- Illustration style.

Consider Persian-first RTL design because the primary content reference is Persian.

Choose suitable Persian fonts and verify their rendering quality.

Design both light and dark themes if this can be achieved without compromising the initial delivery.

Document all design tokens.

### 0.5 — Animation Strategy

Animations are a major part of Schoolino's identity.

Create a consistent motion system.

Consider:

- Hero entrance animations.
- Scroll-triggered section reveals.
- Staggered card animations.
- Animated statistics.
- Interactive grade cards.
- Teacher card hover effects.
- Smooth FAQ expansion.
- Navigation transitions.
- Floating decorative elements.
- Parallax effects where appropriate.
- Scroll-progress indicators.
- Section-specific transitions.

Use `@vueuse/motion` as the primary declarative animation solution.

Use GSAP only when a specific animation requires its advanced capabilities.

Use Lenis only if smooth scrolling improves the experience and does not conflict with native scrolling or accessibility.

Define:
- Animation durations.
- Easing functions.
- Stagger timing.
- Motion hierarchy.
- Scroll activation thresholds.
- Reduced-motion behavior.

Important animation rules:

1. Animations must serve usability and visual storytelling.
2. Never animate everything simultaneously.
3. Avoid excessive motion and distracting effects.
4. Avoid unnecessary layout shifts.
5. Keep interactions responsive.
6. Respect `prefers-reduced-motion`.
7. Optimize animations for mobile devices.
8. Do not sacrifice performance for visual effects.

### 0.6 — Technical Architecture

Design the frontend architecture for both the current demo and future development.

The current implementation must remain entirely client-side.

However, components and data structures must be ready for future API integration.

Define:
- Folder structure.
- Component architecture.
- Page architecture.
- Composables.
- Static data organization.
- Type definitions.
- Theme architecture.
- Animation utilities.
- Error handling.
- Testing strategy.
- Asset management.

Separate content data from presentation components.

Do not hardcode educational content directly into large components.

Create typed static data sources for:
- Teachers.
- Educational grades.
- Pricing plans.
- FAQ items.
- Features.
- Testimonials.
- Statistics.

Future backend integration must not require rewriting the entire UI.

### 0.7 — Documentation

Create a documentation directory.

At minimum, prepare:

| Document | Description |
|---|---|
| `PROJECT_OVERVIEW.md` | Vision, scope, objectives, and boundaries |
| `RESEARCH.md` | Reference website research and findings |
| `PRODUCT_REQUIREMENTS.md` | Functional and non-functional requirements |
| `DESIGN_SYSTEM.md` | Colors, typography, components, and design tokens |
| `ANIMATION_GUIDELINES.md` | Motion system and animation rules |
| `ARCHITECTURE.md` | Technical architecture and folder structure |
| `TECH_STACK.md` | Selected dependencies and technical decisions |
| `ROADMAP.md` | Development phases and milestones |
| `TASKS.md` | Detailed implementation tasks and acceptance criteria |
| `QUALITY_STANDARDS.md` | Coding, testing, accessibility, and performance rules |
| `DECISIONS.md` | Important technical and design decisions |

You may create additional documents when necessary.

Documentation must be actionable, not generic.

### 0.8 — Task Breakdown and Milestones

Break the project into small, verifiable tasks.

Every task must include:

- Unique ID.
- Description.
- Priority.
- Dependencies.
- Expected output.
- Acceptance criteria.
- Completion status.

Define milestones for:

1. Project foundation.
2. Design system.
3. Shared components.
4. Main page sections.
5. Animations and interactions.
6. Responsive optimization.
7. Testing and quality assurance.
8. Final demo delivery.

### 0.9 — Phase 0 Completion Gate

Before beginning Phase 1, verify:

- [ ] Both reference websites have been researched.
- [ ] Product requirements are documented.
- [ ] Design direction is established.
- [ ] Color and typography systems are defined.
- [ ] Animation strategy is documented.
- [ ] Technical architecture is approved.
- [ ] Dependencies are selected and justified.
- [ ] Folder structure is planned.
- [ ] Roadmap is created.
- [ ] Tasks and acceptance criteria are defined.
- [ ] Quality standards are documented.
- [ ] Technical risks are identified.

At the end of Phase 0, provide a concise research and planning report.

Do not wait for unnecessary approval if all decisions are reversible and clearly justified.

However, ask before irreversible actions or major architectural decisions with significant long-term consequences.

---

# 4. PHASE 1 — Schoolino Landing Page Demo

After Phase 0 is completed, begin implementation.

### Phase 1 Scope

Build ONE complete, polished, responsive main landing page.

This is a frontend-only demonstration.

There must be no backend dependency.

Use realistic static data.

Do not implement authentication, payment processing, server APIs, or real user accounts.

### 4.1 — Header and Navigation

Create a premium responsive navigation system.

Include:
- Schoolino logo and identity.
- Main navigation links.
- Grades.
- Teachers.
- Educational plans.
- FAQ.
- Login or student-area CTA (visual demo only).
- Primary conversion CTA.

Requirements:
- Sticky or intelligently transitioning header.
- Transparent-to-solid behavior when scrolling, if suitable.
- Mobile navigation drawer.
- Smooth anchor navigation.
- Active section indication.
- Professional hover and click interactions.

### 4.2 — Hero Section

The hero section must create a strong first impression.

Include:
- A powerful educational headline.
- Supporting description.
- Primary CTA.
- Secondary CTA.
- Attractive educational imagery or original illustrations.
- Supporting decorative elements.
- Meaningful motion.

Make this section visually memorable.

Avoid generic template-style hero layouts.

### 4.3 — Educational Grades

Create a visually attractive grade-selection section.

Include three educational levels:

1. Elementary School.
2. Middle School.
3. High School.

Represent the appropriate grades within each level.

Use interactive cards with:
- Grade information.
- Short descriptions.
- Visual differentiation.
- Hover animations.
- Clear navigation or selection feedback.

Use realistic Persian educational content.

### 4.4 — Why Schoolino?

Explain the platform's value proposition.

Include educational benefits such as:
- Structured learning.
- Experienced teachers.
- Video lessons.
- Practice and exercises.
- Exam preparation.
- Learning progress.
- Flexible learning schedules.

Use a visually engaging component layout.

### 4.5 — Teachers Section

Create a professional teacher showcase.

Each teacher card should include:
- Portrait.
- Name.
- Subject.
- Educational specialization.
- Short biography.
- Rating or experience (only when presented as clearly illustrative demo data).
- Interactive hover states.

Use consistent, high-quality imagery.

Avoid random image placeholders or broken image URLs.

### 4.6 — Statistics and Trust Section

Showcase platform statistics.

Examples:
- Number of students.
- Number of teachers.
- Number of lessons.
- Learning hours.

Use animated counters when they enter the viewport.

All statistics must be clearly understood as demo content, not real Schoolino business claims.

### 4.7 — Educational Plans and Pricing

Create a visually appealing pricing section.

Include multiple subscription plans.

Each plan should have:
- Plan name.
- Price.
- Duration.
- Included features.
- CTA.
- Visual distinction.

Include a recommended plan where appropriate.

Use static demonstration pricing.

Do not connect to a payment gateway.

Make plan comparison easy to understand.

### 4.8 — Testimonials

Create a student/parent feedback section.

Include:
- User image or avatar.
- Name.
- Role.
- Feedback.
- Optional rating.
- Carousel or other appropriate presentation.

Use clearly illustrative demo testimonials.

### 4.9 — FAQ Section

Build an interactive FAQ accordion.

Use static content covering:
- What is Schoolino?
- How does learning work?
- Which grades are supported?
- Who are the teachers?
- What is included in subscription plans?
- How can students get started?
- How can parents contact support?

Ensure smooth transitions and accessible keyboard interaction.

### 4.10 — Final CTA

Create a visually distinctive conversion section.

Encourage students to start learning.

Include an attractive headline, supporting content, and a clear CTA.

### 4.11 — Footer

Include:
- Schoolino branding.
- Short product description.
- Quick links.
- Educational categories.
- Contact information placeholders.
- Social media links.
- Copyright information.

Do not invent real company addresses or contact details.

---

# 5. Design and UI/UX Quality Standards

The visual quality of the project is one of the most important acceptance criteria.

Target a premium educational brand rather than a generic SaaS template.

### Design Principles

- Strong visual hierarchy.
- Excellent color contrast.
- Consistent spacing.
- Professional typography.
- Balanced whitespace.
- Consistent border radii.
- High-quality illustrations and images.
- Clear CTA hierarchy.
- Meaningful component interactions.
- Carefully designed responsive layouts.

### Avoid

- Generic template appearance.
- Excessive glassmorphism.
- Too many gradients.
- Random colors.
- Emoji-based iconography.
- Inconsistent shadows.
- Oversized typography without hierarchy.
- Unnecessary decorative elements.
- Excessive animation.
- Crowded sections.
- Repeated identical card layouts throughout the page.

Every section should have its own visual identity while remaining part of one coherent design system.

### Responsive Design

Support and test:

- Small mobile devices.
- Standard mobile devices.
- Tablets.
- Laptops.
- Desktop monitors.
- Wide desktop screens.

Do not simply shrink desktop layouts.

Design appropriate mobile experiences.

### Accessibility

Follow WCAG 2.2 AA principles where applicable.

Include:
- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Accessible forms and controls.
- Sufficient contrast.
- Appropriate ARIA attributes.
- Reduced-motion support.
- Meaningful image alternatives.

---

# 6. Performance and Engineering Standards

The demo must be visually rich without becoming unnecessarily heavy.

Prioritize:
- Fast initial rendering.
- Optimized images.
- Lazy-loaded non-critical imagery.
- Efficient component rendering.
- Minimal unnecessary dependencies.
- Efficient scroll observers.
- Proper event cleanup.
- Avoiding layout shifts.
- Efficient animations.

Use CSS transforms and opacity for animation whenever possible.

Avoid unnecessary JavaScript scroll listeners.

Use Intersection Observer or VueUse utilities where appropriate.

Do not introduce complex infrastructure for a static demo.

### Code Quality

- Use strict TypeScript.
- Avoid duplicated code.
- Keep components small and focused.
- Use clear naming conventions.
- Use reusable composables.
- Document complex logic with JSDoc.
- Keep content separate from presentation.
- Maintain consistent formatting.
- Ensure meaningful test coverage.

### Testing

Use Vitest.

At minimum, test:
- Static data integrity.
- Reusable utility functions.
- Important composables.
- Interactive component behavior.
- FAQ expansion.
- Grade selection.
- Pricing selection or CTA interactions.

Do not write meaningless tests merely to increase test counts.

Run type checking, linting, build verification, and tests before final delivery.

---

# 7. Future-Ready Requirements

Although Phase 1 is frontend-only, the project must be designed with future expansion in mind.

Potential future modules:

- Student dashboard.
- Teacher dashboard.
- Parent dashboard.
- Authentication and authorization.
- Course management.
- Video learning.
- Online examinations.
- Homework and exercises.
- Learning progress.
- Subscription management.
- Payment integration.
- Notifications.
- Educational analytics.
- Admin dashboard.

Do not implement these modules now.

Only establish architecture and reusable patterns that will make future implementation straightforward.

Never simulate a working backend when none exists.

All demo interactions must have clear, honest behavior.

---

# 8. Development Workflow and Agent Rules

Follow this workflow:

1. Inspect the project.
2. Research the references.
3. Define requirements.
4. Establish the design system.
5. Define architecture.
6. Create documentation.
7. Break work into tasks.
8. Verify the Phase 0 completion gate.
9. Implement Phase 1 incrementally.
10. Test every major milestone.
11. Perform visual and responsive QA.
12. Deliver the finished demo and final report.

### Agent Behavior

- Work autonomously on clearly defined, reversible tasks.
- Do not ask unnecessary questions.
- Do not stop after generating documentation.
- Do not claim a feature is implemented unless it actually works.
- Do not leave broken interactions.
- Do not leave unfinished sections.
- Do not use placeholder content where meaningful demo content is expected.
- Update `TASKS.md` as work progresses.
- Record important decisions in `DECISIONS.md`.
- Keep documentation synchronized with implementation.
- Report blockers honestly.
- Prefer simple, reliable solutions over unnecessary complexity.

If a design or technical decision is uncertain, research it, compare alternatives, and document the chosen solution.

---

# 9. Final Quality Assurance and Acceptance Criteria

The project is considered complete only when the following conditions are satisfied.

### Product

- [ ] Schoolino has a recognizable visual identity.
- [ ] All required landing-page sections are implemented.
- [ ] Educational content is realistic and consistent.
- [ ] Static data is organized and typed.
- [ ] All visible interactions work.

### UI/UX

- [ ] Design looks premium and professionally crafted.
- [ ] Colors and contrast are consistent.
- [ ] Typography is polished.
- [ ] Layouts are responsive.
- [ ] Animations are smooth and purposeful.
- [ ] Scroll-based interactions work correctly.
- [ ] Mobile navigation works.
- [ ] Accessibility requirements are considered.

### Engineering

- [ ] Vue 3 and TypeScript are configured correctly.
- [ ] Bun and Vite work correctly.
- [ ] Vuetify and Tailwind coexist without styling conflicts.
- [ ] Vue DevTools is configured for development.
- [ ] Vitest runs successfully.
- [ ] Type checking passes.
- [ ] Production build succeeds.
- [ ] No critical console errors.
- [ ] No broken assets or links.
- [ ] No unnecessary backend dependencies.

### Documentation

- [ ] Phase 0 documents are complete.
- [ ] Architecture matches the implementation.
- [ ] Roadmap is updated.
- [ ] Tasks reflect actual completion.
- [ ] Setup and development instructions are available.

### Visual QA

Inspect the finished website at multiple viewport sizes.

Review:
- Header.
- Hero.
- Every content section.
- Transitions between sections.
- Hover and focus states.
- Mobile navigation.
- Footer.
- Loading behavior.
- Animation performance.

Fix identified issues before delivery.

---

# 10. Final Deliverables

At the end of the project, provide:

1. Complete Schoolino source code.
2. Working local development environment.
3. Production build.
4. Complete Phase 0 documentation.
5. Updated roadmap and task list.
6. Design system documentation.
7. Animation documentation.
8. Testing results.
9. Final QA report.
10. Summary of implemented features.
11. Known limitations and future recommendations.

Also provide the exact commands required to install dependencies, start development, run tests, and build the project.

---

# 11. Definition of Success

Our objective is not simply to build a website that works.

We want to build a website that makes people immediately notice the quality of its design.

When someone opens Schoolino, the first impression should be:

- This looks like a professional educational product.
- The design is modern and distinctive.
- The animations feel natural and intentional.
- The content is organized and easy to understand.
- The experience works beautifully on mobile and desktop.
- The product feels ready to evolve into a real platform.

Aim for a five-star UI/UX experience.

Treat every detail as important.

**Build Schoolino as if it were going to be presented to a professional design jury and potential investors.**

Do not sacrifice quality for speed. Instead, use intelligent planning, reusable architecture, focused implementation, and efficient tooling to achieve both.

# START HERE

Begin with **PHASE 0 — Research, Architecture & Planning**.

Inspect the repository and both reference websites.

Create the documentation, establish the design direction, define the technical architecture, and prepare the complete roadmap and task breakdown.

Only after Phase 0 is complete should you begin implementing Phase 1.

Let's build something exceptional.

**Project: Schoolino — Learn Better. Grow Further.**
