import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";

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
		<html lang="en">
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
