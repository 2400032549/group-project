import React from 'react'

export default function MentorList({ mentors, onView }) {
  return (
    <section className="mentor-list">
      <h2>Available Mentors</h2>
      <div className="cards">
        {mentors.map((m) => (
          <div className="card" key={m.id}>
            <div className="meta">
              <h3>{m.name}</h3>
              <p className="title">{m.title}</p>
              <p className="skills">{m.skills.join(' • ')}</p>
            </div>
            <div className="actions">
              <button onClick={() => onView(m)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
