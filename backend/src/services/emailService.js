const nodemailer = require('nodemailer');

// Create transporter — configure via .env
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const FROM = `"${process.env.PLATFORM_NAME || 'Somalia E-Learning'}" <${process.env.SMTP_USER}>`;

// ─── EMAIL TEMPLATES ──────────────────────────────────────────────────────

const baseTemplate = (body) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #1a5276; padding: 28px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; }
    .body { padding: 32px; color: #333; line-height: 1.6; }
    .btn { display: inline-block; margin: 20px 0; padding: 12px 28px; background: #1a5276; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .footer { background: #f0f0f0; padding: 16px 32px; text-align: center; font-size: 12px; color: #888; }
    .highlight { background: #eaf2ff; border-left: 4px solid #1a5276; padding: 12px 16px; border-radius: 4px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Somalia E-Learning Platform</h1></div>
    <div class="body">${body}</div>
    <div class="footer">© ${new Date().getFullYear()} Somalia E-Learning Platform. All rights reserved.</div>
  </div>
</body>
</html>`;

// ─── SEND FUNCTIONS ───────────────────────────────────────────────────────

const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[Email skipped — SMTP not configured] To: ${to} | Subject: ${subject}`);
    return { skipped: true };
  }
  try {
    const transporter = createTransporter();
    const result = await transporter.sendMail({ from: FROM, to, subject, html });
    console.log(`[Email sent] To: ${to} | Subject: ${subject}`);
    return result;
  } catch (err) {
    console.error(`[Email failed] To: ${to} | Error: ${err.message}`);
    return { error: err.message };
  }
};

// Welcome email when a student signs up themselves (no password in email)
const sendSignupWelcomeEmail = async ({ email, fullName, loginUrl }) => {
  const html = baseTemplate(`
    <p>Hello <strong>${fullName}</strong>,</p>
    <p>Welcome to <strong>SomaliLearn</strong>! Your free account is ready.</p>
    <div class="highlight">
      Browse our course catalog anytime. When you're ready to enroll in a paid course,
      contact our team — we'll unlock your courses after payment.
    </div>
    <p>We'll also email you when new courses launch and special offers are available.</p>
    <a href="${loginUrl || process.env.FRONTEND_URL + '/student'}" class="btn">Go to My Dashboard</a>
    <p>Questions? Reply to this email or message us on WhatsApp.</p>
  `);
  return sendEmail({ to: email, subject: 'Welcome to SomaliLearn — account created!', html });
};

// Welcome email when admin creates a student account
const sendWelcomeEmail = async ({ email, fullName, password, loginUrl }) => {
  const html = baseTemplate(`
    <p>Hello <strong>${fullName}</strong>,</p>
    <p>Your account on the <strong>Somalia E-Learning Platform</strong> has been created. You can now log in and start learning!</p>
    <div class="highlight">
      <strong>Your Login Details:</strong><br>
      Email: <code>${email}</code><br>
      Password: <code>${password}</code>
    </div>
    <p>Please change your password after your first login.</p>
    <a href="${loginUrl || process.env.FRONTEND_URL + '/login'}" class="btn">Login Now</a>
    <p>If you have any questions, contact our admin team.</p>
  `);
  return sendEmail({ to: email, subject: 'Welcome to Somalia E-Learning Platform!', html });
};

// Notify student that they've been enrolled in a course
const sendEnrollmentEmail = async ({ email, fullName, courseName, teacherName }) => {
  const html = baseTemplate(`
    <p>Hello <strong>${fullName}</strong>,</p>
    <p>You have been successfully enrolled in a new course!</p>
    <div class="highlight">
      <strong>Course:</strong> ${courseName}<br>
      <strong>Instructor:</strong> ${teacherName || 'Platform Instructor'}
    </div>
    <p>Log in to your account to start learning right away.</p>
    <a href="${process.env.FRONTEND_URL || '#'}/student/courses" class="btn">Go to My Courses</a>
  `);
  return sendEmail({ to: email, subject: `You're enrolled: ${courseName}`, html });
};

// Notify student their assignment was graded
const sendGradeEmail = async ({ email, fullName, assignmentTitle, grade, maxGrade, feedback }) => {
  const html = baseTemplate(`
    <p>Hello <strong>${fullName}</strong>,</p>
    <p>Your assignment has been graded!</p>
    <div class="highlight">
      <strong>Assignment:</strong> ${assignmentTitle}<br>
      <strong>Your Grade:</strong> ${grade} / ${maxGrade}<br>
      ${feedback ? `<strong>Feedback:</strong> ${feedback}` : ''}
    </div>
    <a href="${process.env.FRONTEND_URL || '#'}/student/courses" class="btn">View My Progress</a>
  `);
  return sendEmail({ to: email, subject: `Assignment graded: ${assignmentTitle}`, html });
};

// Send certificate issued notification
const sendCertificateEmail = async ({ email, fullName, courseName, certificateNumber, downloadUrl }) => {
  const html = baseTemplate(`
    <p>Congratulations <strong>${fullName}</strong>! 🎉</p>
    <p>You have successfully completed the course <strong>"${courseName}"</strong> and earned your certificate!</p>
    <div class="highlight">
      <strong>Certificate Number:</strong> ${certificateNumber}
    </div>
    <a href="${downloadUrl || process.env.FRONTEND_URL + '/student/certificates'}" class="btn">Download Certificate</a>
    <p>Keep up the great work and continue learning!</p>
  `);
  return sendEmail({ to: email, subject: `Certificate earned: ${courseName} 🎓`, html });
};

// Password reset by admin
const sendPasswordResetEmail = async ({ email, fullName, newPassword }) => {
  const html = baseTemplate(`
    <p>Hello <strong>${fullName}</strong>,</p>
    <p>Your password has been reset by the administrator.</p>
    <div class="highlight">
      <strong>New Password:</strong> <code>${newPassword}</code>
    </div>
    <p>Please login and change your password immediately.</p>
    <a href="${process.env.FRONTEND_URL || '#'}/login" class="btn">Login Now</a>
  `);
  return sendEmail({ to: email, subject: 'Your password has been reset', html });
};

// Re-engagement nudge — student inactive for a few days (Duolingo-style)
const sendStreakReminder = async ({ email, fullName, daysInactive, currentStreak, courseName }) => {
  const streakLine = currentStreak > 0
    ? `<p>Your <strong>${currentStreak}-day streak 🔥</strong> is waiting for you — don't let it slip!</p>`
    : `<p>A few minutes today is all it takes to get back on track.</p>`;
  const html = baseTemplate(`
    <p>Hello <strong>${fullName}</strong>,</p>
    <p>We haven't seen you in ${daysInactive} day${daysInactive === 1 ? '' : 's'}. ${courseName ? `Your course <strong>"${courseName}"</strong> is right where you left it.` : ''}</p>
    ${streakLine}
    <div class="highlight">Just one lesson today keeps your momentum going. 💪</div>
    <a href="${process.env.FRONTEND_URL || '#'}/student" class="btn">Continue Learning</a>
  `);
  return sendEmail({ to: email, subject: `${fullName.split(' ')[0]}, keep your learning streak alive! 🔥`, html });
};

module.exports = {
  sendSignupWelcomeEmail, sendWelcomeEmail, sendEnrollmentEmail,
  sendGradeEmail, sendCertificateEmail, sendPasswordResetEmail,
  sendStreakReminder, sendEmail
};
