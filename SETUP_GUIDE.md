# NPO Website Setup & Deployment Guide

## Overview

This is a modern, accessible NPO website built with Next.js, Tailwind CSS, Lucide-React, and Supabase. It includes a snow removal service request system optimized for elderly residents.

## Quick Start

### 1. Prerequisites

- **Node.js** 18.0 or higher ([https://nodejs.org/](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Supabase Account** ([https://supabase.com/](https://supabase.com/)) - Free tier available

### 2. Environment Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from the example:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Supabase Database Setup

1. Create a Supabase project at [https://supabase.com/](https://supabase.com/)
2. Go to your project dashboard
3. Open SQL Editor
4. Create a new query and paste the entire content from `supabase/migrations/001_init_schema.sql`
5. Click "Run"

The schema creates:
- `snow_requests` table for service requests
- `volunteers` table for volunteer management (optional)
- `activity_log` table for audit trail
- Indexes for performance
- Row-level security policies

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
npo-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Navbar & Footer
│   │   ├── page.tsx                # Home page (Hero, Values, Mission, About)
│   │   ├── globals.css             # Global Tailwind styles
│   │   ├── activities/
│   │   │   └── page.tsx            # Activities/Projects showcase
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact form page
│   │   ├── snow-pickup/
│   │   │   └── page.tsx            # Snow removal request form
│   │   └── actions/
│   │       └── snow-requests.ts    # Server actions (Supabase integration)
│   └── components/
│       ├── Navbar.tsx              # Navigation (responsive, mobile menu)
│       └── Footer.tsx              # Footer with links & contact info
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql     # PostgreSQL schema
├── public/                          # Static assets
├── .env.example                     # Environment variables template
├── .env.local                       # Local environment (git-ignored)
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

## Pages & Features

### Home Page (`/`)
- **Hero Section**: Eye-catching headline with call-to-action buttons
- **Our Values Grid**: 4-column card layout with icons (Compassion, Community, Excellence, Innovation)
- **Mission Section**: Mission statement with supporting narrative
- **About Us**: Statistics and detailed about section with contact CTA

### Activities Page (`/activities`)
- Card-based layout showcasing 6 NPO projects
- Color-coded by category
- Status badges (Active/Inactive)
- Learn more links for each project

### Snow Pickup Page (`/snow-pickup`)
- **Service Request Form** with fields:
  - Name (required)
  - Phone (required, validated)
  - Address (required)
  - Priority dropdown (High/Medium/Standard)
- **How It Works** section with 3 steps
- **Priority Levels** explanation
- **FAQ** section
- Supabase integration for form submission
- Validation and error handling
- Success message on submission

### Contact Page (`/contact`)
- **Functional Contact Form** with fields:
  - Name (required)
  - Email (required, validated)
  - Phone (optional)
  - Subject dropdown (6 options)
  - Message (required)
- **Contact Information** sidebar:
  - Phone with hours
  - Email with response time
  - Office address with map placeholder
  - Hours of operation
  - Emergency contact line
- Form validation and success feedback

## Accessibility & Design

### High Contrast & Readability
- **Base font size**: 16px (larger for elderly users)
- **Color contrast**: WCAG AAA compliant
- **Line height**: 1.6 for improved readability
- **Focus indicators**: Clear 2px ring on interactive elements

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and form inputs (minimum 44px height)
- Hamburger menu for mobile navigation

### Accessibility Features
- Semantic HTML (proper heading hierarchy)
- ARIA labels on interactive elements
- Form validation with clear error messages
- Skip-to-main-content links
- Keyboard navigation support
- Focus management

## Database Schema

### snow_requests Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key, auto-generated |
| name | VARCHAR(255) | Resident name (required) |
| phone | VARCHAR(20) | Contact phone (required) |
| address | TEXT | Street address (required) |
| priority | VARCHAR(20) | high, medium, or standard (required) |
| status | VARCHAR(50) | pending, confirmed, in-progress, completed, cancelled |
| notes | TEXT | Staff notes/comments |
| created_at | TIMESTAMP | Request submission time (auto) |
| updated_at | TIMESTAMP | Last update time (auto) |
| completed_at | TIMESTAMP | Completion time |
| assigned_to | UUID | Assigned volunteer reference |
| service_date | DATE | Scheduled service date |

### Indexes
- `idx_snow_requests_status` - For filtering by status
- `idx_snow_requests_priority` - For filtering by priority
- `idx_snow_requests_created_at` - For chronological queries
- `idx_snow_requests_service_date` - For scheduling

## Server Actions

Located in `src/app/actions/snow-requests.ts`:

### submitSnowRequest(formData)
Submits a new snow removal request to Supabase.
```typescript
interface SnowRequestFormData {
  name: string;
  phone: string;
  address: string;
  priority: 'high' | 'medium' | 'standard';
  notes?: string;
}
```

### getSnowRequests()
Retrieves all snow requests (admin use).

### updateSnowRequestStatus(requestId, status, notes)
Updates request status and optionally adds notes.

### getSnowRequestsByStatus(status)
Filters requests by status (pending, confirmed, etc.).

### getHighPriorityRequests()
Retrieves pending/confirmed high-priority requests.

## Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Update Company Information
Edit the following files:
- `src/components/Navbar.tsx` - Logo and navigation
- `src/components/Footer.tsx` - Contact info and links
- `src/app/page.tsx` - Mission and values
- `src/app/contact/page.tsx` - Contact details

### Add New Pages
1. Create `src/app/[page-name]/page.tsx`
2. Add navigation link to `Navbar.tsx`

### Extend Database
Add new tables in `supabase/migrations/` and run through Supabase SQL Editor.

## Building & Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. In "Environment Variables", add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Deploy to Other Platforms

**AWS Amplify:**
1. Connect GitHub repository
2. Add environment variables
3. Deploy

**Firebase Hosting:**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init` and `firebase deploy`

**Docker Deployment:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Required variables in `.env.local`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Optional variables:

```
# Service role key (server-side only, do NOT expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Troubleshooting

### Form Submission Fails
1. Check `.env.local` has correct Supabase credentials
2. Verify Supabase project is active
3. Check browser console for errors
4. Ensure `snow_requests` table exists in Supabase

### Page Not Found (404)
1. Verify file path matches route structure
2. Check that `page.tsx` exists in the directory
3. Clear `.next` cache: `rm -rf .next && npm run dev`

### Tailwind Styles Not Applied
1. Clear build: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check `tailwind.config.ts` has correct content paths

### Mobile Menu Not Working
1. Check that `use client` directive is in `Navbar.tsx`
2. Verify state management in onClick handlers
3. Check browser console for JavaScript errors

## Performance Optimization

### Image Optimization
- Use Next.js `Image` component instead of `<img>`
- Add `alt` text for accessibility
- Specify dimensions to prevent layout shift

### Code Splitting
- Next.js automatically code-splits at the route level
- Use dynamic imports for heavy components:
```typescript
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
});
```

### Database Queries
- Use indexes for frequently filtered columns
- Implement pagination for large datasets
- Cache frequently accessed data

## Security

### Row Level Security (RLS)
- All tables have RLS enabled
- Policies restrict insert/update/delete operations
- Update policies in Supabase dashboard as needed

### Environment Variables
- Never commit `.env.local` to version control
- Use `.env.example` as template
- Different keys for development/production

### Input Validation
- Server-side validation in all server actions
- Client-side validation for UX
- Sanitize all user inputs

## Support & Resources

- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Lucide Icons**: [https://lucide.dev](https://lucide.dev)
- **TypeScript Docs**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

## License

This project is open source and available for non-profit use.

## Contact

For support or questions: info@communitycare.org
