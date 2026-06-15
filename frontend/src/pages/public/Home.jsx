import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../../components/layout/PublicLayout.jsx'
import { landingAPI } from '../../services/api'
import { useSEO } from '../../hooks/useSEO'
import { BookOpen, Users, Award, ArrowRight, CheckCircle, Star, Clock, Globe, ChevronRight, Zap, Shield, Play } from 'lucide-react'
 

const EMOJIS = { laptop:'💻', briefcase:'💼', book:'📖', globe:'🌍', calculator:'🔢', stethoscope:'🩺', heart:'❤️', star:'⭐', moon:'🌙', flask:'🧪', pencil:'✏️' }

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const step = target / (duration / 16)
    let current = 0
    const t = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(t)
  }, [target])
  return count
}

function PubCourseCard({ course }) {
  return (
    <Link to={`/courses/${course.slug}`} className="pub-card">
      <div className="pub-card-thumb">
        {course.thumbnail
          ? <img src={course.thumbnail} alt={course.title}/>
          : <div style={{ width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:52,opacity:0.25 }}>📚</div>}
        <div className="pub-card-level">{course.level}</div>
        <div className="pub-card-overlay"/>
      </div>
      <div className="pub-card-body">
        {course.category && <div className="pub-card-cat">{course.category}</div>}
        <div className="pub-card-title">{course.title}</div>
        <div className="pub-card-teacher">
          <div className="pub-card-teacher-dot">{course.teacher_name?.charAt(0)}</div>
          {course.teacher_name}
        </div>
        <div className="pub-card-footer">
          <div className="pub-card-meta">
            <span><BookOpen size={12}/> {course.total_lessons||0} lessons</span>
            <span><Users size={12}/> {course.total_students||0}</span>
          </div>
          <div className="pub-card-price">${course.price}</div>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  useSEO({
    description: 'AqoonJire is a modern e-learning and digital innovation platform dedicated to equipping the next generation with technology, creativity, and future-ready skills.',
    path: '/',
  })
  const [data, setData] = useState(null)
  useEffect(() => { landingAPI.get().then(r => setData(r.data.data)).catch(() => {}) }, [])

  const stats = data?.stats || {}
  const featured = data?.featured_courses || []
  const categories = data?.categories || []
  const teachers = data?.featured_teachers || []

  const n1 = useCountUp(Number(stats.total_students) || 0)
  const n2 = useCountUp(Number(stats.total_courses) || 0)
  const n3 = useCountUp(Number(stats.certificates_issued) || 0)
  const n4 = useCountUp(Number(stats.total_teachers) || 0)

  const mockCourses = [
    { id:1, title:'Complete Web Development Bootcamp', slug:'web-dev', category:'IT', teacher_name:'Ahmed Hassan', total_students:312, total_lessons:48, price:75, level:'beginner' },
    { id:2, title:'Business Management & Leadership', slug:'business', category:'Business', teacher_name:'Fadumo Ali', total_students:198, total_lessons:32, price:60, level:'intermediate' },
    { id:3, title:'English for Professionals', slug:'english', category:'Language', teacher_name:'Hodan Omar', total_students:245, total_lessons:40, price:50, level:'beginner' },
  ]

  return (
    <div style={{ overflowX:'hidden' }}>
      <Navbar/>

      {/* ── HERO ───────────────────────────────────── */}
      <section className="hero">
        <div className="hero-noise"/>
        <div className="hero-grid"/>
        <div className="hero-orb-1"/>
        <div className="hero-orb-2"/>

        <div className="hero-inner">
          <div>
            <div className="hero-tag">
              <div className="hero-tag-dot"/>
              Somalia's #1 E-Learning Platform
            </div>
            <h1 className="hero-h1">
              Empowering the Next Generation to<br/>
              <span className="hero-h1-line">
                <span className="hero-h1-teal">Learn, Create, Innovate, and Lead</span>
              </span>
            </h1>
            <p className="hero-desc">
              AqoonJire is a modern e-learning and digital innovation platform dedicated to equipping the next generation with technology, creativity, and future-ready skills.
            </p>
            <div className="hero-btns">
              <Link to="/courses" className="btn btn-secondary btn-lg">
                Explore Courses <ArrowRight size={18}/>
              </Link>
              <Link to="/about" className="btn btn-ghost-white btn-lg">
                How It Works
              </Link>
            </div>
            <div className="hero-stats">
              {[[n1+'+','Students'],[n2+'+','Courses'],[n3+'+','Certificates'],[n4,'Instructors']].map(([v,l]) => (
                <div key={l} className="hero-stat">
                  <div className="hero-stat-val">{v}</div>
                  <div className="hero-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <span>Popular Courses</span>
                <span style={{ color:'var(--brand-secondary)',fontSize:11,fontWeight:700 }}>Live</span>
              </div>
              {(featured.length ? featured : mockCourses).slice(0,3).map((c,i) => (
                <div key={c.id||i} className="hero-course-row">
                  <div className="hero-course-emoji" style={{ background:['rgba(0,184,152,0.12)','rgba(40,4,84,0.2)','rgba(0,184,152,0.08)'][i] }}>
                    {['💻','💼','📖'][i]}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="hero-course-name">{c.title?.slice(0,30)}{c.title?.length>30?'…':''}</div>
                    <div className="hero-course-meta">{c.teacher_name} · {c.total_students} students</div>
                    <div className="hero-mini-bar">
                      <div className="hero-mini-fill" style={{ width:`${[78,62,89][i]}%` }}/>
                    </div>
                  </div>
                </div>
              ))}
              <div className="hero-pill-row">
                {[['4.9★','Rating'],['100%','Somali'],['∞','Access']].map(([v,l]) => (
                  <div key={l} className="hero-pill">
                    <div className="hero-pill-val">{v}</div>
                    <div className="hero-pill-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="hero-float-1">
              <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:9,background:'rgba(0,184,152,0.2)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <Award size={16} color="var(--brand-secondary)"/>
                </div>
                <div>
                  <div className="float-label">🎉 Certificate Earned!</div>
                  <div className="float-sub">Web Dev · Just now</div>
                </div>
              </div>
            </div>
            <div className="hero-float-2">
              <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:9,background:'rgba(40,4,84,0.3)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <Users size={16} color="#c084fc"/>
                </div>
                <div>
                  <div className="float-label">👥 12 New Students</div>
                  <div className="float-sub">Enrolled today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block',width:'100%',marginTop:'auto',flexShrink:0 }}>
          <path d="M0 28C240 56 480 0 720 28C960 56 1200 0 1440 28L1440 56L0 56Z" fill="var(--bg-2)"/>
        </svg>
      </section>

      {/* ── TRUST BAR ──────────────────────────────── */}
      <div className="pub-section-alt" style={{ padding:'0' }}>
        <div style={{ maxWidth:1280,margin:'0 auto',padding:'20px 5%',display:'flex',justifyContent:'center',gap:'clamp(20px,4vw,56px)',flexWrap:'wrap' }}>
          {[[<Shield size={16}/>, 'Trusted by 1,200+ students'],[<Globe size={16}/>, 'Courses in Somali language'],[<Zap size={16}/>, 'Lifetime access after payment'],[<Award size={16}/>, 'Recognised certificates']].map(([icon, text]) => (
            <div key={text} style={{ display:'flex',alignItems:'center',gap:8,color:'var(--text-muted)',fontSize:13,fontWeight:500 }}>
              <span style={{ color:'var(--brand-secondary)' }}>{icon}</span>{text}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ─────────────────────────────── */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div className="section-row">
            <div>
              <div className="section-tag">📚 Subjects</div>
              <h2 className="section-h">Find Your Path</h2>
              <p className="section-sub">From IT to Islamic studies — we cover what Somalia needs most.</p>
            </div>
            <Link to="/courses" className="btn btn-outline-teal" style={{ whiteSpace:'nowrap' }}>
              All Courses <ChevronRight size={14}/>
            </Link>
          </div>
          <div className="cat-grid">
            {(categories.length ? categories : [
              { name:'Information Technology', icon:'laptop', course_count:12 },
              { name:'Business & Management', icon:'briefcase', course_count:8 },
              { name:'Arabic Language', icon:'book', course_count:6 },
              { name:'English Language', icon:'globe', course_count:9 },
              { name:'Mathematics', icon:'calculator', course_count:5 },
              { name:'Health & Medicine', icon:'stethoscope', course_count:4 },
            ]).map(cat => (
              <Link to={`/courses?category=${cat.name}`} key={cat.name} className="cat-card">
                <span className="cat-emoji">{EMOJIS[cat.icon]||'📚'}</span>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{cat.course_count} courses</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ───────────────────────── */}
      <section className="pub-section">
        <div className="pub-inner">
          <div className="section-row">
            <div>
              <div className="section-tag">⭐ Featured</div>
              <h2 className="section-h">Top Courses This Month</h2>
              <p className="section-sub">Handpicked for quality, relevance and student success.</p>
            </div>
            <Link to="/courses" className="btn btn-outline-teal" style={{ whiteSpace:'nowrap' }}>
              Browse All <ChevronRight size={14}/>
            </Link>
          </div>
          <div className="grid-3">
            {(featured.length ? featured : mockCourses).map(c => <PubCourseCard key={c.id} course={c}/>)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────── */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 16px' }}>🚀 Process</div>
            <h2 className="section-h">Get Started in 4 Steps</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>Simple enrollment designed for Somalia — no complicated signups.</p>
          </div>
          <div className="steps-grid">
              {[
                { n:'01', emoji:'🔍', title:'Browse Courses', desc:'Explore our catalog of expert-taught courses in IT, business, language and more.' },
                { n:'02', emoji:'📱', title:'Contact & Pay', desc:'Reach us via WhatsApp or phone. Pay through EVC Plus, eDahab, Zaad, or bank transfer.' },
                { n:'03', emoji:'🔑', title:'Get Your Account', desc:'Within 24 hours we create your personal student account and grant course access.' },
                { n:'04', emoji:'🎓', title:'Learn & Certify', desc:'Study at your own pace, complete quizzes and assignments, earn your certificate.' },
              ].map(s => (
              <div key={s.n} className="step-cell">
                <div className="step-num">{s.n}</div>
                  <div style={{ fontSize:32, marginBottom:16 }}>{s.emoji}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────── */}
      <section className="pub-section">
        <div className="pub-inner">
          <div className="why-grid">
            <div>
              <div className="section-tag">💡 Why Us</div>
              <h2 className="section-h">Built for<br/>Somali Learners</h2>
              <p className="section-sub" style={{ marginTop:14 }}>Every detail — from language to payment methods — is designed for you.</p>
              <div className="why-checks">
                {['All courses taught in Somali language','Pay via EVC Plus, eDahab, Zaad or cash','Download materials for offline learning','Personal support from our admin team','Certificates recognised by employers','Lifetime access — pay once, keep forever'].map(item => (
                  <div key={item} className="why-check">
                    <div className="why-check-icon"><CheckCircle size={12} color="var(--brand-secondary)"/></div>
                    <span className="why-check-text">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/courses" className="btn btn-secondary btn-lg" style={{ marginTop:36 }}>
                Start Learning <ArrowRight size={16}/>
              </Link>
            </div>
            <div className="why-cards">
              {[['💻','Online Learning','Study anywhere on any device, at your own pace.'],['🏆','Certificates','Earn recognised completion certificates.'],['💬','Q&A Support','Ask instructors directly in every lesson.'],['♾️','Lifetime Access','One-time payment — yours forever.']].map(([e,t,d]) => (
                <div key={t} className="why-card">
                  <div className="why-card-emoji">{e}</div>
                  <div className="why-card-title">{t}</div>
                  <div className="why-card-desc">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ────────────────────────────── */}
      {teachers.length > 0 && (
        <section className="pub-section pub-section-alt">
          <div className="pub-inner">
            <div style={{ textAlign:'center', marginBottom:52 }}>
              <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 16px' }}>👨‍🏫 Instructors</div>
              <h2 className="section-h">Learn From The Best</h2>
              <p className="section-sub" style={{ margin:'0 auto' }}>Somalia's most experienced educators, teaching in your language.</p>
            </div>
            <div className="grid-4">
              {teachers.map(t => (
                <div key={t.id} className="teacher-card">
                  <div className="teacher-ava">{t.full_name?.charAt(0)}</div>
                  <div className="teacher-name">{t.full_name}</div>
                  <div className="teacher-meta">{t.course_count} courses · {t.total_students||0} students</div>
                  {t.bio && <div className="teacher-bio">{t.bio?.slice(0,90)}{t.bio?.length>90?'…':''}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ───────────────────────────── */}
      <section className="pub-section">
        <div className="pub-inner">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 16px' }}>💬 Testimonials</div>
            <h2 className="section-h">What Our Students Say</h2>
          </div>
          <div className="grid-3">
            {[
              { name:'Hodan Abdi', role:'IT Graduate', text:'AqoonJire changed my life. I learned web development in my own language and now work as a freelancer earning great income.', avatar:'H' },
              { name:'Mohamed Farah', role:'Business Student', text:'The business course was incredibly detailed. The instructor explained everything clearly in Somali, making complex concepts easy to understand.', avatar:'M' },
              { name:'Amina Hassan', role:'English Course', text:'My English improved dramatically. I got a promotion at work because of the professional communication skills I learned here.', avatar:'A' },
            ].map(t => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars">{[...Array(5)].map((_,i) => <Star key={i} size={13} fill="var(--brand-secondary)" color="var(--brand-secondary)"/>)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-ava">{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div className="cta-wrap">
            <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 20px' }}>🎯 Get Started</div>
            <h2 className="cta-h">Ready to Transform<br/>Your Career?</h2>
            <p className="cta-sub">Join 1,200+ students already learning and growing with AqoonJire. Your journey starts today.</p>
            <div className="cta-btns">
              <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16}/></Link>
              <a href="https://wa.me/252610317264" target="_blank" rel="noreferrer" className="btn btn-ghost-white btn-lg">📱 WhatsApp Us</a>
            </div>
            <div className="cta-perks">
              {['No hidden fees','Pay in local currency','Account ready in 24h'].map(f => (
                <div key={f} className="cta-perk"><CheckCircle size={14} color="var(--brand-secondary)"/>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
