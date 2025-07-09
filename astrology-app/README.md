# AstroReads - Astrology Report Generator

A modern Next.js application that generates personalized astrology reports based on user birth information. Users can view partial reports without authentication, but must log in to access full reports and PDF downloads.

## Features

### 🔮 Core Features
- **Personalized Astrology Reports**: Generate detailed astrology reports based on birth date, time, and location
- **Partial Preview**: Non-authenticated users can view basic information (personality traits, zodiac signs)
- **Full Report Access**: Authenticated users get complete reports with insights, lucky numbers, and compatibility
- **PDF Downloads**: Logged-in users can download their complete reports as PDF files
- **User Authentication**: Secure login/registration system with JWT tokens

### 📊 Report Contents
- **Personal Information**: Birth details and basic information
- **Zodiac Signs**: Sun sign, moon sign, and ascendant
- **Personality Traits**: Key characteristics based on astrological calculations
- **Strengths & Challenges**: Areas of strength and growth opportunities
- **Detailed Insights**: Career, relationship, and health guidance
- **Lucky Elements**: Lucky numbers, colors, and compatible signs

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Progressive Access**: Partial content for visitors, full access for users
- **Instant Generation**: Real-time report generation
- **Mobile Responsive**: Works seamlessly on all devices

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with bcrypt password hashing
- **PDF Generation**: jsPDF for downloadable reports
- **Database**: Mock in-memory storage (can be replaced with real database)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd astrology-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Visitors (Non-authenticated)
1. Fill in the astrology form with your birth details
2. View the partial report with basic information
3. Click "Login to Download PDF" to access full features

### For Registered Users
1. Register for an account or log in with existing credentials
2. Fill in the astrology form with your birth details
3. View the complete report with all insights
4. Download the PDF report for offline access

### Demo Credentials
- **Username**: demo
- **Password**: password

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### Astrology
- `POST /api/astrology/generate` - Generate astrology report

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── verify/route.ts
│   │   └── astrology/
│   │       └── generate/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── AstrologyForm.tsx
│   ├── AstrologyReport.tsx
│   └── Header.tsx
├── context/
│   └── AuthContext.tsx
├── types/
│   └── index.ts
└── utils/
    ├── astrology.ts
    └── pdfGenerator.ts
```

## Key Components

### AuthContext
Manages authentication state throughout the application using React Context API.

### AstrologyForm
Collects user birth information (name, date, time, and place of birth).

### AstrologyReport
Displays the generated report with conditional content based on authentication status.

### Authentication Components
Login and Register modals with form validation and error handling.

### PDF Generator
Generates downloadable PDF reports using jsPDF library.

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Input Validation**: Server-side validation for all form inputs
- **CORS Protection**: Built-in Next.js security features

## Customization

### Adding New Zodiac Insights
Edit `src/utils/astrology.ts` to add more detailed insights for each zodiac sign.

### Styling
Modify Tailwind classes in components or extend the theme in `tailwind.config.js`.

### Database Integration
Replace the mock user array in API routes with your preferred database solution.

## Future Enhancements

- **Real Database**: Integration with PostgreSQL, MongoDB, or other databases
- **Email Verification**: Email-based user verification system
- **Advanced Calculations**: More sophisticated astrological calculations
- **Social Features**: Share reports with friends and family
- **Payment Integration**: Premium reports with advanced features
- **Multilingual Support**: Support for multiple languages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational and entertainment purposes only. Astrological readings should not be used for making important life decisions.

## Support

For issues and questions, please open an issue in the repository or contact the development team.
