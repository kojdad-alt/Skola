# Skládačka webu

Sbírka dílků stránky – **hlavičky** (`header`), **obsah** (`main`) a **patičky** (`footer`) –
z webu [FreeFrontend](https://freefrontend.com). Každý dílek je původně veřejný pen z CodePenu,
upravený tak, aby šel spojit s jakýmkoli jiným.

- `index.html` – galerie všech dílků s náhledy.
- `poskladej.html` – vyber si hlavičku, obsah a patičku a hned uvidíš celou stránku.
- `hlavicky/`, `obsah/`, `paticky/` – každý dílek ve vlastní složce: `index.html` (ukázka),
  `style.css` a `ZDROJ.md` (autor, odkaz na původní pen, co se změnilo).
- `ZDROJE.md` – přehled autorů a licence MIT.

## Jak dílek použít ve vlastní stránce

1. Zkopíruj z `index.html` dílku kód mezi `<!-- CAST -->` a `<!-- /CAST -->`.
2. Připoj jeho `style.css` (nebo obsah zkopíruj do svého CSS).
3. Hotovo. Všechny třídy mají předponu podle dílku (`h01-…`, `o02-…`, `p05-…`),
   takže se styly různých dílků nepřepisují.

Jen HTML a CSS, žádný JavaScript. Některé dílky používají novější CSS (`:has()`,
`backdrop-filter`, `mask-image`), takže potřebují aktuální prohlížeč.

## Pravidla úprav

- Původní SCSS, LESS, Stylus a Pug jsou přepsané do čistého CSS a HTML.
- Globální selektory (`body`, `h1`, `a`, `*`) z ukázek jsou převedené na třídy dílku.
- Obrázky z cizích serverů jsou nahrazené fotkami z `../obrazky/` (Pixabay) nebo CSS.
- Texty jsou česky, pro vymyšlenou ZŠ Lípa.
- U každého dílku zůstává autor a odkaz na původní pen (licence MIT).

## Pro správce

Po přidání nebo úpravě dílku spusť `python3 sestav.py`. Skript znovu vytvoří
`index.html`, `poskladej.html` a `ZDROJE.md` ze složek dílků.
