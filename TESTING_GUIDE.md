# Testing Guide

## Manual Testing Checklist

### Page Loads
- [ ] Home page loads without errors
- [ ] Activities page loads without errors
- [ ] Contact page loads without errors
- [ ] Snow pickup page loads without errors
- [ ] All pages have navigation links working

### Navigation
- [ ] Navbar logo links to home
- [ ] Navbar links navigate to correct pages
- [ ] Mobile menu opens/closes on small screens
- [ ] Footer links work correctly
- [ ] Back navigation works as expected

### Responsive Design

#### Desktop (1024px+)
- [ ] All content visible without scrolling horizontally
- [ ] Grid layouts display all columns
- [ ] Images scale appropriately
- [ ] Text is readable

#### Tablet (768px - 1023px)
- [ ] 2-column layouts display correctly
- [ ] Touch targets are adequate size (44px+)
- [ ] Navigation works properly

#### Mobile (< 768px)
- [ ] Mobile menu appears and functions
- [ ] Single-column layouts display
- [ ] Form inputs are large enough
- [ ] Text doesn't overflow
- [ ] No horizontal scrolling

### Forms - Snow Pickup Page

#### Valid Submission
- [ ] Name field accepts text
- [ ] Phone field validates format
- [ ] Address field accepts text
- [ ] Priority dropdown has 3 options
- [ ] Submit button is clickable
- [ ] Success message appears
- [ ] Form clears after submission
- [ ] Data appears in Supabase

#### Invalid Submission
- [ ] Empty form shows error
- [ ] Invalid phone shows error message
- [ ] Missing required fields shows error
- [ ] Error message is clear and helpful

### Forms - Contact Page

#### Valid Submission
- [ ] All fields accept input
- [ ] Email validation works
- [ ] Subject dropdown shows 6 options
- [ ] Submit button works
- [ ] Success message appears
- [ ] Form clears after submission

#### Validation
- [ ] Required fields enforced
- [ ] Email format validated
- [ ] Phone format flexible
- [ ] Error messages are clear

### Accessibility

#### Keyboard Navigation
- [ ] Tab key navigates through all interactive elements
- [ ] Shift+Tab navigates backwards
- [ ] Enter/Space activates buttons
- [ ] No keyboard trap on modals
- [ ] Logical tab order

#### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] Page title announced
- [ ] Headings properly announced
- [ ] Form labels associated with inputs
- [ ] Buttons have clear labels
- [ ] Images have alt text
- [ ] Links clearly described
- [ ] Error messages announced

#### High Contrast Mode
- [ ] All text readable
- [ ] Buttons distinguishable
- [ ] Focus indicators visible
- [ ] Links distinguishable from text
- [ ] Colors not only way to convey info

#### Large Font
- [ ] Text readable at 200% zoom
- [ ] No overflow or cutoff
- [ ] Layout still works
- [ ] Touch targets still adequate

### Performance

#### Load Time
- [ ] Home page loads in < 3 seconds
- [ ] Other pages load in < 2 seconds
- [ ] Images load progressively
- [ ] No layout shift when loading

#### Core Web Vitals
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Browser Testing

#### Desktop Browsers
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (latest)
- [ ] Microsoft Edge (latest)

#### Mobile Browsers
- [ ] iOS Safari (latest)
- [ ] Android Chrome (latest)
- [ ] Firefox Mobile (latest)

### Visual Design

#### Colors & Contrast
- [ ] Primary color (#2563eb) is consistent
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Buttons have sufficient contrast
- [ ] Links distinguishable from text

#### Spacing & Alignment
- [ ] Margins and padding are consistent
- [ ] Elements aligned properly
- [ ] No overlapping content
- [ ] Whitespace used effectively

#### Typography
- [ ] Headings have proper hierarchy (h1, h2, h3)
- [ ] Base font size is 16px minimum
- [ ] Line height is 1.6 or greater
- [ ] Line length is reasonable (< 80 characters)

### Links & Navigation
- [ ] All internal links work
- [ ] External links open in new tab
- [ ] No broken links (404s)
- [ ] Navigation is intuitive
- [ ] Current page indicator in nav

### Database

#### Supabase Connection
- [ ] `.env.local` has correct credentials
- [ ] snow_requests table exists
- [ ] Can submit form successfully
- [ ] Data saves to Supabase
- [ ] Timestamps are correct

#### Data Integrity
- [ ] All required fields populated
- [ ] Phone number format stored correctly
- [ ] Priority levels correct
- [ ] Status defaults to "pending"
- [ ] No duplicate entries

### API Testing

#### POST /api/snow-requests
```bash
curl -X POST http://localhost:3000/api/snow-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "(555) 123-4567",
    "address": "123 Test St",
    "priority": "high"
  }'
```

Expected response:
```json
{
  "success": true,
  "requestId": "uuid-here",
  "message": "Service request submitted successfully"
}
```

#### GET /api/snow-requests
```bash
curl http://localhost:3000/api/snow-requests?status=pending
```

Expected response:
```json
{
  "success": true,
  "requests": [...],
  "total": 10,
  "limit": 50,
  "offset": 0
}
```

#### Error Handling
```bash
# Missing fields
curl -X POST http://localhost:3000/api/snow-requests \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
# Expected: 400 error
```

### Content

#### Spelling & Grammar
- [ ] No typos throughout site
- [ ] Grammar is correct
- [ ] Consistent capitalization
- [ ] Professional tone

#### Data Accuracy
- [ ] Contact information correct
- [ ] Hours of operation accurate
- [ ] Service descriptions clear
- [ ] All content up to date

### SEO Basics

#### Meta Tags
- [ ] Page title descriptive
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present

#### Structured Data
- [ ] Schema markup added (optional)
- [ ] JSON-LD format valid
- [ ] Organization data complete

### Analytics Setup (If applicable)

- [ ] Google Analytics tracking works
- [ ] Events are being recorded
- [ ] Page views tracked
- [ ] Form submissions tracked

## Test Data

### Test Snow Pickup Submission
```
Name: John Smith
Phone: (555) 123-4567
Address: 123 Main Street, Apt 4B
Priority: High
```

### Test Contact Form
```
Name: Jane Doe
Email: jane@example.com
Phone: (555) 234-5678
Subject: Volunteer Opportunity
Message: I would like to volunteer for snow removal
```

### Test Edge Cases

#### Phone Number Variations
- [ ] (555) 123-4567 ✓
- [ ] 555-123-4567 ✓
- [ ] 555 123 4567 ✓
- [ ] +1 555 123 4567 ✓
- [ ] abc-123-defg ✗

#### Email Validation
- [ ] user@example.com ✓
- [ ] user+tag@example.co.uk ✓
- [ ] user@example ✗
- [ ] @example.com ✗
- [ ] user.name@example.com ✓

#### Long Input
- [ ] Long name (50+ characters)
- [ ] Long address (100+ characters)
- [ ] Long message (1000+ characters)

## Performance Testing

### Lighthouse Audit
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Mobile" or "Desktop"
4. Click "Generate report"
5. Verify scores:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

### Load Testing
```bash
# Using Apache Bench (ab)
ab -n 100 -c 10 http://localhost:3000/

# Using wrk
wrk -t12 -c400 -d30s http://localhost:3000/
```

## Automated Testing (Optional)

### Unit Tests
```bash
# Create jest.config.js
npm install --save-dev jest @testing-library/react

# Run tests
npm test
```

### E2E Tests
```bash
# Playwright setup
npm install --save-dev @playwright/test

# Run tests
npx playwright test
```

## Test Report Template

```
NPO Website - Test Report
Date: [Date]
Tester: [Name]

PASSED:
- ✓ Home page loads
- ✓ Snow pickup form submits
- ✓ Mobile navigation works

FAILED:
- ✗ Contact form not sending emails
  Resolution: Requires email service setup

IMPROVEMENTS:
- [ ] Add loading skeleton on forms
- [ ] Add animations to transitions
- [ ] Improve error messages

Signed: [Tester Name]
```

## Continuous Testing

### Weekly
- [ ] Run full manual test suite
- [ ] Check browser compatibility
- [ ] Verify database performance
- [ ] Review error logs

### Monthly
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Security scan
- [ ] User feedback review

## Known Issues & Limitations

As of v1.0:
1. Email notifications not yet implemented
2. Admin dashboard not yet built
3. Volunteer assignment system manual
4. Mobile app not available
5. Multi-language not supported

## Notes

- Test on real devices when possible
- Use real data similar to actual use
- Test error scenarios, not just happy path
- Document any issues found
- Prioritize accessibility testing

---

**Testing is essential for launch quality. Don't skip it!**
