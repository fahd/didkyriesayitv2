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
    rank:'The Westbrook 😤',
    message:'You kept missing. But you kept shooting. That\'s all that matters.'
  },
  1: {
    rank:'Ja Morant\'s Gun 🔫 ',
    message:'You went off! Unfortunately, not in a good way. Just like the NBA, there are really no suspensions here. Try again. '
  },
  2: {
    rank:'The Bear Poker 🐻 ',
    message:'In your quest for victory, you managed to back up just how dominant of a player you really are.'
  },
  3: {
    rank:'Doc Rivers 😦',
    message: 'Because sometimes, 3 is just good enough.',
  },
  4: {
    rank:'Video Coordinator 🎥',
    message:'You need to spend more time watching film. Luckily, you are already inside all day, which is half the battle. Get to work.'
  },
  5: {
    rank:'Phoenix Nachos 🧀',
    message:'The nachos are stale, the cheese is cold....but a calorie is a calorie. It\'s better than nothing.'
  },
  6: {
    rank:'Fist of Draymond 👊',
    message:'I\'ll admit, your performance was mediocre - but you more than made up for it in your reckless flailing around. Nice job - we\'ll get your contract extension ready.'
  },
  7: {
    rank:'Lethal Scrub 🧽',
    message:'Never underestimate a player who can drop a LETHAL 1 point off the bench at any given moment.'
  },
  8: {
    rank:'Playoff 🅿',
    message:'No OT tonight (because your shot hit the side of the backboard).'
  },
  9: {
    rank:'Play-In Champion 🥈',
    message:'Never doubt the heart of the runner-up - you took the trophy before the playoffs even started. Well-deserved run.'
  },
  10: {
    rank:'The Nephew Shepherd 👑',
    message:"You transcended the corporeal realm and vaulted into the nexus of existence. You are forever attuned to the symphony of infinite enlightenment. This is the end - the omega. You did it."
  },
 }

export const scoreGame = (score:number):{rank:string, message:string, adjective: string} => {
  const scorePercent: number = Math.floor(score * 10);
  const scoreDetails: { rank: string, message:string} = scoreMap[scorePercent];
  return { ...scoreDetails, adjective: getRandomAdjective() }
 }