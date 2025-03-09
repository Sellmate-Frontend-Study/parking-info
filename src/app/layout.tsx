import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import clsx from 'clsx';
import MainSearchInput from "@/_component/MainSearchInput";
import MainLeftNav from "@/_component/MainLeftNav";

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

export const metadata: Metadata = {
	title: '서울시 주차장 정보',
	description: '서울시 주차장 정보',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(pretendard.className, 'antialiased')}
        cz-shortcut-listen="true"
      > 
        {children}
        <MainLeftNav/>
        <MainSearchInput/>
      </body>
    </html>
  );
}
