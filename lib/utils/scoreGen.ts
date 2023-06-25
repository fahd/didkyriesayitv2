const adjectives = ['a blistering', 'a scorching', 'a mind-numbing', 'a sweltering', 'a blazing', 'a staggering', 'a vitriolic', 'an astonishing'];

const getRandomAdjective = () => {
  return adjectives[Math.floor(Math.random() * adjectives.length)]
}

const scoreMap: {
  [key: number]: {
    rank: string;
    message: string
  }
 } =  {
  0: {
    rank:'😤 Westbrook',
    message:'You kept missing. But you kept shooting. That\'s all that matters.'
  },
  1: {
    rank:'🔫  Ja Morant\'s Pistol',
    message:''
  },
  2: {
    rank:'🐻 Bear Poker',
    message:''
  },
  3: {
    rank:'😲 Doc Rivers',
    message: 'Because sometimes, 3 is just good enough.',
  },
  4: {
    rank:'🎥 Video Coordinator',
    message:'Not bad, but you need to spend more time watching film.'
  },
  5: {
    rank:'🧀 Phoenix Nacho',
    message:'The nachos are stale, the cheese is cold, the hot dog buns are crusty....but a calorie is a calorie.'
  },
  6: {
    rank:'👊 Fist of Draymond',
    message:''
  },
  7: {
    rank:'🧽 Lethal Scrub',
    message:'Not bad - at any given moment you can drop a LETHAL 2 points off the bench.'
  },
  8: {
    rank:'🏀 Playoff P',
    message:''
  },
  9: {
    rank:'👑 King Nephew',
    message:''
  },
  10: {
    rank:'🫡 Play-In Champion',
    message:''
  },
 }

export const scoreGame = (score:number):{rank:string, message:string, adjective: string} => {
  const scorePercent: number = Math.floor(score * 10);
  const scoreDetails: { rank: string, message:string} = scoreMap[scorePercent];
  return { ...scoreDetails, adjective: getRandomAdjective() }
 }