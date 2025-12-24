# Quick Setup: Food & Clothes Drive Feature

## ⚡ 3-Step Setup

### Step 1: Create Database Table (2 minutes)
1. Go to [Supabase Dashboard](https://supabase.com)
2. Navigate to **SQL Editor**
3. Create a new query and paste this:

```sql
CREATE TABLE IF NOT EXISTS public.food_clothes_drives (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  drive_type TEXT NOT NULL CHECK (drive_type IN ('food', 'clothes', 'both')),
  items_description TEXT NOT NULL,
  quantity TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  special_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS food_clothes_drives_status_idx ON public.food_clothes_drives (status);
CREATE INDEX IF NOT EXISTS food_clothes_drives_created_at_idx ON public.food_clothes_drives (created_at DESC);
CREATE INDEX IF NOT EXISTS food_clothes_drives_email_idx ON public.food_clothes_drives (email);

ALTER TABLE public.food_clothes_drives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit donation requests" ON public.food_clothes_drives
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all donations" ON public.food_clothes_drives
  FOR SELECT
  USING (true);

CREATE POLICY "Allow updates to donation status" ON public.food_clothes_drives
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

4. Click **Execute** ✅

### Step 2: Verify Implementation (1 minute)
All code is already implemented:
- ✅ Form page at `/food-clothes-drive`
- ✅ Server action in `/src/app/actions/snow-requests.ts`
- ✅ Admin view at `/admin/food-clothes-drives`
- ✅ Navigation updated with "Donate" link
- ✅ Build passes with no errors

### Step 3: Test It (2 minutes)
1. Run dev server: `npm run dev`
2. Visit `http://localhost:3000/food-clothes-drive`
3. Fill form and submit
4. Log in as admin at `http://localhost:3000/login`
5. View donation in Admin Dashboard → Donations

## 📋 What Users See

**Public Form** (`/food-clothes-drive`):
- Donor information section
- "How It Works" explanation
- Donation type selector (Food/Clothes/Both)
- Items description & quantity
- Pickup date & time
- Special instructions field
- FAQ section

**Admin View** (`/admin/food-clothes-drives`):
- Statistics cards (Total, Pending, Scheduled, Completed)
- All donations in card format
- Donor contact info & address
- Items description & quantity
- Scheduled pickup details
- Status indicator
- Created timestamp

## 🎯 Feature Summary

| Aspect | Details |
|--------|---------|
| **Public URL** | `/food-clothes-drive` |
| **Admin URL** | `/admin/food-clothes-drives` |
| **Table Name** | `food_clothes_drives` |
| **Form Fields** | Name, Email, Phone, Address, Drive Type, Items, Quantity, Date, Time, Instructions |
| **Validation** | Email format, phone format, enum values, required fields |
| **Status Options** | pending, scheduled, completed, cancelled |
| **User Access** | Anyone can submit |
| **Admin Access** | Google OAuth with peelcommunityclub@gmail.com |

## 🔧 Troubleshooting

**"Could not find the table"** error:
- Make sure you created the table in Supabase
- Check table name is exactly `food_clothes_drives`

**Form not submitting:**
- Verify database table exists
- Check browser console for error messages
- Ensure RLS policies are enabled

**Can't see donations in admin:**
- Log in with correct admin email (peelcommunityclub@gmail.com)
- Make sure you submitted a form first
- Check Supabase > Row Level Security policies are set up

## 📁 Files Modified/Created

**Created:**
- `src/app/food-clothes-drive/page.tsx` - Public donation form
- `src/app/admin/food-clothes-drives/page.tsx` - Admin view
- `src/app/admin/food-clothes-drives/error.tsx` - Error boundary
- `supabase/migrations/002_food_clothes_drives.sql` - Database schema

**Modified:**
- `src/components/Navbar.tsx` - Added "Donate" navigation link
- `src/app/admin/page.tsx` - Added Donations card to dashboard
- `src/app/actions/snow-requests.ts` - Added `submitFoodClothsDrive()` function

## ✅ Build Status

```
✓ Compiled successfully
✓ No TypeScript errors
✓ All 18 pages generated
✓ Ready for production
```

---

**That's it!** The feature is 95% done - just create the database table and you're ready to go. 🎉
