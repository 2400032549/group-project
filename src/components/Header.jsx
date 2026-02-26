import React from 'react'

export default function Header({ onNavigate, user, onLogout }) {
  return (
    <header className="header">
      <div className="brand">MentorConnect</div>
      <nav>
        <button onClick={() => onNavigate('list')}>Mentors</button>
        <button onClick={() => onNavigate('progress')}>Progress</button>
        {user ? (
          <>
            <span style={{ marginLeft: 12, color: '#374151' }}>{user.name}</span>
            <button style={{ marginLeft: 8 }} onClick={onLogout}>Logout</button>
          </>
        ) : null}
      </nav>
    </header>
  )
}
