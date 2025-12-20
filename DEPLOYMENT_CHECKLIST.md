# Deployment Checklist

## Pre-Launch Checklist

### Code Quality
- [ ] Run linter: `npm run lint`
- [ ] No console errors in browser
- [ ] All pages load without errors
- [ ] Forms validate correctly
- [ ] Links work on all pages

### Testing
- [ ] Test on desktop (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test on tablet
- [ ] Test keyboard navigation (Tab key)
- [ ] Test screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Test all forms with valid/invalid data
- [ ] Test with slow internet (2G/3G)

### Database
- [ ] Supabase project created
- [ ] Schema SQL executed successfully
- [ ] snow_requests table exists
- [ ] Test form submission saves to database
- [ ] Verify RLS policies are enabled
- [ ] Test data retrieval from API

### Content
- [ ] Update all placeholder text with real content
- [ ] Replace example images with real images
- [ ] Update contact information
- [ ] Update social media links
- [ ] Verify all links are correct
- [ ] Check spelling and grammar

### Environment
- [ ] `.env.local` has correct Supabase keys
- [ ] `.env.example` is up to date
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive data in code
- [ ] No console logs with sensitive info

### SEO & Meta
- [ ] Update page titles and meta descriptions
- [ ] Add favicon
- [ ] Create sitemap
- [ ] Add robots.txt
- [ ] Add OpenGraph meta tags
- [ ] Enable search indexing

### Performance
- [ ] Run Lighthouse audit
- [ ] Check Largest Contentful Paint (LCP)
- [ ] Check Core Web Vitals scores
- [ ] Optimize images
- [ ] Minify code
- [ ] Test build: `npm run build`

## Deployment Steps

### Step 1: Final Build
```bash
npm run lint
npm run build
npm start
```

### Step 2: Prepare Git
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```
5. Click "Deploy"
6. Wait for deployment to complete
7. Click the production URL to verify

### Alternative: Deploy to Other Platforms

**AWS Amplify:**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

**Firebase:**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

**DigitalOcean App Platform:**
1. Push to GitHub
2. Connect at app.digitalocean.com
3. Set environment variables
4. Deploy

## Post-Launch Checklist

### Immediate After Launch
- [ ] Access production URL
- [ ] Test all pages load
- [ ] Test form submission in production
- [ ] Check console for errors
- [ ] Verify database data is saving
- [ ] Test on mobile devices
- [ ] Monitor error logs

### Within 24 Hours
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Monitor Vercel dashboard
- [ ] Check for errors in logs
- [ ] Verify email notifications working (if configured)
- [ ] Test admin functions

### First Week
- [ ] Gather user feedback
- [ ] Monitor database growth
- [ ] Check performance metrics
- [ ] Plan content updates
- [ ] Set up automated backups

### Ongoing
- [ ] Monitor server logs weekly
- [ ] Update content regularly
- [ ] Backup database monthly
- [ ] Security patches when available
- [ ] Monitor Core Web Vitals
- [ ] Review user feedback

## Monitoring Setup

### Error Tracking
Set up error monitoring (optional):
- **Sentry**: `npm install @sentry/nextjs`
- **LogRocket**: `npm install logrocket`
- **Rollbar**: `npm install rollbar`

### Analytics
Set up analytics (optional):
- **Google Analytics**: Add tracking ID to meta tags
- **Plausible**: Alternative privacy-friendly option
- **Fathom**: Another privacy option

### Uptime Monitoring
Set up uptime monitoring:
- **Pingdom**: Free tier available
- **UptimeRobot**: Free and paid options
- **Better Stack**: New uptime monitoring service

## Database Maintenance

### Weekly
- [ ] Check database size
- [ ] Review slow queries
- [ ] Monitor request volume

### Monthly
- [ ] Create manual backup
- [ ] Archive old completed requests
- [ ] Review and update RLS policies
- [ ] Check volunteer assignments

### Quarterly
- [ ] Performance review
- [ ] Security audit
- [ ] Plan scaling if needed
- [ ] Review architecture

## Security Checklist

### Before Launch
- [ ] No API keys in code
- [ ] HTTPS enabled
- [ ] RLS policies configured
- [ ] Input validation on forms
- [ ] Rate limiting enabled (if using API)

### After Launch
- [ ] Monitor authentication logs
- [ ] Review access logs
- [ ] Check for suspicious activity
- [ ] Update dependencies monthly
- [ ] Run security scan: `npm audit`

## Update Your DNS (If Using Custom Domain)

1. Go to your domain registrar
2. Update DNS records:
   ```
   CNAME: www.yourdomain.com → vercel domain
   A: yourdomain.com → Vercel IP
   ```
3. Wait for DNS propagation (up to 24 hours)
4. Verify with: `dig www.yourdomain.com`

## Rollback Plan

If issues occur:

### Option 1: Revert Vercel Deployment
1. Go to Vercel project
2. Click "Deployments"
3. Click the previous working deployment
4. Click "Promote to Production"

### Option 2: Revert Code
```bash
git log  # Find commit hash
git revert [commit-hash]
git push origin main
```

### Option 3: Database Rollback
1. Go to Supabase backups
2. Restore from previous backup
3. Verify data integrity

## Communication Plan

### Before Launch
- [ ] Notify team members
- [ ] Schedule launch window
- [ ] Prepare launch announcement
- [ ] Test announcement channels

### During Launch
- [ ] Monitor error logs
- [ ] Be available for urgent fixes
- [ ] Document any issues
- [ ] Provide status updates if problems

### After Launch
- [ ] Send launch announcement
- [ ] Thank volunteers and supporters
- [ ] Gather feedback
- [ ] Plan next phase

## Success Metrics

Track these after launch:

### Performance
- Page load time < 3 seconds
- Lighthouse score > 90
- 99.9% uptime

### Usage
- Daily unique visitors
- Form submission rate
- Pages per session
- Bounce rate

### Goals
- Number of service requests
- Volunteer sign-ups
- Contact form inquiries
- Return visitor rate

## Support Resources

### Team Communication
- Email: info@communitycare.org
- Slack/Discord: (if set up)
- Phone: (555) 123-4567

### Technical Support
- GitHub Issues: For bug reports
- Vercel Docs: For deployment issues
- Supabase Docs: For database issues
- Next.js Docs: For framework issues

### Emergency Contacts
- DevOps Lead: [Contact Info]
- Database Admin: [Contact Info]
- Project Manager: [Contact Info]

---

## Final Notes

- Keep deployment credentials secure
- Maintain backup copies of important data
- Document all changes and updates
- Plan for scaling as the NPO grows
- Regularly update dependencies: `npm update`
- Stay informed about security patches
- Gather and act on user feedback

**Estimated Time to Launch**: 2-4 hours (after Supabase setup)

**Good luck with your launch! 🚀**
