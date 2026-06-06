require('../src/loadEnv');
const { sendEmail } = require('../src/services/emailService');

const to = process.argv[2] || process.env.SMTP_USER;

(async () => {
  console.log(`Sending test email to: ${to}`);
  console.log(`Using host=${process.env.SMTP_HOST} port=${process.env.SMTP_PORT} user=${process.env.SMTP_USER}`);
  const result = await sendEmail({
    to,
    subject: 'AqoonJire SMTP test ✅',
    html: '<h2>It works!</h2><p>Your Hostinger SMTP is configured correctly. Newsletters and announcements can now be sent from this address.</p>',
  });
  console.log('Result:', result);
  process.exit(result && result.error ? 1 : 0);
})();
