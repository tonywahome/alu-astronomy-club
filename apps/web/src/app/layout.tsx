import { ReactNode } from "react";
import "@/globals.css";

export const metadata = {
  title: "ALU Astronomy Club",
  description: "Explore the Universe, Staying Curious",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
