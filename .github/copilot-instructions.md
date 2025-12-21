# NPO Website Copilot Instructions

## Project Overview
Next.js 14 website for a non-profit organization providing community services. Key feature: snow removal service request system with Supabase PostgreSQL backend. Designed for elderly users (high contrast, large fonts, accessibility-first).

## Architecture & Key Patterns

### Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **UI**: React 18, Tailwind CSS, Lucide React icons
- **Database**: Supabase (PostgreSQL) with RLS policies
- **Styling**: Global CSS + Tailwind utilities with `section-container` and button classes

### Data Flow
1. Client forms (`'use client'`) collect user input (e.g., snow-pickup page)
2. Submit via Server Actions (`'use server'` in `app/actions/snow-requests.ts`)
3. Server Actions validate input, then call Supabase client
4. Responses include `success` flag + optional `error` or `requestId`

### File Structure Logic
- **Pages**: Each route gets its own directory with `page.tsx` (e.g., `/snow-pickup/page.tsx`)
- **Shared Components**: `src/components/` (Navbar, Footer)
- **Server Actions**: `src/app/actions/` for database operations
- **API Routes**: `src/app/api/` (currently unused but available)
- **Database**: `supabase/migrations/` with SQL schema

## Critical Patterns

### Server Actions (Database Layer)
Located in [src/app/actions/snow-requests.ts](src/app/actions/snow-requests.ts):
- Validate ALL user inputs before Supabase calls (phone regex, enum validation)
- Handle errors gracefully with try/catch, return `{success: boolean, error?: string, requestId?: string}`
- Use Supabase client with `.select().single()` to return inserted data
- Errors logged to console for debugging

Example:
```typescript
const { data, error } = await supabase.from('snow_requests').insert([{...}]).select('id').single();
if (error) return { success: false, error: 'Failed to submit...' };
```

### Form State Management
Client components manage local state (useState):
- Form state object with typed interfaces
- Separate `loading` and `error` states
- Success state auto-resets after delay (setTimeout)
- Call server action in handleSubmit with try/catch

### Styling Conventions
- **Tailwind + custom CSS**: Global styles in [src/app/globals.css](src/app/globals.css)
- **Reusable classes**: `.section-container` (max-width wrapper), `.btn-primary`, `.section-title`
- **Accessibility**: Large fonts (16px base), high contrast (blue #0066cc on white), focus rings on buttons
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints
- **Colors**: Blue 600 primary (#0066cc), gradients from blue-600 to blue-700

### Metadata & Layout
Root layout [src/app/layout.tsx](src/app/layout.tsx) wraps all pages with Navbar and Footer. Update `metadata` object for SEO.

## Development Workflow

### Setup
```bash
npm install
npm run dev  # Port 3000
```

### Database
1. Create Supabase project at supabase.com
2. Copy URL + anon key to `.env.local`
3. Run SQL from [supabase/migrations/001_init_schema.sql](supabase/migrations/001_init_schema.sql) in Supabase SQL Editor
4. Tables: `snow_requests` (main), `volunteers` (optional), `activity_log` (audit trail)

### Build & Deploy
```bash
npm run build   # Verifies TypeScript & builds
npm run lint    # ESLint check
npm start       # Production mode
```

## Adding Features

### New Form/Page
1. Create `src/app/[route]/page.tsx` as client component (`'use client'`)
2. Use form pattern from snow-pickup: local state + server action call
3. Add route to Navbar links if navigation-worthy

### New Database Operation
1. Add server action function to [src/app/actions/snow-requests.ts](src/app/actions/snow-requests.ts) with `'use server'`
2. Follow pattern: validate inputs → Supabase client call → return typed response
3. Add TypeScript interfaces for form data and response

### Styling New Components
- Import Tailwind classes, leverage `.section-container` and `.btn-primary` for consistency
- Test at mobile (320px), tablet (768px), desktop (1024px)
- Ensure focus rings and contrast pass WCAG AA for elderly users

## Common Pitfalls

- **Missing RLS policies**: Supabase tables require INSERT/SELECT policies to work from client
- **Environment variables**: Must prefix with `NEXT_PUBLIC_` to expose to browser
- **Server Actions**: Always validate; never trust client-side-only validation
- **Phone validation**: Regex `^[\d\s\-\(\)\+]+$` used in both client and server for consistency

## Key Files Reference

| File | Purpose |
|------|---------|
| [src/app/layout.tsx](src/app/layout.tsx) | Root layout, metadata, Navbar/Footer wrapper |
| [src/app/page.tsx](src/app/page.tsx) | Home page with hero, values grid, CTAs |
| [src/app/snow-pickup/page.tsx](src/app/snow-pickup/page.tsx) | Snow request form (client + form state pattern) |
| [src/app/actions/snow-requests.ts](src/app/actions/snow-requests.ts) | Server actions for Supabase operations |
| [src/components/Navbar.tsx](src/components/Navbar.tsx) | Navigation with mobile menu toggle |
| [supabase/migrations/001_init_schema.sql](supabase/migrations/001_init_schema.sql) | Schema: snow_requests, volunteers, activity_log |
| [src/app/globals.css](src/app/globals.css) | Global Tailwind setup + custom utility classes |

