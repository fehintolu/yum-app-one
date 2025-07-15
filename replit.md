# Food Delivery Mobile App - Replit Guide

## Overview

This is a modern food delivery mobile application built with React/TypeScript on the frontend and Express.js on the backend. The app features a mobile-first design with a complete food ordering system including menu browsing, cart management, order tracking, and user profiles. The UI has been optimized for compact mobile experience with sticky header, smaller fonts, and streamlined navigation.

## User Preferences

Preferred communication style: Simple, everyday language.
UI Design: Compact mobile-first design with smaller fonts, sticky header, and minimal visual clutter.

## Recent Changes (January 15, 2025)

✓ Made header sticky with compact design and smaller fonts
✓ Removed categories title and trusted picks section  
✓ Optimized spacing and font sizes throughout the app
✓ Fixed TypeScript errors in storage implementation
✓ Streamlined home page layout for better mobile experience
✓ Set up Capacitor.js for mobile deployment
✓ Configured Android and iOS platforms
✓ Added mobile build scripts and documentation
✓ Integrated Capacitor plugins for splash screen and status bar

## System Architecture

The application follows a full-stack architecture with clear separation between client and server:

- **Frontend**: React with TypeScript, using Vite for bundling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API with useReducer
- **Data Fetching**: TanStack React Query

## Key Components

### Frontend Architecture
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Component Library**: Uses shadcn/ui components for consistent UI
- **Routing**: wouter for lightweight client-side routing
- **State Management**: Custom React Context for cart, saved items, and app state
- **Styling**: Tailwind CSS with custom color scheme (primary red theme)

### Backend Architecture
- **RESTful API**: Express.js server providing menu, cart, and order endpoints
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Storage Interface**: Abstract storage interface for database operations
- **Development Server**: Vite integration for hot module replacement

### Database Schema
Key entities include:
- **Users**: Authentication and profile management
- **Menu Items**: Food items with categories, pricing, and metadata
- **Categories**: Food categorization system
- **Cart Items**: Shopping cart functionality
- **Orders**: Order management and tracking
- **Saved Items**: User favorites system

## Data Flow

1. **Menu Browsing**: Client fetches menu items from `/api/menu` endpoints
2. **Cart Management**: Local state management with Context API
3. **Search & Filtering**: Real-time search with category filtering
4. **Order Processing**: Cart items processed through order creation API
5. **User Preferences**: Saved items and profile data managed locally and synced

## External Dependencies

### Frontend Dependencies
- **@radix-ui**: Comprehensive UI component primitives
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing solution
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Backend Dependencies
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: PostgreSQL database connection
- **express**: Web framework for Node.js
- **zod**: Schema validation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **ESLint**: Code linting and formatting

## Deployment Strategy

The application is configured for deployment with:

- **Build Process**: Vite builds the client, esbuild bundles the server
- **Environment Variables**: Database URL configuration required
- **Database Migrations**: Drizzle migrations in `/migrations` directory
- **Static Assets**: Client built to `/dist/public` for serving
- **Production Server**: Node.js server serving both API and static files

### Key Configuration Files
- `vite.config.ts`: Frontend build configuration
- `drizzle.config.ts`: Database schema and migration configuration
- `package.json`: Scripts for development, build, and deployment
- `tsconfig.json`: TypeScript configuration for the entire project

The app uses a monorepo structure with shared types in `/shared/schema.ts` and clear separation between client and server code.