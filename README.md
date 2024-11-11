# Varimart E-commerce Platform

[Initial Version](https://varimart.vercel.app/) | [Production Version](https://www.varimartbd.com/)

Varimart is a feature-rich e-commerce platform designed to streamline online shopping with a focus on user experience, security, and flexibility. The platform includes comprehensive user management, product management, and order functionalities, tailored for ease of use. This project was developed and deployed on a VPS to meet client requirements for a robust and scalable e-commerce solution.

Additionally, we developed a customized version for selling clothing items called [Fablura](https://www.fablura.com/), deployed on the same VPS with additional options for product sizes, colors, and other enhancements.

> **Note**: This project is deployed on free hosting tiers, so there may be occasional delays in loading data due to server startup times on the free tier.

## Dashboard Access

Visit the [Varimart Dashboard](https://varimart.vercel.app/dashboard) to view the admin interface.

### Visitor Login Credentials

- **Email**: `taifurislamashraf@gmail.com`
- **Password**: `123456`

> This visitor account has view-only access to the dashboard and cannot delete or update any data.

## Features

- **Authentication**: Secure login, registration with email verification, logout.
- **Password Management**: Forgot password and reset password functionalities.
- **User Profile**: Update profile information.
- **Role-Based Access Control (RBAC)**: Role-specific access for admins, customers, etc.
- **Product Management**:
  - Create, update, delete products.
  - Product sizes, colors, and additional attributes (for Fablura version).
- **Banners**:
  - Main banner, category banner, and top banner for promotions.
- **Product Reviews**:
  - Customer reviews and admin review approval.
- **Customer Engagement**:
  - Customer review submission for products.
- **Order Management** (Planned): Functionality for tracking orders and managing transactions.

## Technology Stack

### Frontend

- **Next.js 14**
- **RTK Query** for optimized data fetching and caching.
- **Shadcn UI** for a modern, intuitive user interface.
- **TypeScript** for type safety and better code maintainability.
- **Tailwind CSS** for responsive and customizable styling.

### Backend

- **Node.js** and **Express.js** as the server framework.
- **MongoDB** for scalable and flexible database management.
- **TypeScript** for strong typing.
- **Multer** for file uploads, supporting images and documents.

<!-- ## Project Structure

```bash
.
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable components
│   ├── features/             # Specific feature modules
│   ├── pages/                # Next.js pages
│   ├── services/             # API and RTK Query configuration
│   ├── utils/                # Utility functions
│   └── models/               # Database models (Mongoose schemas)
└── README.md                 # Project documentation -->
