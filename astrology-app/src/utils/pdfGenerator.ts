import jsPDF from 'jspdf';
import { AstrologyReport } from '@/types';

export function generateAstrologyPDF(report: AstrologyReport): void {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(68, 68, 68);
  doc.text('Astrology Report', 20, 30);
  
  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(102, 102, 102);
  doc.text(`For ${report.userData.name}`, 20, 45);
  
  // Date
  doc.setFontSize(12);
  doc.setTextColor(136, 136, 136);
  doc.text(`Generated on: ${report.generatedAt}`, 20, 55);
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 60, 190, 60);
  
  let yPos = 75;
  
  // Personal Information
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Personal Information', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(`Date of Birth: ${report.userData.dateOfBirth}`, 20, yPos);
  yPos += 8;
  doc.text(`Time of Birth: ${report.userData.timeOfBirth}`, 20, yPos);
  yPos += 8;
  doc.text(`Place of Birth: ${report.userData.placeOfBirth}`, 20, yPos);
  yPos += 15;
  
  // Zodiac Signs
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Zodiac Signs', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(`Sun Sign: ${report.sunSign}`, 20, yPos);
  yPos += 8;
  doc.text(`Moon Sign: ${report.moonSign}`, 20, yPos);
  yPos += 8;
  doc.text(`Ascendant: ${report.ascendant}`, 20, yPos);
  yPos += 15;
  
  // Personality Traits
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Personality Traits', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  report.personalityTraits.forEach((trait) => {
    doc.text(`• ${trait}`, 20, yPos);
    yPos += 8;
  });
  yPos += 8;
  
  // Strengths
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Strengths', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  report.strengths.forEach((strength) => {
    doc.text(`• ${strength}`, 20, yPos);
    yPos += 8;
  });
  yPos += 8;
  
  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage();
    yPos = 30;
  }
  
  // Challenges
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Areas for Growth', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  report.challenges.forEach((challenge) => {
    doc.text(`• ${challenge}`, 20, yPos);
    yPos += 8;
  });
  yPos += 15;
  
  // Career Insights
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Career Insights', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  const careerLines = doc.splitTextToSize(report.careerInsights, 170);
  careerLines.forEach((line: string) => {
    doc.text(line, 20, yPos);
    yPos += 8;
  });
  yPos += 8;
  
  // Relationship Insights
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Relationship Insights', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  const relationshipLines = doc.splitTextToSize(report.relationshipInsights, 170);
  relationshipLines.forEach((line: string) => {
    doc.text(line, 20, yPos);
    yPos += 8;
  });
  yPos += 8;
  
  // Health Insights
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Health Insights', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  const healthLines = doc.splitTextToSize(report.healthInsights, 170);
  healthLines.forEach((line: string) => {
    doc.text(line, 20, yPos);
    yPos += 8;
  });
  yPos += 15;
  
  // Check if we need a new page
  if (yPos > 220) {
    doc.addPage();
    yPos = 30;
  }
  
  // Lucky Numbers
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Lucky Numbers', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(report.luckyNumbers.join(', '), 20, yPos);
  yPos += 15;
  
  // Lucky Colors
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Lucky Colors', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(report.luckyColors.join(', '), 20, yPos);
  yPos += 15;
  
  // Compatible Signs
  doc.setFontSize(16);
  doc.setTextColor(68, 68, 68);
  doc.text('Compatible Signs', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(report.compatibleSigns.join(', '), 20, yPos);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(136, 136, 136);
  doc.text('This report is for entertainment purposes only.', 20, 280);
  
  // Save the PDF
  doc.save(`astrology-report-${report.userData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
}