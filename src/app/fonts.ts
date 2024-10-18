import localFont from "next/font/local";

export const FontJapanese = localFont({
	src: [
		{
			path: "./fonts/KosugiMaru-Regular.woff2",
			weight: "normal",
			style: "normal",
		},
	],
	variable: "--font-japanese"
});

export const FontKorean = localFont({
	src: [
		{
			path: "./fonts/TmoneyRoundWindRegular.ttf",
			weight: "normal",
			style: "normal",
		},
	],
	variable: "--font-korean"
});