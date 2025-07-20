import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Root layout component for the JSDoc vs TypeScript Debate Platform
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 * @author NightShift101
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="description" content="AI-powered debate platform exploring JSDoc comments vs TypeScript annotations. Generate compelling arguments for both sides of the eternal developer debate." />
        <meta name="keywords" content="JSDoc, TypeScript, JavaScript, AI, Debate, GitHub Models, Developer Tools, Code Documentation" />
        <meta name="author" content="NightShift101" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JSDoc vs TypeScript Debate Platform" />
        <meta property="og:description" content="AI-powered platform for the eternal developer debate: JSDoc comments or TypeScript annotations?" />
        <meta property="og:site_name" content="JSDoc vs TypeScript Debate Platform" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JSDoc vs TypeScript Debate Platform" />
        <meta name="twitter:description" content="AI-powered platform for the eternal developer debate: JSDoc comments or TypeScript annotations?" />
        
        <title>JSDoc vs TypeScript Debate Platform</title>
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

/**
 * Metadata configuration for the app
 */
export const metadata = {
  title: {
    default: 'JSDoc vs TypeScript Debate Platform',
    template: '%s | JSDoc vs TypeScript Debate'
  },
  description: 'AI-powered debate platform exploring the eternal developer question: JSDoc comments vs TypeScript annotations? Generate compelling arguments for both sides.',
  keywords: ['JSDoc', 'TypeScript', 'JavaScript', 'AI', 'Debate', 'GitHub Models', 'Developer Tools', 'Code Documentation', 'Programming', 'Software Development'],
  authors: [{ name: 'NightShift101' }],
  creator: 'NightShift101',
  publisher: 'JSDoc vs TypeScript Debate Platform',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://night-shift101.github.io/GitHub-Models',
    siteName: 'JSDoc vs TypeScript Debate Platform',
    title: 'JSDoc vs TypeScript Debate Platform',
    description: 'AI-powered platform for the eternal developer debate: JSDoc comments or TypeScript annotations?',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSDoc vs TypeScript Debate Platform',
    description: 'AI-powered platform for the eternal developer debate: JSDoc comments or TypeScript annotations?',
  },
};
