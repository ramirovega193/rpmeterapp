import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RPMeter",
  description: "Software de adquisición y procesamiento de datos",
};

export default function RootLayout({ children }) {

  return (
    
    <html lang="es">
      <body className={inter.className }>{children}</body>
    </html>
  );
}
