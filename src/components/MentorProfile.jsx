import React from 'react'

export default function MentorProfile({ mentor, onSchedule, onBack }) {
  return (
    <section className="mentor-profile">
      <button className="back" onClick={onBack}>← Back</button>
      <div className="profile-card">
        <h2>{mentor.name}</h2>
        <p className="title">{mentor.title}</p>
        <p className="bio">{mentor.bio}</p>
        <p className="skills">Skills: {mentor.skills.join(', ')}</p>
        <div className="actions">
          <button onClick={onSchedule}>Schedule Session</button>
        </div>
      </div>
    </section>
  )
}
