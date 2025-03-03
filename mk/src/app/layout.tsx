import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import clsx from "clsx";
import { ChakraProvider } from "@chakra-ui/react";

const pretendard = localFont({
 src: "../../public/fonts/PretendardVariable.woff2",
 display: "swap",
 weight: "45 920",
 variable: "--font-pretendard",
});

export const metadata: Metadata = {
 title: "서울시 주차장 정보",
 description: "서울시 주차장 정보",
};

export default function RootLayout({
 children,
 search,
}: // parkingInfo,
Readonly<{
 children: React.ReactNode;
 search: React.ReactNode;
 // parkingInfo: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className={clsx(pretendard.className, "s-scroll-bar")}>
    <ChakraProvider>
     {search}
     <main className="pl-70">{children}</main>
     {/* {parkingInfo} */}
    </ChakraProvider>
   </body>
  </html>
 );
}
