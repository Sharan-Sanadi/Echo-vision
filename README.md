# 👁️ Echo-Vision (VisionAid)

> **An AI-powered, real-time visual assistant with hands-free voice control — designed for accessibility and beyond.**

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Backend-Python%20%2B%20FastAPI-green?logo=python)](https://fastapi.tiangolo.com/)
[![WebSocket](https://img.shields.io/badge/Realtime-WebSocket-orange)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## 🌟 Overview

**Echo-Vision** (branded as **VisionAid**) is a cinematic, AI-powered visual assistant that uses your device's camera combined with voice commands to describe, analyze, and respond to the real world around you. It is built for accessibility-first use cases — empowering visually impaired users to interact with their environment using just their voice.

---

## ✨ Features

### 🎬 Cinematic "Dark Nebula" Landing Page
- Immersive full-screen entry with animated gradient orbs and a 3D perspective grid
- Glassmorphism feature cards with hover-tilt effects
- Shimmering gradient hero title with typewriter-style tagline
- Smooth **fade-out transition** into the live HUD on launch
- Easter egg: type `echo` on the keyboard to trigger a hue-rotate effect

### 🎙️ True Hands-Free Voice Interaction
- Built on the browser-native **Web Speech API** (`webkitSpeechRecognition`)
- **Auto-submits** queries once speech stops — zero manual input required
- Real-time transcript overlay while speaking
- Pulsing microphone animation during active listening
- Keyboard fallback for unsupported browsers

### 📷 Live Camera HUD
- Fullscreen camera feed using `getUserMedia()` with environment-facing mode
- Frames captured every 350ms and encoded as JPEG for backend transmission
- HUD overlay with:
  - Corner bracket reticle targeting
  - Center crosshair
  - Live timestamp clock
  - Streaming status indicator (STREAMING / IDLE)
  - WebSocket connection status pill (ONLINE / CONNECTING / OFFLINE)

### 🔊 Text-to-Speech (TTS) Response
- AI responses from the backend are spoken back aloud via the browser's TTS engine
- Zero-latency, no external API required

### 🌐 WebSocket Communication
- Persistent WebSocket connection to the Python backend
- Exponential backoff on disconnect for resilience
- Sends both live camera frames (`type: image`) and voice queries (`type: query`)
- Receives structured JSON responses and displays them as subtitles

---

## 🏗️ Architecture

```
echo-vision/
├── frontend/                    # React + Vite SPA
│   └── src/
│       ├── components/
│       │   ├── Camera/          # Live camera feed + HUD brackets
│       │   ├── LandingPage/     # Cinematic landing page (Dark Nebula theme)
│       │   ├── Overlay/         # AI response subtitle overlay
│       │   ├── StatusBar/       # WebSocket connection status pill
│       │   └── VoiceQuery/      # Mic button + keyboard fallback
│       ├── context/
│       │   └── AppContext.jsx   # Global state (WS status, last response)
│       ├── hooks/
│       │   ├── useCamera.js     # getUserMedia + frame capture loop
│       │   ├── useSpeechToText.js # Web Speech API wrapper
│       │   ├── useTTS.js        # Text-to-speech hook
│       │   └── useWebSocket.js  # WS connection with reconnect backoff
│       └── utils/
│           ├── backoff.js       # Exponential backoff utility
│           └── frameEncoder.js  # Canvas → JPEG base64 encoder
│
└── backend/                     # Python AI processing server (coming soon)
    └── ...                      # FastAPI + WebSocket + AI model integration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+ (for backend)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in `frontend/`:

```env
VITE_WS_URL=ws://localhost:8000/ws
```

### Backend Setup *(coming soon)*

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#080808` | App background |
| `--amber` | `#f5a623` | Primary brand color |
| `--green` | `#00ff88` | Success / streaming |
| `--red` | `#ff3b3b` | Error / offline |
| `--font-display` | `Syne` | Logo & headings |
| `--font-mono` | `Space Mono` | HUD data & labels |

Landing page uses the **Outfit** font with a deep space palette (`#030014` base with violet/blue/pink gradient orbs).

---

## 🛣️ Roadmap

- [x] Cinematic landing page with Dark Nebula aesthetic
- [x] Live camera feed with HUD overlay
- [x] Web Speech API voice input (auto-submit)
- [x] WebSocket frame streaming to backend
- [x] Text-to-speech AI response playback
- [ ] Backend AI model integration (scene description, object detection)
- [ ] Framer Motion animated bubbles on landing page
- [ ] PWA support for mobile installation
- [ ] Hardware camera switching (front/back)
- [ ] Multi-language voice support

---

## 📄 License

MIT © [Sharan Sanadi](https://github.com/Sharan-Sanadi)