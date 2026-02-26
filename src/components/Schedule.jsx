import React, { useState } from 'react'

export default function Schedule({ mentor, onDone }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  function save() {
    const appt = { id: Date.now(), mentorId: mentor.id, mentorName: mentor.name, date, time, note }
    const arr = JSON.parse(localStorage.getItem('appointments') || '[]')
    arr.push(appt)
    localStorage.setItem('appointments', JSON.stringify(arr))
    setSaved(true)
  }

  return (
    <section className="schedule">
      <h2>Schedule with {mentor.name}</h2>
      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Time
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <label>
        Note
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Goals for the session" />
      </label>
      <div className="actions">
        <button onClick={save}>Save</button>
        <button onClick={onDone}>Done</button>
      </div>
      {saved && <p className="saved">Appointment saved.</p>}
    </section>
  )
}
