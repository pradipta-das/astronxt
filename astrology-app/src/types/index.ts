export interface UserData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export interface AstrologyReport {
  id: string;
  userData: UserData;
  sunSign: string;
  moonSign: string;
  ascendant: string;
  personalityTraits: string[];
  strengths: string[];
  challenges: string[];
  careerInsights: string;
  relationshipInsights: string;
  healthInsights: string;
  luckyNumbers: number[];
  luckyColors: string[];
  compatibleSigns: string[];
  generatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}