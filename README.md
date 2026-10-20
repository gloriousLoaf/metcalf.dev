<h1 align="center">David Metcalf, Full Stack Developer</h1>
<h3 align="center">A portfolio of my work with contact info.</h3>

<p align="center"> <img src="https://github.com/gloriousLoaf/metcalf.dev/blob/main/assets/images/metcalfdev-twittercard.webp" alt="metcalf.dev branding on a mint green color gradient." height="300"> </p>
<p>&nbsp;</p>

<p align="center"> <img src="https://img.shields.io/github/languages/count/gloriousLoaf/gloriousLoaf.github.io" alt="Development language count" /> <img src="https://img.shields.io/github/languages/top/gloriousLoaf/gloriousLoaf.github.io" alt="Development language stats" /> </p>

## Table of Contents

- [Description](#-description)
- [Installation](#-installation)
- [Usage](#-usage)
- [Contact Form](#-contact-form)
- [License](#-license)
- [Questions](#-questions)
<p>&nbsp;</p>

#### Get straight to the business? Visit [metcalf.dev](https://metcalf.dev/)

<p>&nbsp;</p>

## 📝 Description

To view my portfolio, please visit [metcalf.dev](https://metcalf.dev).
This is a constantly updated and evolving portfolio, serving as an introduction to my work and progress in full stack development. This is written in **pure HTML5, CSS3 & vanilla JS**.

<p>&nbsp;</p>

## 💾 Installation

If you are interested, feel free to clone this repo and use it for inspiration in your own portfolio. Though I doubt that is why you are here viewing this README. Thanks by the way for checking out my work!

<p>&nbsp;</p>

## 📲 Usage

Visitors to my site can view some select works from my portfolio; both the GitHub repositories and deployed sites. There is a short bio section to introduce myself. And finally there is a contact form to allow visitors to quickly send my an email without leaving the site. Additionally there are links to view my LinkedIn, GitHub and Twitter, or access me via email in their preferred method.

<p>&nbsp;</p>

## 📬 Contact Form

The contact form posts to a Cloudflare Pages Function, [`functions/api/contact.js`](functions/api/contact.js). It drops honeypot submissions, checks the fields, and forwards them to Formbold, so the Formbold form ID never ships to the browser. There is still no build step: Pages picks up the `functions/` folder on its own.

- **Setup:** in the Pages project, add a secret named `FORMBOLD_FORM_ID` under Settings → Variables and Secrets, for both Production and Preview.
- **Local testing (optional):** put `FORMBOLD_FORM_ID=...` in a `.dev.vars` file (gitignored) and run `npx wrangler pages dev .` from the repo root.

<p>&nbsp;</p>

## 📜 License

**MIT** • _(If you fork and recreate this, please be kind and rebrand your version!)_

<p>&nbsp;</p>

## ❔ Questions

- **David Metcalf**
- **GitHub:** [gloriousLoaf](https://github.com/gloriousLoaf)
- <hello@metcalf.dev>

<img src="https://github.com/gloriousLoaf.png" alt="GitHub Profile Pic" width="125" height="125">
<p>&nbsp;</p>

---

##### This markdown was created with [Readme Generator](https://github.com/gloriousLoaf/Readme-Generator)
