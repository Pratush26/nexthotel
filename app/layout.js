import { Geist, Geist_Mono, Yatra_One, Underdog, Poppins, Protest_Revolution, Protest_Riot} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/LeinsScroll";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yatraOne = Yatra_One({
  variable: "--font-yatra-one",
  subsets: ["latin"],
  weight: "400",
});

const underdog = Underdog({
  variable: "--font-underdog",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

const protestRevolution = Protest_Revolution({
  variable: "--font-protest-revolution",
  subsets: ["latin"],
  weight: "400",
});

const protestRiot = Protest_Riot({
  variable: "--font-protest-riot",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Next Hotel",
  keywords: "hotel, nextjs, booking, travel, hospitality",
  description: "This is a Next.js hotel booking website template.",
  icons: {
    icon: "/hotel.svg",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yatraOne.variable} ${underdog.variable} ${poppins.variable} ${protestRevolution.variable} ${protestRiot.variable}   antialiased`}
      >
        <Navbar />
        <SmoothScroll>
        {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
