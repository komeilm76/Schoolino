# Schoolino — Project Overview

## 1. Vision

**Schoolino (اسکولینو)** is a Persian-first online learning platform for students from grade 1 to
grade 12. The long-term vision is a complete learning environment — lessons, practice, exams,
progress analytics and parent visibility — that feels calm, trustworthy and genuinely helpful
instead of loud and sales-driven.

The delivered artefact is a **single, production-quality landing page** (frontend only) that
demonstrates the brand, the product language and the engineering standards the future platform
will be built on.

## 2. Delivery scope (Phase 1)

| In scope                                                      | Out of scope                                    |
| ------------------------------------------------------------- | ----------------------------------------------- |
| One fully responsive landing page (Persian, RTL)              | Authentication, student/teacher dashboards      |
| Typed static content for every section                        | Real video streaming or content management      |
| Scroll, hover and entrance motion with reduced-motion support | Payments, subscriptions, backend APIs           |
| Light + dark themes                                           | Real accounts, emails, SMS, analytics pipelines |
| Test suite, type-checking, linting, production build          | Multi-page routing                              |

All interactive calls-to-action are **honest**: because no backend exists, they surface a clearly
worded “demo” notice instead of pretending to work (`src/composables/useDemoNotice.ts`).

## 3. Objectives

1. A first impression that reads as a _professional educational product_, not a template.
2. Realistic Persian educational content that a parent or student can navigate without effort.
3. A design system and motion system that scale to future modules (dashboards, courses, exams).
4. Engineering quality: strict TypeScript, typed content, tests, documented decisions, clean build.

## 4. Target audience

| Persona                                  | Age / role | Primary need                                              | What the page must answer                          |
| ---------------------------------------- | ---------- | --------------------------------------------------------- | -------------------------------------------------- |
| **Sara — grade 12 student**              | 17         | Pass final exams and the university entrance exam (کنکور) | “Does this actually explain my textbook?”          |
| **Maryam — parent of a grade 8 student** | 41         | Structure, oversight, and value for money                 | “Will my child keep up, and will I know about it?” |
| **Reza — konkur candidate**              | 18         | Efficient test practice and weak-point analysis           | “Is the question bank and analytics good enough?”  |
| **Amir — teacher (secondary persona)**   | 34         | Professional presentation and audience reach              | “Would I be proud to teach here?”                  |

The landing page prioritises the **student + parent** experience; the teacher perspective is served
by the teachers section and the credibility cues around it.

## 5. Value proposition

> **هر درس، یک قدم روشن‌تر به مقصد نزدیک‌تر.**
> Video lessons chapter by chapter, step-by-step exercise walkthroughs and a smart exam builder —
> arranged as one clear path from “I don’t get it” to “I can do it alone”.

Differentiators used in the copy:

- **Structure over volume** — a path per grade, not a content dump.
- **Practice by default** — every lesson is followed by a check.
- **Transparent progress** — an analytical report instead of a completion percentage.
- **Honest demo** — sample data is labelled as sample data.

## 6. Primary conversion actions

1. **شروع یادگیری** (header + hero + final CTA) — main conversion.
2. **انتخاب پایه / شروع پایه X** (grades section) — high-intent path.
3. **انتخاب پلن** (pricing) — commit path for parents.

Secondary: browsing teachers, reading the FAQ, opening the mobile drawer.

## 7. Brand personality

| Trait               | Expression in the UI                                                         |
| ------------------- | ---------------------------------------------------------------------------- |
| Calm & focused      | Warm paper canvas, generous whitespace, one accent per section               |
| Academic but modern | Persian display face (Estedad) + friendly body face (Vazirmatn)              |
| Encouraging         | Copy written in the second person, no fear-based urgency                     |
| Trustworthy         | Explicit “demo data” labels, no fake scarcity, no fake logos                 |
| Crafted             | Precise radii/shadow scale, consistent 8px spacing rhythm, purposeful motion |

Positioning: _the serious learning platform that still feels human_ — premium, not luxury; friendly,
not childish (explicitly avoiding the “balloon and confetti” children’s-app look).

## 8. Boundaries and non-goals

- No invented company address, phone number, accreditation or partner logos.
- No claims of real user numbers; statistics are labelled demo content.
- No dark patterns (no countdown timers, no fake discounts, no forced sign-up modals).
- No backend simulation: nothing pretends to persist data.

## 9. Success criteria (definition of done)

The delivery is complete when: the landing page covers every required section, works at 390px →
1920px, passes type-check + lint + tests + production build, ships the Phase 0 documentation, and
every visible control either works or explains honestly why it cannot.

See `ROADMAP.md`, `TASKS.md` and `QUALITY_STANDARDS.md` for the measurable form of these criteria,
and `QA_REPORT.md` for the final verification results.
