import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marble Health Challenge App",
  description:
    "Simple scheduling tool built with React Big Calendar, Prisma, and NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
