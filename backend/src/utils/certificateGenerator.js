const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a professional certificate PDF and saves it to disk.
 * Returns the file path so it can be served or streamed.
 */
const generateCertificatePDF = async ({ studentName, courseName, teacherName, certificateNumber, issuedAt }) => {
  const certsDir = path.join(process.cwd(), 'uploads', 'certificates');
  if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir, { recursive: true });

  const filename = `${certificateNumber}.pdf`;
  const filepath = path.join(certsDir, filename);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
        margins: { top: 60, bottom: 60, left: 60, right: 60 }
      });

      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      const W = doc.page.width;
      const H = doc.page.height;

      // ─── BACKGROUND ────────────────────────────────────────────────
      // Outer border rectangle
      doc.rect(20, 20, W - 40, H - 40)
        .lineWidth(8)
        .strokeColor('#1a5276')
        .stroke();

      // Inner border
      doc.rect(30, 30, W - 60, H - 60)
        .lineWidth(2)
        .strokeColor('#d4ac0d')
        .stroke();

      // Header bar
      doc.rect(30, 30, W - 60, 90)
        .fill('#1a5276');

      // ─── PLATFORM NAME (header) ────────────────────────────────────
      doc.fontSize(26)
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .text('E-LEARNING PLATFORM SOMALIA', 0, 52, { align: 'center' });

      // ─── CERTIFICATE TITLE ─────────────────────────────────────────
      doc.fontSize(38)
        .fillColor('#1a5276')
        .font('Helvetica-Bold')
        .text('CERTIFICATE OF COMPLETION', 0, 145, { align: 'center' });

      // Decorative line under title
      const lineY = 195;
      doc.moveTo(120, lineY).lineTo(W - 120, lineY)
        .lineWidth(1.5).strokeColor('#d4ac0d').stroke();

      // ─── PRESENTED TO ──────────────────────────────────────────────
      doc.fontSize(14)
        .fillColor('#555555')
        .font('Helvetica')
        .text('This certificate is proudly presented to', 0, 215, { align: 'center' });

      // Student name
      doc.fontSize(36)
        .fillColor('#1a5276')
        .font('Helvetica-Bold')
        .text(studentName, 0, 240, { align: 'center' });

      // Underline student name
      const nameWidth = doc.widthOfString(studentName, { fontSize: 36 });
      const nameX = (W - nameWidth) / 2;
      doc.moveTo(nameX, 285).lineTo(nameX + nameWidth, 285)
        .lineWidth(1).strokeColor('#1a5276').stroke();

      // ─── COURSE INFO ───────────────────────────────────────────────
      doc.fontSize(14)
        .fillColor('#555555')
        .font('Helvetica')
        .text('for successfully completing the course', 0, 300, { align: 'center' });

      doc.fontSize(22)
        .fillColor('#d4ac0d')
        .font('Helvetica-Bold')
        .text(`"${courseName}"`, 0, 325, { align: 'center' });

      // ─── DATE + CERT NUMBER ────────────────────────────────────────
      const dateStr = new Date(issuedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      doc.fontSize(12)
        .fillColor('#777777')
        .font('Helvetica')
        .text(`Issued on: ${dateStr}`, 80, 385)
        .text(`Certificate No: ${certificateNumber}`, 80, 403);

      // ─── SIGNATURES ────────────────────────────────────────────────
      const sig1X = 120;
      const sig2X = W - 250;
      const sigY = 380;

      // Teacher signature line
      doc.moveTo(sig1X, sigY).lineTo(sig1X + 160, sigY)
        .lineWidth(1).strokeColor('#333').stroke();
      doc.fontSize(11).fillColor('#333').font('Helvetica')
        .text(teacherName, sig1X, sigY + 5, { width: 160, align: 'center' })
        .text('Course Instructor', sig1X, sigY + 20, { width: 160, align: 'center' });

      // Director signature line
      doc.moveTo(sig2X, sigY).lineTo(sig2X + 160, sigY)
        .lineWidth(1).strokeColor('#333').stroke();
      doc.fontSize(11).fillColor('#333')
        .text('Platform Director', sig2X, sigY + 5, { width: 160, align: 'center' })
        .text('AqoonJire', sig2X, sigY + 20, { width: 160, align: 'center' });

      // ─── FOOTER ────────────────────────────────────────────────────
      doc.rect(30, H - 70, W - 60, 40).fill('#1a5276');
      doc.fontSize(10).fillColor('#ffffff')
        .text('AqoonJire  •  Verify at: aqoonjire.com/verify', 0, H - 57, { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve({ filepath, filename, url: `/uploads/certificates/${filename}` }));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Stream a certificate PDF directly to the HTTP response.
 */
const streamCertificate = (filepath, res, filename) => {
  if (!fs.existsSync(filepath)) return false;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  fs.createReadStream(filepath).pipe(res);
  return true;
};

module.exports = { generateCertificatePDF, streamCertificate };
