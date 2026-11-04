# Odkrývaná patička

- **Původní název:** Fixed footer
- **Autor:** [Mads Håkansson](https://codepen.io/madshaakansson)
- **Původní pen:** <https://codepen.io/madshaakansson/pen/CGjcH>
- **Nalezeno na:** <https://freefrontend.com/css-footers/>
- **Licence:** MIT (veřejné peny na CodePenu, viz [ZDROJE.md](../../ZDROJE.md))

## Úpravy proti originálu

- jQuery z originálu nebylo potřeba (JS obsahoval jen komentář), vynecháno
- globální styl * { font
- color
- padding
- margin } nahrazen třídami p07-
- místo margin-bottom u obsahu má odsazení body (jen na stránce, kde je p07, přes :has), takže patička funguje s jakýmkoli obsahem
- latinský text nahrazen českým
- dva sloupce se na mobilu složí do jednoho
