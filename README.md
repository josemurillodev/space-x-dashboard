# SpaceX Dashboard – Documentation & Process
## Overview

This project is a small SpaceX data dashboard built with Next.js and Tailwind CSS, focused on clarity, performance, and visual storytelling.
Rather than maximizing feature count, the goal was to explore interesting SpaceX data and present it in a playful, sci-fi–inspired interface while keeping the codebase simple and maintainable.

## 1. Architecture & Tech Stack
## Tech Stack

Next.js (App Router) – Chosen for its modern routing model, server components, and built-in data-fetching capabilities.

React 19 – Leveraged for its composability and future-proof concurrency features.

Tailwind CSS – Enabled fast iteration on layout and theming without introducing unnecessary abstraction.

Three.js + @react-three/fiber – Used to render an interactive 3D Starlink constellation, keeping the visualization logic declarative and React-friendly.

## Folder Structure (High-level)

app/ – Routes and layout using the Next.js App Router.

components/ – Reusable UI components and data cards.

lib/ – API queries, data transformation helpers, and shared utilities.

types/ – Centralized TypeScript interfaces derived from the SpaceX API schema.

This separation keeps data fetching, presentation, and visualization logic loosely coupled, making it easier to iterate or replace parts of the UI without touching core logic.

## 2. AI Usage (Transparency)

AI tools were used intentionally as accelerators, not as a replacement for reasoning or review.

DeepSeek
Used early in the project to generate boilerplate for:

- SpaceX API query structures

- Initial TypeScript interfaces

- Basic project scaffolding
I chose DeepSeek for its tendency to produce shorter, less opinionated outputs, which made it easier to adapt to my own architecture.

Gemini
Used to prototype the initial structure of the 3D Starlink visualization.
The generated code was not production-ready, but it helped establish:

- Scene setup

- Camera positioning

- Basic orbital layout

All AI-generated output was manually reviewed, simplified, and refactored to align with performance and readability goals.

## 3. Design Decisions
## Layout & Visual Direction

I wanted the dashboard to feel “explorable” rather than “analytical”, so I leaned into:

- Card-based sections for scannability

- A dark, sci-fi–inspired color palette

- Strong visual hierarchy instead of dense tables

Inspiration came from exploratory dashboards and space-themed UI patterns found on Pinterest and Dribbble.

## Starlink Visualization

The 3D Starlink view was designed as a visual anchor rather than a pure data chart.
It prioritizes:

- Spatial intuition (seeing satellites in orbit)

- Smooth interaction

- Performance over photorealism

This is why Three.js was used selectively instead of building everything as a 3D scene.

## 4. Challenges & Trade-offs
## API Limitations

- The SpaceX API data is partially outdated and sometimes inconsistent.

- Some endpoints required defensive parsing and optional chaining.

- I added minimal but clear error handling to avoid over-engineering.

## Performance vs. Features

- Charts and 3D rendering were scoped to the most impactful data points.

## If I Had More Time

- Introduce richer micro-interactions and subtle animations.

- Extract more reusable visualization primitives.

- Improve loading states and skeletons for slow network conditions.

- Add deeper “Details” views with contextual drill-downs per card.

## Closing Thoughts

This project was an exercise in decision-making under constraints:
choosing clarity over complexity, visual impact over data overload, and maintainability over premature abstraction.

The focus was not just on what was built, but why each choice made sense for the problem at hand.