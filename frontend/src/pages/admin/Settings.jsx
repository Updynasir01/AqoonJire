import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout.jsx'
import { Spinner, Badge } from '../../components/common/index.jsx'
import { settingsAPI, landingAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { Save, Users, BookOpen, Award, GraduationCap } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({})
  const [realStats, setRealStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      settingsAPI.get().then(r => r.data.data || {}),
      landingAPI.get().then(r => r.data.data?.stats_real || null)
    ])
      .then(([s, rs]) => { setSettings(s); setRealStats(rs) })
      .finally(() => setLoading(false))
  }, [])

  const save = async e => {
    e.preventDefault(); setSaving(true)
    try {
      await settingsAPI.update(settings)
      toast.success('Settings saved!')
      const rs = (await landingAPI.get()).data.data?.stats_real
      if (rs) setRealStats(rs)
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const set = (k, v) => setSettings(p => ({ ...p, [k]: v }))
  const useMock = settings.stats_use_mock === true || settings.stats_use_mock === 'true'

  const field = (key, label, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-control" type={type} placeholder={placeholder} value={settings[key] ?? ''} onChange={e => set(key, e.target.value)}/>
    </div>
  )

  const mockField = (key, label, icon) => (
    <div className="form-group">
      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon} {label}
      </label>
      <input
        className="form-control"
        type="number"
        min="0"
        value={settings[key] ?? ''}
        onChange={e => set(key, e.target.value)}
        disabled={!useMock}
      />
    </div>
  )

  if (loading) return <DashboardLayout title="Settings"><div className="loading-screen"><div className="spinner"/></div></DashboardLayout>

  return (
    <DashboardLayout title="Site Settings">
      <div className="page-header">
        <h1>Site Settings</h1>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? <Spinner size={16}/> : <><Save size={15}/> Save Changes</>}
        </button>
      </div>

      <div className="grid-2">
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 6 }}>Homepage Statistics</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                  Control the student, course, certificate, and instructor counts shown on the public homepage hero.
                </p>
              </div>
              <Badge variant={useMock ? 'success' : 'muted'}>
                {useMock ? 'Showing mockup numbers' : 'Showing real numbers'}
              </Badge>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn ${!useMock ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => set('stats_use_mock', false)}
              >
                Real Students
              </button>
              <button
                type="button"
                className={`btn ${useMock ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => set('stats_use_mock', true)}
              >
                Mockup Numbers
              </button>
            </div>

            {realStats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24, padding: 16, background: 'var(--bg-glass)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Real — Students</div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>{realStats.total_students}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Real — Courses</div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>{realStats.total_courses}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Real — Certificates</div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>{realStats.certificates_issued}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Real — Instructors</div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>{realStats.total_teachers}</div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {mockField('mock_total_students', 'Mock Students', <Users size={14}/>)}
              {mockField('mock_total_courses', 'Mock Courses', <BookOpen size={14}/>)}
              {mockField('mock_certificates_issued', 'Mock Certificates', <Award size={14}/>)}
              {mockField('mock_total_teachers', 'Mock Instructors', <GraduationCap size={14}/>)}
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, marginBottom: 0 }}>
              {useMock
                ? 'Visitors will see the mockup numbers above on the homepage.'
                : 'Visitors will see live counts from your database (students, published courses, certificates, active teachers).'}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, marginBottom: 20 }}>Platform Identity</h3>
            {field('platform_name', 'Platform Name', 'text', 'AqoonJire')}
            {field('platform_tagline', 'Tagline', 'text', 'Quality Education for Everyone')}
            {field('primary_color', 'Primary Color', 'color')}
            {field('logo_url', 'Logo URL', 'url')}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, marginBottom: 20 }}>Homepage Hero</h3>
            {field('hero_title', 'Hero Title', 'text', 'Learn New Skills Online')}
            {field('hero_subtitle', 'Hero Subtitle', 'text')}
            {field('hero_image_url', 'Hero Image URL', 'url')}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, marginBottom: 20 }}>Contact Information</h3>
            {field('contact_email', 'Email', 'email', 'info@aqoonjire.com')}
            {field('contact_phone', 'Phone', 'tel', '+252 61 031 7264')}
            {field('contact_address', 'Address', 'text', 'Mogadishu, Somalia')}
            {field('whatsapp_number', 'WhatsApp Number', 'tel')}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 16, marginBottom: 20 }}>Social & Other</h3>
            {field('facebook_url', 'Facebook URL', 'url')}
            {field('twitter_url', 'Twitter/X URL', 'url')}
            {field('currency_default', 'Default Currency', 'text', 'USD')}
            <div className="form-group">
              <label className="form-label">About Text</label>
              <textarea className="form-control" rows={3} value={settings.about_text || ''} onChange={e => set('about_text', e.target.value)} placeholder="Write a short description about the platform..."/>
            </div>
            {field('footer_text', 'Footer Text', 'text')}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
