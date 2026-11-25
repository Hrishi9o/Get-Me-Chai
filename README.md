# ☕ GetMeAChai

> **Fueling creators, one cup of chai at a time.**  
> A modern, full-stack crowdfunding and creator support platform built with **Next.js 14**, **Tailwind CSS**, **MongoDB**, **NextAuth.js**, and **Razorpay**.

---

## 🌟 Overview

**GetMeAChai** is a creator-first micro-donation platform inspired by platforms like "Buy Me a Coffee" and "Patreon". It allows developers, designers, writers, educators, and content creators to receive direct financial support from their community without heavy subscription hurdles or steep platform cuts.

Supporters can visit a creator's dedicated profile, leave an encouraging message, choose or customize a contribution amount, and complete secure payments via Razorpay with celebratory confetti and real-time leaderboard updates.

---

## ✨ Features

- **⚡ Modern Next.js 14 App Router**: Built with server actions, server components, and responsive client interactions for peak performance and SEO.
- **🔐 Multi-Provider OAuth Authentication**: Seamless login powered by **NextAuth.js** supporting:
  - GitHub
  - Google
  - LinkedIn
  - Facebook
- **💳 Razorpay Payment Gateway Integration**:
  - Secure server-side order generation.
  - Client-side checkout modal.
  - Server-side SHA256 HMAC cryptographic signature verification before confirming payments in the database.
- **👤 Custom Creator Profiles (`/[username]`)**:
  - Personalized cover banner and avatar.
  - Public payment widget with quick preset amounts (₹10, ₹20, ₹50) or custom entries.
  - Live **Supporters Feed** showing donor names and personal messages.
  - **Top Supporters Leaderboard** ranking the most generous contributors.
- **🛠️ Creator Dashboard (`/dashboard`)**:
  - Manage display name, profile picture URL, and cover picture URL.
  - Connect custom Razorpay Key ID and Secret to receive payments directly.
- **🔍 Explore Creators Directory (`/creators`)**:
  - Browse available creator profiles on the platform.
- **🎨 Glassmorphic & 3D Interactive UI**:
  - Tailored dark mode aesthetic with custom glassmorphism effects.
  - 3D interactive tilt cards and smooth cursor effects.
  - Interactive confetti animations (`canvas-confetti`) on successful support.
  - Toast alerts (`react-toastify`) for real-time user feedback.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Frontend Library** | [React 18](https://react.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & PostCSS |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) |
| **Payment Gateway** | [Razorpay](https://razorpay.com/) |
| **Animations & UI Utilities** | `canvas-confetti`, `react-toastify` |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
├── actions/
│   └── useractions.js          # Next.js Server Actions for payments and user data
├── app/
│   ├── [username]/             # Public creator profile page & donation interface
│   ├── about/                  # About page with platform story and FAQ
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth authentication routes and handlers
│   │   └── razorpay/           # Razorpay payment verification endpoint
│   ├── creators/               # Creator directory / explore creators
│   ├── dashboard/              # Creator settings and credentials dashboard
│   ├── login/                  # Login page with social OAuth buttons
│   ├── globals.css             # Tailwind imports & custom utility classes
│   ├── layout.js               # Root layout with navbar, footer, and session wrapper
│   └── page.js                 # Landing / Hero page
├── components/
│   ├── Dashboard.js            # Dashboard management form
│   ├── Footer.js               # Global footer component
│   ├── InteractiveCursorProvider.js # Interactive 3D cursor & tilt handler
│   ├── Navbar.js               # Main navigation bar with auth state handling
│   ├── PaymentPage.js          # Donation widget, supporters feed, and leaderboard
│   └── SessionWrapper.js       # NextAuth SessionProvider wrapper
├── db/
│   └── connectDb.js            # MongoDB connection utility using Mongoose
├── models/
│   ├── Payment.js              # Payment schema (amount, message, status, timestamps)
│   └── User.js                 # User & creator schema
└── public/                     # Static assets and icons
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Prerequisites

- **Node.js** (v18.17 or higher recommended)
- **npm** or **yarn** / **pnpm**
- A **MongoDB Atlas** database cluster (or local MongoDB instance)
- A **Razorpay** test account (for API Key ID and Key Secret)
- OAuth credentials from any provider you wish to test (GitHub, Google, etc.)

### 2. Clone the Repository

```bash
git clone https://github.com/Hrishi9o/Get-Me-Chai.git
cd Get-Me-Chai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your configuration keys:

```env
# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/chai?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_here

# Public URL
NEXT_PUBLIC_URL=http://localhost:3000

# OAuth Providers (Add at least one)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# Razorpay Payment Gateway (Test Mode)
KEY_ID=rzp_test_your_key_id
KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_KEY_ID=rzp_test_your_key_id
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the application.

---

## 🔑 Environment Variables Reference

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string (Atlas or local) |
| `NEXTAUTH_URL` | Canonical URL of your site (e.g. `http://localhost:3000` or production domain) |
| `NEXTAUTH_SECRET` | Secret used to encrypt session tokens |
| `NEXT_PUBLIC_URL` | Base URL used for redirect callbacks |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth app credentials |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console OAuth credentials |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | LinkedIn Developer portal credentials |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | Meta for Developers app credentials |
| `KEY_ID` / `NEXT_PUBLIC_KEY_ID` | Razorpay Merchant Key ID |
| `KEY_SECRET` | Razorpay Merchant Key Secret |

---

## 🚢 Deployment

The easiest way to deploy GetMeAChai is using the [Vercel Platform](https://vercel.com):

1. Push your repository to GitHub.
2. Import the project into **Vercel**.
3. Add all the Environment Variables defined above in the Vercel Project Settings.
4. Ensure your **MongoDB Atlas Network Access** allows connections from anywhere (`0.0.0.0/0`) so Vercel's serverless functions can connect.
5. In your OAuth provider consoles (Google, GitHub, etc.), add your production domain to the **Authorized Redirect URIs** (e.g., `https://your-domain.vercel.app/api/auth/callback/github`).

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
