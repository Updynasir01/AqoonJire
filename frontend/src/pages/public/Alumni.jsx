import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../../components/layout/PublicLayout.jsx'
import { landingAPI } from '../../services/api'
import { useSEO } from '../../hooks/useSEO'
import { ArrowRight, GraduationCap, Award, Facebook, Linkedin, Instagram } from 'lucide-react'
import { Spinner } from '../../components/common/index.jsx'

const TikTokIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.85v2.3c-1.2.1-2.4-.2-3.5-.83v5.93c0 3-2.1 5.32-5 5.32s-5-2.3-5-5.12 2.4-5.12 5.3-4.92v2.42c-.3-.1-.6-.13-.9-.13-1.4 0-2.5 1.13-2.5 2.63s1.1 2.6 2.5 2.6 2.6-1.2 2.6-2.7V3h2.5z"/>
  </svg>
)

const SOCIAL_LINKS = [
  { key: 'social_facebook', icon: Facebook, label: 'Facebook' },
  { key: 'social_linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'social_instagram', icon: Instagram, label: 'Instagram' },
  { key: 'social_tiktok', icon: TikTokIcon, label: 'TikTok' },
]

function AlumniSocials({ person }) {
  const links = SOCIAL_LINKS.filter(s => person[s.key])
  if (!links.length) return null
  return (
    <div className="alumni-socials">
      {links.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={person[key]}
          target="_blank"
          rel="noreferrer noopener"
          className="alumni-social"
          title={label}
          aria-label={label}
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}

function AlumniAvatar({ name, photo }) {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  return (
    <div className="alumni-ava">
      {photo ? <img src={photo} alt={name} /> : initials}
    </div>
  )
}

export default function Alumni() {
  useSEO({
    title: 'Alumni',
    description: 'Meet AqoonJire alumni — certified graduates who completed our courses and earned their certificates.',
    path: '/alumni',
  })

  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    landingAPI.alumni()
      .then(r => setAlumni(r.data.data || []))
      .catch(() => setAlumni([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Navbar />

      <section className="hero" style={{ minHeight: 'auto', paddingTop: 130 }}>
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="pub-inner" style={{ padding: '0 5% 70px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <div className="section-tag" style={{ display: 'inline-flex', margin: '0 auto 18px' }}>🎓 Alumni</div>
            <h1 className="hero-h1" style={{ marginBottom: 18 }}>
              Our Graduates,<br /><span className="hero-h1-teal">Our Pride</span>
            </h1>
            <p className="hero-desc" style={{ margin: '0 auto 34px' }}>
              Certified graduates with a completed profile — photo, display name, bio, and skills.
            </p>
            {!loading && alumni.length > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: 'rgba(0,184,152,0.12)', color: 'var(--brand-secondary)', fontWeight: 700, fontSize: 14, marginBottom: 24 }}>
                <Award size={16} />
                {alumni.length} certified graduate{alumni.length !== 1 ? 's' : ''}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/courses" className="btn btn-secondary btn-lg">
                Browse Courses <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn btn-ghost-white btn-lg">
                Start Learning <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}><Spinner /></div>
          ) : !alumni.length ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', maxWidth: 520, margin: '0 auto' }}>
              <GraduationCap size={48} color="var(--brand-secondary)" style={{ opacity: 0.5, marginBottom: 16 }} />
              <h2 className="section-h" style={{ marginBottom: 12 }}>No Alumni Yet</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
                Earn a certificate and add your bio in Settings to appear here automatically.
              </p>
              <Link to="/register" className="btn btn-secondary btn-lg">Get Started <ArrowRight size={16} /></Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div className="section-tag" style={{ display: 'inline-flex', margin: '0 auto 14px' }}>🏆 Certified Graduates</div>
                <h2 className="section-h">Meet Our Alumni</h2>
                <p className="section-sub" style={{ margin: '0 auto' }}>
                  Students who completed courses and earned their AqoonJire certificates.
                </p>
              </div>
              <div className="alumni-grid">
                {alumni.map(person => (
                  <div key={person.id} className="alumni-card">
                    <AlumniAvatar name={person.display_name || person.full_name} photo={person.profile_photo} />
                    <div className="alumni-name">{person.display_name || person.full_name}</div>
                    <div className="alumni-count">
                      {person.certificate_count} course{person.certificate_count !== 1 ? 's' : ''} certified
                    </div>
                    {person.skills?.length > 0 && (
                      <div className="alumni-skills">
                        {person.skills.map(skill => (
                          <span key={skill} className="alumni-skill-pill">{skill}</span>
                        ))}
                      </div>
                    )}
                    {person.bio && <p className="alumni-bio">{person.bio}</p>}
                    <AlumniSocials person={person} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="pub-section">
        <div className="pub-inner">
          <div className="cta-wrap">
            <div className="section-tag" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>🚀 Be Next</div>
            <h2 className="cta-h">Ready to Join Our<br />Alumni Community?</h2>
            <p className="cta-sub">Complete a course, add your bio in Settings, and your profile will appear here automatically.</p>
            <div className="cta-btns">
              <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn-ghost-white btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
