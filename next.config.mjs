/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
	  return [
		{
		  source: '/(.*)', // Apply to all routes
		  headers: [
			{
			  key: 'Content-Security-Policy',
			  value: "default-src 'self'; script-src 'self';" // Modify this as needed
			},
		  ],
		},
	  ];
	},
  };

  export default nextConfig;
