# Situated Reality Lab

Official website of the **Situated Reality Lab (SiR)** at the **Department of Data and Systems Engineering, The University of Hong Kong**.

> Every **situation** is inseparable from **lived experience**. | 一切景語皆情語

**Live website:** [www.situated-reality.org](https://www.situated-reality.org/)

## About SiR

The Situated Reality Lab explores how computing can become a seamless and symbiotic extension of human capability and environmental intelligence. Our work brings together human–computer interaction, extended reality, artificial intelligence, sensing and systems engineering to create technologies that work beyond controlled settings.

Our research is organised around three connected directions:

- **Human Augmentation** — embodied AI, telexistence, cybernetic avatars and technologies that extend human capability.
- **Situational Spatial Intelligence** — context-aware AI and adaptive interfaces that understand people, place, activity and intent.
- **Robust & Deployable XR** — resilient immersive systems and infrastructure designed for real-world environments.

## Website

The site includes:

- [About](https://www.situated-reality.org/) — our research position, approach and latest updates
- [Team](https://www.situated-reality.org/team.html) — current members, collaborators and alumni
- [Research](https://www.situated-reality.org/research.html) — research pillars and themes
- [Publications](https://www.situated-reality.org/publications.html) — peer-reviewed publications and awards
- [Teaching](https://www.situated-reality.org/teaching.html) — current teaching and earlier supervision
- [Join Us](https://www.situated-reality.org/join.html) — PhD, postdoctoral, research assistant and visiting opportunities

## Technical overview

This is a lightweight static website built with semantic HTML, CSS and vanilla JavaScript. It has no framework or build dependency, and is designed to remain fast, responsive and easy to maintain.

```text
.
├── index.html          # Homepage / About
├── team.html           # People
├── research.html       # Research themes
├── publications.html   # Publications
├── teaching.html       # Teaching
├── join.html           # Opportunities and application guidance
├── site.css            # Shared visual system and responsive layout
├── site.js             # Navigation, reveal effects and publication search
└── assets/             # Brand, campus, research and team imagery
```

## Local preview

Clone the repository and serve its root directory with any static web server. For example:

```bash
git clone https://github.com/Situated-Reality/situated-reality.git
cd situated-reality
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deployment

The production site is published from the `main` branch using GitHub Pages. The custom domain is configured through [`CNAME`](CNAME) as `www.situated-reality.org`, with DNS managed separately by the domain provider.

Changes pushed to `main` are deployed automatically by GitHub Pages. After updating content, check the live site on both desktop and mobile once the deployment has completed.

## Content and media

Campus photographs are credited to the [HKU Wallpaper Gallery](https://hku.hk/multimedia/wallpaper-gallery/page-1/) on the pages where they appear. University, faculty, department and laboratory names, logos, photographs and other brand assets remain the property of their respective owners and are not granted for reuse by the repository's software licence.

## Contact

Situated Reality Lab<br>
Department of Data and Systems Engineering<br>
The University of Hong Kong<br>
8/F, Haking Wong Building<br>
Pokfulam Road, Hong Kong SAR
