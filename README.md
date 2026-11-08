# Kidan Abebe: Portfolio

Static site: HTML5, CSS3, vanilla JavaScript. No build step.

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/ (images/, icons/, cv/)
└── README.md
```

## 1. Run locally
Double-click `index.html`, or for a local server: `python3 -m http.server 8000` in this folder, then open http://localhost:8000. (Fonts and icons load from CDNs, so you need internet.)

## 2. Replace the profile photo
Save a portrait (about 840×1050 px, JPG, under 300 KB) as `assets/images/profile.jpg`. Until it exists, the "KA" placeholder shows. Update the `alt` text in `index.html` if needed.

## 3. Edit personal information
All text is in `index.html`. Search for `your.email@example.com`, `+251 000 000 000`, `your-profile` and `your-username` and replace them (they appear in Contact and Footer). Also set `CONTACT_EMAIL` at the top of `js/script.js`. Edit skill levels with `data-l="1|2|3"` (Learning, Working knowledge, Comfortable). Colors and fonts are variables at the top of `css/style.css`.

## 4. Add new projects
Replace a `.project-ph` block in the Projects section with your own title, description and tags. For another large card, copy the whole `<article class="project">` block and give it a new `id`. Add screenshots by replacing the `<svg>` inside `.project__visual` with `<img src="assets/images/shot.jpg" alt="...">`.

## 5. Add your CV
Put your PDF in `assets/cv/` named `Kidan-Abebe-CV.pdf` (or change the two `href`s that point to it in `index.html`).

## 6. Connect social accounts
Replace the LinkedIn and GitHub URLs in the Contact list and in the footer `.social` links. Only add real, working links.

## 7. Contact form
The form uses `mailto:`: it opens the visitor's email app with the message filled in, and nothing is stored or sent by the site. To use a form service later (Formspree, Web3Forms), create a form there, add `action="THEIR_URL" method="POST"` to `<form id="form">`, and remove the submit handler in the "Contact form" block of `script.js`.

## 8. Publish on GitHub Pages
1. Create a GitHub account and a new public repository (e.g. `portfolio`).
2. Upload all files (keeping the folder structure), or push with Git: `git init && git add . && git commit -m "Portfolio" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`.
3. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
4. After a minute your site appears at `https://<username>.github.io/portfolio/`. Name the repository `<username>.github.io` to get `https://<username>.github.io/`.

## Theme switch
The sun/moon button in the navigation switches between dark and light. The first visit follows the visitor's system setting; after that their choice is remembered in the browser. Light-theme colors live in the `:root[data-theme="light"]` block at the top of `css/style.css`.
