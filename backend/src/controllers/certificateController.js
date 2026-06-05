const path = require('path');
const fs = require('fs');
const { query } = require('../config/database');
const { asyncHandler, createError } = require('../middleware/errorHandler');
const { generateCertificatePDF, streamCertificate } = require('../utils/certificateGenerator');

// GET /api/certificates/:certificateId/download
// Student downloads their own certificate as PDF
const downloadCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  const result = await query(
    `SELECT cert.*, u.full_name AS student_name, c.title AS course_title,
            t.full_name AS teacher_name
     FROM certificates cert
     JOIN users u ON cert.student_id = u.id
     JOIN courses c ON cert.course_id = c.id
     LEFT JOIN users t ON c.teacher_id = t.id
     WHERE cert.id = $1`,
    [certificateId]
  );

  if (!result.rows.length) throw createError('Certificate not found.', 404);
  const cert = result.rows[0];

  // Only the owner or admin can download
  if (req.user.role === 'student' && cert.student_id !== req.user.id) {
    throw createError('You can only download your own certificates.', 403);
  }

  const filename = `${cert.certificate_number}.pdf`;
  const filepath = path.join(process.cwd(), 'uploads', 'certificates', filename);

  // Generate if not cached on disk
  if (!fs.existsSync(filepath)) {
    await generateCertificatePDF({
      studentName: cert.student_name,
      courseName: cert.course_title,
      teacherName: cert.teacher_name || 'Platform Instructor',
      certificateNumber: cert.certificate_number,
      issuedAt: cert.issued_at
    });
  }

  const streamed = streamCertificate(filepath, res, filename);
  if (!streamed) throw createError('Certificate file could not be generated.', 500);
});

// GET /api/certificates/verify/:certNumber  (public)
// Anyone can verify a certificate by its number
const verifyCertificate = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT cert.certificate_number, cert.issued_at,
            u.full_name AS student_name,
            c.title AS course_title,
            t.full_name AS teacher_name
     FROM certificates cert
     JOIN users u ON cert.student_id = u.id
     JOIN courses c ON cert.course_id = c.id
     LEFT JOIN users t ON c.teacher_id = t.id
     WHERE cert.certificate_number = $1`,
    [req.params.certNumber]
  );

  if (!result.rows.length) {
    return res.status(404).json({ success: false, valid: false, message: 'Certificate not found.' });
  }

  res.json({ success: true, valid: true, data: result.rows[0] });
});

// POST /api/certificates/regenerate/:certificateId  (admin)
// Force-regenerate a certificate PDF
const regenerateCertificate = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT cert.*, u.full_name AS student_name, c.title AS course_title,
            t.full_name AS teacher_name
     FROM certificates cert
     JOIN users u ON cert.student_id = u.id
     JOIN courses c ON cert.course_id = c.id
     LEFT JOIN users t ON c.teacher_id = t.id
     WHERE cert.id = $1`,
    [req.params.certificateId]
  );

  if (!result.rows.length) throw createError('Certificate not found.', 404);
  const cert = result.rows[0];

  const generated = await generateCertificatePDF({
    studentName: cert.student_name,
    courseName: cert.course_title,
    teacherName: cert.teacher_name || 'Platform Instructor',
    certificateNumber: cert.certificate_number,
    issuedAt: cert.issued_at
  });

  res.json({ success: true, message: 'Certificate regenerated.', url: generated.url });
});

module.exports = { downloadCertificate, verifyCertificate, regenerateCertificate };
