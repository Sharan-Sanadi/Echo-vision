# VisionAid - Backend API Contract

This document outlines the expected WebSocket interface between the React frontend and the backend. The frontend is already built, deployed, and acts as the client.

## Connection Details

- **Protocol:** WebSocket
- **Default Endpoint:** `ws://localhost:8000/ws`
  - *(Note: The frontend allows overriding this via the `VITE_WS_URL` environment variable if deployed).*
- **Connection Handling:** The frontend implements exponential backoff. If the server restarts or disconnects, the frontend will continuously try to reconnect automatically.

---

## Client to Server (Incoming Messages)

The frontend sends messages as stringified JSON objects. There are two types of messages the server needs to handle.

### 1. Camera Frame (Continuous)
The frontend captures the camera feed and sends a frame every **350ms** (~3 FPS).

**Payload:**
```json
{
  "type": "image",
  "data": "<raw_base64_string>"
}
```
*Note: The `data` string is a raw base64 JPEG string. The `data:image/jpeg;base64,` prefix is already stripped out by the frontend.*

### 2. User Text Query (On Demand)
When the user types a question into the HUD search bar and presses enter, this message is sent. The server should use this query alongside the most recent camera frames to generate an AI response.

**Payload:**
```json
{
  "type": "query",
  "text": "What is the text on the sign in front of me?"
}
```

---

## Server to Client (Outgoing Messages)

When the backend generates an AI response, it must send it back to the frontend over the same WebSocket connection. 

**Payload:**
```json
{
  "text": "The sign says 'Stop'."
}
```

*Note: As soon as the frontend receives this JSON payload, it will:*
1. Display the `text` on the screen as a glowing subtitle (`ResponseOverlay`).
2. Automatically speak the `text` out loud using the browser's Text-To-Speech engine.

---

## Recommended Backend Stack
Since this requires handling active WebSockets and likely integrating with an AI SDK (like Google Gemini API for Vision), **Python with FastAPI** is highly recommended:
- Fast and native asynchronous WebSocket support.
- Excellent library ecosystem for AI/ML (e.g., `google-generativeai`).
