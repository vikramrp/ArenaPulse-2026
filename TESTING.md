# ArenaPulse 2026 Testing Guide

This document describes the automated testing framework built for the **ArenaPulse 2026** stadium operations platform.

---

## 🛠️ Testing Stack & Tools
The project utilizes a modern, CI-friendly, high-performance testing stack:
- **Vitest** (Native ES/TS-powered test runner)
- **React Testing Library** (User-centric DOM testing)
- **jsdom** (Lightweight browser emulation)
- **@vitest/coverage-v8** (High-fidelity statement, branch, line, and function coverage analyzer)
- **helmet** (Secured HTTP responses against injection/XSS vectors)

---

## 📂 Folder Structure
Tests are organized logically adjacent to or within component boundaries:
```bash
/applet
├── .github/workflows/ci.yml # Automated GitHub Actions Pipeline
├── vitest.config.ts         # Vitest & Coverage Configuration
├── src
│   ├── test
│   │   ├── setup.ts         # Web Speech and Browser environment mocks
│   │   ├── security.test.ts # Server input validation & sanitization checks
│   │   └── accessibility.test.ts # Landmark and layout accessibility checks
│   └── components
│       └── __tests__
│           ├── MetricsPanel.test.tsx      # Core statistics dashboard tests
│           ├── StadiumMap.test.tsx        # Interactive SVG map & keyboard navigation tests
│           ├── MatchupDashboard.test.tsx  # Star players, OVR ratings & Live match simulator tests
│           └── ProposalViewer.test.tsx    # Slide decks, navigation, and strategy pitch tests
```

---

## 🧪 Test Coverage & Validated Suites

### 1. Unit & Component Tests
- **Metrics Panel**: Validates the visual render of telemetry statistics (Staff Efficiency, Response Time, Carbon Saved), empty states, warning vs stable operations, and clear functionality.
- **Stadium Map**: Assures the rendering of high-fidelity responsive SVG path stadium sectors (stands, pitch, plazas, concourses) and correct interaction tracking.
- **Matchup Dashboard**: Assures display of accurate OVR ratings, positional values, flags, and names of star players (e.g., Mbappé, Hakimi) across teams, and dynamic live action event simulation.
- **Proposal Viewer**: Verifies full deck slides (Core Strategy, Problem Statement, Innovation, Accessibility Slides) can be traversed smoothly.

### 2. Accessibility (WCAG 2.2 AA) Tests
- **Landmarks**: Ensures the presence of a responsive **Skip to Main Content** link target (`#main-content`) with keyboard shortcuts focus indicators.
- **Screen Reader Alerts**: Checks active live announcements regions (`aria-live="polite"`) configured for real-time operations updating.
- **Descriptive Labels**: Ensures proper ARIA label associations on theme togglers and override fields.
- **Keyboard navigation**: Tests standard keystrokes (`Enter` and `Space`) on the interactive stadium sectors so non-pointer devices can access status drilldowns seamlessly.

### 3. Security & Input Sanitization Tests
- **XSS & HTML Injection**: Confirms server-side escaping algorithms correctly transform dynamic content characters (e.g., `&`, `<`, `>`, `"`, `'`, `/`) preventing malicious script runs.
- **Input Boundaries**: Tests bounds constraints on telemetry overrides and customized instructions inputs (maxLength warnings, empty blocks, required validations).

---

## 🚀 Running Tests Locally

### Run All Tests (Once)
```bash
npm run test
```

### Run in Live Watch Mode
```bash
npm run test:watch
```

### Generate Code Coverage Reports
Produces comprehensive line-by-line coverage analysis reports:
```bash
npm run test:coverage
```
*Outputs coverage summary direct to the terminal console and generates detailed HTML interactive reports inside the `/coverage/index.html` directory.*
