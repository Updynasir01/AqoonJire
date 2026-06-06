import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, Menu, X, ChevronRight, Mail, Phone, MapPin } from 'lucide-react'

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

  const links = [{ to: '/', label: 'Home' }, { to: '/courses', label: 'Courses' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }]
  const dashPath = user ? `/${user.role}` : '/login'
  const overDark = !scrolled && (
    location.pathname === '/about' ||
    location.pathname === '/courses' ||
    /^\/courses\/[^/]+$/.test(location.pathname)
  )

  return (
    <>
      <nav className={`pub-nav${scrolled ? ' scrolled' : ''}${overDark ? ' over-dark' : ''}`} style={{ background: scrolled ? undefined : 'transparent' }}>
        <div className="pub-nav-inner">
          <Link to="/" className="pub-logo">
            <div className="pub-logo-mark">S</div>
            <span className="pub-logo-text">Somali<em>Learn</em></span>
          </Link>

          <div className="pub-nav-links" style={{ display: 'flex' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`pub-nav-link${location.pathname === l.to ? ' active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="theme-toggle" onClick={toggle} title="Toggle theme">
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            {user ? (
              <Link to={dashPath} className="btn btn-secondary btn-sm">
                Dashboard <ChevronRight size={14}/>
              </Link>
            ) : (
              <>
                <Link to="/login" className="pub-nav-link" style={{ display: 'flex' }}>Sign In</Link>
                <Link to="/register" className="btn btn-secondary btn-sm">Get Started</Link>
              </>
            )}
            <button className="theme-toggle" style={{ display: 'none' }} id="mob-btn" onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: 70, left: 0, right: 0, background: 'rgba(10,1,24,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 24px', zIndex: 199, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} className="pub-nav-link" style={{ fontSize: 16 }}>{l.label}</Link>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '10px 0' }}/>
          <Link to={user ? `/${user.role}` : '/register'} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>
      )}
      <style>{`@media(max-width:768px){.pub-nav-links{display:none!important}#mob-btn{display:flex!important}}`}</style>
    </>
  )
}

export function Footer() {
  return (
    <footer className="pub-footer">
      <div className="pub-footer-inner">
        <div className="pub-footer-grid">
          <div>
            <div className="pub-footer-brand-logo">
              <div className="pub-logo-mark" style={{ width: 36, height: 36, fontSize: 16 }}>S</div>
              <span className="pub-footer-brand-text">Somali<em>Learn</em></span>
            </div>
            <p className="pub-footer-brand-desc">
              Empowering Somalia through quality education. Learn from expert instructors in your own language, earn certificates, and build your future.
            </p>
            <div className="pub-footer-socials">
              {['F', 'T', 'in', 'YT'].map(s => (
                <div key={s} className="pub-footer-social">{s}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="pub-footer-col-title">Platform</div>
            {[['/', 'Home'], ['/courses', 'Browse Courses'], ['/about', 'About Us'], ['/contact', 'Contact Us'], ['/login', 'Student Login']].map(([to, label]) => (
              <Link key={to} to={to} className="pub-footer-link">{label}</Link>
            ))}
          </div>

          <div>
            <div className="pub-footer-col-title">Subjects</div>
            {['Information Technology', 'Business & Management', 'Arabic Language', 'English Language', 'Mathematics'].map(s => (
              <Link key={s} to={`/courses?category=${s}`} className="pub-footer-link">{s}</Link>
            ))}
          </div>

          <div>
            <div className="pub-footer-col-title">Contact</div>
            <a href="mailto:info@aqoonjire.com" className="pub-footer-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Mail size={13} color="var(--brand-secondary)"/> info@aqoonjire.com
            </a>
            <a href="tel:+252610000000" className="pub-footer-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Phone size={13} color="var(--brand-secondary)"/> +252 61 000 0000
            </a>
            <a href="#" className="pub-footer-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <MapPin size={13} color="var(--brand-secondary)"/> Mogadishu, Somalia
            </a>
            <a href="https://wa.me/252610000000" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ marginTop: 16 }}>
              📱 WhatsApp Us
            </a>
          </div>
        </div>

        <div className="pub-footer-bottom">
          <span className="pub-footer-copy">© {new Date().getFullYear()} SomaliLearn Platform. All rights reserved.</span>
          <div className="pub-footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
