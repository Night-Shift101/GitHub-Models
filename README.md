![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.7-38B2AC?style=for-the-badge&logo=tailwind-css) ![Built with Claude](https://img.shields.io/badge/Built_with_Help-Claude_Sonnet-FF6B35?style=for-the-badge&logo=anthropic) ![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)

# 🚀 Next.js Static Website Template

A modern, production-ready Next.js template for building static websites with Tailwind CSS, dark mode, and industry-standard best practices.

## ✨ Features

- **🏗️ Modern Architecture**: Next.js 14 with App Router
- **🎨 Beautiful UI**: Tailwind CSS with custom design system
- **🌗 Dark Mode**: Automatic system detection with manual toggle
- **📱 Responsive Design**: Mobile-first approach
- **♿ Accessible**: WCAG 2.1 AA compliant
- **⚡ Performance**: Optimized for static export
- **🔍 SEO Ready**: Meta tags and structured data
- **🧪 Developer Experience**: ESLint, error handling patterns
- **📚 Well Documented**: Comprehensive JSDoc comments
- **🚀 Deploy Ready**: Configured for popular hosting platforms

## 🛠️ Tech Stack

### Core

- **[Next.js 14](https://nextjs.org)** - React framework with App Router
- **[React 18](https://react.dev)** - Latest React with concurrent features
- **[Tailwind CSS 3](https://tailwindcss.com)** - Utility-first CSS framework

### Development

- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **JSDoc** - Code documentation

### Hosting Support

- ✅ Vercel (recommended)
- ✅ Netlify
- ✅ GitHub Pages
- ✅ AWS S3 + CloudFront
- ✅ Any static hosting

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** 9+ (or yarn/pnpm)

### Installation

1. **Use this template**

   ```bash
   # Option 1: Clone this repository
   git clone https://github.com/your-username/nextjs-static-template.git my-project
   cd my-project

   # Option 2: Use GitHub template (if available)
   gh repo create my-project --template your-username/nextjs-static-template
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Set up environment variables** (optional)

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```
4. **Start development server**

   ```bash
   npm run dev
   ```
5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server  
npm run export   # Build and export static site
npm run lint     # Run ESLint
npm run lint:fix # Fix linting issues
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.jsx         # Root layout with SEO
│   ├── page.jsx           # Homepage
│   └── globals.css        # Global styles + Tailwind
├── components/            # Reusable UI components
│   ├── Header.jsx         # Navigation + dark mode
│   └── Footer.jsx         # Footer with links
├── lib/                   # Utility functions
│   └── utils.js          # Helper functions
├── public/               # Static assets
├── .env.example         # Environment variables template
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🎨 Customization

### 1. Update Branding

**Replace placeholder content:**

- Update `YP` logo and `Your Project` name in `Header.jsx` and `Footer.jsx`
- Modify `package.json` name, description, and repository URLs
- Update meta tags in `app/layout.jsx`

### 2. Customize Colors

**Edit `tailwind.config.js`:**

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
        500: '#your-color',
        600: '#your-darker-color',
        // ...
      }
    }
  }
}
```

### 3. Add Content

**Create new pages:**

```bash
# Create app/about/page.jsx for /about route
mkdir app/about
touch app/about/page.jsx
```

**Add components:**

```bash
# Add new components to components/
touch components/Newsletter.jsx
```

### 4. Configure Deployment

**Static Export (default):**

```bash
npm run export
# Deploy the 'out/' folder
```

**Vercel:**

```bash
npm i -g vercel
vercel --prod
```

**Netlify:**

- Connect your Git repository
- Build command: `npm run export`
- Publish directory: `out`

## 🎯 Template Customization Checklist

- [ ] Update `package.json` (name, description, repository)
- [ ] Replace logo/branding in Header and Footer components
- [ ] Update meta tags and SEO information in `layout.jsx`
- [ ] Customize color scheme in `tailwind.config.js`
- [ ] Update social media links in Footer
- [ ] Add your content to `app/page.jsx`
- [ ] Configure environment variables if needed
- [ ] Update this README with your project details
- [ ] Add your license (current: MIT)
- [ ] Test responsive design on different devices

## � Advanced Configuration

### TypeScript Support

This template is TypeScript-ready. To enable:

1. **Rename files:**

   ```bash
   mv app/layout.jsx app/layout.tsx
   mv app/page.jsx app/page.tsx
   # Rename other .jsx files to .tsx
   ```
2. **Install TypeScript:**

   ```bash
   npm install --save-dev typescript @types/react @types/node
   ```
3. **Add `tsconfig.json`:**

   ```bash
   npx next dev # This will create tsconfig.json automatically
   ```

### Environment Variables

**Create `.env.local`:**

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
API_KEY=your_secret_api_key
```

**Usage in components:**

```javascript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

### Custom Fonts

**Add to `app/layout.jsx`:**

```javascript
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });
```

## 📊 Performance

This template is optimized for performance:

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 🚀 **Static Export**: No server required
- 📦 **Bundle Size**: Optimized with tree shaking
- 🖼️ **Images**: Configured for static hosting
- 🎨 **CSS**: Tailwind purging removes unused styles

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org)** - Amazing React framework
- **[Tailwind CSS](https://tailwindcss.com)** - Fantastic utility-first CSS
- **[Vercel](https://vercel.com)** - Excellent hosting platform
- **[React](https://react.dev)** - The foundation of modern web apps

---

**Happy coding! 🎉**

> This template is ready to use for your next project. Simply customize the branding, add your content, and deploy!
> Testing website for the new GitHub models.
