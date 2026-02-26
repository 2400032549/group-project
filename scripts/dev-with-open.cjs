#!/usr/bin/env node
const { spawn } = require('child_process')

// Spawn Vite
const child = spawn('npx', ['vite'], { shell: true })

let lastUrls = { local: null, network: null }

child.stdout.on('data', (data) => {
  const text = data.toString()
  process.stdout.write(text)

  // try to extract Local and Network URLs from Vite output
  const localMatch = text.match(/Local:\s*(https?:\/\/[^\s]+)/)
  const netMatch = text.match(/Network:\s*(https?:\/\/[^\s]+)/)
  if (localMatch) lastUrls.local = localMatch[1]
  if (netMatch) lastUrls.network = netMatch[1]
})

child.stderr.on('data', (data) => {
  process.stderr.write(data.toString())
})

child.on('exit', (code) => {
  process.exit(code)
})

// Listen for keypresses on stdin
process.stdin.setRawMode && process.stdin.setRawMode(true)
process.stdin.resume()
process.stdin.on('data', (key) => {
  const k = key.toString()
  if (k === 'o' || k === 'O') {
    const url = lastUrls.network || lastUrls.local || 'http://localhost:5173/'
    // Open using platform shell
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', '""', url], { shell: false, detached: true })
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { detached: true })
    } else {
      spawn('xdg-open', [url], { detached: true })
    }
  }
  // Ctrl-C
  if (k === '\u0003') {
    child.kill('SIGTERM')
    process.exit()
  }
})
