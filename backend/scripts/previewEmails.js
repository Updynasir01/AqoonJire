require('../src/loadEnv');
const fs = require('fs');
const path = require('path');
const { buildCampaignContent, broadcastShell } = require('../src/services/emailService');

const course = {
  title: 'Full-Stack Web Development with React & Node',
  slug: 'full-stack-web-development',
  thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1080&q=80',
  price: 49,
  level: 'intermediate',
  duration_hours: 32,
};
const coupon = { code: 'LAUNCH30', discount_type: 'percent', discount_value: 30, expires_at: '2026-07-15' };

const body = `<p>Hello,</p>
<p>We've been working hard to bring you fresh content and better learning experiences. This month we added new lessons, live sessions, and a smoother dashboard.</p>
<p>Thanks for being part of the AqoonJire community.</p>`;

const samples = [
  { type: 'newsletter', subject: 'What\u2019s new at AqoonJire this month', course: null, coupon: null },
  { type: 'course_announcement', subject: 'New course: Full-Stack Web Development', course, coupon: null },
  { type: 'discount_announcement', subject: 'Limited offer: 30% off our newest course', course, coupon },
];

const outDir = path.join(__dirname, '..', 'previews');
fs.mkdirSync(outDir, { recursive: true });

for (const s of samples) {
  const content = buildCampaignContent({ type: s.type, subject: s.subject, bodyHtml: body, course: s.course, coupon: s.coupon });
  const html = broadcastShell(content, '#');
  const file = path.join(outDir, `${s.type}.html`);
  fs.writeFileSync(file, html);
  console.log('Wrote', file);
}
console.log('\nOpen the files in the backend/previews folder in your browser.');
