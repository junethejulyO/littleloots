# Bondi for Mom & Dad — product film

A 34-second, 16:9 product film for HeyBondi in the style of an Apple launch video: black and white backgrounds, lots of negative space, text that fades in from a blur, the product turning slowly in 3D, and coral as the only accent colour.
Bondi is a virtual agent that lives in the family's digital photo frame. It looks after Mom & Dad before they have to ask.

- `dist/bondi-for-parents.mp4`: 1920×1080, 30 fps, with a 96 bpm xylophone and marimba soundtrack
- `dist/bondi-for-parents.html`: a self-contained interactive version (click to play, space to pause)
- `src/film.html`: the source. Everything is drawn on a canvas, and the audio is synthesised with WebAudio.

| Time | Shot |
|---|---|
| 0–1.8s | Black: "For the people who raised us." |
| 1.8–5.5s | The frame turns to camera under a light sweep, the screen wakes, Bondi wakes and waves. Title: Bondi |
| 5.5–8s | White: "It doesn't wait to be asked." |
| 8–23s | Six capabilities, one per bar: pills · Wi-Fi fix (wrench) · scam calls · doctor + ride · rain · calling Lily |
| 23–28s | Bento grid: "Always one step ahead." plus 8 capability tiles |
| 28–34s | End card: Bondi · Founder Edition · heybondi.ai |

```bash
npm install
node build.mjs            # rebuild the HTML
node build.mjs --render   # also render the MP4 (needs ffmpeg)
```
