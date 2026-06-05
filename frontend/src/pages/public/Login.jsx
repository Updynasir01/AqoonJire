import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Eye, EyeOff, ArrowRight, Sun, Moon, BookOpen, Award, Users } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const { toggle, isDark } = useTheme()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.full_name}!`)
      navigate(`/${user.role}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally { setLoading(false) }
  }

  return (
    <div className="login-shell">
      <div className="login-left">
        <div className="login-left-grid"/><div className="login-left-orb"/>
        <div style={{position:'relative',zIndex:1}}>
          <Link to="/" style={{display:'flex',alignItems:'center',gap:10,marginBottom:52}}>
            <div className="pub-logo-mark" style={{width:40,height:40,fontSize:18}}>S</div>
            <span style={{fontFamily:'Syne,sans-serif',fontSize:20,fontWeight:800,color:'#fff'}}>Somali<span style={{color:'var(--brand-secondary)'}}>Learn</span></span>
          </Link>
          <h1 style={{color:'#fff',fontSize:'clamp(2rem,3.5vw,3rem)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:18}}>Your Learning<br/>Journey Continues</h1>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:15,lineHeight:1.8,marginBottom:48,maxWidth:380}}>Sign in to access your courses, track your progress, and earn certificates that advance your career.</p>
          <div style={{display:'flex',flexDirection:'column',gap:16,marginBottom:48}}>
            {[[<Users size={17}/>, '1,200+ active students'],[<BookOpen size={17}/>, '45+ expert courses'],[<Award size={17}/>, '980+ certificates issued']].map(([icon,text]) => (
              <div key={text} style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:40,height:40,borderRadius:12,background:'rgba(0,184,152,0.15)',border:'1px solid rgba(0,184,152,0.25)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--brand-secondary)',flexShrink:0}}>{icon}</div>
                <span style={{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:500}}>{text}</span>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:18,padding:22,backdropFilter:'blur(12px)'}}>
            <div style={{display:'flex',gap:3,marginBottom:10}}>{[...Array(5)].map((_,i) => <span key={i} style={{color:'var(--brand-secondary)',fontSize:14}}>★</span>)}</div>
            <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,lineHeight:1.75,marginBottom:14,fontStyle:'italic'}}>"SomaliLearn completely changed my career. I learned web development in my own language and now earn more than I ever imagined."</p>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,var(--brand-secondary),#00d4b0)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'var(--brand-primary)',fontFamily:'Syne,sans-serif'}}>H</div>
              <div><div style={{fontSize:13,fontWeight:700,color:'#fff'}}>Hodan Abdi</div><div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>Web Developer · Mogadishu</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div style={{width:'100%',maxWidth:400}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:44}}>
            <Link to="/" style={{fontSize:13,color:'var(--text-muted)'}}>← Back to site</Link>
            <button className="theme-toggle" onClick={toggle}>{isDark ? <Sun size={16}/> : <Moon size={16}/>}</button>
          </div>
          <div style={{marginBottom:32}}>
            <h2 style={{fontSize:28,fontWeight:800,letterSpacing:'-0.025em',marginBottom:8}}>Sign in</h2>
            <p style={{color:'var(--text-muted)',fontSize:14}}>No account? <Link to="/register" style={{color:'var(--brand-secondary)',fontWeight:700}}>Create a free account →</Link></p>
          </div>
          {error && <div className="alert alert-error" style={{marginBottom:20}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-control" type="email" placeholder="your@email.com" autoComplete="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{position:'relative'}}>
                <input className="form-control" type={showPass ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{paddingRight:44}}/>
                <button type="button" onClick={() => setShowPass(s=>!s)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',display:'flex',padding:4}}>{showPass ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary btn-lg" style={{width:'100%',justifyContent:'center',marginTop:8}} disabled={loading}>
              {loading ? <div style={{width:20,height:20,border:'2.5px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/> : <>Sign In <ArrowRight size={16}/></>}
            </button>
          </form>
          <div style={{display:'flex',alignItems:'center',gap:14,margin:'28px 0'}}>
            <div style={{flex:1,height:1,background:'var(--border)'}}/>
            <span style={{fontSize:11,color:'var(--text-light)',fontWeight:700,letterSpacing:'.06em'}}>READY TO ENROLL?</span>
            <div style={{flex:1,height:1,background:'var(--border)'}}/>
          </div>
          <div style={{background:'var(--bg-glass)',border:'1px solid var(--border)',borderRadius:16,padding:20}}>
            <div style={{fontSize:13,fontWeight:700,color:'var(--text)',marginBottom:14}}>How to get access:</div>
            {[['📚','Browse our course catalog'],['📱','Contact us via WhatsApp'],['💳','Pay via EVC Plus, eDahab or Zaad'],['🎓','Receive your account within 24h']].map(([e,t]) => (
              <div key={t} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10,fontSize:13,color:'var(--text-muted)'}}><span style={{fontSize:16}}>{e}</span>{t}</div>
            ))}
            <a href="https://wa.me/252610000000" target="_blank" rel="noreferrer" className="btn btn-outline-teal" style={{width:'100%',justifyContent:'center',marginTop:10}}>📱 WhatsApp to Enroll</a>
          </div>
        </div>
      </div>
    </div>
  )
}
