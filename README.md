# Škola

Školní projekty z HTML a CSS.

- **Toulky světem** (kořen repa) – cestovní kancelář s komponentami Bootstrapu.
- **[Skládačka webu](skladacka/)** – hlavičky, obsah a patičky z FreeFrontend, které jdou libovolně poskládat.

## Toulky světem – cestovní kancelář

Školní úkol: jednoduchá stránka s komponentami Bootstrapu 5.3.

- **Carousel** se třemi destinacemi (Santorini, Švýcarské Alpy, Bali), šipkami a indikátory, všechny snímky mají stejnou výšku.
- **Karty** „Naše nabídka“: obrázek, název, popis, cena a tlačítko „Zjistit více“ na sekci dotazů. Na velké obrazovce vedle sebe, na mobilu pod sebou (mřížka `row-cols-1 row-cols-lg-3`).
- **Accordion** „Časté dotazy“ (3 otázky): první odpověď je otevřená, při otevření další se předchozí zavře (`data-bs-parent`).
- **Bonus:** štítek „Nejoblíbenější“ a navigace s odkazy na sekce.

Vlastní CSS je jen pro stejnou výšku obrázků (`height` + `object-fit: cover`), zbytek jsou třídy Bootstrapu.
Fotky ve složce `obrazky/` jsou z [Pixabay](https://pixabay.com) (Pixabay Content License, zdarma k použití):

- `santorini.jpg` – https://pixabay.com/photos/santorini-greece-buildings-houses-416136/
- `alpy.jpg` – https://pixabay.com/photos/alpine-lake-oeschinen-lake-mountain-7408477/
- `bali.jpg` – https://pixabay.com/photos/bali-palm-trees-sunset-travel-2975787/

Spuštění: otevřít `index.html` v prohlížeči.
