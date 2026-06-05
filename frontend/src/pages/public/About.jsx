import { Navbar, Footer } from '../../components/layout/PublicLayout.jsx'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Award, Users, BookOpen, Globe } from 'lucide-react'

export default function About() {
  return (
    <div>
      <Navbar/>

      {/* Hero */}
      <div style={{ background:'var(--brand-primary)',paddingTop:130,paddingBottom:0,paddingLeft:'5%',paddingRight:'5%',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,184,152,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,184,152,0.05) 1px,transparent 1px)',backgroundSize:'52px 52px',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',top:'-30%',right:'-10%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,184,152,0.12) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ maxWidth:900,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1,paddingBottom:72 }}>
          <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 22px' }}>🌍 Our Story</div>
          <h1 style={{ color:'#fff',fontSize:'clamp(2.2rem,4.5vw,3.8rem)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:22 }}>
            Empowering Somalia<br/>Through Education
          </h1>
          <p style={{ color:'rgba(255,255,255,0.6)',fontSize:17,lineHeight:1.8,maxWidth:600,margin:'0 auto 40px' }}>
            SomaliLearn was built with a single mission: to make world-class education accessible to every Somali learner, in their own language, at a price they can afford.
          </p>
          <div style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
            <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16}/></Link>
            <a href="https://wa.me/252610000000" target="_blank" rel="noreferrer" className="btn btn-ghost-white btn-lg">📱 Contact Us</a>
          </div>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block',width:'100%' }}>
          <path d="M0 20C360 44 1080 0 1440 20L1440 40L0 40Z" fill="var(--bg)"/>
        </svg>
      </div>

      {/* Stats */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:20 }}>
            {[['1,200+','Students Enrolled'],['45+','Expert Courses'],['980+','Certificates Issued'],['22','Instructors'],['4.9★','Average Rating'],['2021','Founded']].map(([v,l]) => (
              <div key={l} className="about-stat-card">
                <div className="about-stat-val">{v}</div>
                <div className="about-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pub-section">
        <div className="pub-inner">
          <div className="about-mission">
            <div>
              <div className="section-tag">🎯 Our Mission</div>
              <h2 className="section-h">Why We Built<br/>SomaliLearn</h2>
              <p style={{ color:'var(--text-muted)',fontSize:15,lineHeight:1.85,marginTop:16,marginBottom:28 }}>
                Somalia has millions of talented, motivated learners who deserve access to quality education. But language barriers, high costs, and lack of localised content have held them back.
              </p>
              <p style={{ color:'var(--text-muted)',fontSize:15,lineHeight:1.85,marginBottom:32 }}>
                We built SomaliLearn to change that. Every course is taught in Somali, priced fairly, and designed for the realities of Somali learners — whether you're in Mogadishu, Hargeisa, or anywhere in the diaspora.
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                {['Courses entirely in Somali language','Fair, one-time pricing — no subscriptions','Pay through EVC Plus, eDahab, Zaad or cash','Certificates recognised by employers','24-hour account setup after payment','Lifetime access to all course materials'].map(item => (
                  <div key={item} style={{ display:'flex',alignItems:'center',gap:12 }}>
                    <div style={{ width:22,height:22,borderRadius:'50%',background:'rgba(0,184,152,0.12)',border:'1px solid rgba(0,184,152,0.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      <CheckCircle size={12} color="var(--brand-secondary)"/>
                    </div>
                    <span style={{ fontSize:14,color:'var(--text-muted)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'var(--bg-card)',borderRadius:28,border:'1px solid var(--border)',padding:40,position:'relative',overflow:'hidden' }}>
              <div style={{ position:'absolute',top:0,right:0,width:200,height:200,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,184,152,0.08) 0%,transparent 70%)',pointerEvents:'none',transform:'translate(30%,-30%)' }}/>
              {[
                { emoji:'🌍', title:'For Every Somali', desc:'Whether you are in Somalia or the diaspora — our platform is built for you.' },
                { emoji:'🗣️', title:'Your Language', desc:'All courses are delivered in clear, accessible Somali language.' },
                { emoji:'💰', title:'Affordable Pricing', desc:'We keep prices fair and accept all major Somali mobile money platforms.' },
                { emoji:'📜', title:'Real Certificates', desc:'Earn completion certificates that employers actually recognise.' },
              ].map(item => (
                <div key={item.title} style={{ display:'flex',gap:16,marginBottom:24,alignItems:'flex-start' }}>
                  <div style={{ width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,var(--brand-primary),var(--brand-primary-mid))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0 }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:15,marginBottom:5,fontFamily:'Syne,sans-serif' }}>{item.title}</div>
                    <div style={{ fontSize:13,color:'var(--text-muted)',lineHeight:1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div style={{ textAlign:'center',marginBottom:52 }}>
            <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 16px' }}>💎 Our Values</div>
            <h2 className="section-h">What Drives Us</h2>
          </div>
          <div className="about-value-grid">
            {[
              { emoji:'📚', title:'Quality First', desc:'Every course goes through quality review before it reaches students. We never compromise on educational standards.' },
              { emoji:'🤝', title:'Accessibility', desc:'Education should be available to all Somalis regardless of location, income or background.' },
              { emoji:'🔒', title:'Trust & Security', desc:'Your data and payments are handled with the highest level of security and transparency.' },
              { emoji:'🚀', title:'Continuous Growth', desc:'We constantly add new courses and improve the platform based on student feedback.' },
              { emoji:'🌐', title:'Community', desc:'We are building a community of Somali learners who support and inspire each other.' },
              { emoji:'🎯', title:'Results-Focused', desc:'We measure success by how many students get better jobs, start businesses, and improve their lives.' },
            ].map(v => (
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
      <section className="pub-section">
        <div className="pub-inner">
          <div style={{ textAlign:'center',marginBottom:52 }}>
            <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 16px' }}>👥 The Team</div>
            <h2 className="section-h">The People Behind SomaliLearn</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:24 }}>
            {[
              { name:'Abdi Rahman Mohamed', role:'Founder & CEO', avatar:'A' },
              { name:'Hodan Ali Hassan', role:'Head of Curriculum', avatar:'H' },
              { name:'Mohamed Farah', role:'Lead Developer', avatar:'M' },
              { name:'Fadumo Osman', role:'Student Success Manager', avatar:'F' },
            ].map(p => (
              <div key={p.name} className="about-team-card">
                <div className="about-team-ava">{p.avatar}</div>
                <div style={{ fontWeight:700,fontSize:15,marginBottom:5,fontFamily:'Syne,sans-serif' }}>{p.name}</div>
                <div style={{ fontSize:13,color:'var(--brand-secondary)',fontWeight:600 }}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pub-section pub-section-alt">
        <div className="pub-inner">
          <div className="cta-wrap">
            <div className="section-tag" style={{ display:'inline-flex',margin:'0 auto 20px' }}>🎓 Join Us</div>
            <h2 className="cta-h">Ready to Start Your<br/>Learning Journey?</h2>
            <p className="cta-sub">Join thousands of Somali learners already transforming their lives with SomaliLearn.</p>
            <div className="cta-btns">
              <Link to="/courses" className="btn btn-secondary btn-lg">Browse Courses <ArrowRight size={16}/></Link>
              <a href="https://wa.me/252610000000" target="_blank" rel="noreferrer" className="btn btn-ghost-white btn-lg">📱 WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
