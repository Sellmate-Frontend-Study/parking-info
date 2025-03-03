import type { Metadata } from "next";
import "./globals.css";
import MainLeftNav from "./_component/MainLeftNav";
import MainHeader from "./_component/MainHeader";

export const metadata: Metadata = {
  title: "Parking Info",
  description: "Parking Info Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`pl-200pxr pt-48pxr min-h-screen`}
        cz-shortcut-listen="true"
      >
        <MainLeftNav />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
