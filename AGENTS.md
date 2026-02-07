# Agent Guidelines for sanetomore.com

This document provides instructions for agentic coding agents working on this codebase.

## 1. Build, Lint, and Test Commands

This is a static website with no build step or automated testing framework.

*   **Build**: None required. Files are served directly.
*   **Run**: Open `index.html` in a web browser to view the site.
*   **Test**: Manual verification only.
    *   Check for console errors in the browser's developer tools.
    *   Verify responsiveness on mobile and desktop viewports.
    *   Ensure all animations (scroll, reveal, parallax) trigger correctly.
*   **Lint**: No automated linter is configured. Follow the Code Style Guidelines below strictly.

## 2. Code Style Guidelines

### General
*   **Indentation**: Use 4 spaces for HTML, CSS, and JavaScript.
*   **File Encoding**: UTF-8.
*   **Pathing**: Use relative paths for assets (e.g., `assets/profile.jpg`).

### HTML
*   **Semantics**: Use semantic HTML5 tags (`<nav>`, `<main>`, `<header>`, `<section>`, `<article>`) where appropriate.
*   **Class Naming**: Follow a BEM-like (Block Element Modifier) convention.
    *   Block: `.hero`
    *   Element: `.hero__title`
    *   Modifier: `.hero__line-text--active`
*   **Structure**:
    *   Keep the `<head>` clean with meta tags and font preloads.
    *   Place `<script>` tags at the end of the `<body>`.

### CSS (`style.css`)
*   **Variables**: Use CSS variables (`:root`) for colors and common values to maintain consistency.
    *   Example: `--bg-color`, `--accent`.
*   **Formatting**:
    *   Opening brace on the same line.
    *   One declaration per line.
    *   Group related styles (e.g., Hero, Grid Sections, Typography).
*   **Units**: Use `rem` for font sizes and spacing where possible, `px` for borders or fixed elements, and `vw`/`vh` for viewport-dependent sizing.
*   **Responsive Design**: Use media queries at the end of the file. Focus on `max-width` breakpoints (e.g., `768px`, `480px`).
*   **Effects**: Utilize `transition` and `transform` for animations. Avoid expensive properties like `top`/`left` for animation loops; use `translate` instead.

### JavaScript (`script.js`)
*   **Syntax**: Use modern ES6+ syntax.
    *   Prefer `const` and `let` over `var`.
    *   Use arrow functions `() => {}` for callbacks.
    *   Use template literals `` `...` `` for string interpolation.
*   **DOM Interaction**:
    *   Cache DOM elements using `document.querySelector` or `document.querySelectorAll` at the top of the script or function scope.
    *   Use `classList.add/remove` for state changes.
*   **Performance**:
    *   Use `IntersectionObserver` for scroll-based interactions (reveals, counters).
    *   Use `requestAnimationFrame` for smooth animations (e.g., counters).
    *   Throttle or debounce scroll event listeners if added directly to `window`.
*   **Error Handling**:
    *   Check if elements exist before accessing properties (e.g., `if (hero) { ... }`).
    *   Fail silently for UI enhancements (animations) if elements are missing.

### Assets
*   **Images**: Store in the `assets/` directory. Use descriptive filenames.
*   **Fonts**: Load from Google Fonts or local `assets/` if added. Currently using 'Manrope'.

## 3. Cursor / Copilot Rules

*   **No specific rules found in .cursor/rules/ or .github/copilot-instructions.md.**
*   **Agent Behavior**:
    *   Always read the existing file content before editing.
    *   Respect the existing indentation style (4 spaces).
    *   Do not introduce build tools (npm, webpack) unless explicitly requested.
    *   Maintain the minimal, dependency-free nature of the project.
