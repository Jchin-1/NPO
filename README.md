# Peel Community Club Website

A comprehensive Next.js-based website for Peel Community Club, a non-profit organization providing community services. Features include:

- **Home Page**: Hero section with logo, values grid, mission statement, and impact statistics
- **Activities Page**: Card-based layout showcasing NPO projects (Winter Support, Community Garden, Home Repair, etc.)
- **Contact Page**: Functional contact form with email support
- **Snow Pickup Page**: Service request form for elderly and vulnerable residents
- **Food & Clothes Drive Page**: Donation scheduling and pickup coordination
- **Cleanup Recommendation Page**: Community-driven cleanup initiative suggestions
- **Database Integration**: Supabase PostgreSQL backend for service requests
- **Responsive Design**: Mobile-first approach for all devices
- **Accessibility**: High contrast UI optimized for elderly users
- **Branding**: NPO logo integration and branded styling throughout

## Technologies Used

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Email**: Resend for transactional emails

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (https://supabase.com)
- Resend account for email notifications

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `RESEND_API_KEY`: Your Resend API key for email notifications

3. Set up the database:
   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Copy and run the SQL from `supabase/migrations/001_init_schema.sql`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── activities/
│   │   └── page.tsx            # Activities page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── snow-pickup/
│   │   └── page.tsx            # Snow pickup form
│   └── actions/
│       └── snow-requests.ts    # Server actions for Supabase
├── components/
│   ├── Navbar.tsx              # Navigation component
│   └── Footer.tsx              # Footer component
supabase/
└── migrations/
    └── 001_init_schema.sql     # Database schema
```

## Features

### Snow Pickup Service
- Simple form with name, phone, address, and priority level
- Three priority levels: High, Medium, Standard
- Real-time validation
- Supabase integration for data persistence
- Admin dashboard ready (can be extended)

### Design & Accessibility
- High contrast colors for readability
- Large, legible fonts (16px base)
- Clear focus indicators for keyboard navigation
- Responsive grid layouts
- Touch-friendly buttons and form inputs
- ARIA labels for screen readers

### Server Actions
The `snow-requests.ts` file includes several server actions:
- `submitSnowRequest()`: Submit a new service request
- `getSnowRequests()`: Retrieve all requests (admin)
- `updateSnowRequestStatus()`: Update request status
- `getSnowRequestsByStatus()`: Filter by status
- `getHighPriorityRequests()`: Get urgent requests

## Database Schema

### snow_requests Table
- `id` (UUID): Primary key
- `name` (VARCHAR): Resident name
- `phone` (VARCHAR): Contact phone
- `address` (TEXT): Street address
- `priority` (VARCHAR): high | medium | standard
- `status` (VARCHAR): pending | confirmed | in-progress | completed | cancelled
- `notes` (TEXT): Admin notes
- `created_at` (TIMESTAMP): Request submission time
- `updated_at` (TIMESTAMP): Last update time
- `completed_at` (TIMESTAMP): Completion time
- `service_date` (DATE): Scheduled service date
- `assigned_to` (UUID): Assigned volunteer

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Customization

### Changing Colors
Edit the Tailwind config in `tailwind.config.ts` to adjust the color scheme.

### Adding New Pages
Create new directories in `src/app/[page-name]/` with a `page.tsx` file.

### Modifying the Database
Update the SQL schema in `supabase/migrations/` and run migrations through Supabase dashboard.

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- AWS Amplify
- Firebase Hosting
- Other Node.js hosting providers

For Vercel deployment:
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## License

This project is open source and available for non-profit use.

## Support

For issues or questions, please contact: info@communitycare.org
