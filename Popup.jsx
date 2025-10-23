import React, { useState, useEffect } from 'react'
import { analyzePage, startFocus, stopFocus, getStatus } from '../geminiClient'

export default function Popup() {
  const [status, setStatus] = useState('idle')
  const [summary, setSummary] = useState(null)
  const [keyPoints, setKeyPoints] = useState([])
  const [url, setUrl] = useState('')

  useEffect(() => {
    // get active tab url
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      if (tabs[0]) setUrl(tabs[0].url)
    })
    getStatus().then(s => setStatus(s))
  }, [])

  const handleAnalyze = async () => {
    setSummary(null); setKeyPoints([]); setStatus('analyzing')
    const res = await analyzePage({ url })
    if (res.error) {
      setSummary('Error: ' + res.error)
      setStatus('idle')
      return
    }
    setSummary(res.summary || res.raw || 'No summary')
    setKeyPoints(res.key_points || [])
    setStatus('idle')
  }

  const handleStartFocus = async () => {
    await startFocus({duration: 25}) // minutes
    setStatus('focusing')
  }

  const handleStopFocus = async () => {
    await stopFocus()
    setStatus('idle')
  }

  return (
    <div className="popup">
      <h1>FocusMate</h1>
      <div className="row">
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Page URL (optional)" />
        <button onClick={handleAnalyze}>Analyze</button>
      </div>

      <div className="status">Status: {status}</div>

      <div className="actions">
        {status !== 'focusing' ? (
          <button className="focus-btn" onClick={handleStartFocus}>Start Focus</button>
        ) : (
          <button className="stop-btn" onClick={handleStopFocus}>Stop Focus</button>
        )}
      </div>

      <section className="result">
        <h2>Summary</h2>
        <p>{summary}</p>
        <h3>Key points</h3>
        <ul>{keyPoints.map((p,i)=><li key={i}>{p}</li>)}</ul>
      </section>
    </div>
  )
}
