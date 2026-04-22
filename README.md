# Invoice Management App

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

A full-stack, responsive Invoice Management Application built with React, TypeScript, and Tailwind CSS. This project allows users to create, read, update, delete, and manage invoices with a clean, intuitive, and responsive interface.

**[Live Demo](https://your-live-url.com)** | **[Figma Design](https://www.figma.com/design/gwFg2uPHE2VRvl7ppb47hq/invoice-app--Copy-?node-id=0-1&t=XomI3ZoEvvUEC4kf-1)**

*(suggestion: add a screenshot of your app named `screenshot.png`)*

## Features

- **Full CRUD Functionality**: Create, Read, Update, and Delete invoices.
- **Advanced Form Handling**: Includes robust client-side validation with clear error states.
- **Invoice Statuses**: Mark invoices as `Paid` or save them as `Drafts` for later.
- **Dynamic Filtering**: Filter the invoice list by status (`Draft`, `Pending`, `Paid`).
- **Light/Dark Mode**: A seamless theme-switching experience that persists in `localStorage`.
- **Responsive Design**: A mobile-first design that adapts perfectly to tablet and desktop screens.
- **Interactive Elements**: All interactive elements have clear hover and focus states for a better user experience.
- **Data Persistence**: Invoice data is saved and persisted using `localStorage`.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) (v18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Routing**: [React Router](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## Architecture

The application follows a modern component-based architecture, promoting reusability and separation of concerns.

- **`src/pages`**: Contains the main pages of the application, such as `InvoiceListPage` and `InvoiceDetailPage`.
- **`src/components`**: Holds reusable components used across the application, like `InvoiceForm`, `StatusBadge`, and the `ui` components from `shadcn/ui`.
- **`src/lib/contexts`**: Manages global state using React's Context API. `InvoiceContext` handles all invoice data and CRUD operations, while `ThemeContext` manages the light/dark mode.
- **`src/lib/utils.ts`**: Utility functions, including the `cn` function for merging Tailwind classes.
- **`src/types`**: Contains all TypeScript type definitions and interfaces for the project.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your-username/invoice-management-app.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd invoice-management-app
    ```
3.  **Install dependencies**
    ```sh
    npm install
    ```
4.  **Start the development server**
    ```sh
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## Accessibility

Accessibility was a top priority in this project.

- **Semantic HTML**: The application uses correct HTML5 semantic elements to structure the content.
- **Keyboard Navigation**: All interactive elements are fully accessible via keyboard.
- **Focus Management**: The modal dialog traps focus, ensuring that users cannot interact with the content underneath. It can also be closed by pressing the `ESC` key.
- **Labels and ARIA**: All form inputs are associated with a `<label>`, and ARIA attributes are used where necessary to enhance accessibility.
- **Color Contrast**: The color palette for both light and dark modes was chosen to meet WCAG AA contrast standards.

## Trade-offs and Decisions

- **State Management**: React Context was chosen for global state management (invoices, theme) because it is built into React and sufficient for the scale of this application. For a larger application with more complex state interactions, a library like Redux or Zustand might be a better fit.
- **Data Persistence**: `localStorage` was used for simplicity and to meet the project requirements. In a real-world, multi-user application, a dedicated backend with a database would be necessary to handle data persistence, authentication, and synchronization.

---

Built by [C3Techie](https://github.com/C3Techie).

## Screenshots

### Invoice List
![Invoice List](public/assets/Desktop%20Invoices.png)

### View Invoice
![View Invoice](public/assets/Desktop%20View%20Invoice.png)

### Create Invoice Form
![Create Invoice Form](public/assets/Desktop%20Create%20Invoice.png)
