# AdaptiveLearn AI

A React/Vite demonstration of an adaptive learning dashboard for the University of the Cumberlands MSAI-631-A02 Week 7 project.

## Features
- Three topics and short multiple-choice practice questions
- Topic-specific performance tracking during the current browser session
- Rule-based recommendations: foundational review below 60%, practice below 80%, advanced material at 80% or above
- Dark/light theme and compact layout
- Responsive layout, keyboard focus indicators, and visible quiz feedback
- Reset control for repeatable demonstrations

## Important scope note
This prototype uses transparent, rule-based adaptation. It does not train a machine-learning model or call an external AI service. It demonstrates adaptive UI behavior based on user interactions and is best described as an AI-related/AI-inspired prototype, not a trained AI system.

## Run locally
Requirements: Node.js and npm.
1. Extract the ZIP.
2. Open a terminal in this folder.
3. Run `npm install` (PowerShell workaround: `npm.cmd install`).
4. Run `npm run dev` (PowerShell workaround: `npm.cmd run dev`).
5. Open the local URL printed in the terminal, usually http://localhost:5173/.

## Build
Run `npm run build` or `npm.cmd run build` in PowerShell.

## Suggested manual tests
1. Answer a question correctly; inspect score and recommendation.
2. Reset, answer incorrectly, and check whether the recommendation changes for that topic.
3. Change topics and verify separate topic scores.
4. Toggle dark mode and compact layout.
5. Test keyboard navigation and a narrow browser window.
6. Capture screenshots and record actual results. Do not claim tests passed until you run them.

## AI-tool disclosure
ChatGP was used in brainstorming, code construction and fixing. the rest f the work was done by me.

