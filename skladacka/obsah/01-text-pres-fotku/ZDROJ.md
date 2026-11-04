# Text přes fotku s náběhem

- **Původní název:** Minimal Responsive Header & CSS Animations
- **Autor:** [Rafaela Lucas](https://codepen.io/rafaelavlucas)
- **Původní pen:** <https://codepen.io/rafaelavlucas/pen/QWwXKON>
- **Nalezeno na:** <https://freefrontend.com/css-headers/>
- **Licence:** MIT (veřejné peny na CodePenu, viz [ZDROJE.md](../../ZDROJE.md))

## Úpravy proti originálu

- použit jen úvodní blok (mainHeading), navigace je samostatně jako hlavička 01
- SCSS přepsáno do čistého CSS s předponou o01-
- fotka z Unsplash nahrazena fotkou Alp z Pixabay, která už je v repu (obrazky/alpy.jpg)
- keyframes vytažené z vnoření na nejvyšší úroveň a přejmenované
- img má object-fit: cover, aby se fotka nedeformovala
- animace se vypne při prefers-reduced-motion
