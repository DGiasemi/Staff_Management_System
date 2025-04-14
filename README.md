# Staff Management System

A Next.js admin panel for managing businesses and staff members, built with TypeScript and Zustand.

## Features

- Business management (CRUD operations)
- Staff management (CRUD operations)
- Authentication flow
- Responsive design
- Persistent data storage

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Zustand (state management)
- Tailwind CSS + CSS Modules
- TanStack Table

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/staff-management-system.git
   cd staff-management-system

Test Credentials:
Email: admin@example.com
Password: password123

📦src
 ┣ 📂app
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📂businesses
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂staff
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜dashboard.module.css
 ┃ ┃ ┣ 📜header.module.css
 ┃ ┃ ┗ 📜login.module.css
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📜BusinessForm.tsx
 ┃ ┣ 📜BusinessTable.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜MSWComponent.tsx
 ┃ ┣ 📜StaffForm.tsx
 ┃ ┗ 📜StaffList.tsx
 ┣ 📂mocks
 ┃ ┣ 📜browser.ts
 ┃ ┗ 📜handlers.ts
 ┗ 📂stores
 ┃ ┣ 📜authStore.ts
 ┃ ┣ 📜businessStore.ts
 ┃ ┗ 📜staffStore.ts

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
