// backend/server.js
require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch') // or use node 18 fetch
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json())

app.post('/analyze', async (req, res) => {
  const { url, text } = req.body
  if (!url && !text) return res.status(400).json({ error: 'provide url or text' })

  try {
    let content = text
    if (url) {
      const r = await fetch(url, { headers: { 'User-Agent': 'focusmate-bot/1.0' } })
      content = await r.text()
      // optional: server-side extraction (cheerio) to get meaningful content
    }

    // Call Gemini (example pseudocode) — replace with your provider code
    const analysisPrompt = `Analyze the page content and return JSON: { title, summary, key_points, suggested_tags }\n\nContent:\n${content.slice(0, 15000)}`
    // Example: POST to your Gemini endpoint here
    // This is placeholder; you must implement with your SDK or REST call.
    const aiResponse = await callGeminiAPI(analysisPrompt)

    return res.json(aiResponse)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
})

async function callGeminiAPI(prompt) {
  // Replace this function with actual SDK/HTTP request to Gemini
  // Example using a hypothetical REST endpoint:
  // const r = await fetch('https://api.gemini.example/v1/generate', { method:'POST', headers: {...}, body: JSON.stringify({prompt}) })
  // const j = await r.json()
  // return j
  return { title: 'demo title', summary: 'demo summary', key_points: ['kp1','kp2'], suggested_tags: 'ai,gemini' }
}

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`))
