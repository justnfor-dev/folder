# Ak-Yol Logistics OS

A comprehensive logistics operations system built with ruthless simplicity and generous white space, inspired by Jony Ive's design philosophy.

## Features

- **Dashboard**: KPI cards, margin trends, needs attention queue
- **Shipments**: Master list with detail view, route tracking, finance breakdown
- **Quotes**: Sales quote creation and approval workflow
- **Fleet**: Kanban-style vehicle status board (Idle, En Route, Maintenance)
- **Drivers**: Driver management with availability tracking
- **Vendors**: External carrier partnerships and pricing
- **Finance**: Margin analysis and profitability tracking
- **Approvals**: Manager queue for low-margin and vendor approvals
- **Reports**: Pre-configured analytics dashboards
- **Admin**: User management, roles, permissions matrix

## Tech Stack

- React + TypeScript
- Tailwind CSS (custom design tokens)
- Zustand (state management)
- TanStack Query & Table
- Recharts
- Lucide icons

## Design Principles

- Ruthless simplicity
- Zero visual noise
- Generous white space
- Typographic hierarchy over decoration
- Purposeful, subtle motion
- Soft light theme

## Role-Based Access Control

- **Sales Specialist**: Create/edit quotes, view shipments (read-only)
- **Logistics Coordinator**: Convert quotes to shipments, assign vehicles/vendors
- **Accountant**: View finance dashboards, manage payouts
- **Manager**: Approve proposals, override margins
- **Admin**: Full system access, user management

## Getting Started

```bash
npm install
npm run dev
```

## Development

```bash
npm run build    # Production build
npm run lint     # Lint code
npm run preview  # Preview production build
```
