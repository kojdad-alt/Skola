"""Sestaví galerii (index.html) a skládačku (poskladej.html) ze složek dílků.

Každý dílek je složka hlavicky/NN-nazev, obsah/NN-nazev nebo paticky/NN-nazev
s index.html (kód dílku mezi <!-- CAST --> a <!-- /CAST -->), style.css a ZDROJ.md.
Spuštění: python3 sestav.py
"""
import html
import pathlib
import re

KOREN = pathlib.Path(__file__).resolve().parent
DRUHY = [
    ("hlavicky", "Hlavičky", "header"),
    ("obsah", "Obsah", "main"),
    ("paticky", "Patičky", "footer"),
]


def nacti_dilky(slozka):
    dilky = []
    for d in sorted((KOREN / slozka).iterdir()):
        if not (d / "index.html").exists():
            continue
        stranka = (d / "index.html").read_text(encoding="utf-8")
        cast = re.search(r"<!-- CAST -->(.*?)<!-- /CAST -->", stranka, re.S).group(1).strip()
        css = (d / "style.css").read_text(encoding="utf-8")
        zdroj = (d / "ZDROJ.md").read_text(encoding="utf-8")
        nazev = re.search(r"^# (.+)$", zdroj, re.M).group(1).strip()
        autor = re.search(r"\*\*Autor:\*\* \[([^\]]+)\]\(([^)]+)\)", zdroj)
        pen = re.search(r"\*\*Původní pen:\*\* <?(\S+?)>?$", zdroj, re.M)
        dilky.append({
            "id": d.name[:2],
            "slozka": f"{slozka}/{d.name}",
            "nazev": nazev,
            "autor": autor.group(1) if autor else "",
            "autor_url": autor.group(2) if autor else "",
            "pen": pen.group(1) if pen else "",
            "cast": cast,
            "css": css,
        })
    return dilky


# Středník může být i uvnitř adresy písma (wght@300;600), proto se hledá konec url(...).
IMPORT = r"""@import\s+(?:url\([^)]*\)|"[^"]*"|'[^']*')[^;]*;"""


def vytahni_importy(css):
    importy = re.findall(IMPORT, css)
    return importy, re.sub(IMPORT + r"\s*", "", css)


def galerie(vse):
    sekce = []
    for slozka, titulek, _ in DRUHY:
        karty = []
        for d in vse[slozka]:
            karty.append(f"""      <article class="karta">
        <div class="nahled"><iframe src="{d['slozka']}/index.html" title="{html.escape(d['nazev'])}" loading="lazy" tabindex="-1"></iframe></div>
        <div class="popis">
          <h3><span class="cislo">{d['id']}</span> {html.escape(d['nazev'])}</h3>
          <p>Podle <a href="{d['autor_url']}">{html.escape(d['autor'])}</a> · <a href="{d['pen']}">původní pen</a></p>
          <p class="odkazy"><a href="{d['slozka']}/index.html">Otevřít</a> <a href="{d['slozka']}/style.css">CSS</a> <a href="{d['slozka']}/ZDROJ.md">Zdroj</a></p>
        </div>
      </article>""")
        sekce.append(f"""    <section id="{slozka}">
      <h2>{titulek} <small>{len(vse[slozka])}</small></h2>
      <div class="mrizka">
{chr(10).join(karty)}
      </div>
    </section>""")
    return f"""<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Skládačka webu</title>
  <link rel="stylesheet" href="galerie.css">
</head>
<body>
  <header class="g-hlava">
    <h1>Skládačka webu</h1>
    <p>Hlavičky, obsah a patičky z <a href="https://freefrontend.com">FreeFrontend</a> (původně z CodePenu, licence MIT).
      Jen HTML a CSS, každý dílek má vlastní předponu tříd, takže jdou libovolně spojit.</p>
    <nav><a href="#hlavicky">Hlavičky</a> <a href="#obsah">Obsah</a> <a href="#paticky">Patičky</a> <a class="hlavni" href="poskladej.html">Poskládej si stránku</a></nav>
  </header>
  <main>
{chr(10).join(sekce)}
  </main>
  <footer class="g-pata">Autoři jednotlivých dílků jsou v <a href="ZDROJE.md">ZDROJE.md</a>. Galerii vytvořil skript <code>sestav.py</code>.</footer>
</body>
</html>
"""


def skladacka(vse):
    importy, styly, volby, dily, pravidla = [], [], [], [], []
    for slozka, titulek, _ in DRUHY:
        polozky = []
        for i, d in enumerate(vse[slozka]):
            klic = f"{slozka[0]}{d['id']}"
            imp, css = vytahni_importy(d["css"])
            # html:has(.p07) v dílku platí na celou stránku; ve skládačce jen když je dílek vybraný.
            css = re.sub(r":has\(\.([hop]\d\d)\)", r":has(#v-\1:checked)", css)
            importy += [x for x in imp if x not in importy]
            css = css.replace("../../../obrazky/", "../obrazky/")
            styly.append(f"/* ===== {d['slozka']} ===== */\n{css.strip()}\n")
            zaskrtnuto = " checked" if i == 0 else ""
            polozky.append(f'<label><input type="radio" name="{slozka}" id="v-{klic}"{zaskrtnuto}> {d["id"]} {html.escape(d["nazev"])}</label>')
            # Dílky odkazují na fotky v kořeni repa (../../../obrazky), skládačka leží o dvě složky výš.
            cast = d["cast"].replace("../../../obrazky/", "../obrazky/")
            dily.append(f'<div class="dil dil-{klic}">\n{cast}\n</div>')
            pravidla.append(f"body:has(#v-{klic}:checked) .dil-{klic}")
        volby.append(f'<fieldset><legend>{titulek}</legend>{"".join(polozky)}</fieldset>')
    zobraz = ",\n  ".join(pravidla)
    return f"""<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Poskládej si stránku</title>
  <link rel="stylesheet" href="zaklad.css">
  <style>
{chr(10).join(importy)}
  .dil {{ display: none; }}
  {zobraz} {{ display: contents; }}
  .panel {{ position: fixed; right: 12px; bottom: 12px; z-index: 9999; max-width: min(360px, calc(100vw - 24px));
    max-height: calc(100vh - 24px); overflow: auto; background: #fff; color: #1d2330; border: 1px solid #c9ced8;
    border-radius: 8px; box-shadow: 0 8px 30px rgb(0 0 0 / .25); font: 14px/1.4 system-ui, sans-serif; }}
  .panel summary {{ cursor: pointer; padding: 10px 14px; font-weight: 700; }}
  .panel fieldset {{ border: 0; border-top: 1px solid #e3e6ec; margin: 0; padding: 8px 14px 10px; display: grid; gap: 2px; }}
  .panel legend {{ font-weight: 700; padding: 0; margin-top: 6px; }}
  .panel label {{ cursor: pointer; }}
  .panel a {{ display: block; padding: 0 14px 12px; color: #2456c9; }}
  </style>
  <style>
{chr(10).join(styly)}
  </style>
</head>
<body>
{chr(10).join(dily)}
<details class="panel" open>
  <summary>Skládačka</summary>
  {"".join(volby)}
  <a href="index.html">Zpět do galerie</a>
</details>
</body>
</html>
"""


MIT = """Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."""


def zdroje(vse):
    radky = []
    for slozka, titulek, _ in DRUHY:
        radky.append(f"\n## {titulek}\n\n| Dílek | Autor | Původní pen |\n|---|---|---|")
        for d in vse[slozka]:
            radky.append(f"| [{d['id']} {d['nazev']}]({d['slozka']}/ZDROJ.md) | [{d['autor']}]({d['autor_url']}) | <{d['pen']}> |")
    return f"""# Zdroje a licence

Všechny dílky jsou upravené veřejné peny z [CodePenu](https://codepen.io), vybrané přes
[FreeFrontend](https://freefrontend.com) (kategorie CSS Headers, CSS Hero Sections, CSS Footers a další).
Veřejné peny jsou na CodePenu pod licencí MIT ([dokumentace CodePenu](https://blog.codepen.io/documentation/licensing/)),
takže je smíš používat a upravovat, když zůstane uvedený autor a text licence níže.

Co se v kterém dílku změnilo, je v jeho souboru `ZDROJ.md`. Fotky v `../obrazky/` jsou z Pixabay (viz README v kořeni repa).
{chr(10).join(radky)}

## Licence MIT (původní kód)

Copyright (c) autoři uvedení v tabulce výše, každý ke svému penu.

{MIT}
"""


def main():
    vse = {slozka: nacti_dilky(slozka) for slozka, _, _ in DRUHY}
    (KOREN / "index.html").write_text(galerie(vse), encoding="utf-8")
    (KOREN / "ZDROJE.md").write_text(zdroje(vse), encoding="utf-8")
    (KOREN / "poskladej.html").write_text(skladacka(vse), encoding="utf-8")
    print({k: len(v) for k, v in vse.items()})


if __name__ == "__main__":
    main()
