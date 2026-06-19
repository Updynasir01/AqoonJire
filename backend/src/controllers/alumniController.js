const { query } = require('../config/database');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/alumni  (public — certified students with a bio)
const listAlumni = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT
       u.id,
       u.full_name,
       COALESCE(NULLIF(TRIM(u.display_name), ''), u.full_name) AS display_name,
       u.profile_photo,
       u.bio,
       u.social_facebook,
       u.social_linkedin,
       u.social_instagram,
       u.social_tiktok,
       COUNT(cert.id)::int AS certificate_count,
       MAX(cert.issued_at) AS latest_certificate_at,
       COALESCE(
         ARRAY_AGG(DISTINCT cat.name) FILTER (WHERE cat.name IS NOT NULL),
         ARRAY[]::varchar[]
       ) AS skills
     FROM certificates cert
     JOIN users u ON cert.student_id = u.id
     JOIN courses c ON cert.course_id = c.id
     LEFT JOIN categories cat ON c.category_id = cat.id
     WHERE u.role = 'student'
       AND u.is_active = TRUE
       AND u.bio IS NOT NULL
       AND TRIM(u.bio) <> ''
     GROUP BY u.id, u.full_name, u.display_name, u.profile_photo, u.bio,
              u.social_facebook, u.social_linkedin, u.social_instagram, u.social_tiktok
     ORDER BY latest_certificate_at DESC`
  );

  res.json({ success: true, data: result.rows });
});

module.exports = { listAlumni };
