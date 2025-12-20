# Getting Started Checklist

## ✅ Immediate Setup (Next 30 Minutes)

### Step 1: Read Documentation
- [ ] Open and read [BUILD_SUMMARY.md](BUILD_SUMMARY.md) (5 minutes)
  - Understand what's been built
  - Review project structure
  - Check next steps

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Wait for installation to complete (5-10 minutes)
- [ ] No errors in console
- [ ] `node_modules` folder created

### Step 3: Verify Installation
**Windows:**
```bash
.\verify-installation.bat
```

**Mac/Linux:**
```bash
bash verify-installation.sh
```

- [ ] Verification script shows all files found
- [ ] 0 errors reported
- [ ] Review any warnings

### Step 4: Create Supabase Account
- [ ] Go to https://supabase.com
- [ ] Click "Start your project for free"
- [ ] Sign up with GitHub or email
- [ ] Create new project
  - Project name: "npo-website"
  - Region: Choose closest to you
  - Plan: Free tier is fine
- [ ] Wait 2-3 minutes for setup
- [ ] Project is active

---

## ⚙️ Database Setup (Next 15 Minutes)

### Step 1: Get Supabase Credentials
- [ ] In Supabase dashboard, go to **Settings** → **API**
- [ ] Copy **Project URL** (looks like `https://xxx.supabase.co`)
- [ ] Copy **anon public** key (long string)

### Step 2: Update Environment Variables
- [ ] Open `.env.local` in your editor
- [ ] Replace `your-supabase-url` with actual URL
- [ ] Replace `your-supabase-key` with actual key
- [ ] Save the file

Example:
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdef123456.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Create Database Schema
- [ ] In Supabase, go to **SQL Editor**
- [ ] Click **New Query**
- [ ] Open file `supabase/migrations/001_init_schema.sql`
- [ ] Copy ALL content
- [ ] Paste into Supabase query editor
- [ ] Click **Run**
- [ ] Success! Message appears

### Step 4: Verify Database
- [ ] Go to Supabase **Tables**
- [ ] You should see:
  - `snow_requests`
  - `volunteers`
  - `activity_log`

---

## 🚀 Run Development Server (Next 5 Minutes)

### Step 1: Start Server
```bash
npm run dev
```

- [ ] Terminal shows "ready - started server on 0.0.0.0:3000"
- [ ] No errors in console

### Step 2: Open in Browser
- [ ] Go to http://localhost:3000
- [ ] Home page loads
- [ ] No console errors (F12 to check)

### Step 3: Test Navigation
- [ ] Click "Home" - loads home page
- [ ] Click "Activities" - loads activities page
- [ ] Click "Contact" - loads contact page
- [ ] Click "Snow Pickup" - loads form page
- [ ] Navbar logo returns to home

### Step 4: Test a Form
- [ ] Go to Snow Pickup page
- [ ] Fill in form:
  - Name: "Test User"
  - Phone: "(555) 123-4567"
  - Address: "123 Test Street"
  - Priority: "High"
- [ ] Click Submit
- [ ] Success message appears
- [ ] Form clears

### Step 5: Check Database
- [ ] Go to Supabase dashboard
- [ ] Click **snow_requests** table
- [ ] New row appears with your test data
- [ ] All fields populated correctly

---

## 📱 Test on Mobile (5 Minutes)

### Step 1: Get Your Local IP
**Windows:**
```bash
ipconfig
```
Find "IPv4 Address" (looks like 192.168.x.x)

**Mac/Linux:**
```bash
ifconfig
```
Find "inet" address

### Step 2: Test on Phone
- [ ] Open phone browser
- [ ] Go to `http://[your-ip]:3000`
- [ ] Example: `http://192.168.1.100:3000`
- [ ] Home page loads
- [ ] Menu is accessible
- [ ] Form works on mobile

### Step 3: Check Responsiveness
- [ ] Hamburger menu appears
- [ ] Text is readable
- [ ] No horizontal scrolling
- [ ] Buttons are large enough

---

## 🎨 Customize Content (30 Minutes - Optional Now)

If you want to personalize before launch:

### Update Contact Information
- [ ] Open `src/components/Footer.tsx`
- [ ] Find phone number: "(555) 123-4567"
- [ ] Replace with real phone
- [ ] Find email: "info@communitycare.org"
- [ ] Replace with real email
- [ ] Find address: "123 Main Street"
- [ ] Replace with real address

### Update Home Page
- [ ] Open `src/app/page.tsx`
- [ ] Find "Community Care"
- [ ] Replace with organization name
- [ ] Find mission statement
- [ ] Replace with your mission
- [ ] Find values
- [ ] Replace with your values

### Update Navigation
- [ ] Open `src/components/Navbar.tsx`
- [ ] Line 17: "Community Care"
- [ ] Replace with your name

### Save and Reload
- [ ] Save files
- [ ] Browser auto-refreshes
- [ ] Changes appear immediately

---

## ✨ You're Ready! Next Steps

### Before Launch (Choose Your Timeline)

**This Week:**
- [ ] Customize all content
- [ ] Add real images
- [ ] Test thoroughly (use [TESTING_GUIDE.md](TESTING_GUIDE.md))

**Next Week:**
- [ ] Get stakeholder feedback
- [ ] Make adjustments
- [ ] Prepare deployment

**Launch Week:**
- [ ] Final testing
- [ ] Deploy to Vercel (use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md))
- [ ] Monitor after launch

### Learning Resources
- [ ] Keep [QUICK_REFERENCE.md](QUICK_REFERENCE.md) handy
- [ ] Bookmark [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [ ] Review [TESTING_GUIDE.md](TESTING_GUIDE.md) before launch
- [ ] Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for launch

---

## 🆘 Troubleshooting

### npm install fails
- [ ] Delete `node_modules` folder
- [ ] Delete `package-lock.json`
- [ ] Run `npm install` again

### Server won't start
- [ ] Kill existing process: Ctrl+C
- [ ] Delete `.next` folder
- [ ] Run `npm run dev` again

### Supabase connection fails
- [ ] Check `.env.local` has correct URL and key
- [ ] Verify keys are for "anon public" not service role
- [ ] Check Supabase project is active
- [ ] Verify table exists in Supabase

### Form won't submit
- [ ] Open browser console (F12)
- [ ] Check error messages
- [ ] Verify Supabase credentials in `.env.local`
- [ ] Check `snow_requests` table exists

### Page won't load
- [ ] Check terminal for build errors
- [ ] Kill server and restart: `npm run dev`
- [ ] Clear browser cache: Ctrl+Shift+Del
- [ ] Check file path is correct

### Mobile doesn't work
- [ ] Make sure phone is on same network
- [ ] Use correct IP address (not localhost)
- [ ] Disable phone WiFi password temporarily for testing
- [ ] Try clearing browser cache

---

## 📞 When You Need Help

1. **For Setup Issues**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **For Database Issues**: See [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
3. **For Testing Help**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
4. **For Quick Answers**: See [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
5. **For Deployment**: See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## 🎉 Success Indicators

You've successfully completed setup when:

✅ **Server Running**
- [ ] `npm run dev` shows no errors
- [ ] Localhost:3000 loads instantly

✅ **Database Connected**
- [ ] Form submission succeeds
- [ ] Data appears in Supabase table
- [ ] No connection errors

✅ **Website Works**
- [ ] All pages load
- [ ] All links work
- [ ] Forms validate input
- [ ] Mobile looks good

✅ **Ready to Customize**
- [ ] Understand file structure
- [ ] Know where to make changes
- [ ] Have documentation bookmarked

---

## 📋 Completed Checklist

```
Setup & Installation:
├── ✅ Read documentation
├── ✅ npm install completed
├── ✅ Verification script passed
├── ✅ Created Supabase account
├── ✅ Configured environment variables
├── ✅ Created database schema
├── ✅ Verified database
├── ✅ Server running
├── ✅ Website loads
├── ✅ Forms work
├── ✅ Mobile tested
└── ✅ Ready to customize!
```

---

## 🚀 What's Next?

1. **Day 1**: Customize content
2. **Day 2-3**: Test thoroughly
3. **Day 4**: Prepare deployment
4. **Day 5**: Deploy to Vercel
5. **Day 6+**: Support and improvements

**Estimated time to launch**: 5-7 days

---

**Congratulations! 🎉 You have a fully functional NPO website!**

Next, read the documentation that matches your next task:
- To customize → [SETUP_GUIDE.md](SETUP_GUIDE.md#customization)
- To test → [TESTING_GUIDE.md](TESTING_GUIDE.md)
- To deploy → [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

Need quick info? → [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

**Happy developing! 💻**
