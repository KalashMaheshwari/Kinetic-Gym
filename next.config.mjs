/** @type {import('next').NextConfig} */

const nextConfig = {
    // 1. Turbopack options (keep if you are using specific turbopack settings)
    turbopack: {},

    // 2. Image Optimization
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    // 3. Build Settings
    typescript: {
        ignoreBuildErrors: true,
    },
    
    // REMOVED: eslint { ... } (This caused your build error)
    
    // 4. Experimental Settings (Moved allowedOrigins here)
    experimental: {
        // If you need to allow specific origins for Server Actions:
        // allowedOrigins: ["*.theopenbuilder.com"], 
    },
};

export default nextConfig;