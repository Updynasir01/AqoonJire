import BrandLogo from '../../components/common/BrandLogo.jsx'
import { BRAND } from '../../config/brandAssets'
import { useSEO } from '../../hooks/useSEO'
import { Mail, Phone, Wrench } from 'lucide-react'

const WHATSAPP = 'https://wa.me/252610317264'
const EMAIL = 'mailto:info@aqoonjire.com'
const PHONE = 'tel:+252610317264'

export default function Home() {
  useSEO({
    title: 'Coming Soon — Under Maintenance',
    description: `${BRAND.positioning}. Our platform is under maintenance and will be back soon.`,
    path: '/',
  })

  return (
    <div className="coming-soon">
      <div className="coming-soon-noise" aria-hidden="true" />
      <div className="coming-soon-grid" aria-hidden="true" />
      <div className="coming-soon-orb coming-soon-orb--a" aria-hidden="true" />
      <div className="coming-soon-orb coming-soon-orb--b" aria-hidden="true" />
      <div className="coming-soon-orb coming-soon-orb--c" aria-hidden="true" />

      <main className="coming-soon-main">
        <div className="coming-soon-brand">
          <BrandLogo variant="onDark" size="auth" alt="AqoonJire" />
        </div>

        <p className="coming-soon-positioning">{BRAND.positioning}</p>

        <div className="coming-soon-status" role="status">
          <span className="coming-soon-status-dot" aria-hidden="true" />
          <Wrench size={14} aria-hidden="true" />
          Under Maintenance
        </div>

        <h1 className="coming-soon-title">
          Coming <span>Soon</span>
        </h1>

        <p className="coming-soon-desc">
          We are preparing something better for Somali learners. The platform is temporarily
          unavailable while we finish upgrades — thank you for your patience.
        </p>

        <div className="coming-soon-actions">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-lg coming-soon-cta"
          >
            Contact on WhatsApp
          </a>
          <a href={EMAIL} className="btn coming-soon-ghost btn-lg">
            <Mail size={16} /> Email Us
          </a>
        </div>

        <a href={PHONE} className="coming-soon-phone">
          <Phone size={14} /> +252 61 031 7264
        </a>

        <p className="coming-soon-slogan">{BRAND.slogan}</p>
      </main>
    </div>
  )
}
