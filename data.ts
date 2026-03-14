export const QUESTIONS = [
  { t: 'How do you usually communicate?', o: ['Video calls, they often initiate', 'Texting about work or grades', 'Chat about anything, like friends', 'Only on holidays, a bit distant'] },
  { t: 'Who usually initiates the conversation?', o: ['Me, they wait for me to report safety', 'Them, often asking about achievements', 'About equal, very natural', 'Neither talks much, but we understand'] },
  { t: 'What are your daily conversations usually about?', o: ['My safety and daily life', 'My progress and success', 'Anything, no limits', 'Trivial things, rarely deep talks'] },
  { t: 'When you have troubles, what do you do?', o: ['Tell them, they will worry for me', 'Usually don\'t say, afraid to disappoint', 'Share directly, they are my listeners', 'Digest it myself, they might not understand'] },
  { t: 'What\'s the atmosphere during video calls?', o: ['They repeatedly remind me of things, I listen', 'They ask about my recent status and work', 'Relaxed and casual, like chatting with friends', 'A bit silent, don\'t know what to say'] },
  { t: 'Their attitude towards you changing jobs or moving?', o: ['Worried about safety, tell you to think twice', 'Try to persuade you to stay for "stability"', 'Supportive, as long as you are happy', 'Rarely ask, or don\'t even know'] },
  { t: 'Do they know about your romantic relationships?', o: ['Yes, very concerned about their background', 'Dare not say, afraid they will object', 'They met early on, great relationship', 'They don\'t ask, I don\'t tell'] },
  { t: 'Their attitude towards your career planning?', o: ['As long as it\'s safe and stable', 'Hope you take the path they think is right', 'Fully support your own choices', 'They don\'t really know what you do'] },
  { t: 'When your choice contradicts their wishes?', o: ['They accept, but worry for a long time', 'Argue, then compromise or reluctantly accept', 'They respect it, though sometimes worry', 'Fades away, neither mentions it again'] },
  { t: 'Your most common way of spending time together?', o: ['Eating together, they keep taking care of you', 'Long talks or arguments about your future', 'Doing whatever, can do anything together', 'Independent, occasionally contacting'] }
];

export const ARCHETYPES = {
  mom: {
    male: [
      { 
        title: 'Mother & Son - Protection & Letting Go', 
        traits: ['Overprotective', 'Deeply Caring', 'Learning to Let Go'], 
        desc: 'She wants to shield you from all the risks in the world, but is slowly learning: love sometimes means letting go.', 
        films: [
          { en: 'Finding Nemo', year: '2003', rating: '8.2', genre: 'Animation', cast: [{ name: 'Albert Brooks', role: 'Marlin' }, { name: 'Ellen DeGeneres', role: 'Dory' }] },
          { en: 'Boyhood', year: '2014', rating: '7.9', genre: 'Drama', cast: [{ name: 'Patricia Arquette', role: 'Olivia' }, { name: 'Ellar Coltrane', role: 'Mason' }] },
          { en: 'Forrest Gump', year: '1994', rating: '8.8', genre: 'Drama', cast: [{ name: 'Sally Field', role: 'Mrs. Gump' }, { name: 'Tom Hanks', role: 'Forrest' }] }
        ] 
      },
      { 
        title: 'Mother & Son - Expectations & Pressure', 
        traits: ['High Expectations', 'Suppressed Emotions', 'Craving Approval'], 
        desc: 'She has high hopes for you. Those expectations are sometimes wings, sometimes shackles. What you crave is just a "you\'re doing great".', 
        films: [
          { en: 'The Fighter', year: '2010', rating: '7.8', genre: 'Drama', cast: [{ name: 'Melissa Leo', role: 'Alice Ward' }, { name: 'Mark Wahlberg', role: 'Micky Ward' }] },
          { en: 'Silver Linings Playbook', year: '2012', rating: '7.7', genre: 'Comedy · Drama', cast: [{ name: 'Jacki Weaver', role: 'Dolores' }, { name: 'Bradley Cooper', role: 'Pat' }] },
          { en: 'The Guilt Trip', year: '2012', rating: '5.7', genre: 'Comedy', cast: [{ name: 'Barbra Streisand', role: 'Joyce' }, { name: 'Seth Rogen', role: 'Andy' }] }
        ] 
      },
      { 
        title: 'Mother & Son - Like Friends', 
        traits: ['Relaxed', 'Mutual Understanding', 'Warm & Humorous'], 
        desc: 'She is your mom, but also a friend you\'re willing to share everything with. This bond is light and warm.', 
        films: [
          { en: 'The Blind Side', year: '2009', rating: '7.6', genre: 'Drama', cast: [{ name: 'Sandra Bullock', role: 'Leigh Anne' }, { name: 'Quinton Aaron', role: 'Michael' }] },
          { en: 'Schitt\'s Creek', isTV: true, year: '2015', rating: '8.5', genre: 'Comedy', cast: [{ name: 'Catherine O\'Hara', role: 'Moira' }, { name: 'Dan Levy', role: 'David' }] },
          { en: 'Almost Famous', year: '2000', rating: '7.9', genre: 'Drama', cast: [{ name: 'Frances McDormand', role: 'Elaine' }, { name: 'Patrick Fugit', role: 'William' }] }
        ] 
      },
      { 
        title: 'Mother & Son - Impact of Absence', 
        traits: ['Psychological Distance', 'Inner Strength', 'Spiritual Inheritance'], 
        desc: 'She might not have always been by your side, but her shadow never faded. Many of your choices are conversations with her memory.', 
        films: [
          { en: 'Catch Me If You Can', year: '2002', rating: '8.1', genre: 'Crime · Drama', cast: [{ name: 'Nathalie Baye', role: 'Paula' }, { name: 'Leonardo DiCaprio', role: 'Frank' }] },
          { en: 'Moonlight', year: '2016', rating: '7.4', genre: 'Drama', cast: [{ name: 'Naomie Harris', role: 'Paula' }, { name: 'Ashton Sanders', role: 'Chiron' }] },
          { en: 'The Sixth Sense', year: '1999', rating: '8.2', genre: 'Thriller', cast: [{ name: 'Toni Collette', role: 'Lynn' }, { name: 'Haley Joel Osment', role: 'Cole' }] }
        ] 
      }
    ],
    female: [
      { 
        title: 'Mother & Daughter - Protection & Growth', 
        traits: ['Overprotective', 'Deeply Caring', 'Learning Independence'], 
        desc: 'She wants to block all the storms for you, but you need to walk through the rain to truly grow up.', 
        films: [
          { en: 'Brave', year: '2012', rating: '7.1', genre: 'Animation', cast: [{ name: 'Emma Thompson', role: 'Elinor' }, { name: 'Kelly Macdonald', role: 'Merida' }] },
          { en: 'Everything Everywhere All at Once', year: '2022', rating: '7.8', genre: 'Sci-Fi · Action', cast: [{ name: 'Michelle Yeoh', role: 'Evelyn' }, { name: 'Stephanie Hsu', role: 'Joy' }] },
          { en: 'Turning Red', year: '2022', rating: '7.0', genre: 'Animation', cast: [{ name: 'Sandra Oh', role: 'Ming' }, { name: 'Rosalie Chiang', role: 'Mei' }] }
        ] 
      },
      { 
        title: 'Mother & Daughter - Tense but Deeply Loving', 
        traits: ['Argumentative', 'Extremely Close', 'Inseparable'], 
        desc: 'You argue the fiercest, but can\'t leave each other. Those arguments are actually the collision of two similar souls.', 
        films: [
          { en: 'Gilmore Girls', isTV: true, year: '2000', rating: '8.2', genre: 'Drama · Comedy', cast: [{ name: 'Lauren Graham', role: 'Lorelai' }, { name: 'Alexis Bledel', role: 'Rory' }] },
          { en: 'Freaky Friday', year: '2003', rating: '6.3', genre: 'Comedy', cast: [{ name: 'Jamie Lee Curtis', role: 'Tess' }, { name: 'Lindsay Lohan', role: 'Anna' }] },
          { en: 'Little Women', year: '2019', rating: '7.8', genre: 'Drama', cast: [{ name: 'Laura Dern', role: 'Marmee' }, { name: 'Saoirse Ronan', role: 'Jo' }] }
        ] 
      },
      { 
        title: 'Mother & Daughter - Control & Rebellion', 
        traits: ['High Expectations', 'Fierce Conflicts', 'Eventual Reconciliation'], 
        desc: 'Every criticism hides unspoken love. You traded rebellion for your true self.', 
        films: [
          { en: 'Lady Bird', year: '2017', rating: '7.4', genre: 'Drama · Comedy', cast: [{ name: 'Laurie Metcalf', role: 'Marion' }, { name: 'Saoirse Ronan', role: 'Lady Bird' }] },
          { en: 'Black Swan', year: '2010', rating: '8.0', genre: 'Thriller', cast: [{ name: 'Barbara Hershey', role: 'Erica' }, { name: 'Natalie Portman', role: 'Nina' }] },
          { en: 'I, Tonya', year: '2017', rating: '7.5', genre: 'Biography', cast: [{ name: 'Allison Janney', role: 'LaVona' }, { name: 'Margot Robbie', role: 'Tonya' }] }
        ] 
      },
      { 
        title: 'Mother & Daughter - Complex & Unspoken', 
        traits: ['Psychological Distance', 'Suppressed Emotions', 'Complex & Deep'], 
        desc: 'Some love is too heavy to articulate. In the silence between you, there are too many unresolved thoughts.', 
        films: [
          { en: 'Wild', year: '2014', rating: '7.1', genre: 'Biography', cast: [{ name: 'Laura Dern', role: 'Bobbi' }, { name: 'Reese Witherspoon', role: 'Cheryl' }] },
          { en: 'The Joy Luck Club', year: '1993', rating: '7.7', genre: 'Drama', cast: [{ name: 'Tsai Chin', role: 'Lindo' }, { name: 'Rosalind Chao', role: 'Rose' }] },
          { en: 'August: Osage County', year: '2013', rating: '7.2', genre: 'Drama', cast: [{ name: 'Meryl Streep', role: 'Violet' }, { name: 'Julia Roberts', role: 'Barbara' }] }
        ] 
      }
    ]
  },
  dad: {
    male: [
      { 
        title: 'Father & Son - Silent Companionship', 
        traits: ['Sense of Distance', 'Silent Guardian', 'Deep Love'], 
        desc: 'He doesn\'t say it, but he\'s always there. In that silence hides a protection deeper than any words.', 
        films: [
          { en: 'The Pursuit of Happyness', year: '2006', rating: '8.0', genre: 'Biography', cast: [{ name: 'Will Smith', role: 'Chris' }, { name: 'Jaden Smith', role: 'Christopher' }] },
          { en: 'A Quiet Place', year: '2018', rating: '7.5', genre: 'Horror · Sci-Fi', cast: [{ name: 'John Krasinski', role: 'Lee' }, { name: 'Noah Jupe', role: 'Marcus' }] },
          { en: 'Road to Perdition', year: '2002', rating: '7.7', genre: 'Crime · Drama', cast: [{ name: 'Tom Hanks', role: 'Michael' }, { name: 'Tyler Hoechlin', role: 'Michael Jr.' }] }
        ] 
      },
      { 
        title: 'Father & Son - Push & Pressure', 
        traits: ['High Expectations', 'Suppressed Emotions', 'Craving Approval'], 
        desc: 'His expectations are high, sometimes suffocating. But deep down, you just crave his "you did well".', 
        films: [
          { en: 'Dead Poets Society', year: '1989', rating: '8.1', genre: 'Drama', cast: [{ name: 'Kurtwood Smith', role: 'Mr. Perry' }, { name: 'Robert Sean Leonard', role: 'Neil' }] },
          { en: 'Fences', year: '2016', rating: '7.2', genre: 'Drama', cast: [{ name: 'Denzel Washington', role: 'Troy' }, { name: 'Jovan Adepo', role: 'Cory' }] },
          { en: 'The Judge', year: '2014', rating: '7.4', genre: 'Drama', cast: [{ name: 'Robert Duvall', role: 'Joseph' }, { name: 'Robert Downey Jr.', role: 'Hank' }] }
        ] 
      },
      { 
        title: 'Father & Son - Like Friends & Mentors', 
        traits: ['Warm & Humorous', 'Gentle Reluctance', 'Friend & Mentor'], 
        desc: 'He is your dad, and also the friend willing to talk nonsense with you.', 
        films: [
          { en: 'Big Fish', year: '2003', rating: '8.0', genre: 'Fantasy · Drama', cast: [{ name: 'Albert Finney', role: 'Edward' }, { name: 'Billy Crudup', role: 'Will' }] },
          { en: 'Chef', year: '2014', rating: '7.3', genre: 'Comedy', cast: [{ name: 'Jon Favreau', role: 'Carl' }, { name: 'Emjay Anthony', role: 'Percy' }] },
          { en: 'About Time', year: '2013', rating: '7.8', genre: 'Romance · Drama', cast: [{ name: 'Bill Nighy', role: 'James' }, { name: 'Domhnall Gleeson', role: 'Tim' }] }
        ] 
      },
      { 
        title: 'Father & Son - Absence & Reconciliation', 
        traits: ['Spiritual Inheritance', 'Loss & Growth', 'Inner Strength'], 
        desc: 'He might not be around often, but his shadow never left. Every time you grow, it\'s a dialogue with his spirit.', 
        films: [
          { en: 'The Lion King', year: '1994', rating: '8.5', genre: 'Animation', cast: [{ name: 'James Earl Jones', role: 'Mufasa' }, { name: 'Matthew Broderick', role: 'Simba' }] },
          { en: 'Star Wars: Episode V - The Empire Strikes Back', year: '1980', rating: '8.7', genre: 'Sci-Fi', cast: [{ name: 'David Prowse', role: 'Darth Vader' }, { name: 'Mark Hamill', role: 'Luke Skywalker' }] },
          { en: 'Ad Astra', year: '2019', rating: '6.5', genre: 'Sci-Fi', cast: [{ name: 'Tommy Lee Jones', role: 'Clifford' }, { name: 'Brad Pitt', role: 'Roy' }] }
        ] 
      }
    ],
    female: [
      { 
        title: 'Father & Daughter - Silent Guardian', 
        traits: ['Sense of Distance', 'Deep Love', 'Silent Sacrifice'], 
        desc: 'He doesn\'t say it, but all his choices are for you. That love crosses time and the distance between you.', 
        films: [
          { en: 'Interstellar', year: '2014', rating: '8.7', genre: 'Sci-Fi · Drama', cast: [{ name: 'Matthew McConaughey', role: 'Cooper' }, { name: 'Jessica Chastain', role: 'Murph' }] },
          { en: 'Taken', year: '2008', rating: '7.8', genre: 'Action', cast: [{ name: 'Liam Neeson', role: 'Bryan' }, { name: 'Maggie Grace', role: 'Kim' }] },
          { en: 'Leave No Trace', year: '2018', rating: '7.1', genre: 'Drama', cast: [{ name: 'Ben Foster', role: 'Will' }, { name: 'Thomasin McKenzie', role: 'Tom' }] }
        ] 
      },
      { 
        title: 'Father & Daughter - Expectations & Approval', 
        traits: ['High Expectations', 'Striving to Prove', 'Craving to be Seen'], 
        desc: 'You\'ve always tried to make him proud. Sometimes you want to ask: do you see me, not just my achievements?', 
        films: [
          { en: 'King Richard', year: '2021', rating: '7.5', genre: 'Biography', cast: [{ name: 'Will Smith', role: 'Richard' }, { name: 'Saniyya Sidney', role: 'Venus' }] },
          { en: 'Succession', isTV: true, year: '2018', rating: '8.9', genre: 'Drama', cast: [{ name: 'Brian Cox', role: 'Logan' }, { name: 'Sarah Snook', role: 'Shiv' }] },
          { en: 'Million Dollar Baby', year: '2004', rating: '8.1', genre: 'Drama', cast: [{ name: 'Clint Eastwood', role: 'Frankie' }, { name: 'Hilary Swank', role: 'Maggie' }] }
        ] 
      },
      { 
        title: 'Father & Daughter - Relaxed like Friends', 
        traits: ['Warm & Humorous', 'Gentle Reluctance', 'Friend & Mentor'], 
        desc: 'He covers his reluctance with jokes, filling every moment with humor. This bond is as warm as a comedy.', 
        films: [
          { en: 'Father of the Bride', year: '1991', rating: '6.8', genre: 'Comedy', cast: [{ name: 'Steve Martin', role: 'George' }, { name: 'Kimberly Williams-Paisley', role: 'Annie' }] },
          { en: 'Eighth Grade', year: '2018', rating: '7.4', genre: 'Comedy · Drama', cast: [{ name: 'Josh Hamilton', role: 'Mark' }, { name: 'Elsie Fisher', role: 'Kayla' }] },
          { en: 'Hearts Beat Loud', year: '2018', rating: '6.9', genre: 'Music · Drama', cast: [{ name: 'Nick Offerman', role: 'Frank' }, { name: 'Kiersey Clemons', role: 'Sam' }] }
        ] 
      },
      { 
        title: 'Father & Daughter - Far and Near', 
        traits: ['Psychological Distance', 'Complex Emotions', 'Craving Closeness'], 
        desc: 'He might not be good at expressing it, but you know he loves you. What\'s left unsaid is more than what\'s spoken.', 
        films: [
          { en: 'Contact', year: '1997', rating: '7.5', genre: 'Sci-Fi · Drama', cast: [{ name: 'David Morse', role: 'Ted' }, { name: 'Jodie Foster', role: 'Ellie' }] },
          { en: 'The Descendants', year: '2011', rating: '7.3', genre: 'Drama', cast: [{ name: 'George Clooney', role: 'Matt' }, { name: 'Shailene Woodley', role: 'Alex' }] },
          { en: 'Paper Moon', year: '1973', rating: '8.1', genre: 'Comedy · Drama', cast: [{ name: 'Ryan O\'Neal', role: 'Moses' }, { name: 'Tatum O\'Neal', role: 'Addie' }] }
        ] 
      }
    ]
  }
};
