# FocusMate — Gemini-powered Chrome Extension (React)

## Quick setup (dev)

### 1. Start backend proxy (keeps Gemini key secret)
```bash
cd backend
cp .env.example .env
# edit .env -> set GEMINI_API_KEY
npm install
npm start
```
### 2. Build the extension popup (Vite + React)
```bash
cd extension
npm install
npm run build   # will output into ../dist
# copy manifest.json into dist/ (or adjust vite config)
cp manifest.json dist/manifest.json
```
### 3. Load into Chrome

1. Open chrome://extensions/
2. Toggle Developer mode
3. Click Load unpacked and choose the dist/ folder
4. Click the extension icon and open the popup. Press Analyze on the active tab. The popup will call the backend which will call Gemini.

### 4. Click the extension icon and open the popup. Press Analyze on the active tab. The popup will call the backend which will call Gemini.

### Security note: Never embed your Gemini API key in extension source. Always use a backend proxy.

### Production notes
1. Use proper server-side html extraction (cheerio/readability) to produce good text for Gemini.
2. Use chunking & map-reduce summarization for long pages.
3. Add OAuth or per-user keys for per-user requests.

---
## Author

- **A 1** – [GitHub: aonexyz](https://github.com/aonexyzl)

---

## Buy me a coffee ☕
Love the bot? Wanna fuel more WAGMI vibes? Drop some crypto love to keep the charts lit! 🙌
- **SUI**: `0x6e20d8f6c15aeb42887608eec65b29385f21fa21cfd23302c54fabd813d8cd38`
- **USDT (TRC20)**: `TMoPwVpeC8A2yTc5qotKj8gVXaGTqQwc3L`
- **BNB (BEP20)**: `0x068ff5934e0c30d8763012a6faa0033e7fdcc455`
- **Binance UID**:`899350787`

Every bit helps me grind harder and keep this bot stacking bags! 😎
