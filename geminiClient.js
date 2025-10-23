const BACKEND_URL = 'http://localhost:4000' // change to your deployed backend

export async function analyzePage({url, text}) {
  try {
    const resp = await fetch(`${BACKEND_URL}/analyze`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ url, text })
    })
    return await resp.json()
  } catch (e) {
    return { error: e.message }
  }
}

// Focus controls via background service worker messages
export function startFocus({duration = 25}) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'START_FOCUS', duration }, resolve)
  })
}

export function stopFocus() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'STOP_FOCUS' }, resolve)
  })
}

export function getStatus() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_STATUS' }, (resp) => {
      resolve(resp?.status || 'idle')
    })
  })
}
