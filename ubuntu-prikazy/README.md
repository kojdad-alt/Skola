# ZÁKLADNÍ PŘÍKAZY UBUNTU – TERMINÁL

Terminál je okno, kam se píšou příkazy místo klikání myší. Otevřeš ho klávesami `Ctrl+Alt+T`, nebo v nabídce aplikací najdi „Terminál“.

Na každém řádku taháku je vlevo, co napsat, a vpravo, co to udělá. Příkaz napíšeš a potvrdíš klávesou Enter. Výjimky jsou kapitoly 16–19, tam je na začátku napsané, jak je číst.

**Kdo je kdo:** `novak` jsi ty. Místo něj napiš svoje přihlašovací jméno (zjistíš ho příkazem `whoami`). `anna`, `petr` a `svoboda` jsou zkušební účty. Ty opisuj přesně, jak jsou. Vytvoříš si je v kapitole 9.

Slova jako `soubor.txt`, `slozka`, `prikaz` nebo `/cesta/do/slozky/` jsou jen příklady. Místo nich napiš jména, která máš u sebe. Když soubor neexistuje, příkaz napíše chybu.

## NEŽ ZAČNEŠ

### Jak číst terminál

```text
novak@pocitac:~$ pwd
/home/novak
novak@pocitac:~$ cd Dokumnety
bash: cd: Dokumnety: No such file or directory
novak@pocitac:~$ cd Dokumenty
novak@pocitac:~/Dokumenty$ mkdir pokus
novak@pocitac:~/Dokumenty$
```

| kus | znamená |
|---|---|
| `novak` | kdo jsi (tvoje uživatelské jméno) |
| `pocitac` | jméno počítače |
| `~` | kde právě jsi. `~` = tvoje domovská složka, `~/Dokumenty` = složka Dokumenty v ní |
| `$` | „teď můžeš psát“. Ty píšeš až za `$`. Samotný `$` nepiš! |
| `#` | když je místo `$` mřížka, jsi root (hlavní správce). Opatrně |
| `řádek bez $` | odpověď počítače |

`cd Dokumnety` má překlep, proto přišla chyba. Na českém Ubuntu je česky: Adresář nebo soubor neexistuje. Opravené `cd Dokumenty` a pak `mkdir pokus` nic nevypsaly – to znamená, že se povedly. Všimni si, že se změnilo, kde jsi: `~/Dokumenty`.

### Pravidla psaní

- Mezi příkazem a každým dalším slovem musí být mezera: `ls -l`, ne `ls-l`.
- Velká a malá písmena se rozlišují: `Dokumenty` a `dokumenty` jsou dvě různé věci.
- Písmenka s pomlčkou (`-l`, `-a`, `-r`…) se jmenují **přepínače**. Mění, co příkaz udělá. U každého řádku je napsané, co dělají.
- Do názvů nových souborů a složek nedávej mezery ani háčky a čárky. Místo mezery piš podtržítko: `moje_slozka`. Proto je na taháku `slozka`, a ne „složka“.
- Česká klávesnice: čísla píšeš se Shiftem (nebo vpravo na číselné části). Znaky, které na klávesách nenajdeš, jsou v tabulce pod pravidly.
- Kopírování z taháku: v terminálu se vkládá `Ctrl+Shift+V` a kopíruje `Ctrl+Shift+C`. Obyčejné `Ctrl+V` tu nefunguje a `Ctrl+C` zastaví příkaz.

### Znaky na české klávesnici

**Pravý Alt** je klávesa vpravo od mezerníku (bývá na ní AltGr). Držíš ho a k tomu zmáčkneš druhou klávesu, stejně jako u Shiftu.

| znak | jak ho napíšeš | příklad |
|---|---|---|
| `/` | Shift + ú (klávesa vpravo od P), nebo `/` na číselné části vpravo | `/home/anna` |
| `-` | klávesa vlevo od pravého Shiftu (je na ní - a _), nebo `-` na číselné části | `ls -l` |
| `_` | Shift + stejná klávesa jako pomlčka | `moje_slozka` |
| `:` | Shift + tečka | `anna:projekty` |
| `+` | klávesa s jedničkou, bez Shiftu | `chmod g+w` |
| `"` | Shift + ů | `grep "slovo"` |
| `'` | Shift + klávesa s ¨ (vpravo, u Enteru) | `bash -c '…'` |
| `\|` | pravý Alt + W | `ls -la \| grep "test"` |
| `>` | pravý Alt + tečka | `echo ahoj > soubor.txt` |
| `~` | pravý Alt + Shift + klávesa vlevo od jedničky (je na ní ; a °). Když se `~` neobjeví, nepotřebuješ ho: místo `cd ~` stačí `cd` a místo `~/` napiš `/home/tvoje_jmeno/` | `cd ~` |

> Jde to i přes anglickou klávesnici (EN). Nejdřív ji ale musíš přidat v Nastavení → Klávesnice (Vstupní zdroje, tlačítko +). Přepínáš pak klávesami Super+mezerník (Super = klávesa s logem Windows). Pozor: na EN jsou Y a Z prohozené a znaky nejsou tam, kde je ukazují nálepky na klávesách. Proto radši zůstaň u češtiny a používej tabulku.

### Co se stane po Enteru

- Když příkaz nic nevypíše a hned se objeví nový řádek s `$`, **povedl se**. Třeba `mkdir`, `cp`, `mv`, `rm` nebo `chmod` většinou nic nepíšou.
- Když se něco nepovede, napíše chybu, třeba No such file or directory. Nic se tím nerozbilo. Oprav, co jsi napsal, a zkus to znovu. Šipka nahoru vrátí poslední příkaz. Nejčastější chyby jsou v kapitolách 18 a 19.
- Když máš Ubuntu česky, hlášky jsou česky. Místo No such file or directory uvidíš Adresář nebo soubor neexistuje. V taháku je u hlášek angličtina i čeština.
- Když terminál nereaguje a `$` se neobjeví, něco ještě běží. Zmáčkni `q`, nebo `Ctrl+C`.
- Když chce heslo, při psaní se většinou nic neukazuje, ani hvězdičky. To je normální: napiš ho naslepo a dej Enter. U `sudo` uvidíš [sudo] password for novak: (česky [sudo] heslo pro novak:). Na nejnovějším Ubuntu se u `sudo` můžou ukazovat hvězdičky, i to je v pořádku.
- Když se ptá [Y/n] (česky [A/n]), stačí Enter. Velké písmeno ukazuje, co udělá Enter.
- U `sudo` a `rm` tě počítač nezastaví, ani když se spleteš. Opisuj přesně.

### Smíš používat sudo?

Příkazy se `sudo` smí psát jen admin (správce). Je jich hodně v kapitolách 9–15. Jestli jsi admin, zjisti hned na začátku:

```bash
groups   # vypíše tvoje skupiny. Když mezi nimi vidíš slovo sudo, jsi admin a můžeš dělat i kapitoly 9–15. Když tam sudo není, příkazy se sudo ti nepůjdou. Řekni učiteli
```

## SLOVNÍČEK

Když v taháku narazíš na slovo, kterému nerozumíš, najdeš ho tady.

| pojem | znamená |
|---|---|
| **terminál** | okno, kam se píšou příkazy místo klikání |
| **příkaz** | slovo, které řekne počítači, co má udělat (`ls`, `cd`, `mkdir`…) |
| **přepínač** | písmenko s pomlčkou za příkazem (`-l`, `-a`, `-r`). Mění, co příkaz udělá |
| **cesta** | adresa souboru nebo složky. Složky odděluje lomítko: `/home/novak/Dokumenty` |
| **domovská složka (~)** | tvoje vlastní složka `/home/tvoje_jmeno`. Jsou v ní Plocha, Dokumenty nebo Stažené |
| **kořenová složka (/)** | úplný začátek, odkud vedou všechny ostatní složky |
| **skrytý soubor** | soubor, jehož jméno začíná tečkou (třeba `.bashrc`). `ls` ho ukáže až s `-a` |
| **uživatel** | účet jednoho člověka (ty, anna, petr…) |
| **skupina** | parta uživatelů, kteří dostanou stejná práva |
| **UID, GID** | číslo uživatele a číslo skupiny |
| **root** | hlavní správce počítače. Smí úplně všechno |
| **sudo** | slovo před příkazem: „udělej to jako root“. Smí ho použít jen admin |
| **admin** | uživatel, který smí používat `sudo` (je ve skupině sudo) |
| **práva** | kdo smí soubor číst (`r`), měnit (`w`) a spustit (`x`) |
| **shell, bash** | program, který v terminálu čte tvoje příkazy a provádí je. Na Ubuntu je to bash |
| **skript** | textový soubor s příkazy pod sebou. Spustíš ho `./skript.sh` |
| **odkaz** | zástupce, který jen ukazuje na jiný soubor (jako zástupce na ploše). V `ls -l` začíná písmenem `l` |
| **ACL** | seznam výjimek: práva navíc pro jednoho konkrétního člověka (kapitola 13) |
| **log (deník)** | soubor, kam si počítač zapisuje, co se v něm děje |
| **/etc** | složka s nastavením systému |
| **apt** | program na instalování dalších programů (`sudo apt install …`) |

## 1. NAVIGACE

Terminál je pořád „v nějaké složce“. Tyhle příkazy ti řeknou, kde jsi, co v té složce je, a přesunou tě jinam.

**Cesta** je adresa složky. Lomítko `/` odděluje složky: `/home/novak` znamená „ve složce home je složka novak“. **Domovská složka** je tvoje vlastní složka (`/home/tvoje_jmeno`), jsou v ní Plocha, Dokumenty nebo Stažené. Vlnovka `~` je zkratka pro ni.

```bash
pwd         # vypíše, ve které složce právě jsi (třeba /home/novak)
ls          # vypíše, co je ve složce (modře jsou složky, zeleně programy)
ls -l       # totéž, ale s podrobnostmi: práva, majitel, skupina, velikost a kdy se soubor naposledy změnil (jak to číst, je v kapitole 10)
ls -a       # ukáže i skryté soubory (začínají tečkou). Uvidíš i . a .. – jedna tečka je „tahle složka“, dvě tečky „složka nad ní“
ls -la      # podrobně a i se skrytými
cd slozka   # vleze do složky „slozka“. Ta musí být ve složce, kde právě jsi (zjistíš přes ls). Jinam napiš celou cestu, třeba cd /home/novak/Dokumenty
cd ..       # vyleze o jednu složku výš (.. = složka nad tebou)
cd ~        # skočí do tvé domovské složky (stačí napsat jen cd)
cd /        # skočí do kořenové složky / – úplný začátek, odkud vedou všechny ostatní složky
```

## 2. SLOŽKY

Vytváření a mazání složek. Nová složka vznikne tam, kde právě jsi.

```bash
mkdir nazev_slozky               # vytvoří novou složku
mkdir -p projekty/web/podklady   # vytvoří složku projekty, v ní složku web a v ní složku podklady, všechno najednou (-p = vytvoř i ty, které ještě chybí)
rmdir nazev_slozky               # smaže složku, ale jen když je úplně prázdná. I skrytý soubor se počítá, pak napíše Directory not empty (česky Adresář není prázdný)
rm -r nazev_slozky               # smaže složku i se vším uvnitř. Nezeptá se „opravdu?“ a nejde to vrátit, žádný koš!
```

## 3. SOUBORY

Vytvoření souboru a zápis textu do něj. `echo` jen vypíše text na obrazovku (`echo ahoj`). Šipka `>` ten text místo toho pošle do souboru. Když soubor ještě není, vytvoří ho.

```bash
touch dokument.txt                 # vytvoří prázdný soubor. Když už existuje, nic v něm nesmaže (jen mu změní čas)
echo "První řádek" > soubor.txt    # zapíše text do souboru – co tam bylo, zmizí (jedna šipka >)
echo "Druhý řádek" >> soubor.txt   # připíše text na konec, nic nesmaže (dvě šipky >>)
```

## 4. ČTENÍ SOUBORŮ

Jak se podívat, co je v souboru, bez otevírání v editoru.

```bash
cat soubor.txt                 # vypíše celý soubor najednou
less soubor.txt                # otevře soubor na listování: šipky, mezerník = další strana, /slovo = hledat, q = konec
head soubor.txt                # ukáže prvních 10 řádků
head -n 20 soubor.txt          # ukáže prvních 20 řádků
tail soubor.txt                # ukáže posledních 10 řádků
tail -n 15 soubor.txt          # ukáže posledních 15 řádků
sudo tail -f /var/log/syslog   # sleduje soubor živě. Tady je to systémový deník, kam si počítač zapisuje, co se v něm děje. Terminál pak čeká a ukazuje nové řádky – to je správně, konec Ctrl+C. Deník smí číst jen admin, proto sudo. Když napíše No such file or directory, napiš místo toho sudo journalctl -f
```

## 5. NANO (EDITOR)

Nano je jednoduchý textový editor přímo v terminálu. Neovládá se myší, ale klávesami. Dole v nano uvidíš ^O, ^X… – znak ^ znamená Ctrl. Na českém Ubuntu jsou popisky dole česky, klávesy jsou stejné.

```bash
nano soubor.txt   # otevře soubor v editoru. Když neexistuje, vznikne, až ho uložíš
Ctrl+O            # uložit. Dole se zeptá na jméno souboru (anglicky File Name to Write) a ukáže název souboru – jen zmáčkni Enter
Ctrl+X            # zavřít editor. Když jsi neuložil, zeptá se, jestli uložit (anglicky Save modified buffer?). Uložit = písmeno pro Ano: anglicky Y, česky A. Které to je, vidíš dole. Pak Enter. N = zahodit změny
Ctrl+W            # hledat v textu
Ctrl+K            # vyjmout celý řádek
Ctrl+U            # vložit vyjmutý řádek
Ctrl+G            # nápověda
```

## 6. KOPÍROVÁNÍ, PŘESUN, MAZÁNÍ

`cp` = kopírovat, `mv` = přesunout nebo přejmenovat, `rm` = smazat. Pravidlo: nejdřív CO, potom KAM.

Pozor: když cílový soubor už existuje, `cp` i `mv` ho bez ptaní přepíšou a starý obsah zmizí. Kdo chce, aby se počítač zeptal, přidá `-i` (`cp -i`, `mv -i`, `rm -i`).

```bash
cp zdroj.txt cil.txt              # zkopíruje soubor pod novým jménem. Když cil.txt už existuje, bez ptaní ho přepíše
cp -i zdroj.txt cil.txt           # totéž, ale když cil.txt už existuje, zeptá se (y = ano, přepsat)
cp soubor.txt /cesta/do/slozky/   # zkopíruje soubor do jiné složky (místo /cesta/do/slozky/ napiš opravdovou složku, třeba ~/Dokumenty/)
cp -r slozka1 nova_slozka         # zkopíruje celou složku (-r = i se vším uvnitř)
mv stary.txt novy.txt             # přejmenuje soubor. Když novy.txt už existuje, bez ptaní ho přepíše
mv soubor.txt /cesta/do/slozky/   # přesune soubor do jiné složky
rm soubor.txt                     # smaže soubor hned. Nezeptá se „opravdu?“ a nejde to vrátit, žádný koš!
```

## 7. GREP (HLEDÁNÍ)

grep hledá slovo v textu a vypíše jen ty řádky, kde to slovo je. Znak | (svislá čára) pošle výsledek jednoho příkazu do dalšího.

Soubory `log.txt`, `server.log` a další jsou jen příklady. Na zkoušku hledej v souboru, který má každý počítač: `grep "root" /etc/passwd`. Nebo si soubor nejdřív vyrob přes `echo` (kapitola 3). Když grep nic nevypíše, nic nenašel.

```bash
grep "slovo" soubor.txt         # najde řádky, kde ten text je – i uvnitř jiného slova („slovo“ najde i „slovosled“)
grep "root" /etc/passwd         # zkouška, která funguje na každém počítači
grep -i "ubuntu" soubor.txt     # totéž, ale nezáleží na velkých a malých písmenech
grep -n "chyba" log.txt         # ukáže i čísla řádků
grep -r "heslo" ~/Dokumenty/    # hledá ve všech souborech ve složce Dokumenty i v jejích podsložkách. Nic nepřepisuj, ~ je tvoje domovská složka
grep -v "nologin" /etc/passwd   # naopak: ukáže řádky, kde to NENÍ. Tady zbydou hlavně účty, které se můžou přihlásit (root, ty, anna…)
grep -c "warning" server.log    # jen spočítá, kolik takových řádků je
grep -w "is" text.txt           # jen celé slovo („is“ najde, „this“ ne)
ls -la | grep "test"            # ze seznamu souborů ukáže jen ty, co mají v názvu „test“
history | grep "apt"            # najde v historii příkazy, kde bylo „apt“ (apt = instalování programů)
ps aux | grep "firefox"         # ps aux vypíše všechny běžící programy a grep z nich vybere firefox. Jeden řádek s „grep --color=auto firefox“ uvidíš skoro vždycky, to je jen samotné hledání. Firefox běží, jen když je tam ještě další řádek
pgrep -a firefox                # jednodušší: vypíše jen opravdu běžící firefox. Když nic nevypíše, neběží
```

## 8. UŽITEČNÉ

Klávesy a příkazy, které ušetří spoustu psaní.

```bash
Tab                           # doplní název souboru nebo příkazu – stačí napsat začátek. Když se nic nestane, zmáčkni Tab dvakrát, ukáže, co připadá v úvahu
šipky                         # nahoru a dolů listuješ příkazy, které jsi už psal (šipka nahoru = poslední příkaz)
Ctrl+C                        # zastaví příkaz, který právě běží. Pozor: v terminálu NEkopíruje
Ctrl+Shift+C / Ctrl+Shift+V   # kopírovat a vložit text v terminálu (obyčejné Ctrl+V tu nefunguje)
Ctrl+L                        # vyčistí obrazovku (to samé jako clear)
history                       # vypíše příkazy, které jsi psal (pamatuje si zhruba posledních 1000)
man prikaz                    # anglický návod k příkazu, třeba man ls. Listuje se šipkami a mezerníkem jako v less, konec q
sudo prikaz                   # spustí příkaz jako správce (root). Zeptá se na TVOJE heslo, ne na heslo správce. Při psaní se většinou nic neukazuje (na nejnovějším Ubuntu hvězdičky) – to je normální, napiš ho a dej Enter. Funguje jen, když jsi admin (groups, Než začneš)
```

## 9. UŽIVATELÉ A SKUPINY

Uživatel = účet jednoho člověka. Skupina = parta uživatelů. Skupině můžeš dát práva a dostanou je všichni v ní najednou (třeba celá třída nebo tým). Každý uživatel má číslo UID (správce root má 0, běžní lidi od 1000) a každá skupina číslo GID.

Na Ubuntu dostane každý uživatel i vlastní skupinu se stejným jménem: Anna má skupinu anna a je v ní jen ona. To je její **hlavní** skupina a tu dostanou její nové soubory (výjimka: složka s dvojkou, kapitola 11). K tomu může být v kolika chce dalších (**doplňkových**) skupinách, třeba sudo. Kdo je ve skupině sudo, smí používat příkaz `sudo` – je to admin.

```bash
sudo adduser anna                      # vytvoří zkušební uživatelku anna (použij tohle, je to jednodušší než useradd). Dvakrát se zeptá na heslo a nic se neukazuje, to je normální. Když napíše BAD PASSWORD, heslo je jen slabé. Přes sudo projde, napiš ho znovu a pokračuj. Pak chce jméno, číslo pokoje, telefon… Nic z toho není povinné, stačí mačkat Enter. Na konci se zeptá, jestli je to správně ([Y/n], česky [A/n]): stačí Enter
sudo adduser petr                      # stejně vytvoří zkušebního Petra. Annu a Petra potřebuješ v kapitolách 11–15. Když napíše already exists (česky … existuje), účet už máš a nic se nestalo
sudo useradd -m -s /bin/bash svoboda   # vytvoří uživatele ručně a bez otázek (-m = udělá mu domovskou složku, -s /bin/bash = v terminálu mu poběží bash, program, který čte příkazy). Heslo zatím nemá a nepřihlásí se, dokud mu ho nenastavíš (řádek pod tím). Svobodu potřebuješ v kapitole 13
sudo passwd svoboda                    # nastaví uživateli heslo (napíšeš ho dvakrát, nic se neukazuje). BAD PASSWORD = heslo je jen slabé, přes sudo projde
sudo passwd -d svoboda                 # smaže heslo úplně. Jako svoboda se pak na tomhle počítači přihlásí kdokoli BEZ hesla! Nepoužívat. Když chceš účet zavřít, použij řádek pod tím
sudo passwd -l svoboda                 # zamkne účet: heslem se svoboda nepřihlásí, dokud ho neodemkneš
sudo passwd -u svoboda                 # účet zase odemkne
sudo groupadd projekty                 # vytvoří skupinu projekty
sudo groupdel stara_skupina            # smaže skupinu (lidé v ní nezmizí)
sudo usermod -aG projekty anna         # přidá Annu do skupiny projekty. Nejdřív SKUPINA, potom ČLOVĚK (a = přidat, G = skupina). Vždycky -aG! Bez „a“ člověka vyhodí ze všech ostatních doplňkových skupin. Admina i ze sudo, přestane být admin. Anně to začne platit, až se znovu přihlásí (někdy až po restartu). Zkouška za ni přes sudo -u anna funguje hned
sudo gpasswd -d petr projekty          # vyhodí Petra ze skupiny projekty. Tady naopak: nejdřív ČLOVĚK, potom SKUPINA (-d = odebrat)
id anna                                # ukáže její UID, hlavní skupinu (GID) a všechny skupiny podle systému
id                                     # bez jména: ukáže, co máš TY v tomhle terminálu právě teď. Když tam nová skupina chybí, musíš se znovu přihlásit
groups anna                            # jen její skupiny
newgrp projekty                        # píše ho ten, koho do skupiny právě přidali, ve SVÉM terminálu (třeba Anna u svého počítače). Skupina pak platí hned, ale jen v tomhle okně. exit ho vrátí zpátky. Sám za sebe to nepiš, když ve skupině nejsi. Bude to chtít heslo a žádné nebude fungovat
cat /etc/passwd                        # seznam všech účtů (/etc je složka s nastavením systému). Uvidíš i spoustu účtů systému (daemon, www-data…), lidi mají UID od 1000 a jsou dole. Řádek čti takhle: jméno:x:UID:GID:popis:domovská složka:shell. x = heslo tu není, je v /etc/shadow. Číst může každý
sudo cat /etc/shadow                   # otisky hesel (hashe) – heslo se z nich zpátky přečíst nedá – a jak dlouho platí. Druhý kus řádku (mezi 1. a 2. dvojtečkou) je otisk hesla. Když tam je ! nebo *, heslem se nepřihlásí. Když tam není nic (svoboda::), je účet úplně bez hesla. Přečte jen root, proto sudo
cat /etc/group                         # seznam všech skupin. Na konci řádku jsou lidi, kteří ji mají jako doplňkovou. Komu je to hlavní skupina, tady vypsaný není (anna:x:1001: je prázdné, i když tam Anna je)
```

## 10. PRÁVA

Každý soubor a složka má práva pro tři „lidi“: majitele, skupinu a ostatní. Každý z nich může mít r = číst, w = psát (měnit), x = spustit (u složky = vstoupit do ní). Pomlčka znamená, že to nemá.

Odkud se berou čísla jako 750 nebo 644, je vysvětlené hned pod příkazy.

Root (cokoli se `sudo`) práva neřeší, smí číst a měnit všechno. Proto se práva zkoušejí za Annu (`sudo -u anna …`), ne se sudo.

```bash
ls -l soubor.txt                           # ukáže práva souboru, třeba -rw-r--r--
ls -ld slozka                              # ukáže práva samotné složky (ne toho, co je v ní)
chmod 750 /cesta/ke/slozce                 # majitel všechno, skupina číst a vstoupit, ostatní nic
chmod 644 dokument.txt                     # majitel čte a píše, všichni ostatní jen čtou
chmod g+w projekt.txt                      # skupině přidá právo psát (g = skupina, + = přidat, w = psát)
chmod o-rwx tajne/                         # ostatním vezme všechno (o = ostatní, NE majitel; - = vzít)
chmod +x skript.sh                         # dovolí soubor spustit jako program (všem). Skript je textový soubor s příkazy pod sebou. Spustíš ho ./skript.sh (tečka a lomítko = „tenhle soubor tady“)
sudo chown anna soubor.txt                 # majitelkou souboru bude Anna (účet z kapitoly 9)
sudo chgrp projekty soubor.txt             # soubor bude patřit skupině projekty
sudo chown anna:projekty soubor.txt        # změní majitele i skupinu najednou. Zpátky sobě dáš soubor stejně: sudo chown novak:novak soubor.txt (místo novak tvoje jméno)
sudo chown -R anna:projekty /opt/sdilene   # totéž pro celou složku i se vším uvnitř (-R, tady VELKÉ R, u cp malé r)
```

**Jak číst `ls -l`**, třeba `-rwxr-xr-- 1 anna projekty 4096 říj 20 09:15 soubor.txt`:

| kus | znamená |
|---|---|
| `-` | typ: `-` soubor, `d` složka, `l` odkaz (zástupce, který jen ukazuje na jiný soubor, jako zástupce na ploše) |
| `rwx` | co smí **majitel** (tady anna) |
| `r-x` | co smí **skupina** (tady projekty) |
| `r--` | co smí **ostatní** |
| `1` | počet odkazů – neřeš |
| `anna` | majitel souboru |
| `projekty` | skupina souboru |
| `4096` | velikost v bajtech |
| `říj 20 09:15` | kdy se soubor naposledy změnil (v angličtině Oct 20 09:15) |
| `soubor.txt` | jméno souboru |

Když je za právy ještě `+` (třeba `-rw-rw-r--+`), má soubor navíc výjimky ACL (kapitola 13). Podíváš se na ně přes `getfacl soubor.txt`.

Když je u skupiny místo `x` písmeno `s` (třeba `drwxrws---`), má složka tu zvláštní dvojku z `2770` (kapitola 11).

| právo | u souboru | u složky |
|---|---|---|
| `r` | číst obsah | vidět, co v ní je (ls) |
| `w` | měnit a ukládat | vytvářet, mazat a přejmenovávat věci v ní – i cizí soubory! (jen spolu s x) |
| `x` | spustit jako program | vejít do ní (cd) a projít dál |

> **Pozor na průchod:** když na **jakékoli** složce po cestě k souboru nemáš `x`, k souboru se nedostaneš – ani kdyby měl 777.

**Písmena v chmod:** `u` = majitel (z anglického user), `g` = skupina (group), `o` = ostatní (others) – pozor, `o` NENÍ majitel! `a` = všichni (all). `+` přidat, `-` vzít, `=` nastavit přesně tohle.

| písmeno | číslo | znamená |
|---|---|---|
| `r` | 4 | číst |
| `w` | 2 | psát |
| `x` | 1 | spustit / vstoupit do složky |

| součet | práva | znamená |
|---|---|---|
| 7 | `rwx` | všechno |
| 6 | `rw-` | číst a psát |
| 5 | `r-x` | číst a spustit (u složky: vidět a projít) |
| 4 | `r--` | jen číst |
| 3 | `-wx` | psát a spustit (skoro se nepoužívá) |
| 2 | `-w-` | jen psát (skoro se nepoužívá) |
| 1 | `--x` | jen spustit, u složky jen projít (třeba 710) |
| 0 | `---` | nic |

Tři číslice za sebou = **majitel, skupina, ostatní**. Příklad: `750` = majitel 7 (4+2+1 = `rwx`), skupina 5 (4+1 = `r-x`), ostatní 0 (`---`).

Když jsou číslice čtyři (`2770`), první je zvláštní nastavení (kapitola 11). Zbylé tři čteš normálně.

Nejčastější kombinace:

| číslo | znamená |
|---|---|
| `755` | rwxr-xr-x – majitel všechno, ostatní čtou a procházejí (složky, programy) |
| `644` | rw-r--r-- – majitel čte a píše, ostatní jen čtou (běžný soubor) |
| `700` | rwx------ – soukromá složka, jen majitel |
| `600` | rw------- – soukromý soubor, jen majitel (třeba soubor s hesly) |
| `770` | rwxrwx--- – týmová složka: majitel a skupina všechno, ostatní nic |

## 11. SDÍLENÁ SLOŽKA

Cíl: složka, do které můžou psát Anna i Petr (skupina projekty), ale nikdo jiný. Anna a Petr musí existovat (`sudo adduser`, kapitola 9).

Jsou tu dvě cesty. **U Anny doma** (kroky 1–11): složku vytvoříme jako Anna (`sudo -u anna`), aby byla její. Protože je uvnitř `/home/anna`, musí skupina projít i Anninou domovskou složkou (kroky 6 a 7). Tím se ale dostane i do Anniných Dokumentů a dalších složek (pozor pod příkazy). **V `/srv`** (dole): bezpečnější, Annin domov se vůbec nemění.

```bash
sudo groupadd projekty                                  # 1. vytvoří skupinu projekty. Když napíše already exists, máš ji už z kapitoly 9. Nevadí, pokračuj
sudo usermod -aG projekty anna                          # 2. přidá do ní Annu
sudo usermod -aG projekty petr                          # …a Petra
sudo -u anna mkdir -p /home/anna/tym_sdilene            # 3. Anna si u sebe vytvoří složku (-u anna = udělej to jako Anna)
sudo chgrp projekty /home/anna/tym_sdilene              # 4. složka bude patřit skupině projekty
sudo chmod 2770 /home/anna/tym_sdilene                  # 5. majitel a skupina všechno, ostatní nic. Dvojka na začátku zařídí, že nové soubory v ní budou taky patřit skupině projekty, takže je můžou měnit všichni z ní
sudo chgrp projekty /home/anna                          # 6. Annina domovská složka bude taky patřit skupině…
sudo chmod 710 /home/anna                               # 7. …a skupina jí smí jen projít. Seznam Anniných věcí neuvidí. Pozor: když zná jméno složky, třeba Dokumenty, dostane se do ní (víc pod příkazy). Proto je bezpečnější varianta v /srv (dole)
ls -ld /home/anna                                       # 8. kontrola: má tam být drwx--x--- anna projekty
sudo ls -ld /home/anna/tym_sdilene                      # 9. kontrola: má tam být drwxrws--- anna projekty (s místo x u skupiny = ta dvojka z 2770). sudo je tu proto, že ty sám přes /home/anna neprojdeš, nejsi ve skupině projekty
sudo -u petr touch /home/anna/tym_sdilene/zkouska.txt   # 10. zkouška za Petra: když nic nenapíše, Petr do složky psát smí. Funguje hned, sudo -u si nové skupiny načte samo
# --- 11. Jen když u počítače opravdu sedí Anna nebo Petr (ne ty). Když zkoušíš za ně přes sudo -u (krok 10), tenhle krok vynech: ---
newgrp projekty                                         # Kdo tam sedí, napíše to ve SVÉM terminálu. Nebo se odhlásí a znovu přihlásí (někdy pomůže až restart). Bez toho mu nová skupina nefunguje. Ty to za sebe nepiš: ve skupině nejsi a bude to chtít heslo
# --- Bezpečnější varianta: sdílená složka v /srv. Kroky 1 a 2 platí i tady, kroky 3–11 vynech. /home/anna se vůbec nemění ---
sudo mkdir /srv/projekty                                # vytvoří složku mimo domovské složky (/srv je místo pro sdílené věci)
sudo chgrp projekty /srv/projekty                       # složka bude patřit skupině projekty
sudo chmod 2770 /srv/projekty                           # skupina všechno, ostatní nic, nové soubory patří skupině
sudo -u petr touch /srv/projekty/zkouska.txt            # zkouška za Petra: když nic nenapíše, Petr do složky psát smí
```

> **Pozor:** Pozor ke kroku 7: Anniny složky Dokumenty, Plocha, Stažené… mají na Ubuntu práva `drwxr-xr-x` (755). Číst je smí každý, kdo se k nim dostane. Po kroku 7 do nich skupina projekty vejde a přečte je. Když to nechceš, použij variantu v /srv. Nebo ať si Anna složky zamkne, třeba `chmod 700 ~/Dokumenty`.

> Dvojka platí jen pro **nové** soubory. Soubor, který do složky přesuneš přes `mv`, si nechá starou skupinu. Oprava: `sudo chgrp projekty soubor`.

> Aby si soubory mohli měnit navzájem, musí `ls -l` u souboru ukazovat `-rw-rw-…`. Když je tam `-rw-r--r--` (tak vzniknou třeba soubory vytvořené přes sudo), oprav to: `sudo chmod g+w soubor`.

> **Pozor:** Kdo smí do složky psát, smí v ní i mazat. Petr tedy smaže i Annin soubor.

> Poznámka: když máš ve výkladu ze školy 770 a 750 místo 2770 a 710 – bez dvojky dostane každý nový soubor osobní skupinu toho, kdo ho vytvořil (anna nebo petr). Anna a Petr si pak soubory navzájem měnit nebudou. A 750 místo 710 dovolí skupině i vypsat, co má Anna doma.

## 12. PRÁVO PSÁT DO SOUBORU PRO URČITÉ LIDI

Chceš, aby do jednoho souboru mohli psát jen někteří lidi. Uděláš pro ně skupinu, dáš do ní ty lidi a souboru dovolíš, aby skupina psala.

V příkazech je soubor `/home/anna/soubor.txt`, který patří Anně. Píše se celá cesta, protože do Anniny složky ty sám nevlezeš (`cd /home/anna` napíše Permission denied). Když máš soubor jinde, třeba ve sdílené složce z kapitoly 11, napiš jeho cestu.

```bash
sudo -u anna touch /home/anna/soubor.txt                    # 0. jen když soubor ještě nemáš: Anna si ho vytvoří u sebe doma
sudo groupadd zapisovatele                                  # 1. vytvoří skupinu zapisovatele
sudo usermod -aG zapisovatele anna                          # 2. přidá do ní Annu (vždycky -aG!)
sudo usermod -aG zapisovatele petr                          # …a Petra
sudo chgrp zapisovatele /home/anna/soubor.txt               # 3. soubor bude patřit téhle skupině
# --- 4. Vyber jen JEDEN z těchto tří řádků: ---
sudo chmod g+w /home/anna/soubor.txt                        # skupina smí do souboru psát (ostatní práva zůstanou, jak byla)
sudo chmod 664 /home/anna/soubor.txt                        # nebo: majitel a skupina čtou i píšou, ostatní jen čtou
sudo chmod 660 /home/anna/soubor.txt                        # nebo: totéž, ale ostatní ho ani nepřečtou
sudo ls -l /home/anna/soubor.txt                            # 5. kontrola: má tam být -rw-rw-r-- (když jsi dal 660, tak -rw-rw----) a slovo zapisovatele. sudo je tu proto, že ty sám do /home/anna nesmíš
# --- 6. Petr musí projít i složkou /home/anna. Vyber A, nebo B. Kterou máš, ukáže ls -ld /home/anna: druhé jméno je skupina. (Když soubor neleží v cizí domovské složce, krok 6 vynech.) ---
# --- A) Je tam anna (kapitolu 11 u Anny doma jsi nedělal): napiš oba řádky ---
sudo chgrp zapisovatele /home/anna                          # Annina domovská složka bude patřit skupině zapisovatele…
sudo chmod 710 /home/anna                                   # …a skupina jí smí jen projít. Seznam Anniných věcí neuvidí, ale do Dokumentů a dalších složek jménem vejde (pozor v kapitole 11 pod příkazy)
# --- B) Je tam projekty (z kapitoly 11): jen tenhle řádek. Řádky z A nepiš, sdílená složka by přestala fungovat ---
sudo setfacl -m g:zapisovatele:x /home/anna                 # průchod dostane i skupina zapisovatele a nic jiného se nezmění (ACL, kapitola 13). Když napíše command not found, nainstaluj acl (kapitola 13, první řádek)
sudo -u petr bash -c 'echo ahoj >> /home/anna/soubor.txt'   # 7. zkouška za Petra: nic nenapíše = Petr psát smí (opravdu tam připíše „ahoj“, kapitola 15). Permission denied = něco chybí. Funguje hned, sudo -u si nové skupiny načte samo
# --- 8. Jen když u počítače opravdu sedí Anna nebo Petr (ne ty). Když zkoušíš za ně přes sudo -u (krok 7), tenhle krok vynech: ---
newgrp zapisovatele                                         # Kdo tam sedí, napíše to ve SVÉM terminálu. Nebo se odhlásí a znovu přihlásí (někdy pomůže až restart). Ty to za sebe nepiš: ve skupině nejsi a bude to chtít heslo
```

## 13. PRÁVO JEN PRO JEDNOHO ČLOVĚKA (ACL)

Když je to jen jeden člověk a nechceš kvůli němu dělat skupinu.

**ACL** = seznam výjimek. Kromě majitele, skupiny a ostatních můžeš k souboru zapsat i jednoho konkrétního člověka a jeho práva.

Tady dostane výjimku svoboda k Annině souboru z kapitoly 12. Svoboda je účet z kapitoly 9 (řádek s `useradd`). Není majitel a není ve skupině zapisovatele. Majiteli souboru (Anně) se výjimka nedává, ten má svoje práva vždycky.

```bash
sudo apt install acl                                           # nainstaluje ACL. Potřebuješ to jen, když setfacl napíše command not found (česky příkaz nenalezen). Na otázku Do you want to continue? [Y/n] (česky [A/n]) stačí Enter. Chce to internet
sudo setfacl -m u:svoboda:rw /home/anna/soubor.txt             # svoboda smí soubor číst i psát (-m = přidat výjimku, u = uživatel, rw = číst a psát). Když napíše Invalid argument, svoboda neexistuje (kapitola 9)
sudo setfacl -m u:svoboda:x /home/anna                         # svoboda musí projít i složkou /home/anna (x = jen projít). Bez toho by se k souboru nedostal
sudo getfacl /home/anna/soubor.txt                             # kontrola: uvidíš řádek user:svoboda:rw-. V ls -l je pak za právy + (-rw-rw-r--+), to znamená „má výjimky“. sudo je tu proto, že ty sám do /home/anna nesmíš
sudo -u svoboda bash -c 'echo ahoj >> /home/anna/soubor.txt'   # zkouška za svobodu: nic nenapíše = smí psát (kapitola 15)
# --- Když už výjimku nechceš: ---
sudo setfacl -x u:svoboda /home/anna/soubor.txt                # svobodovi právo k souboru zase vezme (-x = výjimku smazat)
sudo setfacl -x u:svoboda /home/anna                           # …a vezme mu i průchod složkou /home/anna
```

> **Maska:** když má soubor ACL, prostřední trojice v `ls -l` (skupina) je strop pro všechny výjimky. Když ji `chmod g-w` sníží, přijdou o psaní i lidé z ACL, tady svoboda (kapitola 14). Majitele se to netýká.

## 14. ODEBRÁNÍ PRÁV

Když chceš práva zase vzít. Od prvního mezititulku dál je úklid po kapitolách 12 a 13. Dělej jen to, co sedí na podmínku v mezititulku.

```bash
sudo chmod g-w /home/anna/soubor.txt        # skupině vezme psaní, číst může dál. Pozor: když má soubor ještě výjimku z kapitoly 13, vezme psaní i svobodovi (maska)
sudo chmod g-rwx /home/anna/soubor.txt      # skupině vezme úplně všechno
sudo gpasswd -d petr zapisovatele           # vyhodí Petra ze skupiny (ostatní píšou dál). V terminálu, který má Petr už otevřený, skupinu ale pořád má. Úplně to přestane platit, až se odhlásí (někdy až po restartu)
# --- Úklid po kapitole 12, až skupinu zapisovatele nebudeš potřebovat: ---
sudo chgrp anna /home/anna/soubor.txt       # soubor dostane zpátky Anninu vlastní skupinu anna (je v ní jen ona). Majitel se nemění
# --- Jen když jsi v kapitole 12 použil setfacl (krok 6 B): ---
sudo setfacl -x g:zapisovatele /home/anna   # skupině zapisovatele vezme průchod složkou /home/anna
# --- Jen když už nechceš ani sdílenou složku z kapitoly 11 (nebo jsi ji u Anny doma nedělal): ---
sudo chgrp anna /home/anna                  # vrátí Annině domovské složce její skupinu anna…
sudo chmod 750 /home/anna                   # …a obvyklá práva (na Ubuntu 750)
# --- Nakonec: ---
sudo groupdel zapisovatele                  # smaže skupinu. Lidé v ní nezmizí. Kdyby jí ještě něco patřilo, ls -l tam místo jména ukáže jen číslo
```

## 15. PŘÍKAZY ZA JINÉHO UŽIVATELE

Hodí se, když chceš vyzkoušet, jestli třeba Anna nebo Petr opravdu smí do souboru psát. Admin (ty se sudo) se může přepnout na kohokoli.

```bash
su - anna                                                   # přepne tě na Annu, zeptá se na Annino heslo. Pomlčka = jako by se Anna právě přihlásila: skočíš do její domovské složky. Nové skupiny se jí načtou tak jako tak. Pak všechno píšeš jako Anna
sudo -iu anna                                               # totéž (i = celé přihlášení, u anna = jako Anna), ale napíšeš svoje heslo, ne Annino. Funguje, i když Anna heslo vůbec nemá
whoami                                                      # vypíše, za koho právě jsi
exit                                                        # vrátí tě zpátky k sobě. Když nejsi přepnutý, zavře okno terminálu – nic se nestalo, otevři nové (Ctrl+Alt+T)
sudo -u anna touch /home/anna/test.txt                      # jeden příkaz za Annu, bez přepínání
sudo -u petr bash -c 'echo ahoj >> soubor.txt'              # zkouška, jestli Petr smí psát (opravdu tam připíše „ahoj“). bash -c '…' je tam proto, aby >> udělal Petr, a ne ty. Nic nenapíše = smí, Permission denied = nesmí. Soubor se ale hledá ve složce, kde stojíš ty – lepší je celá cesta (řádek pod tím)
sudo -u petr bash -c 'echo ahoj >> /home/anna/soubor.txt'   # totéž s celou cestou k souboru. Pozor: když soubor neexistuje, vytvoří se nový
sudo passwd anna                                            # když su - anna napíše Authentication failure, je heslo špatně, nebo ho Anna nemá – tímhle jí ho nastavíš (nebo místo su použij sudo -iu anna)
```

## 16. CO DĚLÁ ADMIN A CO BĚŽNÝ UŽIVATEL

Admin (správce) píše příkazy se sudo a smí všechno. Běžný uživatel (Anna, Petr…) píše bez sudo a smí jen se svými věcmi nebo tam, kde mu dal admin práva. Jestli jsi admin, zjistíš příkazem `groups`: když v seznamu vidíš sudo, jsi admin.

Tady nejsou celé příkazy na opsání, je to jen přehled. Čárka a lomítko znamenají „nebo“, tři tečky … znamenají „a dál napiš, co potřebuješ“. Celé příkazy jsou v kapitolách výš.

Tohle dělá BĚŽNÝ UŽIVATEL sám, bez sudo:

```bash
pwd, ls, cd                          # chodí po složkách a dívá se, co v nich je
mkdir moje_slozka                    # vytváří složky ve své domovské složce
touch, echo, nano                    # vytváří a píše soubory – u sebe, nebo kde má právo w
cat, less, head, tail                # čte soubory, které smí číst (právo r)
cp, mv, rm                           # kopíruje a přesouvá soubory a maže je ve složkách, kam smí psát (w) – hlavně u sebe doma
chmod 600 muj_soubor.txt             # mění práva svých vlastních souborů
chgrp projekty muj_soubor.txt        # dá svůj soubor skupině, ve které sám je (a od přidání se znovu přihlásil, ověří přes id)
setfacl -m u:petr:r muj_soubor.txt   # dá jednomu člověku právo ke svému souboru (ACL)
grep, history, man                   # hledá, dívá se do historie a do návodů
passwd                               # změní heslo sám sobě
id, groups, whoami                   # zjistí, kdo je a ve kterých je skupinách
su - jiny_uzivatel                   # přepne se na jiného, když zná jeho heslo
```

## 17. CO SMÍ JEN ADMIN (SE SUDO)

Tohle běžný uživatel neudělá. Napíše mu to Permission denied (česky Přístup odmítnut), Operation not permitted (česky Operace není povolena) nebo … is not in the sudoers file (na nejnovějším Ubuntu může hláška znít jinak, třeba I'm sorry … I'm afraid I can't do that). Musí to udělat admin a před příkaz dát sudo.

Je to zase jen přehled, celé příkazy jsou v kapitolách výš.

```bash
sudo adduser / useradd           # zakládá nové uživatele
sudo passwd jiny_uzivatel        # mění heslo někomu jinému
sudo groupadd / groupdel         # zakládá a maže skupiny
sudo usermod -aG / gpasswd -d    # přidává lidi do skupin a vyhazuje je
sudo chown / chgrp               # mění majitele souboru (chown smí jen admin) a skupinu u cizích souborů (svůj soubor dá majitel své skupině sám, kapitola 16)
sudo chmod …                     # mění práva cizích souborů a složek
sudo setfacl …                   # dává práva jednotlivým lidem (ACL) u cizích souborů
sudo apt install …               # instaluje programy
sudo cat /etc/shadow             # čte otisky hesel
sudo -u anna … / sudo -iu anna   # dělá věci za jiného uživatele bez jeho hesla
```

## 18. KDYŽ NĚCO NEJDE (CHYBY ZAČÁTEČNÍKA)

**Tady je to jinak:** vlevo je, co uvidíš (nebo co se stalo), vpravo, co s tím.

Chyba je anglicky, nebo česky, když máš Ubuntu v češtině. Tady jsou obě. Nic se tím nerozbilo. Přečti si, co hláška říká, oprav příkaz a zkus to znovu. Šipka nahoru vrátí poslední příkaz, takže ho nemusíš psát celý.

```bash
command not found / příkaz nenalezen                         # překlep v názvu příkazu (zkontroluj písmena a mezery), nebo program není nainstalovaný. Na Ubuntu bývá hláška delší, třeba Command 'xyz' not found, did you mean: … Když v ní je can be installed with: sudo apt install …, program chybí a ten příkaz ho nainstaluje
$: command not found                                         # opsal jsi i znak $. Ten tam píše počítač sám, ty píšeš až za něj
ls-l: command not found                                      # chybí mezera. Správně je ls -l: mezi příkazem a přepínačem musí být mezera
No such file or directory / Adresář nebo soubor neexistuje   # soubor nebo složka tady není: špatné jméno, jiné velké nebo malé písmeno, nebo jsi v jiné složce (zjisti přes pwd a ls)
already exists / File exists                                 # česky je v hlášce slovo „existuje“. To, co zakládáš (uživatel, skupina, složka), už je, třeba z dřívější kapitoly. Nic se nestalo, pokračuj dalším krokem
Directory not empty / Adresář není prázdný                   # rmdir maže jen prázdnou složku. I skrytý soubor se počítá (ukáže ho ls -a). Složku i s obsahem smaže rm -r, ale bez koše a nadobro
Soubor.txt × soubor.txt                                      # jsou to dva různé soubory. Velká a malá písmena se rozlišují
jméno s mezerou nejde                                        # dej ho do uvozovek: cd "Moje slozka". Bez nich to počítač vezme jako dvě různá jména
terminál nereaguje                                           # něco ještě běží: zmáčkni q (less, man), Ctrl+C (tail -f) nebo Ctrl+X (nano)
heslo se nepíše                                              # píše se, jen se neukazuje. Napiš ho naslepo a dej Enter. Když se spleteš, napíše Sorry, try again (na nejnovějším Ubuntu Authentication failed, try again; česky podobně) a zeptá se znovu
Ctrl+C nekopíruje                                            # v terminálu kopíruješ Ctrl+Shift+C a vkládáš Ctrl+Shift+V
zmizel obsah souboru                                         # dal jsi jednu šipku >, ta soubor přepíše. Když chceš připsat na konec, dej dvě >>
zavřelo se okno                                              # napsal jsi exit, když jsi nebyl přepnutý na jiného uživatele. Nic se nestalo, otevři nový terminál (Ctrl+Alt+T)
```

## 19. TYPICKÉ CHYBY S PRÁVY A SKUPINAMI

**Tady je to jinak:** vlevo je, co uvidíš (nebo co se stalo), vpravo, co s tím.

Když něco nefunguje u práv a skupin, je to skoro vždycky jedno z tohohle.

```bash
Permission denied / Přístup odmítnut (i když práva jsou)   # nějaká složka po cestě nemá pro tebe x (průchod). Třeba /home/anna má na Ubuntu 750 a patří skupině anna, kde je jen Anna. Admin to vyřeší skupinou: sudo chgrp projekty /home/anna a sudo chmod 710 /home/anna (kapitola 11, kroky 6 a 7, přečti si i pozor pod nimi). Nebo dá sdílené věci do /srv (kapitola 11 dole). sudo chmod o+x /home/anna nedělej: pak se každý dostane do Anniných složek Dokumenty, Plocha… a přečte je
nová skupina nefunguje                                     # terminál si pamatuje skupiny z přihlášení. Odhlas se z celého počítače a přihlas znovu (nové okno terminálu nestačí). Když to nepomůže ani po odhlášení, restartuj počítač. Nebo v terminálu napiš su - tvoje_jmeno či newgrp nazev_skupiny. Ověříš to příkazem id (bez jména)
Petr pořád píše, i když jsem ho vyhodil                    # má otevřený starý terminál a tam skupinu ještě má. Přestane to platit, až se odhlásí (někdy až po restartu)
chmod 777                                                  # NEDĚLAT! Dá úplně všem všechno – kdokoli soubor přečte a změní (u složky i smaže, co je v ní). Skoro vždycky stačí skupina a 660 (soubor) nebo 2770 (složka, kapitola 11)
Operation not permitted / Operace není povolena            # měníš majitele nebo práva cizího souboru. To smí jen admin (se sudo). Nebo dáváš svůj soubor skupině, kterou tenhle terminál ještě nezná (viz nová skupina nefunguje)
sudo: … not in the sudoers file                            # nejsi admin – tenhle příkaz musí udělat správce. Česky je v hlášce taky slovo sudoers. Na nejnovějším Ubuntu může hláška znít jinak, třeba I'm sorry … I'm afraid I can't do that
usermod -G bez a                                           # člověk vypadl ze všech ostatních doplňkových skupin, i ze sudo. Admin ho musí vrátit: sudo usermod -aG nazev_skupiny jmeno. Když se to stalo tobě (adminovi): hlavně se neodhlašuj a nezavírej terminál! V okně, které máš otevřené, sudo většinou ještě funguje. Hned napiš sudo usermod -aG sudo tvoje_jmeno. Když už nefunguje, musí pomoct jiný admin
```
