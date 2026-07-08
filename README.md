# Aksharaa L — Personal Portfolio

A premium, production-ready personal portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

## Live Demo

Deploy to [Vercel](https://vercel.com) for instant hosting.

## Features

- Dark cybersecurity theme with glassmorphism UI
- Fully responsive (desktop, tablet, mobile)
- Animated particle background
- Typing effect, scroll reveal, counter animations
- Sticky navigation with active section highlighting
- Mobile hamburger menu
- Contact form with validation (mailto integration)
- SEO optimized (Open Graph, Twitter Cards, sitemap, robots.txt)
- Accessibility best practices
- Reduced motion support

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (CSS Variables, Flexbox, Grid, animations)
- Vanilla JavaScript (ES6+)

**No frameworks or libraries used.**

## Project Structure

```
portfolio_final/
├── index.html
├── style.css
├── script.js
├── css/                    ← optional modular styles
├── js/                     ← optional modular scripts
├── assets/
│   ├── images/
│   │   └── favicon.svg
│   ├── icons/
│   │   ├── leetcode.svg
│   │   ├── skillrack.svg
│   │   ├── hackerrank.svg
│   │   ├── tryhackme.svg
│   │   └── letsdefend.svg
│   ├── certificates/
│   └── resume.pdf          ← Add your resume here
├── robots.txt
├── sitemap.xml
├── vercel.json
└── README.md
```

## Getting Started

### Local Development

1. Clone or download this repository
2. Add your resume PDF to `assets/resume.pdf`
3. Open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .
```

4. Visit `http://localhost:8000`

### Deploy to Vercel

1. Push the project to a GitHub repository
2. Import the repo on [vercel.com](https://vercel.com)
3. Deploy with default settings (static site)
4. Update `sitemap.xml` and Open Graph URLs with your actual domain

## Customization

| What to change | Where |
|----------------|-------|
| Personal info | `index.html` |
| Colors & theme | `style.css` (`:root` variables) |
| Animations & behavior | `script.js` |
| Resume download | Replace `assets/resume.pdf` |
| Domain / SEO URLs | `index.html` meta tags, `sitemap.xml`, `robots.txt` |

## Sections

- Home (Hero with typing animation)
- About
- Education (Timeline)
- Skills (Glass cards)
- Projects (LogSentinelX, ShopSphere)
- Coding Profiles (LeetCode, Skillrack, HackerRank, TryHackMe, LetsDefend)
- Certifications
- Leadership
- Achievements (Animated counters)
- Contact (Form + details)
- Footer

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Aksharaa L. All rights reserved.
