import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Root layout component for the Next.js app
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 * @author Your Name
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="description" content="A modern Next.js website template with Tailwind CSS and industry-standard practices" />
        <meta name="keywords" content="Next.js, React, Tailwind CSS, Web Development, Template" />
        <meta name="author" content="Your Name" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next.js Template" />
        <meta property="og:description" content="A modern Next.js website template with Tailwind CSS" />
        <meta property="og:site_name" content="Next.js Template" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js Template" />
        <meta name="twitter:description" content="A modern Next.js website template with Tailwind CSS" />
        
        <title>Next.js Template</title>
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
    default: 'Next.js Template',
    template: '%s | Next.js Template'
  },
  description: 'A modern Next.js website template with Tailwind CSS and industry-standard practices',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Web Development', 'Template'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
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
};
