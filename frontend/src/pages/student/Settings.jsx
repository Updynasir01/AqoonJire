import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout.jsx'
import { LoadingScreen, Avatar } from '../../components/common/index.jsx'
import { authAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Save, Camera, User, FileText, Award } from 'lucide-react'

export default function StudentSettings() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    authAPI.me()
      .then(r => {
        const u = r.data.data
        setDisplayName(u.display_name || '')
        setBio(u.bio || '')
        setPhotoPreview(u.profile_photo || null)
        updateUser(u)
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [])

  const onPhotoChange = e => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file')
      return
    }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const save = async e => {
    e.preventDefault()
    if (!bio.trim()) {
      toast.error('Bio is required to appear on the Alumni page')
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('display_name', displayName.trim())
      fd.append('bio', bio.trim())
      if (photoFile) fd.append('photo', photoFile)
      const r = await authAPI.updateProfile(fd)
      updateUser(r.data.data)
      setPhotoFile(null)
      toast.success('Profile saved!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <DashboardLayout title="Settings"><LoadingScreen text="Loading profile…" /></DashboardLayout>

  return (
    <DashboardLayout title="Settings">
      <div style={{ maxWidth: 640 }}>
        <div className="card card-body" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Award size={18} color="var(--brand-secondary)" />
            <h2 style={{ fontSize: 18, margin: 0 }}>Alumni Profile</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            When you earn a certificate, your profile can appear on the public{' '}
            <Link to="/alumni" target="_blank" rel="noreferrer" style={{ color: 'var(--brand-secondary)', fontWeight: 600 }}>
              Alumni page
            </Link>
            . Add a display name, photo, and bio so others can see who you are.
          </p>
        </div>

        <form onSubmit={save} className="card card-body">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ position: 'relative' }}>
              <Avatar user={{ ...user, profile_photo: photoPreview || user?.profile_photo, full_name: displayName || user?.full_name }} size={96} />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ position: 'absolute', right: -4, bottom: -4, borderRadius: '50%', width: 36, height: 36, padding: 0, minHeight: 36 }}
                onClick={() => fileRef.current?.click()}
                aria-label="Upload profile photo"
              >
                <Camera size={16} />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhotoChange} />
            <span style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>Profile photo</span>
          </div>

          <div className="form-group">
            <label className="form-label"><User size={14} style={{ verticalAlign: -2, marginRight: 6 }} />Display name</label>
            <input
              className="form-control"
              placeholder={user?.full_name || 'How you want to appear on Alumni'}
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, display: 'block' }}>
              Shown on the Alumni page. Leave blank to use your account name ({user?.full_name}).
            </span>
          </div>

          <div className="form-group">
            <label className="form-label"><FileText size={14} style={{ verticalAlign: -2, marginRight: 6 }} />Bio</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Tell us about yourself, your skills, and what you've learned…"
              value={bio}
              onChange={e => setBio(e.target.value)}
              required
            />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, display: 'block' }}>
              Required to appear on the Alumni page after you earn a certificate.
            </span>
          </div>

          <button type="submit" className="btn btn-secondary" disabled={saving} style={{ minHeight: 44 }}>
            {saving ? 'Saving…' : <><Save size={16} /> Save Profile</>}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}
