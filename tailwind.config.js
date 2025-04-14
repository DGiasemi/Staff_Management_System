/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      // Text Colors
      primaryText: "#2d3748", // Used in headers/titles
      secondaryText: "#718096", // Subtle text/descriptions

      // Background Colors
      secondaryBg: "#e2e8f0", // Secondary backgrounds (buttons, etc.)
      actionBg: "#cbd5e0", // Hover states for secondary elements
      cardBg: "#ffffff", // White background for cards

      // Status Colors
      info: "#4299e1", // Primary actions/buttons
      infoHover: "#3182ce", // Hover state for primary actions
      success: "#059669", // Success states (PR in your table)
      successBg: "#ecfdf5", // Success background
      error: "#dc2626", // Error/danger text
      errorBg: "#fee2e2", // Error background
      warning: "#d97706", // Kitchen status
      warningBg: "#fef3c7", // Kitchen background

      // Additional colors from your CSS
      gray: {
        50: "#f8fafc", // Modal backgrounds
        100: "#f7fafc", // Table headers
        200: "#e2e8f0", // Borders/secondary elements
        300: "#cbd5e0", // Hover states
        400: "#a0aec0", // Disabled states
      },
    },
    boxShadow: {
      card: "0 1px 3px rgba(0, 0, 0, 0.1)",
      "card-hover": "0 4px 6px rgba(0, 0, 0, 0.1)",
      modal: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    borderRadius: {
      card: "8px",
      button: "4px",
    },
    spacing: {
      card: "1.5rem",
      modal: "2rem",
    },
  },
};
export const plugins = [];