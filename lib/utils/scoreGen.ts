const scoreMap: {
  [key: number]: {
    rank: string;
    message: string
  }
 } =  {
  0: {
    rank:'Healthy, Normal Functioning Person',
    message:''
  },
  1: {
    rank:'🔫  Ja Morant\'s Pistol',
    message:''
  },
  2: {
    rank:'🐻 The Bear Poker',
    message:''
  },
  3: {
    rank:'😲 Doc Rivers',
    message:'Because sometimes, 3 is just good enough.'
  },
  4: {
    rank:'🎥 Video Coordinator',
    message:'Not bad, but you need to spend more time watching film.'
  },
  5: {
    rank:'🧀 Phoenix Nacho',
    message:'The nachos are stale, the cheese is cold, the hot dog buns are crusty....but they still work.'
  },
  6: {
    rank:'👊 Fist of Draymond',
    message:''
  },
  7: {
    rank:'🧽 Lethal Scrub',
    message:'Not bad - at any given moment you can drop a LETHAL 2 points and 0 '
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
    rank:'😤 Play-In Champion',
    message:''
  },
 }

export const scoreGame = (score:number):{rank:string, message:string} => {
  const scorePercent: number = Math.floor(score * 10);
  const scoreDetails: { rank: string, message:string} = scoreMap[scorePercent];
  return scoreDetails;
 }