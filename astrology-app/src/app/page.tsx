'use client';

import { useState } from 'react';
import { UserData, AstrologyReport } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import AstrologyForm from '@/components/AstrologyForm';
import AstrologyReportDisplay from '@/components/AstrologyReport';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';

export default function Home() {
  const [report, setReport] = useState<AstrologyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isLoading } = useAuth();

  const handleFormSubmit = async (userData: UserData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/astrology/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const generatedReport = await response.json();
        setReport(generatedReport);
      } else {
        console.error('Failed to generate report');
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRequired = () => {
    setShowLogin(true);
  };

  const handleNewReport = () => {
    setReport(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onLoginClick={() => setShowLogin(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {!report ? (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Discover Your Cosmic Story
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get personalized astrology insights based on your birth details. 
                Explore your personality, strengths, and cosmic connections.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Reports</h3>
                <p className="text-gray-600">Get detailed insights tailored to your unique birth chart</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Downloads</h3>
                <p className="text-gray-600">Download your complete report as a beautiful PDF</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Generation</h3>
                <p className="text-gray-600">Receive your astrology report in seconds</p>
              </div>
            </div>

            {/* Form */}
            <AstrologyForm onSubmit={handleFormSubmit} loading={loading} />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <button
                onClick={handleNewReport}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Generate New Report
              </button>
            </div>
            <AstrologyReportDisplay 
              report={report} 
              onLoginRequired={handleLoginRequired}
            />
          </div>
        )}
      </main>

      {/* Authentication Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
