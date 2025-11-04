# 🎮 GameWave

A modern, responsive Twitch-based game streaming discovery platform built with Next.js 16, React 19, and Tailwind CSS.

![GameWave](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🏠 Home Page
- **Featured Stream Hero Section** - Showcases top live streams with animated badges
- **Category Carousel** - Browse popular game categories with smooth scrolling
- **Top Live Streams Grid** - Responsive grid of currently live streams
- **Live viewer counts** and stream status indicators

### 🔍 Browse Page
- **Advanced Search** - Debounced search with real-time filtering
- **Category Filtering** - Filter streams by game category
- **Responsive Grid Layout** - Adapts from 1 to 4 columns based on screen size
- **Empty States** - Beautiful fallbacks when no results found

### ▶️ Stream Page
- **Twitch Player Embed** - Full-featured video player
- **Live Chat Integration** - Collapsible chat sidebar
- **Streamer Information** - Avatar, title, game, and viewer stats
- **Related Streams** - Discover similar content
- **Favorite Management** - Add/remove favorites with persistent storage

### 👤 Profile Page
- **User Statistics** - Track favorites, watch time, and preferences
- **Favorites Management** - View and manage your favorite streamers
- **Theme Toggle** - Switch between dark and light modes
- **Persistent Data** - LocalStorage-based state management

### 🔐 Authentication
- **Mock Twitch OAuth** - Simulated login flow
- **Email/Password Forms** - Alternative signup method
- **Responsive Auth UI** - Mobile-optimized login and signup pages

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Frontend**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + LocalStorage
- **Icons**: Heroicons (SVG)
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
gamewave/
├── app/                      # Next.js App Router pages
│   ├── auth/
│   │   ├── login/           # Login page
│   │   └── signup/          # Signup page
│   ├── browse/              # Browse streams page
│   ├── profile/             # User profile page
│   ├── stream/[id]/         # Stream watch page
│   ├── layout.tsx           # Root layout with navbar/footer
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles + Tailwind
│
├── components/              # Reusable React components
│   ├── CategoryCarousel.tsx
│   ├── ChatBox.tsx
│   ├── Footer.tsx
│   ├── LoadingSkeleton.tsx
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── StreamCard.tsx
│   ├── StreamGrid.tsx
│   ├── StreamPlayer.tsx
│   └── ThemeToggle.tsx
│
├── hooks/                   # Custom React hooks
│   ├── useFavorites.ts     # Favorite streamers management
│   ├── useFetch.ts         # Data fetching utility
│   └── useTheme.ts         # Theme toggle logic
│
├── lib/                     # Utilities and mock data
│   └── mockData.ts         # Mock stream/category data
│
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gamewave
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🎨 Design System

### Colors
- **Primary**: `#9146FF` (Twitch Purple)
- **Background**: `#0E0E10` (Dark)
- **Card Background**: `#18181B`
- **Border**: `#2D2D31`
- **Text**: `#FFFFFF`
- **Muted Text**: `#ADADAD`
- **Accent**: `#F0F0F0`

### Typography
- **Font Family**: Inter, sans-serif
- **Heading Sizes**: 3xl (48px), 2xl (32px), xl (24px)
- **Body**: Base (16px), sm (14px), xs (12px)

### Responsive Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 641px - 1024px (2 columns)
- **Desktop**: > 1025px (3-4 columns)

## 🔧 Key Features Implementation

### State Management
- **Favorites**: Persisted in localStorage
- **Theme**: Dark/light mode toggle with localStorage
- **Search**: Client-side filtering with debouncing

### Mock API
All data is currently mocked in `lib/mockData.ts`. To integrate real Twitch API:
1. Replace mock functions with API calls
2. Add environment variables for Twitch Client ID
3. Implement OAuth flow for authentication

### Responsive Design
- Mobile-first approach
- Hamburger menu on mobile devices
- Collapsible chat on stream pages
- Adaptive grid layouts

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Featured streams, categories, top streams |
| Browse | `/browse` | Search and filter all streams |
| Stream | `/stream/[id]` | Watch page with player and chat |
| Profile | `/profile` | User profile and favorites |
| Login | `/auth/login` | Authentication page |
| Signup | `/auth/signup` | Registration page |

## 🎯 Future Enhancements

- [ ] Real Twitch API integration
- [ ] User authentication with OAuth
- [ ] Stream notifications
- [ ] Watch history tracking
- [ ] Advanced filtering (language, tags)
- [ ] Mobile app (React Native)
- [ ] Backend API for user data
- [ ] WebSocket for real-time chat
- [ ] Analytics dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by [Twitch](https://twitch.tv/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Made with 💜 by GameWave Team**
