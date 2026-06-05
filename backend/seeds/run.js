require('../src/loadEnv');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../src/config/database');

async function seed() {
  const client = await pool.connect();
  try {
    console.log('🌱 Seeding database...\n');

    // 1. Admin user
    const adminPassword = await bcrypt.hash('Admin@1234', 12);
    const adminId = uuidv4();
    await client.query(`
      INSERT INTO users (id, full_name, email, password_hash, role)
      VALUES ($1, 'Platform Admin', 'admin@elearning.so', $2, 'admin')
      ON CONFLICT (email) DO NOTHING
    `, [adminId, adminPassword]);
    console.log('  ✅ Admin created: admin@elearning.so / Admin@1234');

    // 2. Sample teacher
    const teacherPassword = await bcrypt.hash('Teacher@1234', 12);
    const teacherId = uuidv4();
    await client.query(`
      INSERT INTO users (id, full_name, email, password_hash, role, bio)
      VALUES ($1, 'Ahmed Hassan', 'ahmed@elearning.so', $2, 'teacher', 'Expert in Computer Science and Programming')
      ON CONFLICT (email) DO NOTHING
    `, [teacherId, teacherPassword]);
    console.log('  ✅ Teacher created: ahmed@elearning.so / Teacher@1234');

    // 3. Sample student
    const studentPassword = await bcrypt.hash('Student@1234', 12);
    const studentId = uuidv4();
    await client.query(`
      INSERT INTO users (id, full_name, email, password_hash, role, phone)
      VALUES ($1, 'Fadumo Abdi', 'fadumo@example.so', $2, 'student', '+252 61 1234567')
      ON CONFLICT (email) DO NOTHING
    `, [studentId, studentPassword]);
    console.log('  ✅ Student created: fadumo@example.so / Student@1234');

    // 4. Categories
    const categories = [
      { id: uuidv4(), name: 'Information Technology', icon: 'laptop' },
      { id: uuidv4(), name: 'Business & Management', icon: 'briefcase' },
      { id: uuidv4(), name: 'Arabic Language', icon: 'book' },
      { id: uuidv4(), name: 'English Language', icon: 'globe' },
      { id: uuidv4(), name: 'Mathematics', icon: 'calculator' },
      { id: uuidv4(), name: 'Health & Medicine', icon: 'heart' },
    ];

    for (const cat of categories) {
      await client.query(`
        INSERT INTO categories (id, name, icon)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
      `, [cat.id, cat.name, cat.icon]);
    }
    console.log('  ✅ Categories seeded');

    // 5. Sample course
    const catResult = await client.query(`SELECT id FROM categories WHERE name = 'Information Technology' LIMIT 1`);
    const catId = catResult.rows[0]?.id;

    const courseId = uuidv4();
    await client.query(`
      INSERT INTO courses (id, title, slug, description, price, language, level, category_id, teacher_id, is_published)
      VALUES ($1, 'Introduction to Web Development', 'intro-web-development',
        'Learn HTML, CSS, and JavaScript from scratch. Perfect for beginners.',
        50.00, 'Somali', 'beginner', $2, $3, true)
      ON CONFLICT (slug) DO NOTHING
    `, [courseId, catId, teacherId]);

    // 6. Sample section + lessons
    const sectionId = uuidv4();
    await client.query(`
      INSERT INTO sections (id, course_id, title, order_index)
      VALUES ($1, $2, 'Getting Started', 0)
    `, [sectionId, courseId]);

    await client.query(`
      INSERT INTO lessons (id, section_id, course_id, title, content_type, youtube_url, duration_minutes, order_index)
      VALUES ($1, $2, $3, 'Welcome to the Course', 'youtube', 'https://youtube.com/watch?v=example', 5, 0)
    `, [uuidv4(), sectionId, courseId]);

    await client.query(`
      INSERT INTO lessons (id, section_id, course_id, title, content_type, text_content, duration_minutes, order_index)
      VALUES ($1, $2, $3, 'What is HTML?', 'text', 'HTML stands for HyperText Markup Language...', 10, 1)
    `, [uuidv4(), sectionId, courseId]);

    console.log('  ✅ Sample course with sections and lessons seeded');

    // 7. Grant student access to sample course
    await client.query(`
      INSERT INTO student_course_access (student_id, course_id, granted_by, notes)
      VALUES ($1, $2, $3, 'Seeded for testing')
      ON CONFLICT (student_id, course_id) DO NOTHING
    `, [studentId, courseId, adminId]);
    console.log('  ✅ Student access granted to sample course');

    console.log('\n✅ Seeding complete!\n');
    console.log('Login credentials:');
    console.log('  Admin:   admin@elearning.so  / Admin@1234');
    console.log('  Teacher: ahmed@elearning.so  / Teacher@1234');
    console.log('  Student: fadumo@example.so   / Student@1234');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
