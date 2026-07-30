import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

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

const themeInitScript = `(function(){
 try{
  var s=localStorage.getItem("theme");
  document.documentElement.dataset.theme=s==="light"?"light":"dark";
 }catch(e){
  document.documentElement.dataset.theme="dark";
 }
})();`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}