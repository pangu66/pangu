import "./globals.css";

export const metadata = {
  title: "PANGU",
  description: "Live sports and esports"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
