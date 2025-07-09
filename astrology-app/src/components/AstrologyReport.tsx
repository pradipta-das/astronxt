'use client';

import { AstrologyReport } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { generateAstrologyPDF } from '@/utils/pdfGenerator';

interface AstrologyReportProps {
  report: AstrologyReport;
  onLoginRequired: () => void;
}

export default function AstrologyReportDisplay({ report, onLoginRequired }: AstrologyReportProps) {
  const { user } = useAuth();

  const handleDownload = () => {
    if (!user) {
      onLoginRequired();
      return;
    }
    generateAstrologyPDF(report);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Astrology Report for {report.userData.name}
        </h1>
        <p className="text-gray-600">
          Generated on {new Date(report.generatedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Date of Birth:</span> {report.userData.dateOfBirth}</p>
            <p><span className="font-medium">Time of Birth:</span> {report.userData.timeOfBirth}</p>
            <p><span className="font-medium">Place of Birth:</span> {report.userData.placeOfBirth}</p>
          </div>
        </div>

        {/* Zodiac Signs */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Zodiac Signs</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Sun Sign:</span> {report.sunSign}</p>
            <p><span className="font-medium">Moon Sign:</span> {report.moonSign}</p>
            <p><span className="font-medium">Ascendant:</span> {report.ascendant}</p>
          </div>
        </div>
      </div>

      {/* Personality Traits */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Personality Traits</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {report.personalityTraits.map((trait, index) => (
            <div key={index} className="bg-blue-100 rounded-full px-3 py-1 text-sm text-blue-800">
              {trait}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Content - Limited for non-logged-in users */}
      {!user && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-yellow-800">Preview Mode</h3>
          </div>
          <p className="text-yellow-700">
            This is a preview of your astrology report. Login to access the full report with detailed insights, lucky numbers, compatible signs, and download the PDF.
          </p>
        </div>
      )}

      {/* Full Content - Only for logged-in users */}
      {user && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Strengths */}
            <div className="bg-green-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Strengths</h2>
              <ul className="space-y-2">
                {report.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-800">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="bg-orange-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Areas for Growth</h2>
              <ul className="space-y-2">
                {report.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-orange-800">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Insights */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Insights</h3>
              <p className="text-indigo-800">{report.careerInsights}</p>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Relationship Insights</h3>
              <p className="text-pink-800">{report.relationshipInsights}</p>
            </div>

            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Insights</h3>
              <p className="text-teal-800">{report.healthInsights}</p>
            </div>
          </div>

          {/* Lucky Numbers and Colors */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lucky Numbers</h3>
              <div className="flex space-x-2">
                {report.luckyNumbers.map((number, index) => (
                  <div key={index} className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-semibold">
                    {number}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lucky Colors</h3>
              <div className="flex space-x-2">
                {report.luckyColors.map((color, index) => (
                  <div key={index} className="px-3 py-1 bg-red-200 rounded-full text-red-800 text-sm">
                    {color}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Compatible Signs</h3>
              <div className="flex flex-wrap gap-2">
                {report.compatibleSigns.map((sign, index) => (
                  <div key={index} className="px-3 py-1 bg-purple-200 rounded-full text-purple-800 text-sm">
                    {sign}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Download Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleDownload}
          className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center justify-center mx-auto"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {user ? 'Download PDF Report' : 'Login to Download PDF'}
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        <p>This report is for entertainment purposes only and should not be used for making important life decisions.</p>
      </div>
    </div>
  );
}