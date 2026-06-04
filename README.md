# sadeeshadman.github.io

Personal portfolio website for Sadee Shadman, deployed via GitHub Pages.

## Stack
- Plain HTML5, CSS3, Vanilla JavaScript — no build step required
- Font Awesome 6 (CDN) for icons
- Google Fonts: Inter + Fira Code
- [Formspree](https://formspree.io) for the contact form (free tier)

## Setup

### 1. Fill in your details
Edit `index.html` and replace all placeholder text:
- Name, city, university, email, LinkedIn URL, GitHub username
- Project titles, descriptions, and links
- Work experience entries

### 2. Add assets
See `assets/README.md` for the files you need to place there:
- `profile.jpg` — your headshot
- `resume.pdf` — downloadable CV
- `favicon.ico` — browser tab icon

### 3. Set up the contact form (optional)
1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a new form and copy your form ID
3. In `index.html`, replace `YOUR_FORM_ID` in the form `action` attribute

### 4. Deploy
Push to the `main` branch of this repo. GitHub Pages will auto-deploy to:
`https://sadeeshadman.github.io`

## File Structure
```
.
├── index.html          # Single-page site
├── css/
│   └── style.css       # All styles + dark/light themes
├── js/
│   └── main.js         # Typed animation, scroll reveal, theme toggle, form
└── assets/
    ├── profile.jpg
    ├── resume.pdf
    ├── favicon.ico
    └── og-preview.png
```