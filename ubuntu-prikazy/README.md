# ZÁKLADNÍ PŘÍKAZY UBUNTU – TERMINÁL

## 1. NAVIGACE

```bash
pwd                 # kde právě jsem
ls                  # obsah složky
ls -l               # podrobný výpis (práva, vlastník, velikost)
ls -a               # i skryté soubory
ls -la              # podrobně včetně skrytých
cd slozka           # do složky
cd ..               # o úroveň výš
cd ~                # domů (nebo jen cd)
cd /                # do kořene systému
```

## 2. SLOŽKY

```bash
mkdir nazev_slozky
mkdir -p projekty/web/podklady   # víc úrovní naráz
rmdir nazev_slozky               # smaže prázdnou složku
rm -r nazev_slozky               # smaže složku i s obsahem
```

## 3. SOUBORY

```bash
touch dokument.txt                     # prázdný soubor
echo "První řádek" > soubor.txt        # vytvoří / přepíše
echo "Druhý řádek" >> soubor.txt       # připíše na konec
```

## 4. ČTENÍ SOUBORŮ

```bash
cat soubor.txt
less soubor.txt          # šipky, mezerník, /hledat, q = konec
head soubor.txt          # prvních 10 řádků
head -n 20 soubor.txt
tail soubor.txt          # posledních 10 řádků
tail -n 15 soubor.txt
tail -f /var/log/syslog  # sledování živě
```

## 5. NANO (EDITOR)

```
nano soubor.txt

Ctrl+O  uložit (potvrdit Enter)
Ctrl+X  konec
Ctrl+W  hledat
Ctrl+K  vyjmout řádek
Ctrl+U  vložit
Ctrl+G  nápověda
```

## 6. KOPÍROVÁNÍ, PŘESUN, MAZÁNÍ

```bash
cp zdroj.txt cil.txt
cp soubor.txt /cesta/do/slozky/
cp -r slozka1 nova_slozka
mv stary.txt novy.txt            # přejmenování
mv soubor.txt /cesta/do/slozky/  # přesun
rm soubor.txt                    # nevratné!
```

## 7. GREP (HLEDÁNÍ)

```bash
grep "slovo" soubor.txt
grep -i "ubuntu" soubor.txt      # bez ohledu na velikost písmen
grep -n "chyba" log.txt          # s čísly řádků
grep -r "heslo" /home/uzivatel/  # v celé složce
grep -v "#" config.conf          # řádky BEZ výrazu
grep -c "warning" server.log     # jen počet
grep -w "is" text.txt            # jen celá slova
ls -la | grep "test"
history | grep "apt"
ps aux | grep "firefox"
```

## 8. UŽITEČNÉ

```
Tab        doplňování
šipky      historie příkazů
Ctrl+C     přerušit příkaz
Ctrl+L     vyčistit obrazovku (nebo clear)

history
man prikaz
sudo prikaz
```

## 9. UŽIVATELÉ A SKUPINY

```bash
sudo adduser novak                       # interaktivně
sudo useradd -m -s /bin/bash svoboda     # ručně
sudo passwd svoboda                      # nastavit heslo
sudo passwd -d svoboda                   # smazat heslo
sudo groupadd projekty
sudo groupdel stara_skupina
sudo usermod -aG projekty novak          # přidat do skupiny (vždy -aG!)
sudo gpasswd -d petr projekty            # odebrat ze skupiny
id novak
groups novak
newgrp projekty                          # načíst novou skupinu bez odhlášení
cat /etc/passwd
sudo cat /etc/shadow
cat /etc/group
```

## 10. PRÁVA

```bash
ls -l soubor.txt
ls -ld slozka
chmod 750 /cesta/ke/slozce
chmod 644 dokument.txt
chmod g+w projekt.txt        # skupině přidá zápis
chmod o-rwx tajne/           # ostatním odebere vše
chmod +x skript.sh           # spustitelný pro všechny
sudo chown student soubor.txt
sudo chgrp projekty soubor.txt
sudo chown student:projekty soubor.txt
sudo chown -R anna:projekty /opt/sdilene

Čísla práv: r = 4, w = 2, x = 1
Nejčastější kombinace: 755, 644, 700, 600, 770
```

## 11. SDÍLENÁ SLOŽKA

```bash
sudo groupadd projekty
sudo usermod -aG projekty anna
sudo usermod -aG projekty petr
sudo -u anna mkdir -p /home/anna/tym_sdilene
sudo chgrp projekty /home/anna/tym_sdilene
sudo chmod 2770 /home/anna/tym_sdilene   # 2 = setgid, nové soubory dostanou skupinu projekty
sudo chgrp projekty /home/anna
sudo chmod 710 /home/anna                # skupina může jen projít, ne číst
ls -ld /home/anna
ls -ld /home/anna/tym_sdilene
```
