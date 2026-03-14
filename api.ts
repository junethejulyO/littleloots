import { GoogleGenAI } from '@google/genai';

const TMDB_KEY = '8265bd1679663a7ea12ac168da84d2e8';
export const TIMG = 'https://image.tmdb.org/t/p/';

export async function fetchTMDB(film: any) {
  let poster = null;
  let photos = [null, null];
  let tmdbId = film.tmdbId;

  try {
    const searchType = film.isTV ? 'tv' : 'movie';
    
    // If no exact tmdbId is provided, search by title and year
    if (!tmdbId) {
      const searchUrl = `https://api.themoviedb.org/3/search/${searchType}?api_key=${TMDB_KEY}&query=${encodeURIComponent(film.en)}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
      
      if (searchData.results && searchData.results.length > 0) {
        // Try to match the exact year to avoid remakes/reboots
        const matched = searchData.results.find((r: any) => {
          const releaseDate = r.release_date || r.first_air_date;
          return releaseDate && releaseDate.startsWith(film.year);
        });
        tmdbId = (matched || searchData.results[0]).id;
      }
    }

    if (tmdbId) {
      const r = await fetch(`https://api.themoviedb.org/3/${searchType}/${tmdbId}?api_key=${TMDB_KEY}`);
      const d = await r.json();
      poster = d.poster_path || null;

      const creditsRes = await fetch(`https://api.themoviedb.org/3/${searchType}/${tmdbId}/credits?api_key=${TMDB_KEY}`);
      const creditsData = await creditsRes.json();
      
      if (creditsData.cast && creditsData.cast.length > 0) {
         photos = film.cast.map((c: any) => {
           const actorFirstName = c.name.toLowerCase().split(' ')[0];
           const matched = creditsData.cast.find((actor: any) => actor.name.toLowerCase().includes(actorFirstName));
           return matched ? matched.profile_path : null;
         });
         // Fallback to top 2 billed cast if mapping fails
         if (!photos[0]) photos[0] = creditsData.cast[0]?.profile_path || null;
         if (!photos[1]) photos[1] = creditsData.cast[1]?.profile_path || null;
      }
    }
  } catch (e) {
    console.error("TMDB Fetch Error", e);
  }
  
  return { poster, photos };
}

export async function generateAIInsight(archetype: any, answersSummary: string, gender: string, parent: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are HeyBondi's AI emotional analyst. HeyBondi is an AI smart frame that brings warmth to family photos.
The user is a ${gender === 'male' ? 'Male' : 'Female'}, testing their relationship with their ${parent === 'mom' ? 'Mom' : 'Dad'}.
Answers summary: ${answersSummary}.
Matched Archetype: "${archetype.title}", Reference Film: ${archetype.film.en}.
Write a warm, poetic, deep insight of about 100 words in English:
1. Combine the film and gender perspective to point out the uniqueness of this bond.
2. Express the words that might have never been spoken in this relationship (wrap in <em> tags).
3. Naturally introduce HeyBondi, using AI to treasure every ordinary family moment.
Output only the body text, no titles, no markdown formatting (except <em> tags), no hard selling.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || '';
  } catch (error) {
    console.error(error);
    return `${archetype.desc}<br><br><em>HeyBondi: Every ordinary family moment deserves to be treasured forever.</em>`;
  }
}
