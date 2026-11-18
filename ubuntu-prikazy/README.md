# ZÁKLADNÍ PŘÍKAZY UBUNTU – TERMINÁL

Příkazy se píšou do terminálu a potvrzují Enterem. Vlevo je, co napsat, vpravo, co to udělá. Slova jako soubor.txt, slozka nebo novak jsou jen příklady, místo nich napiš svoje jména.

## 1. NAVIGACE

Terminál je pořád „v nějaké složce“. Tyhle příkazy ti řeknou, kde jsi, co v té složce je, a přesunou tě jinam.

```bash
pwd         # vypíše, ve které složce právě jsi
ls          # vypíše, co je ve složce
ls -l       # totéž, ale s podrobnostmi: práva, majitel, velikost, datum
ls -a       # ukáže i skryté soubory (ty začínají tečkou)
ls -la      # podrobně a i se skrytými
cd slozka   # vleze do složky „slozka“
cd ..       # vyleze o jednu složku výš
cd ~        # skočí do tvé domovské složky (stačí napsat jen cd)
cd /        # skočí úplně na začátek celého disku
```

## 2. SLOŽKY

Vytváření a mazání složek.

```bash
mkdir nazev_slozky               # vytvoří novou složku
mkdir -p projekty/web/podklady   # vytvoří rovnou několik složek v sobě
rmdir nazev_slozky               # smaže složku, ale jen když je prázdná
rm -r nazev_slozky               # smaže složku i se vším uvnitř – pozor, nejde vrátit, žádný koš!
```

## 3. SOUBORY

Vytvoření souboru a zápis textu do něj.

```bash
touch dokument.txt                 # vytvoří prázdný soubor
echo "První řádek" > soubor.txt    # zapíše text do souboru – co tam bylo, zmizí (jedna šipka >)
echo "Druhý řádek" >> soubor.txt   # připíše text na konec, nic nesmaže (dvě šipky >>)
```

## 4. ČTENÍ SOUBORŮ

Jak se podívat, co je v souboru, bez otevírání v editoru.

```bash
cat soubor.txt            # vypíše celý soubor najednou
less soubor.txt           # otevře soubor na listování: šipky, mezerník = další strana, /slovo = hledat, q = konec
head soubor.txt           # ukáže prvních 10 řádků
head -n 20 soubor.txt     # ukáže prvních 20 řádků
tail soubor.txt           # ukáže posledních 10 řádků
tail -n 15 soubor.txt     # ukáže posledních 15 řádků
tail -f /var/log/syslog   # sleduje soubor živě, nové řádky se hned ukazují (konec Ctrl+C)
```

## 5. NANO (EDITOR)

Nano je jednoduchý textový editor přímo v terminálu. Neovládá se myší, ale klávesami. Dole v nano uvidíš ^O, ^X… – znak ^ znamená Ctrl.

```bash
nano soubor.txt   # otevře soubor v editoru (když neexistuje, vytvoří ho)
Ctrl+O            # uložit – pak ještě potvrdit Enterem
Ctrl+X            # zavřít editor
Ctrl+W            # hledat v textu
Ctrl+K            # vyjmout celý řádek
Ctrl+U            # vložit vyjmutý řádek
Ctrl+G            # nápověda
```

## 6. KOPÍROVÁNÍ, PŘESUN, MAZÁNÍ

cp = kopírovat, mv = přesunout nebo přejmenovat, rm = smazat.

```bash
cp zdroj.txt cil.txt              # zkopíruje soubor pod novým jménem
cp soubor.txt /cesta/do/slozky/   # zkopíruje soubor do jiné složky
cp -r slozka1 nova_slozka         # zkopíruje celou složku (-r = i se vším uvnitř)
mv stary.txt novy.txt             # přejmenuje soubor
mv soubor.txt /cesta/do/slozky/   # přesune soubor do jiné složky
rm soubor.txt                     # smaže soubor – nejde vrátit, žádný koš!
```

## 7. GREP (HLEDÁNÍ)

grep hledá slovo v textu a vypíše jen ty řádky, kde to slovo je. Znak | (svislá čára) pošle výsledek jednoho příkazu do dalšího.

```bash
grep "slovo" soubor.txt           # najde řádky se slovem
grep -i "ubuntu" soubor.txt       # totéž, ale nezáleží na velkých a malých písmenech
grep -n "chyba" log.txt           # ukáže i čísla řádků
grep -r "heslo" /home/uzivatel/   # hledá ve všech souborech v celé složce
grep -v "#" config.conf           # naopak: ukáže řádky, kde to NENÍ
grep -c "warning" server.log      # jen spočítá, kolik takových řádků je
grep -w "is" text.txt             # jen celé slovo („is“ najde, „this“ ne)
ls -la | grep "test"              # ze seznamu souborů ukáže jen ty, co mají v názvu „test“
history | grep "apt"              # najde v historii příkazy, kde bylo „apt“
ps aux | grep "firefox"           # zjistí, jestli běží program firefox
```

## 8. UŽITEČNÉ

Klávesy a příkazy, které ušetří spoustu psaní.

```bash
Tab           # doplní název souboru nebo příkazu – stačí napsat začátek
šipky         # nahoru a dolů listuješ příkazy, které jsi už psal
Ctrl+C        # zastaví příkaz, který právě běží
Ctrl+L        # vyčistí obrazovku (to samé jako clear)
history       # vypíše všechny příkazy, které jsi psal
man prikaz    # návod k příkazu, třeba man ls (konec q)
sudo prikaz   # spustí příkaz jako správce počítače (zeptá se na heslo)
```

## 9. UŽIVATELÉ A SKUPINY

Uživatel = účet jednoho člověka. Skupina = parta uživatelů. Skupině můžeš dát práva a dostanou je všichni v ní najednou (třeba celá třída nebo tým).

```bash
sudo adduser novak                     # vytvoří uživatele novak, na všechno se zeptá (heslo, jméno…)
sudo useradd -m -s /bin/bash svoboda   # vytvoří uživatele ručně (-m = udělá mu domovskou složku, -s = terminál bash)
sudo passwd svoboda                    # nastaví uživateli heslo
sudo passwd -d svoboda                 # smaže uživateli heslo
sudo groupadd projekty                 # vytvoří skupinu projekty
sudo groupdel stara_skupina            # smaže skupinu
sudo usermod -aG projekty novak        # přidá uživatele do skupiny – vždycky -aG! Bez „a“ ho to vyhodí ze všech ostatních skupin
sudo gpasswd -d petr projekty          # vyhodí uživatele ze skupiny
id novak                               # ukáže, kdo to je a ve kterých je skupinách
groups novak                           # jen jeho skupiny
newgrp projekty                        # načte novou skupinu hned, bez odhlášení
cat /etc/passwd                        # seznam všech uživatelů v počítači
sudo cat /etc/shadow                   # zašifrovaná hesla (jde jen se sudo)
cat /etc/group                         # seznam všech skupin a kdo v nich je
```

## 10. PRÁVA

Každý soubor a složka má práva pro tři „lidi“: majitele, skupinu a ostatní. Každý z nich může mít r = číst, w = psát (měnit), x = spustit (u složky = vstoupit do ní). Pomlčka znamená, že to nemá.

```bash
ls -l soubor.txt                           # ukáže práva souboru, třeba -rw-r--r--
ls -ld slozka                              # ukáže práva samotné složky (ne toho, co je v ní)
chmod 750 /cesta/ke/slozce                 # majitel všechno, skupina číst a vstoupit, ostatní nic
chmod 644 dokument.txt                     # majitel čte a píše, všichni ostatní jen čtou
chmod g+w projekt.txt                      # skupině přidá právo psát (g = skupina, + = přidat, w = psát)
chmod o-rwx tajne/                         # ostatním vezme všechno (o = ostatní, - = vzít)
chmod +x skript.sh                         # dovolí soubor spustit
sudo chown student soubor.txt              # majitelem souboru bude student
sudo chgrp projekty soubor.txt             # soubor bude patřit skupině projekty
sudo chown student:projekty soubor.txt     # změní majitele i skupinu najednou
sudo chown -R anna:projekty /opt/sdilene   # totéž pro celou složku i se vším uvnitř (-R)
```

**Jak číst `-rw-r--r--`:** první znak je typ (`-` soubor, `d` složka), pak tři trojice: majitel `rw-`, skupina `r--`, ostatní `r--`.

**Písmena v chmod:** `u` majitel, `g` skupina, `o` ostatní, `a` všichni; `+` přidat, `-` vzít.

| písmeno | číslo | znamená |
|---|---|---|
| `r` | 4 | číst |
| `w` | 2 | psát |
| `x` | 1 | spustit / vstoupit do složky |

| součet | práva | znamená |
|---|---|---|
| 7 | `rwx` | všechno |
| 6 | `rw-` | číst a psát |
| 5 | `r-x` | číst a spustit |
| 4 | `r--` | jen číst |
| 0 | `---` | nic |

Tři číslice za sebou = majitel, skupina, ostatní:

| číslo | znamená |
|---|---|
| `755` | majitel všechno, ostatní číst a spustit (programy, složky) |
| `644` | majitel čte a píše, ostatní jen čtou (běžný soubor) |
| `700` | jen majitel, nikdo jiný nic |
| `600` | jen majitel čte a píše |
| `770` | majitel a skupina všechno, ostatní nic |

## 11. SDÍLENÁ SLOŽKA

Cíl: složka, do které můžou psát všichni ze skupiny projekty, ale nikdo jiný.

```bash
sudo groupadd projekty                         # vytvoří skupinu projekty
sudo usermod -aG projekty anna                 # přidá do ní Annu
sudo usermod -aG projekty petr                 # přidá do ní Petra
sudo -u anna mkdir -p /home/anna/tym_sdilene   # Anna si u sebe vytvoří složku (-u anna = udělej to jako Anna)
sudo chgrp projekty /home/anna/tym_sdilene     # složka bude patřit skupině projekty
sudo chmod 2770 /home/anna/tym_sdilene         # majitel a skupina všechno, ostatní nic; dvojka na začátku = nové soubory v ní budou taky patřit skupině
sudo chgrp projekty /home/anna                 # Annina domovská složka bude taky patřit skupině…
sudo chmod 710 /home/anna                      # …ale skupina jí smí jen projít, nevidí, co v ní je
ls -ld /home/anna                              # kontrola
ls -ld /home/anna/tym_sdilene                  # kontrola
```

## 12. PRÁVO PSÁT DO SOUBORU PRO URČITÉ LIDI

Chceš, aby do jednoho souboru mohli psát jen někteří lidi. Uděláš pro ně skupinu, dáš do ní ty lidi a souboru dovolíš, aby skupina psala.

```bash
sudo groupadd zapisovatele           # 1. vytvoří skupinu zapisovatele
sudo usermod -aG zapisovatele anna   # 2. přidá do ní Annu (vždycky -aG!)
sudo usermod -aG zapisovatele petr   # …a Petra
sudo chgrp zapisovatele soubor.txt   # 3. soubor bude patřit téhle skupině
sudo chmod g+w soubor.txt            # 4. skupina smí do souboru psát
sudo chmod 664 soubor.txt            # nebo místo bodu 4: majitel a skupina čtou i píšou, ostatní jen čtou
sudo chmod 660 soubor.txt            # totéž, ale ostatní ho ani nepřečtou
ls -l soubor.txt                     # 5. kontrola: má tam být -rw-rw-r-- a zapisovatele
newgrp zapisovatele                  # přidaný člověk musí skupinu načíst (nebo se odhlásit a znovu přihlásit), jinak to nefunguje
sudo chgrp zapisovatele /home/anna   # když je soubor v cizí domovské složce, skupina tou složkou musí projít…
sudo chmod 710 /home/anna            # …tohle jí dovolí jen projít, ne koukat dovnitř
```

## 13. PRÁVO JEN PRO JEDNOHO ČLOVĚKA (ACL)

Když je to jen jeden člověk a nechceš kvůli němu dělat skupinu.

```bash
sudo apt install acl                   # nainstaluje ACL, když v počítači chybí
sudo setfacl -m u:anna:rw soubor.txt   # Anna smí soubor číst i psát (u = uživatel, rw = číst a psát)
getfacl soubor.txt                     # kontrola, kdo má jaká práva
sudo setfacl -x u:anna soubor.txt      # Anně to právo zase vezme
```

## 14. ODEBRÁNÍ PRÁV

Když chceš práva zase vzít.

```bash
sudo chmod g-w soubor.txt           # skupině vezme psaní, číst může dál
sudo chmod g-rwx soubor.txt         # skupině vezme úplně všechno
sudo gpasswd -d petr zapisovatele   # vyhodí Petra ze skupiny (ostatní píšou dál)
sudo chgrp anna soubor.txt          # soubor bude zase patřit jen Anně…
sudo groupdel zapisovatele          # …a pak jde skupinu smazat
```

## 15. PŘÍKAZY ZA JINÉHO UŽIVATELE

Hodí se, když chceš vyzkoušet, jestli třeba Anna nebo Petr opravdu smí do souboru psát. Admin (ty se sudo) se může přepnout na kohokoli.

```bash
su - anna                                        # přepne tě na Annu, zeptá se na Annino heslo; pak všechno píšeš jako Anna
sudo -iu anna                                    # totéž, ale stačí tvoje admin heslo
whoami                                           # vypíše, za koho právě jsi
exit                                             # vrátí tě zpátky k sobě
sudo -u anna touch /home/anna/test.txt           # jeden příkaz za Annu, bez přepínání
sudo -u petr bash -c 'echo ahoj >> soubor.txt'   # zkouška, jestli Petr smí psát – „Permission denied“ = nesmí
sudo passwd anna                                 # když su - anna nefunguje, Anna asi nemá heslo – tímhle jí ho nastavíš
```

## 16. CO DĚLÁ ADMIN A CO BĚŽNÝ UŽIVATEL

Admin (správce) píše příkazy se sudo a smí všechno. Běžný uživatel (Anna, Petr…) píše bez sudo a smí jen se svými věcmi nebo tam, kde mu dal admin práva. Tohle dělá BĚŽNÝ UŽIVATEL sám, bez sudo:

```bash
pwd, ls, cd                # chodí po složkách a dívá se, co v nich je
mkdir moje_slozka          # vytváří složky ve své domovské složce
touch, echo, nano          # vytváří a píše soubory – u sebe, nebo kde má právo w
cat, less, head, tail      # čte soubory, které smí číst (právo r)
cp, mv, rm                 # kopíruje, přesouvá a maže svoje soubory
chmod 600 muj_soubor.txt   # mění práva svých vlastních souborů
grep, history, man         # hledá, dívá se do historie a do návodů
passwd                     # změní heslo sám sobě
id, groups, whoami         # zjistí, kdo je a ve kterých je skupinách
su - jiny_uzivatel         # přepne se na jiného, když zná jeho heslo
```

## 17. CO SMÍ JEN ADMIN (SE SUDO)

Tohle běžný uživatel neudělá – napíše mu to „Permission denied“ nebo „not in the sudoers file“. Musí to udělat admin a před příkaz dát sudo.

```bash
sudo adduser / useradd           # zakládá nové uživatele
sudo passwd jiny_uzivatel        # mění heslo někomu jinému
sudo groupadd / groupdel         # zakládá a maže skupiny
sudo usermod -aG / gpasswd -d    # přidává lidi do skupin a vyhazuje je
sudo chown / chgrp               # mění majitele nebo skupinu souboru
sudo chmod …                     # mění práva cizích souborů a složek
sudo setfacl …                   # dává práva jednotlivým lidem (ACL) u cizích souborů
sudo apt install …               # instaluje programy
sudo cat /etc/shadow             # čte zašifrovaná hesla
sudo -u anna … / sudo -iu anna   # dělá věci za jiného uživatele bez jeho hesla
```
