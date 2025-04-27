import type { Metadata } from 'next';
import '../styles/globals.css';
import localFont from 'next/font/local';
import clsx from 'clsx';
import { Provider } from 'jotai';

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
		<Provider>
			<html lang='en'>
				<body className={clsx(pretendard.className, 'antialiased')}>{children}</body>
			</html>
		</Provider>
	);
}
