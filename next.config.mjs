/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'sorry.daldal.so',
				pathname: '/**'
			}
		]
	}
};

export default nextConfig;
