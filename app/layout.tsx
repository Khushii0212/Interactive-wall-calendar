import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar — Premium Interactive Calendar",
  description:
    "A visually stunning, interactive wall calendar with date range selection, notes, dark mode, and dynamic theming. Built with Next.js and Framer Motion.",
  keywords: ["calendar", "interactive", "wall calendar", "date picker", "notes"],
  openGraph: {
    title: "Wall Calendar — Premium Interactive Calendar",
    description: "A beautiful, interactive wall calendar with date range selection and notes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
