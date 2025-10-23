// Simple content script to send page metadata to background or popup
(function() {
  function detectContext() {
    const title = document.title || ''
    const url = location.href
    const bodyText = Array.from(document.querySelectorAll('p')).map(p => p.innerText).join('\n\n').slice(0, 8000)
    return { title, url, text: bodyText }
  }

  // When popup asks, respond with context
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === 'GET_PAGE_CONTEXT') {
      sendResponse(detectContext())
    } else if (msg?.type === 'BLOCK_DOMAIN') {
      // naive blocking: redirect
      if (msg.domain && location.hostname.includes(msg.domain)) {
        window.location.href = 'about:blank'
      }
      sendResponse({ ok: true })
    }
  })

  // optionally auto-send to background on load for analytics
  // chrome.runtime.sendMessage({type:'PAGE_LOADED', context: detectContext()})
})();
