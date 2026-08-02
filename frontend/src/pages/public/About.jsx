import { useEffect, useState } from 'react'
import { Navbar, Footer } from '../../components/layout/PublicLayout.jsx'
import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import { teamAPI } from '../../services/api'
import { BRAND } from '../../config/brandAssets'
import PublicCta from '../../components/common/PublicCta.jsx'
import { ArrowRight, Target, Eye, Facebook, Linkedin, Instagram } from 'lucide-react'
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

function TeamSocials({ member }) {
  const links = SOCIAL_LINKS.filter(s => member[s.key])
  if (!links.length) return null
  return (
    <div className="about-team-socials">
      {links.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={member[key]}
          target="_blank"
          rel="noreferrer noopener"
          className="about-team-social"
          title={label}
          aria-label={label}
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}

const CORE_VALUES = [
  { emoji: '💡', title: 'Innovation', desc: 'We encourage creativity and fresh ideas to help learners become forward-thinking digital creators.' },
  { emoji: '🎓', title: 'Quality Education', desc: 'We provide high-quality learning experiences aligned with today\'s industry needs.' },
  { emoji: '🤝', title: 'Community', desc: 'We build a supportive community where learners connect, share, and grow together.' },
  { emoji: '🚀', title: 'Growth', desc: 'We are committed to helping our students achieve both personal and professional development.' },
  { emoji: '💬', title: 'Support', desc: 'We offer continuous guidance and assistance to ensure every learner succeeds.' },
  { emoji: '🔓', title: 'Accessibility', desc: 'We make education simple and accessible—anytime, anywhere.' },
]

function TeamAvatar({ name, photo }) {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  return (
    <div className="about-team-ava">
      {photo ? <img src={photo} alt={name} /> : initials}
    </div>
  )
}

export default function About() {
  useSEO({
    title: 'About Us',
    description: `${BRAND.aboutPara1} ${BRAND.aboutPara2}`,
    path: '/about',
  })

  const [team, setTeam] = useState([])
  const [teamLoading, setTeamLoading] = useState(true)

  useEffect(() => {
    teamAPI.publicList()
      .then(r => setTeam(r.data.data || []))
      .catch(() => setTeam([]))
      .finally(() => setTeamLoading(false))
  }, [])

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-grid" />
        <div className="about-hero-orb" />
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <div className="section-tag">About us</div>
            <h1 className="about-hero-title">{BRAND.aboutHeroTitle}</h1>
            <p className="about-hero-text">{BRAND.aboutPara1}</p>
            <p className="about-hero-text about-hero-text--muted">{BRAND.aboutPara2}</p>
            <div className="about-hero-btns">
              <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn-ghost-white btn-lg">Contact Us</Link>
            </div>
          </div>
          <div className="about-hero-media">
            <img src={BRAND.photos.aboutHero} alt="AqoonJire learner studying online" className="about-hero-photo" />
          </div>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="about-hero-wave">
          <path d="M0 20C360 44 1080 0 1440 20L1440 40L0 40Z" fill="var(--bg)" />
        </svg>
      </div>

      {/* Vision & Mission */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div className="about-mission">
            <div className="about-mission-photo-wrap">
              <img src={BRAND.photos.aboutMission} alt="Students learning with AqoonJire" className="about-mission-photo" />
            </div>
            <div className="about-mission-cards">
              <div className="card card-body">
                <div className="about-mission-icon">
                  <Eye color="var(--brand-secondary)" size={22} />
                </div>
                <div className="section-tag" style={{ marginBottom: 12 }}>Vision</div>
                <h2 className="section-h" style={{ marginBottom: 16 }}>Where We&apos;re Headed</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.85, margin: 0 }}>
                  To become the leading Somali-based digital learning hub that inspires and empowers the next generation of digital professionals across the Horn of Africa.
                </p>
              </div>

              <div className="card card-body">
                <div className="about-mission-icon about-mission-icon--purple">
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

      {/* Team */}
      {(teamLoading || team.length > 0) && (
        <section className="pub-section pub-section-alt">
          <div className="pub-inner">
            <div className="about-team-header">
              <div>
                <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>{BRAND.aboutTeamTitle}</div>
                <p className="section-sub about-team-intro">{BRAND.aboutTeamDesc}</p>
              </div>
              <div className="about-team-banner-wrap">
                <img src={BRAND.photos.aboutTeam} alt="" className="about-team-banner" aria-hidden="true" />
              </div>
            </div>
            {teamLoading ? (
              <div style={{ textAlign: 'center', padding: 40 }}><Spinner /></div>
            ) : (
              <div className="about-team-grid">
                {team.map(member => (
                  <div key={member.id} className="about-team-card">
                    <TeamAvatar name={member.full_name} photo={member.photo} />
                    <div className="about-team-name">{member.full_name}</div>
                    <div className="about-team-role">{member.role}</div>
                    {member.bio && <p className="about-team-bio">{member.bio}</p>}
                    <TeamSocials member={member} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <PublicCta altSection />

      <Footer />
    </div>
  )
}
