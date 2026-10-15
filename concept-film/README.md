# Bondi for Mom & Dad — product film

A 33-second, 16:9 product film in the style of an Apple or Google launch video, made for HeyBondi.
Bondi is a virtual agent that lives in the family's digital photo frame. It looks after Mom & Dad on its own initiative, before they have to ask.

- `dist/bondi-for-parents.mp4`: 1920×1080, 30 fps, with a 120 bpm xylophone and marimba soundtrack
- `dist/bondi-for-parents.html`: a self-contained interactive version (click to play, space to pause)
- `src/film.html`: the source. Everything is drawn on a canvas, and the audio is synthesised with WebAudio.

| Time | Shot |
|---|---|
| 0–4s | "Mom & Dad never ask for help." / "So Bondi doesn't wait." |
| 4–8s | The photo frame flies in, the family photo wipes away, and Bondi drops in: "Meet Bondi." |
| 8–22s | 8 capabilities: **Reminds** (pills) · **Fixes** (Wi-Fi, with a wrench) · **Protects** (scam call) · **Books** (doctor + ride) · **Shops** (groceries) · **Plans ahead** (rain, umbrella) · **Remembers** (birthday gift) · **Connects** (video call with Lily) |
| 22–25s | A grid of 9 frames: "One frame. Always one step ahead." |
| 25–33s | The frame in the living room. Bondi · Founder Edition · heybondi.ai |

```bash
npm install
node build.mjs            # rebuild the HTML
node build.mjs --render   # also render the MP4 (needs ffmpeg)
```
