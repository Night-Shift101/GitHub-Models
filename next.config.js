/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages or similar hosting
  output: 'export',
  
  // Disable server-side features for static export
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  
  // ESLint configuration
  eslint: {
    dirs: ['app', 'components', 'lib'],
  },
};

export default nextConfig;
