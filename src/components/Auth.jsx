import React, { useState } from 'react'

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}

function loadUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function signup() {
    setError('')
    if (!name.trim() || !email.trim() || !password) { setError('Fill all fields'); return }
    const users = loadUsers()
    if (users.find(u => u.email === email)) { setError('User already exists'); return }
    const user = { id: Date.now(), name: name.trim(), email: email.trim(), password }
    users.push(user)
    saveUsers(users)
    localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email }))
    onAuth({ id: user.id, name: user.name, email: user.email })
  }

  function login() {
    setError('')
    const users = loadUsers()
    const u = users.find(x => x.email === email && x.password === password)
    if (!u) { setError('Invalid credentials'); return }
    localStorage.setItem('currentUser', JSON.stringify({ id: u.id, name: u.name, email: u.email }))
    onAuth({ id: u.id, name: u.name, email: u.email })
  }

  return (
    <section className="auth">
      <div className="auth-header">
        <h2 className="auth-title">{mode === 'login' ? 'Login' : 'Sign up'}</h2>
        <div className="auth-header-actions">
          <button className={`auth-toggle-btn ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError('') }}>Login</button>
          <button className={`auth-toggle-btn ${mode === 'signup' ? 'active' : ''}`} onClick={() => { setMode('signup'); setError('') }}>Sign up</button>
        </div>
      </div>

      <div className="auth-form">
        {mode === 'signup' && (
          <div className="auth-row">
            <input className="auth-input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}

        <div className="auth-row">
          <input className="auth-input" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="auth-row">
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="auth-actions">
          {mode === 'login' ? (
            <button className="btn-primary" onClick={login}>Login</button>
          ) : (
            <button className="btn-primary" onClick={signup}>Sign up</button>
          )}
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-note">This is a demo: account data is stored locally in your browser.</div>
      </div>
    </section>
  )
}
