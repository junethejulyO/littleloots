# Bondi for Mom & Dad — concept film

A 52-second, 16:9 concept film for HeyBondi. Bondi is a proactive personal assistant for parents: it notices things and handles them before anyone has to ask. The look is warm tech, and every sound is a xylophone or marimba note.

- `dist/bondi-for-parents.mp4`: 1920×1080, 30 fps, with the xylophone soundtrack
- `dist/bondi-for-parents.html`: a self-contained interactive version (click to play, space to pause)
- `src/film.html`: the source. Everything is drawn on a canvas, and the audio is synthesised with WebAudio.

| Time | Scene | Bondi holds |
|---|---|---|
| 0–5s | Meet Bondi | — (waves) |
| 5–13s | 07:30 Mom's blood-pressure pill + warm water | pill organiser |
| 13–22s | 10:15 Fixes Dad's dripping tap | wrench |
| 22–30s | 14:00 Books the check-up, the ride, and tells Lily | calendar |
| 30–38s | 16:40 Blocks a scam call | shield |
| 38–45s | 19:55 Calls Lily while she's on a break | heart |
| 45–52s | "Looks after Mom & Dad — before they have to ask." · Founder Edition | heart |

```bash
npm install
node build.mjs            # rebuild the HTML
node build.mjs --render   # also render the MP4 (needs ffmpeg)
```
