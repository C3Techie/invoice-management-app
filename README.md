# Frontend Wizards — Stage 2: Invoice Management App

A professional, high-fidelity Invoice Management Application built for the HNG Stage 2 Task. This application provides full CRUD functionality, theme switching, and robust data persistence.

## 🚀 Live Demo
[Insert your Vercel/Netlify URL here]

## 🛠 Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (v4)
- **State Management**: React Context API
- **Persistence**: LocalStorage (Browser-based persistence)
- **Icons**: Lucide React / Custom SVGs
- **Typography**: League Spartan

## ✨ Key Features
- **Full CRUD**: Create, Read, Update, and Delete invoices with a seamless UI.
- **Status Management**: Support for **Draft**, **Pending**, and **Paid** statuses with strict state transition logic.
- **Form Validation**: Real-time validation for client details, items, and numeric values.
- **Filtering**: Efficiently filter your list by invoice status.
- **Dark/Light Mode**: Fully theme-aware components with smooth transitions and persistent user preference.
- **Responsive Design**: Pixel-perfect layouts for Mobile (320px+), Tablet (768px+), and Desktop (1024px+).

## 🏗 Architecture
The project follows a modular component-based architecture:
- **`src/components/ui/`**: Atomic, reusable UI components (Buttons, Inputs, DatePicker, etc.).
- **`src/contexts/`**: Global state management via `InvoiceContext`, handling all data operations and persistence logic.
- **`src/lib/utils/`**: Helper functions for formatting dates, currency, and initializing sample data.
- **`src/types/`**: Centralized TypeScript interfaces for consistent data structures.

## 🏗 Trade-offs & Decisions
- **LocalStorage**: Chosen for its Zero-Configuration setup while meeting the "Persistence" requirement for Stage 2. It ensures the app is fully functional without needing a live secondary server.
- **Tailwind CSS Polyfills**: Used custom utility classes for specialized design system properties (e.g., specific Spartan line-heights and tracking).
- **Control over UI**: Opted for custom components (Selects, DatePickers) rather than standard HTML elements to ensure 100% fidelity to the provided Figma design.

## ♿ Accessibility Notes
- **Semantic HTML**: Used proper `<button>`, `<label>`, and heading hierarchies throughout.
- **Keyboard Navigation**:
    - **ESC Key**: Both the Invoice Form and Delete Confirmation Modal support the Escape key for quick exit.
    - **Focus Management**: Modals are implemented with visibility toggles that respect the document flow.
- **Color Contrast**: All colors and theme transitions meet WCAG AA contrast standards.

## 🏁 Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/invoice-management-app.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
