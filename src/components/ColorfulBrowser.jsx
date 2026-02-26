import React, { useState } from 'react'

const PRESETS = [
  { name: 'Sunset', value: 'linear-gradient(135deg,#ff7a18 0%,#af002d 50%,#32004b 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg,#06b6d4 0%,#3b82f6 50%,#0ea5a4 100%)' },
  { name: 'Aurora', value: 'linear-gradient(135deg,#7c3aed 0%,#06b6d4 50%,#f97316 100%)' },
  { name: 'Mango', value: 'linear-gradient(135deg,#ff9a8b 0%,#fecf6b 50%,#ff7ab6 100%)' },
  { name: 'Purple', value: 'linear-gradient(135deg,#5b21b6 0%,#8b5cf6 50%,#a78bfa 100%)' }
]

export default function ColorfulBrowser() {
  const [fullPage, setFullPage] = useState(true)

  function apply(v) {
    try {
      document.documentElement.style.setProperty('--cover-gradient', v)
      if (fullPage) document.documentElement.style.setProperty('--page-gradient', v)
    } catch (e) {}
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#f59e0b' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#10b981' }} />
        </div>
        <div style={{ fontSize: 13, color: '#374151' }}>Theme presets:</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => apply(p.value)} style={{ padding: '6px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'white', color: '#111', fontWeight: 600 }}>
              {p.name}
            </button>
          ))}
        </div>
        <label style={{ marginLeft: 12, fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={fullPage} onChange={(e) => setFullPage(e.target.checked)} />
          Apply to full page
        </label>
      </div>
    </div>
  )
}
