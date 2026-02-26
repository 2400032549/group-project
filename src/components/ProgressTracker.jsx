import React, { useState, useEffect } from 'react'

export default function ProgressTracker({ onBack }) {
  const [entries, setEntries] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('progress') || '[]')
    setEntries(stored)
  }, [])

  function add() {
    if (!text.trim()) return
    const e = { id: Date.now(), text: text.trim(), date: new Date().toISOString() }
    const next = [e, ...entries]
    setEntries(next)
    localStorage.setItem('progress', JSON.stringify(next))
    setText('')
  }

  function clearAll() {
    setEntries([])
    localStorage.setItem('progress', JSON.stringify([]))
  }

  return (
    <section className="progress">
      <button className="back" onClick={onBack}>← Back</button>
      <h2>Progress Tracker</h2>
      <div className="entry-form">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Describe progress or goals" />
        <div>
          <button onClick={add}>Add</button>
          <button onClick={clearAll}>Clear</button>
        </div>
      </div>
      <ul className="entries">
        {entries.map((e) => (
          <li key={e.id}>
            <div className="entry-date">{new Date(e.date).toLocaleString()}</div>
            <div className="entry-text">{e.text}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
