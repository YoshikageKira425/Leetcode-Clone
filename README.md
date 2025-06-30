# Leetcode-Clone

A minimal Leetcode-style coding playground built with React, Vite and the Monaco editor.  
Scratch your coding itch locally, track your progress and run tests—all in one place.

## 🚀 Quick Start

1. **Clone**  
   ```bash
   git clone https://github.com/YoshikageKira425/Leetcode-Clone.git
   cd Leetcode-Clone


2. **Install**

   ```bash
   npm install
   ```

3. **Dev Server**

   ```bash
   npm run dev
   ```

   Open your browser at `http://localhost:5173` (or whatever Vite tells you).

4. **Build for Production**

   ```bash
   npm run build
   ```

## 🛠️ Features

* **Problem Browser**
  Browse, filter and select coding challenges.
* **In-browser Code Editor**
  Powered by [Monaco Editor](https://github.com/microsoft/monaco-editor).
* **Run**
  Hit “Run” to execute your code.
* **Routing**
  Single-page app with React Router (problem list → individual problem → results).
* **Tailwind CSS**
  Utility-first styling; tweak `src/Style/input.css` → `src/Style/output.css`.

## 📁 Project Structure

```
.
├── public/                 Static assets & `index.html`
├── src/
│   ├── components/         Reusable React components
│   ├── pages/              Views (ProblemList, ProblemDetail, etc.)
│   ├── services/           API calls, test runners
│   ├── Style/              Tailwind input/output CSS
│   ├── App.jsx             Root component & routes
│   └── main.jsx            Vite entry point
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Scripts

* `npm run dev` — start Vite dev server
* `npm run build` — bundle for production
* `npm run preview` — serve built files locally
* `npm run lint` — run ESLint
* `npm run watch` — rebuild Tailwind CSS on change

## 💡 Tech Stack

* **Framework**: React 19
* **Bundler**: Vite
* **Editor**: @monaco-editor/react
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
