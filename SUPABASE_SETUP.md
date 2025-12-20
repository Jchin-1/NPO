# Supabase Configuration Guide

## Overview

This document explains how to set up and configure Supabase for the NPO website's snow removal request system.

## Creating a Supabase Project

### Step 1: Sign Up
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project for free"
3. Sign up with GitHub or email
4. Create a new organization (or use existing)

### Step 2: Create Project
1. Click "New Project"
2. Enter project details:
   - **Project Name**: e.g., "npo-website"
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Plan**: Free tier is sufficient for small NPOs

3. Click "Create new project" (setup takes 2-3 minutes)

### Step 3: Get Credentials
Once your project is created:
1. Go to **Settings** → **API**
2. Copy the following from "Project API keys":
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Paste these into your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Setting Up the Database Schema

### Method 1: Using SQL Editor (Recommended)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `supabase/migrations/001_init_schema.sql`
4. Paste into the query editor
5. Click **Run**

Your tables are now created!

### Method 2: Using pgAdmin

If you prefer a GUI:
1. Go to **Database** → **pgAdmin**
2. Log in with your database credentials
3. Right-click "Schemas" → "Create" → "Schema"
4. Use the SQL from the migration file

## Understanding the Tables

### snow_requests
Stores all service requests from residents.

**Example record:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Jane Smith",
  "phone": "(555) 123-4567",
  "address": "123 Oak Avenue, Suite 4B",
  "priority": "high",
  "status": "pending",
  "notes": "Has mobility issues",
  "created_at": "2024-12-20T10:30:00Z",
  "updated_at": "2024-12-20T10:30:00Z",
  "completed_at": null,
  "assigned_to": null,
  "service_date": null
}
```

### volunteers
Stores volunteer information (optional, for future admin features).

### activity_log
Audit trail of all changes to requests.

## Enabling Row Level Security (RLS)

The schema includes RLS policies. To verify they're enabled:

1. Go to **Database** → **Tables**
2. Click **snow_requests**
3. Go to **RLS** tab
4. Verify these policies exist:
   - "Enable insert for all users"
   - "Enable read access for authenticated users"
   - "Enable update for authenticated users"

### Custom Policies

If you need to restrict access to staff only, update the policies:

```sql
-- Staff-only update policy
CREATE POLICY "Enable update for staff" ON public.snow_requests
  FOR UPDATE
  USING (
    -- Only update if user is authenticated AND in staff role
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.staff
      WHERE user_id = auth.uid()
    )
  );
```

## Backups & Maintenance

### Automatic Backups
- Free tier: Daily backups (7-day retention)
- Pro tier: Hourly backups (30-day retention)

### Manual Backups
1. Go to **Settings** → **Backups**
2. Click **Request backup** (if on Pro plan)

### Database Monitoring
1. Go to **Database** → **Webhooks** to set up event notifications
2. Use **Database** → **Extensions** to enable `uuid-ossp` for better UUID generation

## Performance Optimization

### Indexes
The schema includes these indexes:
- `idx_snow_requests_status` - Filter by status
- `idx_snow_requests_priority` - Filter by priority
- `idx_snow_requests_created_at` - Sort by date
- `idx_snow_requests_service_date` - Schedule queries

These are created automatically. Monitor index usage:
```sql
SELECT * FROM pg_stat_user_indexes
WHERE schemaname = 'public' AND tablename = 'snow_requests';
```

### Monitoring Slow Queries
1. Go to **Database** → **Logs**
2. Filter by "Slow Queries"
3. Optimize based on suggestions

## User Authentication (Optional)

To add user authentication for admin access:

### Step 1: Enable Auth
1. Go to **Authentication** → **Providers**
2. Enable desired providers (Email, OAuth, etc.)

### Step 2: Create Auth Schema
```sql
-- Create a staff table
CREATE TABLE public.staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'volunteer', -- volunteer, coordinator, admin
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update snow_requests to reference staff
ALTER TABLE public.snow_requests
  DROP CONSTRAINT IF EXISTS snow_requests_assigned_to_fkey,
  ADD CONSTRAINT snow_requests_assigned_to_fkey
    FOREIGN KEY (assigned_to) REFERENCES auth.users(id) ON DELETE SET NULL;
```

### Step 3: Create Auth Admin Users
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Create user**

## Monitoring & Analytics

### Query Performance
```sql
-- Slow queries exceeding 1 second
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC;
```

### Database Size
```sql
-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### User Activity Report
```sql
-- High priority requests by date
SELECT 
  DATE(created_at) as request_date,
  priority,
  COUNT(*) as count
FROM snow_requests
WHERE priority = 'high'
GROUP BY DATE(created_at), priority
ORDER BY request_date DESC;
```

## Data Export

### Export to CSV
1. Go to **SQL Editor**
2. Run a query
3. Click the **CSV** download button

### Export via pgAdmin
1. Go to **Database** → **pgAdmin**
2. Right-click table → **Backup**
3. Choose format (CSV, custom, etc.)

### API Export
```bash
curl -X GET \
  'https://your-project.supabase.co/rest/v1/snow_requests?select=*' \
  -H 'apikey: your-anon-key' \
  -H 'Content-Type: application/json' \
  > requests.json
```

## Troubleshooting

### Connection Errors
```
Error: connect ECONNREFUSED
```
**Solution**: Verify `NEXT_PUBLIC_SUPABASE_URL` is correct (should start with https://)

### Authentication Errors
```
Error: Unauthorized
```
**Solution**: Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set correctly in `.env.local`

### RLS Policy Errors
```
Error: row level security policy
```
**Solution**: Verify RLS policies are enabled for your table

### Table Not Found
```
Error: relation "snow_requests" does not exist
```
**Solution**: Run the schema SQL from `supabase/migrations/001_init_schema.sql` again

## Security Best Practices

### 1. Restrict API Keys
- Use different keys for development and production
- Rotate keys regularly
- Never commit keys to version control

### 2. Enable HTTPS
- Always use HTTPS in production
- Enable "Force HTTPS" in project settings

### 3. Implement Rate Limiting
```sql
-- View current request rate
SELECT 
  user_ip,
  COUNT(*) as requests_per_minute
FROM request_logs
WHERE created_at > NOW() - INTERVAL '1 minute'
GROUP BY user_ip
ORDER BY requests_per_minute DESC;
```

### 4. Regular Backups
- Maintain regular backup schedule
- Test restore procedures
- Store backups in separate location

### 5. Monitor Access
1. Go to **Logs** to view:
   - Database queries
   - Auth events
   - API requests
   - Errors

## Scaling for Growth

### As Your NPO Grows
1. **Monitor usage** in project settings
2. **Upgrade to Pro** when approaching limits:
   - More storage
   - Higher request rate
   - Priority support
3. **Archive old records**:
```sql
-- Archive completed requests older than 1 year
CREATE TABLE snow_requests_archive AS
SELECT * FROM snow_requests
WHERE status = 'completed' AND created_at < NOW() - INTERVAL '1 year';

DELETE FROM snow_requests
WHERE id IN (SELECT id FROM snow_requests_archive);
```

## Support & Resources

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Database Guide**: [https://supabase.com/docs/guides/database](https://supabase.com/docs/guides/database)
- **REST API**: [https://supabase.com/docs/guides/api](https://supabase.com/docs/guides/api)
- **SQL Reference**: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- **Community**: [https://discord.supabase.io](https://discord.supabase.io)

## Helpful Queries

### Get Request Statistics
```sql
SELECT 
  priority,
  status,
  COUNT(*) as count,
  DATE(created_at) as date
FROM snow_requests
GROUP BY priority, status, DATE(created_at)
ORDER BY date DESC;
```

### Find Overdue Requests
```sql
SELECT *
FROM snow_requests
WHERE status = 'pending'
  AND created_at < NOW() - INTERVAL '48 hours'
ORDER BY priority DESC;
```

### Volunteer Performance Report
```sql
SELECT 
  assigned_to,
  COUNT(*) as total_completed,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM snow_requests), 2) as percentage
FROM snow_requests
WHERE status = 'completed'
GROUP BY assigned_to
ORDER BY total_completed DESC;
```

---

For more help, contact your Supabase support or visit the community Discord!
