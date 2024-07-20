import { Montserrat } from "next/font/google";
import "./globals.css";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "800", "900"],
});

export const metadata = {
  title: "Vskins",
  description: "Deja que tu piel hable por vos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
