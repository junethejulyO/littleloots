import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Film } from 'lucide-react';
import { QUESTIONS, ARCHETYPES } from './data';
import { fetchTMDB, generateAIInsight, TIMG } from './api';

function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function Header() {
  return (
    <div className="flex flex-col items-center justify-center mb-12 border-b border-[#C4B29A] pb-6 relative">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C4B29A] translate-y-[3px]"></div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-[#8C7A66] uppercase mb-3 flex items-center gap-2">
        <Film size={12} /> A HeyBondi Production
      </div>
      <div className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-[#2C221A] uppercase">Family Archetype</div>
    </div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6 text-[#2C221A] text-center">
        Your Story,<br />
        <em className="text-[#9A3B26] italic">Which Classic Movie Is It?</em>
      </h1>
      <p className="text-[#6B5A48] mb-10 text-lg text-center font-serif italic">5 questions to find your North American film family archetype.</p>
      
      <div className="p-8 md:p-10 bg-[#FAF7F2] border border-[#D6C7B3] shadow-[6px_6px_0px_0px_rgba(214,199,179,0.4)] text-[#3A2E24] leading-relaxed mb-12 relative w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2EBE1] px-3 font-mono text-[10px] tracking-[0.2em] text-[#8C7A66] uppercase">Synopsis</div>
        <p className="mb-4">Every family bond is a movie.</p>
        <p className="mb-4">There's the silent but deep father-daughter protection in <strong className="text-[#7A2B1A] font-serif text-lg">Interstellar</strong>,<br />
        and the argumentative but inseparable mother-daughter bond in <strong className="text-[#7A2B1A] font-serif text-lg">Gilmore Girls</strong>...</p>
        <p><strong className="text-[#7A2B1A] font-serif">HeyBondi believes</strong>: Every family bond deserves to be seen and recorded.</p>
      </div>
      
      <button onClick={onNext} className="bg-[#2C221A] text-[#F2EBE1] px-10 py-4 font-mono text-sm tracking-[0.2em] uppercase hover:bg-[#9A3B26] transition-colors shadow-[4px_4px_0px_0px_rgba(154,59,38,0.3)] flex items-center gap-3">
        Start Roll <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

function ChoiceBtn({ icon, label, hint, selected, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 p-6 transition-all border ${selected ? 'border-[#9A3B26] bg-[#E8DFD1] shadow-[inset_0_0_0_1px_#9A3B26]' : 'border-[#D6C7B3] bg-[#FAF7F2] hover:border-[#B39D82] hover:bg-[#E8DFD1]/50 shadow-[4px_4px_0px_0px_rgba(214,199,179,0.4)]'}`}
    >
      <span className="text-3xl block mb-4 grayscale contrast-125 opacity-80">{icon}</span>
      <div className="font-serif text-lg font-medium text-[#2C221A] tracking-wide">{label}</div>
      {hint && <div className="font-mono text-[10px] text-[#8C7A66] mt-2 uppercase tracking-[0.15em]">{hint}</div>}
    </button>
  );
}

function GenderScreen({ onNext, onBack, gender, setGender, parent, setParent }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <h2 className="text-3xl font-serif mb-4 text-[#2C221A] text-center">Cast Selection</h2>
      <p className="text-[#6B5A48] mb-12 text-center font-serif italic">Help us match you with a more accurate family archetype.</p>
      
      <div className="mb-10">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#9A3B26] uppercase mb-4 border-b border-[#D6C7B3] pb-2 inline-block">Lead Role (You)</div>
        <div className="flex gap-4 md:gap-6">
          <ChoiceBtn icon="👨" label="Mr." hint="Male" selected={gender === 'male'} onClick={() => setGender('male')} />
          <ChoiceBtn icon="👩" label="Ms." hint="Female" selected={gender === 'female'} onClick={() => setGender('female')} />
        </div>
      </div>

      <div className="mb-12">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#9A3B26] uppercase mb-4 border-b border-[#D6C7B3] pb-2 inline-block">Co-Star</div>
        <div className="flex gap-4 md:gap-6">
          <ChoiceBtn icon="👩‍👧" label="Mom" selected={parent === 'mom'} onClick={() => setParent('mom')} />
          <ChoiceBtn icon="👨‍👦" label="Dad" selected={parent === 'dad'} onClick={() => setParent('dad')} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="font-mono text-xs tracking-widest text-[#6B5A48] hover:text-[#2C221A] transition-colors uppercase">
          ← Rewind
        </button>
        <button 
          onClick={onNext} 
          disabled={!gender || !parent}
          className="bg-[#2C221A] text-[#F2EBE1] px-8 py-3.5 font-mono text-xs tracking-[0.2em] uppercase hover:bg-[#9A3B26] transition-colors shadow-[4px_4px_0px_0px_rgba(154,59,38,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#2C221A] disabled:shadow-none flex items-center gap-3"
        >
          Action <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function QuizScreen({ questions, onComplete }: any) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const hasAnswered = answers[current] !== undefined;

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setCurrent(c => c + 1);
    }
  };

  return (
    <motion.div key={current} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
      <div className="flex items-center justify-between mb-8 border-b-2 border-double border-[#C4B29A] pb-4">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#9A3B26] uppercase">Scene {current + 1} / Take 1</div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#8C7A66] uppercase">Roll {current + 1} of {questions.length}</div>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif text-[#2C221A] mb-10 leading-relaxed">{q.text}</h2>

      <div className="flex flex-col gap-4 mb-12">
        {q.opts.map((opt: any, i: number) => {
          const isSelected = answers[current] === i;
          return (
            <button
              key={i}
              onClick={() => setAnswers({ ...answers, [current]: i })}
              className={`relative p-5 pl-16 border text-left transition-all ${isSelected ? 'border-[#9A3B26] bg-[#E8DFD1] text-[#7A2B1A] shadow-[inset_0_0_0_1px_#9A3B26]' : 'border-[#D6C7B3] bg-[#FAF7F2] text-[#3A2E24] hover:border-[#B39D82] hover:bg-[#E8DFD1]/50 shadow-[3px_3px_0px_0px_rgba(214,199,179,0.4)]'}`}
            >
              <span className={`absolute left-5 top-1/2 -translate-y-1/2 font-mono text-xs tracking-widest transition-colors ${isSelected ? 'text-[#9A3B26]' : 'text-[#8C7A66]'}`}>
                {['A.', 'B.', 'C.', 'D.'][i]}
              </span>
              <span className="font-serif text-lg">{opt.text}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <button 
          onClick={() => setCurrent(c => c - 1)} 
          className={`font-mono text-xs tracking-widest text-[#6B5A48] hover:text-[#2C221A] transition-colors uppercase ${current === 0 ? 'invisible' : ''}`}
        >
          ← Cut
        </button>
        <button 
          onClick={handleNext}
          disabled={!hasAnswered}
          className="bg-[#2C221A] text-[#F2EBE1] px-8 py-3.5 font-mono text-xs tracking-[0.2em] uppercase hover:bg-[#9A3B26] transition-colors shadow-[4px_4px_0px_0px_rgba(154,59,38,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#2C221A] disabled:shadow-none flex items-center gap-3"
        >
          {isLast ? 'Print' : 'Next Scene'} <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function ResultScreen({ archetype, gender, parent, answersSummary, onRestart }: any) {
  const [filmData, setFilmData] = useState<any>(null);
  const [aiInsight, setAiInsight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const tmdb = await fetchTMDB(archetype.film);
      setFilmData(tmdb);
      
      const insight = await generateAIInsight(archetype, answersSummary, gender, parent);
      setAiInsight(insight);
      setLoading(false);
    }
    loadData();
  }, [archetype, answersSummary, gender, parent]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center mb-10">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#8C7A66] uppercase mb-3">
          {gender === 'male' ? 'Mr.' : 'Ms.'} · Starring with {parent === 'mom' ? 'Mom' : 'Dad'}
        </div>
        <div className="font-mono text-xs tracking-[0.2em] text-[#9A3B26] uppercase mb-4">The Final Cut</div>
        <h2 className="text-3xl md:text-5xl font-serif text-[#2C221A] leading-tight">{archetype.title}</h2>
      </div>
      
      <div className="bg-[#FAF7F2] p-3 border border-[#D6C7B3] shadow-[6px_6px_0px_0px_rgba(214,199,179,0.4)] mb-10">
        <div className="flex border border-[#D6C7B3] overflow-hidden">
          <div className="w-32 md:w-40 shrink-0 bg-[#1A1510] relative">
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-screen pointer-events-none z-10"></div>
            {filmData?.poster ? (
              <img src={`${TIMG}w342${filmData.poster}`} alt="Poster" className="w-full h-full object-cover grayscale-[0.3] sepia-[0.2] contrast-125" />
            ) : (
              <div className="w-full h-full min-h-[200px] flex items-center justify-center text-4xl opacity-50">🎬</div>
            )}
          </div>
          <div className="p-5 md:p-6 flex flex-col flex-1 min-w-0 bg-[#F2EBE1]">
            <div className="font-serif text-xl md:text-2xl text-[#2C221A] leading-snug mb-2 truncate">{archetype.film.en}</div>
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <span className="bg-[#D6C7B3] text-[#2C221A] px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">IMDb {archetype.film.rating}</span>
              <span className="font-mono text-xs text-[#6B5A48]">{archetype.film.year}</span>
              <span className="font-mono text-[10px] text-[#9A3B26] border border-[#C4B29A] px-2 py-0.5 uppercase tracking-wider">{archetype.film.genre}</span>
            </div>
            
            <div className="mt-auto">
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#8C7A66] uppercase mb-3 border-b border-[#D6C7B3] pb-1 inline-block">Starring</div>
              <div className="flex gap-5">
                {archetype.film.cast.map((c: any, i: number) => (
                  <div key={i} className="flex flex-col items-start gap-2">
                    {filmData?.photos?.[i] ? (
                      <img src={`${TIMG}w185${filmData.photos[i]}`} alt={c.name} className="w-12 h-12 object-cover border border-[#C4B29A] grayscale-[0.5] sepia-[0.3]" />
                    ) : (
                      <div className="w-12 h-12 bg-[#D6C7B3] border border-[#C4B29A] flex items-center justify-center text-lg opacity-50">👤</div>
                    )}
                    <div>
                      <div className="font-serif text-[11px] text-[#2C221A] leading-tight w-20 truncate">{c.name}</div>
                      <div className="font-mono text-[9px] text-[#9A3B26] truncate w-20 mt-0.5 uppercase">{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {archetype.traits.map((t: string, i: number) => (
          <span key={i} className="font-mono text-[10px] px-3 py-1.5 border border-[#C4B29A] text-[#7A2B1A] uppercase tracking-[0.15em] bg-[#E8DFD1]">{t}</span>
        ))}
      </div>
      
      <p className="text-[#3A2E24] font-serif text-lg leading-relaxed mb-10 text-center italic px-4">"{archetype.desc}"</p>
      
      <div className="flex justify-center mb-10">
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C4B29A] to-transparent" />
      </div>
      
      <div className="bg-[#FAF7F2] border border-[#D6C7B3] p-8 mb-12 relative shadow-[4px_4px_0px_0px_rgba(214,199,179,0.4)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2EBE1] px-3 font-mono text-[10px] tracking-[0.2em] text-[#9A3B26] uppercase flex items-center gap-2">
          <Film size={12} /> Director's Commentary (AI)
        </div>
        {loading ? (
          <div className="flex flex-col items-center py-10 gap-5">
            <div className="w-8 h-8 border-2 border-[#D6C7B3] border-t-[#9A3B26] rounded-full animate-spin" />
            <div className="font-mono text-[10px] text-[#8C7A66] tracking-[0.2em] uppercase animate-pulse">Processing Film...</div>
          </div>
        ) : (
          <div className="text-[#3A2E24] font-serif leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: aiInsight }} />
        )}
      </div>
      
      <div className="flex justify-center mb-10">
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C4B29A] to-transparent" />
      </div>
      
      <div className="text-center">
        <p className="font-serif text-[#6B5A48] leading-relaxed mb-8 italic">
          <strong className="text-[#2C221A] not-italic font-medium">HeyBondi AI Frame</strong> — Injecting warmth into your everyday moments with AI.<br/>
          Turning ordinary photos into a frame of your own movie.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="http://heybondi.ai/" target="_blank" rel="noopener noreferrer" className="bg-[#2C221A] text-[#F2EBE1] px-8 py-3.5 font-mono text-xs tracking-[0.15em] uppercase hover:bg-[#9A3B26] transition-colors shadow-[4px_4px_0px_0px_rgba(154,59,38,0.3)] inline-block">
            Learn about HeyBondi
          </a>
          <button onClick={onRestart} className="bg-transparent border border-[#C4B29A] text-[#6B5A48] px-8 py-3.5 font-mono text-xs tracking-[0.15em] uppercase hover:border-[#9A3B26] hover:text-[#9A3B26] transition-colors">
            Replay
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [gender, setGender] = useState<string | null>(null);
  const [parent, setParent] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [resultArchetype, setResultArchetype] = useState<any>(null);
  const [answersSummary, setAnswersSummary] = useState('');

  const isCinematic = screen === 'intro' || screen === 'result';

  const startQuiz = () => {
    const selected = shuffle(QUESTIONS).slice(0, 5);
    const formatted = selected.map(q => {
      const order = shuffle([0, 1, 2, 3]);
      return {
        text: q.t,
        opts: order.map(idx => ({ text: q.o[idx], originalIndex: idx }))
      };
    });
    setQuizQuestions(formatted);
    setScreen('quiz');
  };

  const handleQuizComplete = (answers: Record<number, number>) => {
    const counts = [0, 0, 0, 0];
    let answerSum = 0;
    
    for (let i = 0; i < 5; i++) {
      const selectedOptIndex = answers[i];
      const originalIndex = quizQuestions[i].opts[selectedOptIndex].originalIndex;
      counts[originalIndex]++;
      answerSum += originalIndex; // Use the sum of original indices to add variety
    }
    
    let best = 0;
    for (let j = 1; j < 4; j++) {
      if (counts[j] > counts[best]) best = j;
    }
    
    const pool = (ARCHETYPES as any)[parent as string]?.[gender as string] || ARCHETYPES.dad.male;
    const baseResult = pool[best] || pool[0];
    
    // Select a specific film from the archetype's pool based on the user's specific answer combination
    const selectedFilmIndex = answerSum % baseResult.films.length;
    const result = {
      ...baseResult,
      film: baseResult.films[selectedFilmIndex]
    };
    
    setResultArchetype(result);
    
    const summary = quizQuestions.map((q, i) => `Q: ${q.text} A: ${q.opts[answers[i]].text}`).join('; ');
    setAnswersSummary(summary);
    
    setScreen('result');
  };

  const restart = () => {
    setGender(null);
    setParent(null);
    setScreen('intro');
  };

  return (
    <div className="min-h-screen bg-[#F2EBE1] text-[#2C221A] font-sans selection:bg-[#D6C7B3] relative overflow-hidden">
      {/* Retro Film Overlays */}
      <div className={`absolute inset-0 bg-noise pointer-events-none z-50 transition-all duration-1000 ${isCinematic ? 'noise-cinematic' : 'noise-standard'}`}></div>
      <div className={`absolute inset-0 vignette pointer-events-none z-40 transition-all duration-1000 ${isCinematic ? 'vignette-cinematic' : 'vignette-standard'}`}></div>
      
      {isCinematic && (
        <>
          <div className="film-scratch"></div>
          <div className="film-scratch-2"></div>
        </>
      )}
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-20">
        <Header />
        <AnimatePresence mode="wait">
          {screen === 'intro' && <IntroScreen key="intro" onNext={() => setScreen('gender')} />}
          {screen === 'gender' && <GenderScreen key="gender" onNext={startQuiz} onBack={() => setScreen('intro')} gender={gender} setGender={setGender} parent={parent} setParent={setParent} />}
          {screen === 'quiz' && <QuizScreen key="quiz" questions={quizQuestions} onComplete={handleQuizComplete} />}
          {screen === 'result' && <ResultScreen key="result" archetype={resultArchetype} gender={gender} parent={parent} answersSummary={answersSummary} onRestart={restart} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
