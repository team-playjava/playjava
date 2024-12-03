import type { Metadata } from "next";
import "./globals.css";
import 'primeicons/primeicons.css';
import 'tailwindcss/tailwind.css';
import Header from "./header";
import Footer from "./footer";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontJapanese, FontKorean } from "./fonts";
config.autoAddCss = false

import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from 'primereact/api';

export const metadata: Metadata = {
	title: "playJava!",
	description: "playJava!에서 자바!에 대한 이야기를 나눠보세요!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body>
				<div className="main">
					<SessionProvider>
						<PrimeReactProvider>
							<Header />
							<main className={`${FontKorean.variable} ${FontJapanese.variable}`}>{children}</main>
							<Footer />
						</PrimeReactProvider>
					</SessionProvider>
				</div>
			</body>
		</html>
	);
}
