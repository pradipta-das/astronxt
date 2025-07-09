import { NextRequest, NextResponse } from 'next/server';
import { generateAstrologyReport } from '@/utils/astrology';
import { UserData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const userData: UserData = await request.json();

    // Validate required fields
    if (!userData.name || !userData.dateOfBirth || !userData.timeOfBirth || !userData.placeOfBirth) {
      return NextResponse.json(
        { error: 'All fields are required: name, dateOfBirth, timeOfBirth, placeOfBirth' },
        { status: 400 }
      );
    }

    // Generate the astrology report
    const report = generateAstrologyReport(userData);

    return NextResponse.json(report);
  } catch (error) {
    console.error('Astrology report generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}