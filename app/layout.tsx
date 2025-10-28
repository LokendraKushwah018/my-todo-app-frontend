import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MERN Todo Frontend",
  description: "Next.js + Tailwind v4 + Formik + DummyJSON",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gray-50 text-gray-900 antialiased">
        <div className="mx-auto max-w-5xl p-4">{children}</div>
      </body>
    </html>
  );
}
