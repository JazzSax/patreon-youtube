<div align="center">

# 🎬 Patreon-Style YouTube Membership Platform

<p align="center">
  <strong>A modern content creator membership platform built with Next.js 15, Sanity CMS, and Clerk authentication</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
   <a href="#-content-schema">Content Schema</a> •
   <a href="#-deployment">Deployment</a> •
  <a href="#-acknowledgments">Acknowledgments</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Sanity-4.3-F03E2F?style=for-the-badge&logo=sanity" alt="Sanity" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

</div>

---

## 🎯 Overview

A full-stack membership platform that enables content creators to monetize their content through tiered subscriptions, similar to Patreon. Built with modern web technologies, featuring seamless content management, user authentication, and dynamic tier-based access control.

## ✨ Features

### 🔐 Authentication & Authorization

- **Clerk Integration** - Secure user authentication and session management
- **Tier-based Access Control** - Restrict content based on membership levels
- **Protected Routes** - Middleware-based route protection

### 📝 Content Management

- **Sanity CMS** - Headless CMS for flexible content modeling
- **Rich Text Editor** - PortableText support for rich content
- **Real-time Updates** - Live content preview and updates
- **Media Management** - Image optimization with Sanity CDN

### 💬 Community Features

- **Comments System** - Engage with your audience on posts
- **Direct Messaging** - Private messaging between creators and members
- **Related Posts** - Dynamic content recommendations

### 🎨 Modern UI/UX

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode Support** - Theme toggle with next-themes
- **Component Library** - Radix UI components for accessibility
- **Animations** - Smooth transitions and micro-interactions
- **Carousel** - Beautiful content presentation with Embla

### 🚀 Performance

- **Next.js 15** - Latest features including Turbopack
- **Server Components** - Optimized rendering strategy
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Efficient bundle management

## 🛠 Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component

### Backend & Services

- **[Sanity CMS](https://www.sanity.io/)** - Headless content management
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Schematic](https://schematichq.com/)** - Feature flag management
- **[Stripe](https://stripe.com/)** - Payment processing (integrated)

### Developer Tools

- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution
- **[Sanity Codegen](https://www.sanity.io/docs/codegen)** - Type generation
- **ESLint** - Code linting


## 🎨 Key Components

- **`HeroBanner`** - Eye-catching hero section for the homepage
- **`PostList`** - Dynamic list of posts with filtering
- **`PostFilters`** - Search and tier-based filtering
- **`MemberButton`** - CTA for membership signup
- **`Comments`** - Comment system for posts
- **`DMButton`** - Direct messaging interface
- **`TierBadge`** - Visual representation of membership tiers

## 🎯 Content Schema

### Post

- Title, slug, author
- Tier-based access control
- Tags and categories
- Rich text content (PortableText)
- Comments and engagement

### Comment

- User information
- Post association
- Timestamps

### Message

- Sender/recipient
- Message content
- Read status

### Site Settings

- Global configuration
- Social media links
- Branding

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/patreon-youtube)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Sanity](https://www.sanity.io/) - Content Platform
- [Clerk](https://clerk.com/) - Authentication
- [Vercel](https://vercel.com/) - Deployment Platform
- [Radix UI](https://www.radix-ui.com/) - UI Primitives

---

<div align="center">

**[⬆ back to top](#-patreon-style-youtube-membership-platform)**

Made with ❤️ by content creators, for content creators

</div>
