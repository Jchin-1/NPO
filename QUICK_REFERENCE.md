# Quick Reference Guide

## File Structure at a Glance

```
src/
├── app/
│   ├── layout.tsx           → Root HTML + Navbar/Footer
│   ├── page.tsx             → / (Home page)
│   ├── globals.css          → Global styles
│   ├── activities/
│   │   └── page.tsx         → /activities
│   ├── contact/
│   │   └── page.tsx         → /contact
│   ├── snow-pickup/
│   │   └── page.tsx         → /snow-pickup
│   ├── api/
│   │   └── snow-requests/
│   │       └── route.ts     → /api/snow-requests
│   └── actions/
│       └── snow-requests.ts → Server actions
├── components/
│   ├── Navbar.tsx           → Navigation
│   └── Footer.tsx           → Footer
```

## Routes

| URL | File | Purpose |
|-----|------|---------|
| `/` | `page.tsx` | Home page with hero, values, mission, about |
| `/activities` | `activities/page.tsx` | Project showcase |
| `/contact` | `contact/page.tsx` | Contact form |
| `/snow-pickup` | `snow-pickup/page.tsx` | Service request form |
| `/api/snow-requests` | `api/snow-requests/route.ts` | API endpoint |

## Key Components

### Navbar
- Location: `src/components/Navbar.tsx`
- Features: Mobile menu, responsive, accessible

### Footer  
- Location: `src/components/Footer.tsx`
- Contains: Contact info, social links, quick nav

### Home Page
- Hero section with CTA buttons
- 4-column values grid
- Mission section
- About with statistics

### Snow Pickup Form
- Name, phone, address, priority fields
- Validation with error messages
- Saves to Supabase via server action
- Success message feedback

### Contact Form
- Name, email, phone, subject, message
- Subject dropdown (6 options)
- Contact information sidebar
- Validation

## Database

### Main Table: snow_requests

**Columns:**
- `id` (UUID): Primary key
- `name`, `phone`, `address`: Required user info
- `priority`: high | medium | standard
- `status`: pending | confirmed | in-progress | completed | cancelled
- `notes`: Staff notes
- `created_at`, `updated_at`: Auto timestamps
- `service_date`, `assigned_to`, `completed_at`: Optional

**Indexes:**
- `status`, `priority`, `created_at`, `service_date`

## Server Actions

**File:** `src/app/actions/snow-requests.ts`

Available functions:
```typescript
submitSnowRequest(formData)           → Submit new request
getSnowRequests()                     → Get all requests
updateSnowRequestStatus(id, status)   → Update status
getSnowRequestsByStatus(status)       → Filter by status
getHighPriorityRequests()             → Get urgent requests
```

## API Endpoints

**File:** `src/app/api/snow-requests/route.ts`

```bash
# Submit request
POST /api/snow-requests
Body: {name, phone, address, priority, notes}

# Get requests
GET /api/snow-requests?status=pending&limit=50&offset=0
```

## Styling

### Classes & Utilities
```css
.btn-primary           → Blue button
.btn-secondary         → Gray button
.section-container     → Max-width + padding
.section-title         → Large heading
.section-subtitle      → Subtitle text
```

### Colors
- Primary: `#2563eb` (blue-600)
- Secondary: `#1f2937` (gray-900)
- Backgrounds: White, gray-50, gray-100
- Text: gray-900, gray-700, gray-600

### Fonts
- Base size: 16px (accessible for seniors)
- Line height: 1.6
- Family: Inter (via Google Fonts)

## Environment Variables

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_GA_ID=google-analytics-id
```

## Common Commands

```bash
# Development
npm run dev              → Start dev server (port 3000)

# Build & Deploy
npm run build            → Build for production
npm run start            → Start production server
npm run lint             → Run ESLint

# Database (CLI)
supabase init            → Initialize Supabase
supabase db push         → Apply migrations
supabase db pull         → Pull schema from remote
```

## Adding New Pages

1. Create directory: `src/app/[page-name]/`
2. Create file: `src/app/[page-name]/page.tsx`
3. Add import in Navbar: `Link href="/[page-name]"`
4. Route accessible at: `/[page-name]`

## Modifying Forms

### Add new field:
```tsx
const [fieldName, setFieldName] = useState('');

// In form:
<input
  name="fieldName"
  value={fieldName}
  onChange={(e) => setFieldName(e.target.value)}
/>

// In submission:
const { fieldName, ...data } = formData;
```

## Accessing Supabase Data

### Client-side (via API):
```typescript
const response = await fetch('/api/snow-requests?status=pending');
const { requests } = await response.json();
```

### Server-side (via server action):
```typescript
import { getSnowRequests } from '@/app/actions/snow-requests';
const { requests } = await getSnowRequests();
```

## Customization Hotspots

**File** | **Change** | **Impact**
---|---|---
`tailwind.config.ts` | colors, fonts | Entire site styling
`src/components/Navbar.tsx` | navigation links | Site navigation
`src/components/Footer.tsx` | contact info | Footer content
`src/app/page.tsx` | values, mission, about | Home page content
`NEXT_PUBLIC_SUPABASE_URL` | .env.local | Database connection

## Performance Tips

1. **Images**: Use Next.js Image component
2. **Code**: Use dynamic imports for heavy components
3. **Database**: Use indexes for filtered columns
4. **Caching**: Add revalidate to dynamic routes
5. **Monitoring**: Check Lighthouse scores regularly

## Troubleshooting

**Forms not submitting?**
- Check `.env.local` has Supabase keys
- Verify table exists in Supabase
- Check browser console for errors
- Clear `.next` cache and rebuild

**Styling not applying?**
- Restart dev server
- Clear browser cache
- Check class names are correct
- Verify tailwind.config.ts includes file paths

**Mobile menu not working?**
- Ensure `use client` directive in Navbar
- Check useState is properly imported
- Verify onClick handlers update state
- Check browser console for errors

**Database errors?**
- Verify RLS policies are enabled
- Check column names match exactly
- Ensure INSERT/SELECT permissions exist
- Review Supabase logs for details

## Deployment Platforms

**Recommended**: Vercel
- Push to GitHub → Automatic deployment
- Add env variables in dashboard
- Instant rollback capability

**Alternatives**:
- AWS Amplify
- Firebase Hosting
- Railway
- Render
- Netlify (requires adapter)

## Monitoring & Support

**Supabase Dashboard**:
- Database > Logs → View queries
- Database > Monitor → Check performance
- Settings > Billing → View usage

**Vercel Dashboard**:
- Deployments → View history
- Functions → Monitor API routes
- Analytics → View Core Web Vitals

**Helpful Links**:
- Next.js Docs: nextjs.org/docs
- Tailwind CSS: tailwindcss.com/docs
- Supabase Docs: supabase.com/docs
- Lucide Icons: lucide.dev

---

## Emergency Fixes

If something breaks:

1. **Check logs**: Vercel dashboard → Functions → Logs
2. **Rollback**: Vercel → Deployments → Promote previous
3. **Revert code**: `git revert [commit-hash]`
4. **Clear cache**: `rm -rf .next && npm run build`
5. **Restart**: Kill terminal, run `npm run dev` again

**Contact Support**: info@communitycare.org or check logs at Vercel/Supabase dashboards.

---

**Last Updated**: December 2024
**Version**: 1.0
