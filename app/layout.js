import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SessionWrapper from "../components/SessionWrapper";
import InteractiveCursorProvider from "../components/InteractiveCursorProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me A Chai - Where Creator Communities Thrive",
  description: "A creator-first crowdfunding platform. Get funded by your fans and supporters through direct micro-donations.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/tea.gif', type: 'image/gif' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-rose-500/20 selection:text-rose-400 bg-[#0c0c0f] text-neutral-100`}>
        <SessionWrapper>
          <InteractiveCursorProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </InteractiveCursorProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
