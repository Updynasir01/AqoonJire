import { Navbar, Footer } from '../../components/layout/PublicLayout.jsx'
import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import { ArrowRight, Target, Eye } from 'lucide-react'

const CORE_VALUES = [
  { emoji: '💡', title: 'Innovation', desc: 'We encourage creativity and fresh ideas to help learners become forward-thinking digital creators.' },
  { emoji: '🎓', title: 'Quality Education', desc: 'We provide high-quality learning experiences aligned with today\'s industry needs.' },
  { emoji: '🤝', title: 'Community', desc: 'We build a supportive community where learners connect, share, and grow together.' },
  { emoji: '🚀', title: 'Growth', desc: 'We are committed to helping our students achieve both personal and professional development.' },
  { emoji: '💬', title: 'Support', desc: 'We offer continuous guidance and assistance to ensure every learner succeeds.' },
  { emoji: '🔓', title: 'Accessibility', desc: 'We make education simple and accessible—anytime, anywhere.' },
]

export default function About() {
  useSEO({
    title: 'About Us',
    description: 'AqoonJire is a modern e-learning platform equipping learners with essential digital skills. Our mission is to make high-quality training accessible for Somali youth.',
    path: '/about',
  })

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--brand-primary)', paddingTop: 130, paddingBottom: 0, paddingLeft: '5%', paddingRight: '5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,184,152,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,152,0.05) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,152,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, paddingBottom: 72 }}>
          <div className="section-tag" style={{ display: 'inline-flex', margin: '0 auto 22px' }}>About us</div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 22 }}>
            Equipping Learners for the<br />Digital Economy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.85, maxWidth: 680, margin: '0 auto 18px' }}>
            AqoonJire is a modern e-learning platform designed to equip learners with essential digital skills for today&apos;s fast-evolving world. Through flexible and accessible online courses,
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.85, maxWidth: 680, margin: '0 auto 40px' }}>
            AqoonJire helps young professionals, students, and aspiring freelancers to upskill, grow, and succeed in the digital economy.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn btn-ghost-white btn-lg">Contact Us</Link>
          </div>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
          <path d="M0 20C360 44 1080 0 1440 20L1440 40L0 40Z" fill="var(--bg)" />
        </svg>
      </div>

      {/* Vision & Mission */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div className="about-mission">
            <div className="card card-body" style={{ height: '100%' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,184,152,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Eye color="var(--brand-secondary)" size={22} />
              </div>
              <div className="section-tag" style={{ marginBottom: 12 }}>Vision</div>
              <h2 className="section-h" style={{ marginBottom: 16 }}>Where We&apos;re Headed</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.85, margin: 0 }}>
                To become the leading Somali-based digital learning hub that inspires and empowers the next generation of digital professionals across the Horn of Africa.
              </p>
            </div>

            <div className="card card-body" style={{ height: '100%' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(40,4,84,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Target color="var(--brand-secondary)" size={22} />
              </div>
              <div className="section-tag" style={{ marginBottom: 12 }}>Mission</div>
              <h2 className="section-h" style={{ marginBottom: 16 }}>What We Do</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.85, margin: 0 }}>
                Our mission is to make high-quality digital skills training accessible, affordable, and practical for Somali youth — unlocking opportunities in freelancing, entrepreneurship, and digital careers. We aim to bridge the digital skills gap through culturally relevant, easy-to follow online courses, empowering learners to thrive in the global digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="pub-section">
        <div className="pub-inner">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-tag" style={{ display: 'inline-flex', margin: '0 auto 16px' }}>🌟 Our Core Values</div>
            <h2 className="section-h">What Drives AqoonJire</h2>
          </div>
          <div className="about-value-grid">
            {CORE_VALUES.map(v => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-icon">{v.emoji}</div>
                <div className="about-value-title">{v.title}</div>
                <div className="about-value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div className="cta-wrap">
            <div className="section-tag" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>🎓 Start Learning</div>
            <h2 className="cta-h">Ready to Build Your<br />Digital Skills?</h2>
            <p className="cta-sub">Explore our courses and take the first step toward freelancing, entrepreneurship, and a digital career.</p>
            <div className="cta-btns">
              <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16} /></Link>
              <Link to="/register" className="btn btn-ghost-white btn-lg">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
