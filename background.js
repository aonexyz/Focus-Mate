// Background service worker to manage focus timer & blocking
let focusAlarmName = 'focusmate-alarm'
let focusState = { status: 'idle', end: null, blockedDomains: [] }

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'START_FOCUS') {
    const minutes = msg.duration || 25
    const now = Date.now()
    focusState = { status: 'focusing', end: now + minutes*60*1000, blockedDomains: ['facebook.com','reddit.com','twitter.com'] }
    chrome.alarms.create(focusAlarmName, { when: Date.now() + minutes*60*1000 })
    // Optionally, add rules to block sites (simple approach uses content script)
    sendResponse({ ok: true })
  } else if (msg.type === 'STOP_FOCUS') {
    focusState = { status: 'idle', end: null, blockedDomains: [] }
    chrome.alarms.clear(focusAlarmName)
    sendResponse({ ok: true })
  } else if (msg.type === 'GET_STATUS') {
    sendResponse({ status: focusState.status })
  }
  return true
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === focusAlarmName) {
    focusState.status = 'idle'
    focusState.end = null
    // notify user
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'src/icons/icon128.png',
      title: 'Focus session ended',
      message: 'Great job — your focus session is complete!'
    })
  }
})
