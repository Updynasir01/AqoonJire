import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, Menu, X, ChevronRight, Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react'
import WhatsAppFloat from '../common/WhatsAppFloat.jsx'
import BrandLogo from '../common/BrandLogo.jsx'
import { BRAND } from '../../config/brandAssets'

const TikTokIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.85v2.3c-1.2.1-2.4-.2-3.5-.83v5.93c0 3-2.1 5.32-5 5.32s-5-2.3-5-5.12 2.4-5.12 5.3-4.92v2.42c-.3-.1-.6-.13-.9-.13-1.4 0-2.5 1.13-2.5 2.63s1.1 2.6 2.5 2.6 2.6-1.2 2.6-2.7V3h2.5z"/>
  </svg>
)

export function Navbar() {
  const { user } = useAuth()
  const { toggle, isDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About us' },
    { to: '/courses', label: 'Courses' },
    { to: '/alumni', label: 'Alumni' },
    { to: '/verify', label: 'Verify Certificate' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contacts' },
  ]
  const dashPath = user ? `/${user.role}` : '/login'
  const overDark = !scrolled && (
    location.pathname === '/about' ||
    location.pathname === '/courses' ||
    /^\/courses\/[^/]+$/.test(location.pathname)
  )
  const lightNav = !isDark && !scrolled && !overDark

  return (
    <>
      <nav className={`pub-nav${scrolled ? ' scrolled' : ''}${overDark ? ' over-dark' : ''}`} style={{ background: scrolled ? undefined : 'transparent' }}>
        <div className="pub-nav-inner">
          <Link to="/" className="pub-logo">
            <BrandLogo variant={lightNav ? 'onLight' : 'onDark'} size="nav" />
          </Link>

          <div className="pub-nav-links" style={{ display: 'flex' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`pub-nav-link${location.pathname === l.to ? ' active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="pub-nav-actions-desktop">
            <button className="theme-toggle" onClick={toggle} title="Toggle theme" type="button">
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            {user ? (
              <Link to={dashPath} className="btn btn-secondary btn-sm">
                Dashboard <ChevronRight size={14}/>
              </Link>
            ) : (
              <>
                <Link to="/login" className="pub-nav-link pub-nav-link-desktop">Sign In</Link>
                <Link to="/register" className="btn btn-secondary btn-sm">Get Started</Link>
              </>
            )}
            <button type="button" className="theme-toggle mob-nav-btn" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="pub-mobile-drawer">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`pub-nav-link${location.pathname === l.to ? ' active' : ''}`}>{l.label}</Link>
          ))}
          <div className="pub-mobile-drawer-divider" />
          {!user && (
            <Link to="/login" className="pub-nav-link">Sign In</Link>
          )}
          <Link to={user ? `/${user.role}` : '/register'} className="btn btn-secondary" style={{ justifyContent: 'center', minHeight: 44 }}>
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>
      )}
      <WhatsAppFloat message="Hi AqoonJire, I need support." />
    </>
  )
}

export function Footer() {
  const { isDark } = useTheme()

  return (
    <>
    <footer className="pub-footer">
      <div className="pub-footer-inner">
        <div className="pub-footer-grid">
          <div>
            <div className="pub-footer-brand-logo">
              <BrandLogo variant={isDark ? 'onDark' : 'onLight'} size="footer" />
            </div>
            <p className="pub-footer-brand-desc">{BRAND.footerDesc}</p>
            <div className="pub-footer-socials">
              <a href="https://www.facebook.com/AqoonjirePlatform/" target="_blank" rel="noreferrer" className="pub-footer-social" title="Facebook" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.linkedin.com/company/aqoonjire/" target="_blank" rel="noreferrer" className="pub-footer-social" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/aqoonjireplatform" target="_blank" rel="noreferrer" className="pub-footer-social" title="Instagram" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.tiktok.com/@aqoonjireplatform" target="_blank" rel="noreferrer" className="pub-footer-social" title="TikTok" aria-label="TikTok">
                <TikTokIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <div className="pub-footer-col-title">Platform</div>
            {[['/', 'Home'], ['/about', 'About us'], ['/courses', 'Browse Courses'], ['/alumni', 'Alumni'], ['/verify', 'Verify Certificate'], ['/faq', 'FAQ'], ['/contact', 'Contacts'], ['/login', 'Student Login']].map(([to, label]) => (
              <Link key={to} to={to} className="pub-footer-link">{label}</Link>
            ))}
          </div>

          <div>
            <div className="pub-footer-col-title">Courses</div>
            {['Information Technology', 'Business & Management', 'Arabic Language', 'English Language', 'Mathematics'].map(s => (
              <Link key={s} to={`/courses?category=${s}`} className="pub-footer-link">{s}</Link>
            ))}
          </div>

          <div>
            <div className="pub-footer-col-title">Contact</div>
            <a href="mailto:info@aqoonjire.com" className="pub-footer-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Mail size={13} color="var(--brand-secondary)"/> info@aqoonjire.com
            </a>
            <a href="tel:+252610317264" className="pub-footer-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Phone size={13} color="var(--brand-secondary)"/> +252 61 031 7264
            </a>
            <a href="#" className="pub-footer-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <MapPin size={13} color="var(--brand-secondary)"/> Mogadishu, Somalia
            </a>
            <a href="https://wa.me/252610317264" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ marginTop: 16 }}>
              📱 WhatsApp Us
            </a>
          </div>
        </div>

        <div className="pub-footer-bottom">
          <span className="pub-footer-copy">© {new Date().getFullYear()} AqoonJire. All rights reserved.</span>
          <div className="pub-footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </>
  )
}
