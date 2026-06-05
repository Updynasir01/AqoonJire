# AqoonJire / Somali Learn — 20-Day Launch Summary Report

**Prepared for:** Excel project timeline  
**Timeline:** Day 0 → Day 20  
**Start date:** 31 May 2026  
**Live launch date:** 20 June 2026  
**Primary goal:** All launch courses published with videos uploaded and students able to watch, complete lessons, submit assignments, and take quizzes.

---

## 1. Executive Summary

| Item | Detail |
|------|--------|
| Project | E-learning platform (admin, teacher, student portals) |
| Launch scope | Published courses + Mux video playback + assignments + quizzes |
| Timeline | 20 days (31 May → 20 June 2026) |
| Critical path | Content upload → Admin publish → Production deploy → QA sign-off → Live |
| Already completed | Course review workflow, Mux integration, assignments/quizzes in student player, 30% video watch rule, quiz list fix |

---

## 2. Milestone Tracker (for Excel)

| # | Milestone | Target Day | Target Date | Owner | Status |
|---|-----------|------------|-------------|-------|--------|
| M1 | Launch plan + owners assigned | 0 | 31 May 2026 | Project Lead | In Progress |
| M2 | All launch course outlines ready | 2 | 2 Jun 2026 | Teacher/Content | To Do |
| M3 | First video batch uploaded (Mux Ready) | 4 | 4 Jun 2026 | Teacher/Content | To Do |
| M4 | All launch courses published | 5 | 5 Jun 2026 | Admin | To Do |
| M5 | 100% videos uploaded + QC passed | 12 | 12 Jun 2026 | Teacher/Content | To Do |
| M6 | Production server live (HTTPS) | 10 | 10 Jun 2026 | DevOps | To Do |
| M7 | QA regression sign-off | 16 | 16 Jun 2026 | QA | To Do |
| M8 | Pilot with real students complete | 14 | 14 Jun 2026 | Admin/QA | To Do |
| M9 | Go/No-Go approval | 18 | 18 Jun 2026 | Project Lead | To Do |
| M10 | **LIVE DAY** | 20 | **20 Jun 2026** | All | To Do |

---

## 3. Workstream Summary

### A. Content & Video (Critical)
- Finalize course syllabus and lesson list
- Record/prepare all video files (MP4)
- Upload via Teacher → Course Builder → Mux
- Add PDF/text lessons, assignments, quizzes
- QC every video (playable, correct lesson, no broken audio)

### B. Development (Mostly done — verify on production)
- Mux webhook on stable production URL
- DB migrations applied
- Student assignments + quizzes visible
- 30% watch rule for video/youtube only
- Degular fonts self-hosted

### C. Admin & Operations
- Create student accounts
- Grant course access (payment gate)
- Submit courses for review → Admin publish
- Launch announcements

### D. QA & Testing
- Student full journey (login → watch → complete → certificate)
- Assignment submit + teacher grade
- Quiz submit + attempts
- Cross-browser + mobile
- Production regression before live

### E. DevOps & Launch
- Production hosting (backend, frontend, PostgreSQL)
- SSL/HTTPS
- Backups
- Monitoring + rollback plan
- Launch day support

---

## 4. Weekly Plan (20 Days)

| Week | Dates | Days | Focus | Key outputs |
|------|-------|------|-------|-------------|
| Week 1 | 31 May – 6 Jun | 0–6 | Foundation + first uploads | Outlines, migrations, batch 1 videos, courses published |
| Week 2 | 7 Jun – 13 Jun | 7–13 | Full content + QA + infra | All videos, production server, bug fixes |
| Week 3 | 14 Jun – 20 Jun | 14–20 | Pilot + pre-launch + LIVE | Soft launch, Go/No-Go, live day |

---

## 5. Risk Register (for Excel)

| Risk | Impact | Likelihood | Mitigation | Owner |
|------|--------|------------|------------|-------|
| Videos stuck on "uploading" | High | Medium | Production Mux webhook + sync fallback | Developer |
| Content not ready by Day 12 | High | Medium | Daily upload quota; prioritize launch courses | Teacher |
| Student access not granted | High | Low | Admin checklist before pilot | Admin |
| Production DB timeout | High | Medium | Connection pool tuning; hosting upgrade | DevOps |
| Teachers don't know upload flow | Medium | Medium | SOP + 1 training session by Day 14 | Project Lead |
| Last-minute bugs | Medium | Medium | Freeze features after Day 13; P1 only | Developer |

---

## 6. Daily Upload Target (Videos)

Assume **~30 launch lessons** (adjust in Excel):

| Period | Days | Dates | Target uploads/day | Cumulative |
|--------|------|-------|-------------------|------------|
| Week 1 | 1–7 | 1–7 Jun | 3 videos/day | ~21 |
| Week 2 | 8–14 | 8–14 Jun | 2 videos/day | ~35 total |
| Buffer | 15–19 | 15–19 Jun | Fix/re-upload failed | 100% ready |
| Live | 20 | 20 Jun | 0 (monitor only) | Launch |

---

## 7. Launch Day Checklist (20 June 2026)

- [ ] All launch courses **Published**
- [ ] Every video lesson shows **Ready** in app
- [ ] Student logins tested
- [ ] Course access granted for enrolled students
- [ ] Assignments + quizzes visible
- [ ] Production HTTPS working
- [ ] Support contact available (admin/teacher)
- [ ] Rollback plan documented
- [ ] Launch announcement sent

---

## 8. Excel Setup Instructions

1. Open `docs/AqoonJire_20Day_Launch_Plan.csv` in Excel.
2. Add columns if needed: **% Complete**, **Blockers**, **Actual Date**.
3. Create a **Pivot Table** by Phase / Workstream / Status.
4. Add a **Gantt chart** using Start Date + Duration (optional).
5. Use conditional formatting: Red = blocked, Yellow = in progress, Green = done.

### Suggested extra sheets in your workbook
- **Sheet 1:** Master task list (from CSV)
- **Sheet 2:** Milestones (Section 2 above)
- **Sheet 3:** Risks (Section 5 above)
- **Sheet 4:** Video upload tracker (course, lesson, upload date, Mux status, QC pass)
- **Sheet 5:** Daily standup log (date, done, today, blockers)

---

## 9. Current Platform Status (as of plan creation)

| Area | Status |
|------|--------|
| Course review workflow (draft → publish) | Done |
| Mux video upload + playback | Done |
| Video quality selector (HLS) | Done |
| Student assignments tab | Done |
| Student quizzes tab | Done |
| 30% watch before complete (video only) | Done |
| Degular font (needs font files in /public/fonts) | Partial |
| Production deployment | To Do |
| Full content upload | To Do |

---

## 10. Success Criteria (Live Day — 20 June 2026)

1. Minimum **X courses** published (set your number in Excel).
2. **100%** of launch lesson videos playable by students.
3. Students can mark lessons complete (with watch rules enforced).
4. Assignments and quizzes work end-to-end.
5. No P1 bugs open.
6. Admin can grant access and view payments/reports.

---

*File for Excel import:* `docs/AqoonJire_20Day_Launch_Plan.csv`
