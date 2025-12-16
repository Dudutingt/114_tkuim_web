# Ultralytics Docs Page Development Plan

## 1. HTML Base Structure (index.html)
- [ ] **Global Layout**
  - Use semantic tags: `<header>`, `<nav>`, `<aside>`, `<main>`, `<footer>`.
  - Main container using Grid or Flexbox for the 3-column layout (Left Sidebar, Main Content, Right TOC).

- [ ] **Header Section**
  - Logo (Ultralytics)
  - Main Navigation (Home, Quickstart, Models, etc.) - "Models" active.
  - Utilities Group: Theme Toggle (Dark/Light), Language, Search Bar, GitHub Link.

- [ ] **Left Sidebar (Navigation)**
  - Scrollable vertical list.
  - Categories: YOLOv3 - YOLOv10, SAM, MobileSAM, etc.
  - Active state indicator for "Models".

- [ ] **Main Content Area**
  - Breadcrumbs styling (Home > Models).
  - H1 Title: "Models Supported by Ultralytics".
  - Intro text describing the models.
  - **Chart Section**: Place a placeholder image or similar chart using CSS/SVG for "Performance Metrics".
  - **Model List**: Numbered list with bolded Model Names (e.g., **YOLOv8**, **SAM**) and descriptions. Link styles.
  - Alert/Warning banners (e.g., "Coming Soon" styling).

- [ ] **Right Sidebar (On this page)**
  - Table of Contents.
  - Content sections: Featured Models, Getting Started, FAQ.

- [ ] **Floating Elements**
  - "Ask AI" button at bottom right (Yellow/Lime gradient with blue icon).

## 2. CSS Styling (style.css)
- [ ] **Variables & Reset**
  - Define colors:
    - Primary Blue: `#2563eb` (Links, active states)
    - Dark Text: `#1f2937`
    - Light Text: `#6b7280`
    - Background: `#ffffff`
    - Border: `#e5e7eb`
  - Font family: System UI / Inter.

- [ ] **Layout Styling**
  - Header: Fixed height, flex row, border-bottom.
  - Container: `display: grid; grid-template-columns: 240px 1fr 240px;` (Responsive adjustments needed).
  - Sticky sidebars (`position: sticky; top: var(--header-height)`).

- [ ] **Component Styling**
  - **Navigation**: Hover effects, active class styling.
  - **Typography**: H1 size, line-height, link colors (blue text, no underline unless hover).
  - **Chart**: Responsive image styling.
  - **Buttons**: "Ask AI" rounded styling with shadow.

## 3. JavaScript Functionality (script.js)
- [ ] **Interactions**
  - Search Bar: Focus effects, "Cmd+K" visual cue.
  - "Ask AI" Button: Click handler (e.g., open modal or show simple generic alert for demo).
  - Mobile Menu Toggle: (If responsive is implemented) Hamburger menu logic.
  - Scroll Spy (Optional): Highlight Right Sidebar items based on scroll position.

## 4. Assets
- [ ] Use FontAwesome or SVG for icons (GitHub, Search, Globe, Theme).
- [ ] Use placeholders for images (Chart).
