# ProxyFlow — Frontend

A professional, Proxidize-inspired proxy reselling dashboard built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Accounts

| Email | Role |
|---|---|
| `admin@proxyflow.com` | Admin panel |
| `alex@example.com` | Customer dashboard |

Any email/password works for demo login.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with features, pricing, workflow |
| `/login` | Customer/admin login |
| `/register` | New account registration |
| `/purchase` | Package selection & payment flow |
| `/dashboard` | Customer overview, proxies, usage, settings |
| `/admin` | Admin overview, customers, packages, transactions, API config |

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — dark theme with Proxidize brand colors
- **Framer Motion** — scroll reveals, hover animations, page transitions
- **Recharts** — usage and revenue charts
- **Lucide React** — icons
- **React Router v7** — client-side routing

## Design

Dark-only UI inspired by [Proxidize brand guidelines](https://proxidize.com/brand/):
- Near-black surfaces with yellow/green accent signals
- 14px scroll reveal animations (0.45s ease)
- Responsive layout with collapsible sidebar
- Interactive charts, copy-to-clipboard, CSV export

## Project Structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, DashboardLayout, Sidebar
│   └── ui/         # Button, Card, Input, Animations, Feedback
├── pages/          # All route pages
├── hooks/          # useAuth (mock authentication)
├── data/           # Mock data for demo
├── types/          # TypeScript interfaces
└── utils/          # Formatting helpers
```

## Build

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Notes

This is a **frontend-only** implementation with mock data. Backend integration (Laravel/Node.js, MySQL, Stripe/PayPal, Proxidize API) is planned for a future phase.
