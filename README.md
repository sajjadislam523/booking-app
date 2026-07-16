# ⚡ SwiftBook — Professional Service Booking Platform

> A full-stack service booking platform built with Next.js 15, TypeScript, MongoDB, Stripe, and Nodemailer. Users can browse services, make secure payments, and receive email confirmations. Admins can manage all bookings from a dedicated dashboard.

![SwiftBook](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

---

## 🌐 Live Demo

**Live Site:** [https://booking-app-seven-tan.vercel.app](https://booking-app-seven-tan.vercel.app)

**Video Walkthrough:** [Loom Recording](https://www.loom.com/share/a4eb002584074f68b2b19a5073cc9932)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Stripe Integration](#stripe-integration)
- [Email Notifications](#email-notifications)
- [Admin Panel](#admin-panel)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## 🧭 Overview

SwiftBook is a production-grade service booking web application built as part of a technical assessment. The platform allows users to browse and book professional services, complete secure payments via Stripe Checkout, and receive instant email confirmations. An admin dashboard provides full booking management capabilities.

The project was built using AI-assisted development tools and demonstrates a complete full-stack workflow — from UI design to payment processing to deployment.

---

## ✨ Features

### User-Facing
- 🏠 **Homepage** — Browse all available services with pricing, duration, and descriptions
- 📅 **Booking Form** — Select a service and fill in name, email, date, and time
- 💳 **Stripe Checkout** — Secure, hosted Stripe payment page with card processing
- ✅ **Success Page** — Confirmation screen after successful payment
- 📧 **Email Confirmation** — Automatic booking confirmation email sent to the user
- 🌓 **Dark / Light Mode** — Full theme toggle powered by `next-themes` and shadcn/ui
- 🎨 **Animated Background** — Subtle canvas-based beam animation on all pages

### Admin Panel
- 📊 **Stats Dashboard** — Total bookings, paid, pending, cancelled, and total revenue
- 📋 **Bookings Table** — View all customer bookings with full details
- 🔄 **Status Management** — Update booking status (Paid / Pending / Cancelled) in real time
- 🔍 **Filter by Status** — Filter bookings by paid, pending, or cancelled
- 🔃 **Refresh Button** — Manually refresh bookings data

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Database** | MongoDB Atlas + Mongoose |
| **Payments** | Stripe Checkout + Webhooks |
| **Email** | Nodemailer + Gmail SMTP |
| **Fonts** | Inter + Outfit (Google Fonts) |
| **Icons** | Lucide React |
| **Theme** | next-themes |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
booking-app/
├── app/
│   ├── page.tsx                        # Homepage — service listing
│   ├── layout.tsx                      # Root layout with ThemeProvider
│   ├── globals.css                     # Global styles + shadcn CSS variables
│   ├── book/
│   │   └── [serviceId]/
│   │       └── page.tsx                # Booking form page
│   ├── success/
│   │   └── page.tsx                    # Post-payment success page
│   ├── admin/
│   │   └── page.tsx                    # Admin dashboard
│   └── api/
│       ├── checkout/
│       │   └── route.ts                # POST — Create Stripe Checkout Session
│       ├── webhook/
│       │   └── route.ts                # POST — Stripe webhook handler
│       └── bookings/
│           └── route.ts                # GET bookings / PATCH booking status
├── components/
│   ├── theme-provider.tsx              # next-themes provider wrapper
│   ├── mode-toggle.tsx                 # Dark/light mode toggle button
│   └── ui/
│       ├── animated-background.tsx     # Canvas beam animation
│       ├── error-message.tsx           # Reusable error display component
│       └── [shadcn components]         # button, card, badge, input, etc.
├── lib/
│   ├── mongodb.ts                      # MongoDB connection with caching
│   ├── services.ts                     # Static services data
│   ├── mailer.ts                       # Nodemailer transporter config
│   ├── errors.ts                       # AppError class + error handlers
│   └── utils.ts                        # cn() utility for Tailwind
├── models/
│   └── Booking.ts                      # Mongoose Booking schema + interface
├── types/
│   └── index.ts                        # Shared TypeScript types
└── .env.local                          # Environment variables (never commit)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18 or higher
- **npm** or **yarn**
- A **MongoDB Atlas** account (free tier works)
- A **Stripe** account (test mode)
- A **Gmail** account with App Password enabled
- **Stripe CLI** (for local webhook testing)

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/sajjadislam523/booking-app.git
cd booking-app
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up environment variables:**

Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables) section below).

**4. Start the development server:**
```bash
npm run dev
```

**5. In a separate terminal, start the Stripe webhook listener:**
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the `whsec_...` key printed in the terminal and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

**6. Open your browser:**
```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/booking-app?retryWrites=true&w=majority

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx

# Email (Gmail SMTP)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env.local` to GitHub.** It is already included in `.gitignore`.

### Where to Find Each Key

| Variable | Where to Get It |
|---|---|
| `MONGODB_URI` | MongoDB Atlas → Cluster → Connect → Drivers |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI (`stripe listen`) or Stripe Dashboard → Webhooks |
| `GMAIL_USER` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | Google Account → Security → 2FA → App Passwords |

---

## 💳 Stripe Integration

### Payment Flow

```
User fills booking form
        ↓
POST /api/checkout
        ↓
Stripe Checkout Session created
        ↓
User redirected to Stripe hosted page
        ↓
User completes payment
        ↓
Stripe fires checkout.session.completed webhook
        ↓
POST /api/webhook
        ↓
Booking saved to MongoDB + Email sent
        ↓
User redirected to /success
```

### Test Card Details

Use these details to test payments in Stripe test mode:

```
Card Number : 4242 4242 4242 4242
Expiry Date : Any future date (e.g. 12/29)
CVC         : Any 3 digits (e.g. 123)
Name        : Any name
```

### Local Webhook Testing

Install the Stripe CLI and run:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

---

## 📧 Email Notifications

After a successful Stripe payment, the webhook handler automatically sends an HTML confirmation email to the user containing:

- ✅ Payment confirmation status
- 📋 Service name
- 📅 Booking date and time
- 💰 Amount paid
- 📌 Next steps message

Emails are sent via **Nodemailer** using Gmail SMTP. To enable this:

1. Enable **2-Step Verification** on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate a new app password for "Mail"
4. Add it to `.env.local` as `GMAIL_APP_PASSWORD`

> **Note:** Gmail App Passwords allow sending to any email address without domain verification, making it ideal for this use case.

---

## 🛡 Admin Panel

The admin panel is accessible at `/admin` and provides:

### Stats Overview
- Total number of bookings
- Count of paid, pending, and cancelled bookings
- Total revenue from paid bookings

### Booking Management
- View all bookings in a sortable table
- See customer name, email, service, date, time, amount, and status
- Filter bookings by status (All / Paid / Pending / Cancelled)
- Update booking status with one click
- Refresh data in real time

### Access
The admin panel is currently open access. For a production environment, you would add authentication (e.g., NextAuth.js or Clerk) to protect this route.

---

## 🌍 Deployment

This project is deployed on **Vercel** with **MongoDB Atlas** as the cloud database.

### Deploy Your Own

**1. Push to GitHub:**
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/booking-app.git
git push -u origin main
```

**2. Import to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click **Add New Project** → Import your GitHub repo
- Add all environment variables from `.env.local`
- Set `NEXT_PUBLIC_BASE_URL` to your Vercel deployment URL
- Click **Deploy**

**3. Set up Production Stripe Webhook:**
- Go to Stripe Dashboard → Developers → Webhooks
- Click **Add Endpoint**
- Set URL: `https://your-app.vercel.app/api/webhook`
- Select event: `checkout.session.completed`
- Copy the signing secret → update `STRIPE_WEBHOOK_SECRET` in Vercel
- Redeploy

---

## 🗂 Available Services

The platform currently offers the following bookable services:

| Service | Price | Duration |
|---|---|---|
| 💻 Web Development | $299 | 7 days |
| 🎨 UI/UX Design | $199 | 5 days |
| 📈 SEO Optimization | $149 | 3 days |
| 📱 Mobile App Development | $499 | 14 days |
| ☁️ Cloud Infrastructure Setup | $249 | 4 days |
| 🧠 Tech Consulting | $99 | 2 hours |

Services can be easily modified in `lib/services.ts`.

---

## 🧰 Error Handling

The project uses a centralized error handling system defined in `lib/errors.ts`:

```typescript
// Throw typed errors with status codes
throw new AppError("Missing required fields", 400);

// Safely extract error messages in API routes
const { message, statusCode } = handleApiError(error);

// Safely extract error messages in client components
const message = getErrorMessage(error);
```

All `catch` blocks use `unknown` type instead of `any`, following strict TypeScript best practices.

---

## 📦 Key Dependencies

```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "mongoose": "^8.0.0",
  "stripe": "^17.0.0",
  "nodemailer": "^6.9.0",
  "next-themes": "^0.4.0",
  "tailwindcss": "^4.0.0",
  "lucide-react": "^0.383.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

---

## 👨‍💻 Author

**Sajjad Islam**

- Portfolio: [sajjadulislam.vercel.app](https://sajjadulislam.vercel.app/)
- GitHub: [@sajjadislam523](https://github.com/sajjadislam523)

---

## 📄 License

This project was built as part of a technical assessment for **DraSoft**. All rights reserved.

---

<div align="center">
  <p>Built with ❤️ using Next.js, Stripe, and MongoDB</p>
  <p>⚡ SwiftBook — Book Any Service Online</p>
</div>
