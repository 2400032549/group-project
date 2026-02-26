import React, { useState, useEffect } from 'react'
import MentorList from './components/MentorList'
import MentorProfile from './components/MentorProfile'
import Schedule from './components/Schedule'
import ProgressTracker from './components/ProgressTracker'
import Header from './components/Header'
import Auth from './components/Auth'
import ColorfulBrowser from './components/ColorfulBrowser'

const sampleMentors = [
  { id: 1, name: 'Aisha Khan', title: 'Career Coach', skills: ['Resume', 'Interview'], bio: 'Helps mid-career professionals pivot.' },
  { id: 2, name: 'Carlos Ruiz', title: 'Leadership Mentor', skills: ['Management', 'Communication'], bio: 'Former engineering manager turned coach.' },
  { id: 3, name: 'Mei Lin', title: 'Product Mentor', skills: ['Roadmaps', 'Strategy'], bio: 'Builds product teams and processes.' }
]

export default function App() {
  const [mentors] = useState(sampleMentors)
  const [view, setView] = useState('list')
  const [activeMentor, setActiveMentor] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // basic persistence example: ensure storage keys exist
    if (!localStorage.getItem('appointments')) localStorage.setItem('appointments', JSON.stringify([]))
    if (!localStorage.getItem('progress')) localStorage.setItem('progress', JSON.stringify([]))
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setUser(current)
  }, [])

  function handleAuth(u) {
    setUser(u)
    localStorage.setItem('currentUser', JSON.stringify(u))
    setView('list')
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('currentUser')
    setView('list')
  }

  if (!user) {
    return (
      <div className="app">
        <Header onNavigate={setView} user={null} onLogout={logout} />
        <main>
          <ColorfulBrowser />
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-left">
                <div className="badge">🚀 Trusted by 10,000+ Professionals</div>
                <h1 className="hero-main">Transform Your<br/>Career with<br/><span>Expert Mentorship</span></h1>
                <p className="hero-sub">Connect with industry leaders, accelerate your growth, and achieve your professional goals with personalized guidance.</p>
                <div className="hero-ctas">
                  <button className="btn-primary">Get Started Free</button>
                  <button className="btn-ghost">Book a Demo</button>
                </div>
                <div className="hero-trust">✅ No credit card required &nbsp; • &nbsp; ✅ Free 14-day trial</div>
              </div>
              <div className="hero-right">
                <div className="hero-image">
                  <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b2a6f6a8b7a4c2f9f3b3d5f1e6a2c1d" alt="mentor" />
                </div>
              </div>
            </div>
          </section>
          <Auth onAuth={handleAuth} />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <Header onNavigate={setView} user={user} onLogout={logout} />
      <main>
        <ColorfulBrowser />
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="badge">🚀 Trusted by 10,000+ Professionals</div>
              <h1 className="hero-main">Transform Your<br/>Career with<br/><span>Expert Mentorship</span></h1>
              <p className="hero-sub">Connect with industry leaders, accelerate your growth, and achieve your professional goals with personalized guidance.</p>
              <div className="hero-ctas">
                <button className="btn-primary">Get Started Free</button>
                <button className="btn-ghost">Book a Demo</button>
              </div>
              <div className="hero-trust">✅ No credit card required &nbsp; • &nbsp; ✅ Free 14-day trial</div>
            </div>
            <div className="hero-right">
              <div className="hero-image">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b2a6f6a8b7a4c2f9f3b3d5f1e6a2c1d" alt="mentor" />
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stats-inner">
            <div className="stat"><div className="stat-number">10,000+</div><div className="stat-label">Active Users</div></div>
            <div className="stat"><div className="stat-number">500+</div><div className="stat-label">Expert Mentors</div></div>
            <div className="stat"><div className="stat-number">50,000+</div><div className="stat-label">Sessions Completed</div></div>
            <div className="stat"><div className="stat-number">95%</div><div className="stat-label">Success Rate</div></div>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-sub">Our comprehensive platform provides all the tools and support for meaningful mentorship connections</p>
          <div className="features-grid">
            <div className="feature-card"><div className="feature-icon">👥</div><h3>Expert Mentor Matching</h3><p>AI-powered matching algorithm connects you with mentors who align with your goals.</p></div>
            <div className="feature-card"><div className="feature-icon">📅</div><h3>Flexible Scheduling</h3><p>Book sessions at your convenience with integrated calendar and reminders.</p></div>
            <div className="feature-card"><div className="feature-icon">📈</div><h3>Progress Analytics</h3><p>Track your growth with detailed metrics, milestones, and performance insights.</p></div>
            <div className="feature-card"><div className="feature-icon">✅</div><h3>Verified Professionals</h3><p>All mentors are verified industry experts with proven track records of success.</p></div>
          </div>
        </section>
        {view === 'list' && (
          <MentorList mentors={mentors} onView={(m) => { setActiveMentor(m); setView('profile') }} />
        )}
        {view === 'profile' && activeMentor && (
          <MentorProfile mentor={activeMentor} onSchedule={() => setView('schedule')} onBack={() => setView('list')} />
        )}
        {view === 'schedule' && activeMentor && (
          <Schedule mentor={activeMentor} onDone={() => setView('list')} />
        )}
        {view === 'progress' && (
          <ProgressTracker onBack={() => setView('list')} />
        )}
      </main>
    </div>
  )
}
