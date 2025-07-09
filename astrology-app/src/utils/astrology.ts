import { UserData, AstrologyReport } from '@/types';
import { format } from 'date-fns';

// Zodiac signs with their date ranges and characteristics
const zodiacSigns = {
  aries: {
    name: 'Aries',
    dates: { start: '03-21', end: '04-19' },
    traits: ['Energetic', 'Confident', 'Independent', 'Leader'],
    element: 'Fire',
    ruler: 'Mars'
  },
  taurus: {
    name: 'Taurus',
    dates: { start: '04-20', end: '05-20' },
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    element: 'Earth',
    ruler: 'Venus'
  },
  gemini: {
    name: 'Gemini',
    dates: { start: '05-21', end: '06-20' },
    traits: ['Adaptable', 'Curious', 'Communicative', 'Witty'],
    element: 'Air',
    ruler: 'Mercury'
  },
  cancer: {
    name: 'Cancer',
    dates: { start: '06-21', end: '07-22' },
    traits: ['Intuitive', 'Emotional', 'Protective', 'Nurturing'],
    element: 'Water',
    ruler: 'Moon'
  },
  leo: {
    name: 'Leo',
    dates: { start: '07-23', end: '08-22' },
    traits: ['Confident', 'Generous', 'Creative', 'Dramatic'],
    element: 'Fire',
    ruler: 'Sun'
  },
  virgo: {
    name: 'Virgo',
    dates: { start: '08-23', end: '09-22' },
    traits: ['Analytical', 'Organized', 'Helpful', 'Perfectionist'],
    element: 'Earth',
    ruler: 'Mercury'
  },
  libra: {
    name: 'Libra',
    dates: { start: '09-23', end: '10-22' },
    traits: ['Diplomatic', 'Balanced', 'Social', 'Harmonious'],
    element: 'Air',
    ruler: 'Venus'
  },
  scorpio: {
    name: 'Scorpio',
    dates: { start: '10-23', end: '11-21' },
    traits: ['Passionate', 'Intense', 'Transformative', 'Mysterious'],
    element: 'Water',
    ruler: 'Pluto'
  },
  sagittarius: {
    name: 'Sagittarius',
    dates: { start: '11-22', end: '12-21' },
    traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Free-spirited'],
    element: 'Fire',
    ruler: 'Jupiter'
  },
  capricorn: {
    name: 'Capricorn',
    dates: { start: '12-22', end: '01-19' },
    traits: ['Ambitious', 'Disciplined', 'Practical', 'Responsible'],
    element: 'Earth',
    ruler: 'Saturn'
  },
  aquarius: {
    name: 'Aquarius',
    dates: { start: '01-20', end: '02-18' },
    traits: ['Independent', 'Innovative', 'Humanitarian', 'Intellectual'],
    element: 'Air',
    ruler: 'Uranus'
  },
  pisces: {
    name: 'Pisces',
    dates: { start: '02-19', end: '03-20' },
    traits: ['Intuitive', 'Compassionate', 'Artistic', 'Dreamy'],
    element: 'Water',
    ruler: 'Neptune'
  }
};

function getSunSign(dateOfBirth: string): string {
  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of Object.values(zodiacSigns)) {
    const startMonth = parseInt(sign.dates.start.split('-')[0]);
    const startDay = parseInt(sign.dates.start.split('-')[1]);
    const endMonth = parseInt(sign.dates.end.split('-')[0]);
    const endDay = parseInt(sign.dates.end.split('-')[1]);

    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return sign.name;
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name;
      }
    }
  }

  return 'Unknown';
}

function getMoonSign(dateOfBirth: string): string {
  // Simplified moon sign calculation (in reality, this would require complex astronomical calculations)
  const signs = Object.values(zodiacSigns).map(s => s.name);
  const hash = dateOfBirth.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return signs[hash % signs.length];
}

function getAscendant(dateOfBirth: string, timeOfBirth: string): string {
  // Simplified ascendant calculation (in reality, this would require time and location)
  const signs = Object.values(zodiacSigns).map(s => s.name);
  const timeHash = timeOfBirth.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const dateHash = dateOfBirth.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return signs[(timeHash + dateHash) % signs.length];
}

function generatePersonalityTraits(sunSign: string): string[] {
  const sign = Object.values(zodiacSigns).find(s => s.name === sunSign);
  return sign ? sign.traits : ['Unique', 'Special', 'Individual'];
}

function generateStrengths(sunSign: string): string[] {
  const strengthsMap: { [key: string]: string[] } = {
    'Aries': ['Natural leadership', 'Courage', 'Determination', 'Energy'],
    'Taurus': ['Reliability', 'Patience', 'Stability', 'Loyalty'],
    'Gemini': ['Communication skills', 'Adaptability', 'Intelligence', 'Versatility'],
    'Cancer': ['Emotional intelligence', 'Nurturing nature', 'Intuition', 'Empathy'],
    'Leo': ['Confidence', 'Creativity', 'Generosity', 'Charisma'],
    'Virgo': ['Attention to detail', 'Organization', 'Analytical thinking', 'Helpfulness'],
    'Libra': ['Diplomatic skills', 'Sense of justice', 'Harmony', 'Social skills'],
    'Scorpio': ['Passion', 'Determination', 'Intuition', 'Transformation'],
    'Sagittarius': ['Optimism', 'Adventure', 'Wisdom', 'Freedom'],
    'Capricorn': ['Ambition', 'Discipline', 'Responsibility', 'Patience'],
    'Aquarius': ['Innovation', 'Independence', 'Humanitarianism', 'Originality'],
    'Pisces': ['Compassion', 'Creativity', 'Intuition', 'Spirituality']
  };
  return strengthsMap[sunSign] || ['Unique strengths'];
}

function generateChallenges(sunSign: string): string[] {
  const challengesMap: { [key: string]: string[] } = {
    'Aries': ['Impatience', 'Impulsiveness', 'Anger', 'Selfishness'],
    'Taurus': ['Stubbornness', 'Materialism', 'Possessiveness', 'Laziness'],
    'Gemini': ['Inconsistency', 'Superficiality', 'Restlessness', 'Indecision'],
    'Cancer': ['Moodiness', 'Oversensitivity', 'Clinginess', 'Pessimism'],
    'Leo': ['Ego', 'Arrogance', 'Stubbornness', 'Attention-seeking'],
    'Virgo': ['Perfectionism', 'Criticism', 'Worry', 'Overcautious'],
    'Libra': ['Indecision', 'Avoidance', 'Superficiality', 'Dependency'],
    'Scorpio': ['Jealousy', 'Secrecy', 'Revenge', 'Obsession'],
    'Sagittarius': ['Tactlessness', 'Impatience', 'Recklessness', 'Overconfidence'],
    'Capricorn': ['Pessimism', 'Rigidity', 'Coldness', 'Workaholic'],
    'Aquarius': ['Detachment', 'Unpredictability', 'Stubbornness', 'Aloofness'],
    'Pisces': ['Escapism', 'Oversensitivity', 'Victim mentality', 'Indecision']
  };
  return challengesMap[sunSign] || ['Growth opportunities'];
}

function generateInsights(sunSign: string, type: 'career' | 'relationship' | 'health'): string {
  const insightsMap: { [key: string]: { [key: string]: string } } = {
    'Aries': {
      career: 'Your natural leadership abilities make you excel in management roles, entrepreneurship, or competitive fields. You thrive in dynamic environments.',
      relationship: 'You bring passion and excitement to relationships. Learn to balance your independence with your partner\'s needs for harmony.',
      health: 'Your high energy levels benefit from regular physical activity. Pay attention to stress management and avoid burnout.'
    },
    'Taurus': {
      career: 'Your practical nature and reliability make you excellent in finance, real estate, or any field requiring patience and persistence.',
      relationship: 'You offer stability and loyalty in relationships. Express your feelings more openly to deepen connections.',
      health: 'Focus on maintaining a balanced diet and regular exercise routine. Your neck and throat areas may need extra attention.'
    },
    // Add more signs as needed...
  };

  return insightsMap[sunSign]?.[type] || `Your ${sunSign} nature brings unique ${type} insights. Trust your instincts and embrace your natural talents.`;
}

export function generateAstrologyReport(userData: UserData): AstrologyReport {
  const sunSign = getSunSign(userData.dateOfBirth);
  const moonSign = getMoonSign(userData.dateOfBirth);
  const ascendant = getAscendant(userData.dateOfBirth, userData.timeOfBirth);

  const report: AstrologyReport = {
    id: Math.random().toString(36).substr(2, 9),
    userData,
    sunSign,
    moonSign,
    ascendant,
    personalityTraits: generatePersonalityTraits(sunSign),
    strengths: generateStrengths(sunSign),
    challenges: generateChallenges(sunSign),
    careerInsights: generateInsights(sunSign, 'career'),
    relationshipInsights: generateInsights(sunSign, 'relationship'),
    healthInsights: generateInsights(sunSign, 'health'),
    luckyNumbers: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
    luckyColors: ['Blue', 'Green', 'Gold'],
    compatibleSigns: Object.values(zodiacSigns).filter(s => s.name !== sunSign).slice(0, 3).map(s => s.name),
    generatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  };

  return report;
}