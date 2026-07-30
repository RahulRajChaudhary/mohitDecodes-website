import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ThemeScript from "@/components/layout/ThemeScript"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mohit Decodes",
  description: "Mohit Decodes - Learn Industry Standard Tech Stacks and Tools",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeScript />
        <ThemeProvider>
          <Navbar />
          <div className="flex-1" >
          {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}