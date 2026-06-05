# Growth Features — What Was Added & How to Run

This document covers the growth/retention features layered onto AqoonJire.
Everything is **additive** — your existing code, data, and `backend/.env` are untouched.

---

## 1. How to apply it locally

```bash
# Backend
cd backend
npm install              # no NEW dependencies were added; node:test is built-in
npm run migrate          # runs migrations/006_growth_features.sql (additive)
npm test                 # 16 unit tests (pricing + streak logic) — should pass
npm run dev              # start the API

# Frontend
cd ../frontend
npm install              # re-installs platform-correct binaries (vite/rollup/esbuild)
npm run dev
```

Optional re-engagement emails (Duolingo-style nudge):

```bash
cd backend
npm run reminders        # emails students inactive >= REMINDER_INACTIVE_DAYS (default 3)
# schedule once a day, e.g. crontab:
#   0 9 * * *  cd /path/to/backend && node scripts/sendReminders.js
```

Reminders honor your existing SMTP settings. If SMTP is blank, emails are logged
and skipped — so the script is always safe to run.

> No `.env` changes are required. Two optional vars you *may* set:
> `REMINDER_INACTIVE_DAYS` (default `3`) and nothing else.

---

## 2. The features

### Coupons / promo codes
- Admin → **Coupons**: percent or fixed discounts, scoped to all courses / one course / a bundle, with min-purchase, max-uses, per-user limit, and expiry.
- Students validate/redeem from **Refer & Earn**. Personal (assigned) coupons from loyalty/referral show up automatically.

### Bundles & all-access subscription
- Admin → **Bundles & Plans**: group courses ("buy 3") for one price, or create a monthly **All-Access** subscription plan (one is seeded by default at $15/30 days).
- `POST /api/admin/bundles/:id/grant` and `POST /api/admin/students/:studentId/subscription` activate access after a manual/mobile-money payment.

### Cohorts / batches + drip
- Teacher → **Live & Cohorts → Cohorts**: batches with a start date, optional capacity, and a drip toggle.
- **Drip Schedule** tab sets, per section, how many days after the start date it unlocks. Locked sections show "unlocks in N days" to the student and their content is withheld server-side.
- Drip anchor = cohort start date (if enrolled in a drip cohort) else the student's enrollment date (self-paced).

### Live classes
- Teacher → **Live & Cohorts → Live Sessions**: Zoom / Meet / Jitsi link + time + duration. Enrolled students are notified.
- Student → **Live Classes**: upcoming sessions with a join button ("Starting soon" within the hour).

### Referral / affiliate program
- Every user gets a referral code + link (`/login?ref=CODE`). Student → **Refer & Earn** shows it.
- When admin creates a student account with a referral code, a pending referral is recorded. When that student first gets course access, the referrer is auto-rewarded a **15% coupon**.
- Admin → **Referrals** shows the whole chain and reward codes.

### Funnel analytics
- Admin → **Funnel Analytics**: catalog view → course view → enrollment → completion, with conversion % between stages.
- **Per-lesson drop-off** per course shows exactly which lesson loses students (biggest red bars first).
- Events are tracked client-side (`catalog_view`, `course_view`, `lesson_start`) and server-side (`enroll`, `lesson_complete`, `course_complete`).

### Streaks + daily goal + reminders
- Student dashboard shows a 🔥 streak, today's goal progress, and best streak.
- Streaks update automatically on lesson completion. Goal is adjustable via `PUT /api/me/streak/goal`.
- 3-day-inactive email nudge via the reminders script.

### Certificate carrot
- Dashboard surfaces "You're X% to your certificate — N lessons left" for the course closest to completion, linking straight into it.

### Teacher responsiveness / SLA
- Teacher → **Student Q&A**: response-time metrics (answered, overdue >24h, average hours) and an inbox of unanswered questions, oldest first.
- A teacher/admin reply marks a question answered automatically.
- **Course FAQs** tab lets teachers curate pinned Q&A per course (public `GET /api/courses/:id/faqs`).

### Loyalty loop
- Finishing a course auto-issues a **10% off** personal coupon for the next one (90-day expiry), shown under **Refer & Earn**.

---

## 3. Bug fixes

1. **Test stub** → replaced `echo "no test" && exit 1` with a real `node --test` suite covering coupon pricing and streak/drip math (`backend/test/`). Logic was extracted into pure, dependency-free utils (`src/utils/pricing.js`, `src/utils/streak.js`) so tests need no database.
2. **Mux webhook** → already existed; **hardened** so production rejects unsigned/unverifiable webhooks, and added `POST /api/videos/lessons/:lessonId/reconcile` to poll Mux directly and unstick assets left in `uploading`/`processing` when a webhook is missed.

---

## 4. New files

```
backend/migrations/006_growth_features.sql
backend/src/utils/pricing.js
backend/src/utils/streak.js
backend/src/services/growthService.js
backend/src/controllers/{coupon,bundle,cohort,liveSession,referral,funnel,streak,faq}Controller.js
backend/scripts/sendReminders.js
backend/test/{pricing,streak}.test.js

frontend/src/pages/admin/{Coupons,Bundles,Funnel,Referrals}.jsx
frontend/src/pages/teacher/{LiveClasses,QA}.jsx
frontend/src/pages/student/{LiveClasses,Rewards}.jsx
```

Edited (surgically, behavior preserved): `adminController`, `commentController`,
`progressController`, `studentController`, `muxController`, `auth`, `emailService`,
`routes/index`, `package.json`, plus frontend `api.js`, `App.jsx`, `DashboardLayout.jsx`,
student `Dashboard.jsx`, and funnel pings in `CourseCatalog/CourseDetail/CoursePlayer`.

---

## 5. New API endpoints (45)

Coupons: `GET/POST/PUT/DELETE /admin/coupons`, `POST /coupons/validate`, `POST /coupons/redeem`, `GET /me/coupons`
Bundles/subs: `GET /bundles`, `…/admin/bundles…`, `GET /subscription-plans`, `POST /admin/subscription-plans`, `POST /admin/students/:id/subscription`, `GET /me/subscription`
Cohorts/drip: `…/courses/:id/cohorts`, `…/cohorts/:id…`, `PUT /sections/:id/drip`
Live: `…/courses/:id/live-sessions`, `…/live-sessions/:id`, `GET /student/live-sessions`
Referrals: `GET /me/referral`, `GET /me/credits`, `GET /admin/referrals`
Funnel: `POST /track`, `GET /admin/funnel/overview`, `GET /admin/funnel/course/:id/dropoff`
Streaks: `GET /me/streak`, `PUT /me/streak/goal`
FAQ/SLA: `…/courses/:id/faqs`, `…/faqs/:id`, `GET /teacher/sla`, `GET /teacher/sla/inbox`
Mux: `POST /videos/lessons/:id/reconcile`
