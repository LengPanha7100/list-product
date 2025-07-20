import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "បញ្ជីទំនិញ - Product List Manager",
  description: "ប្រព័ន្ធគ្រប់គ្រងទំនិញ និងស្តុកទំនិញ - Modern product inventory management system",
  keywords: ["product", "inventory", "management", "cambodia", "khmer", "business"],
  authors: [{ name: "KOSIGN" }],
  creator: "KOSIGN",
  publisher: "KOSIGN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  colorScheme: "light",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "បញ្ជីទំនិញ",
  },
  applicationName: "បញ្ជីទំនិញ",
  category: "business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <head>
        {/* Enhanced viewport to prevent zoom */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="បញ្ជីទំនិញ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="បញ្ជីទំនិញ" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Splash Screens for iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Prevent zoom on input focus */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent zoom on iOS when focusing inputs */
            @media screen and (max-width: 768px) {
              input[type="text"],
              input[type="number"],
              input[type="email"],
              input[type="password"],
              input[type="search"],
              input[type="tel"],
              input[type="url"],
              select,
              textarea {
                font-size: 16px !important;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
              }
              
              /* Prevent zoom on form submission */
              input:focus,
              select:focus,
              textarea:focus {
                -webkit-transform: scale(1) !important;
                transform: scale(1) !important;
              }
            }
            
            /* Disable touch callouts and selection */
            * {
              -webkit-touch-callout: none;
              -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            
            /* Fix for iOS Safari zoom */
            html {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
