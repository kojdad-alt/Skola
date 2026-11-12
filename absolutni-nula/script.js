(() => {
    "use strict";

    const slides = [...document.querySelectorAll(".slide")];
    const dotsWrap = document.getElementById("dots");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const notes = document.getElementById("notes");
    const notesText = document.getElementById("notes-text");
    const notesToggle = document.getElementById("notes-toggle");
    const live = document.getElementById("live");
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;

    slides.forEach((slide, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", `Snímek ${i + 1}: ${slide.dataset.title}`);
        dot.addEventListener("click", () => go(i));
        dotsWrap.append(dot);
    });

    function go(next) {
        index = Math.max(0, Math.min(slides.length - 1, next));
        slides.forEach((slide, i) => {
            const on = i === index;
            slide.classList.toggle("is-active", on);
            slide.toggleAttribute("inert", !on);
            slide.setAttribute("aria-hidden", String(!on));
        });
        [...dotsWrap.children].forEach((dot, i) => {
            dot.classList.toggle("is-active", i === index);
            if (i === index) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
        });
        document.getElementById("progress-bar").style.width = `${((index + 1) / slides.length) * 100}%`;
        document.getElementById("counter").textContent = `${index + 1} / ${slides.length}`;
        document.getElementById("current-title").textContent = slides[index].dataset.title;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
        const note = slides[index].querySelector(".speaker");
        notesText.textContent = note ? note.textContent.trim() : "";
        live.textContent = `Snímek ${index + 1} z ${slides.length}. ${slides[index].dataset.title}`;
        history.replaceState(null, "", `#${index + 1}`);
        if (index === 1) particles.start();
        else particles.stop();
    }

    prevBtn.addEventListener("click", () => go(index - 1));
    nextBtn.addEventListener("click", () => go(index + 1));

    function setNotes(open) {
        notes.hidden = !open;
        notesToggle.setAttribute("aria-pressed", String(open));
    }

    notesToggle.addEventListener("click", () => setNotes(notes.hidden));

    addEventListener("keydown", (event) => {
        if (event.target.closest("input, textarea")) return;
        if (event.key === "n" || event.key === "N") {
            event.preventDefault();
            setNotes(notes.hidden);
            return;
        }
        if ((event.code === "Space" || event.key === " ") && event.target.closest("button, a, summary")) return;
        const forward = ["ArrowRight", "ArrowDown", "PageDown"].includes(event.key);
        const back = ["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key);
        const space = event.code === "Space" || event.key === " ";
        if (forward || (space && !event.shiftKey)) {
            event.preventDefault();
            go(index + 1);
        } else if (back || (space && event.shiftKey)) {
            event.preventDefault();
            go(index - 1);
        } else if (event.key === "Home") {
            event.preventDefault();
            go(0);
        } else if (event.key === "End") {
            event.preventDefault();
            go(slides.length - 1);
        }
    });

    let swipeX = null;
    let swipeY = null;
    addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        if (event.target.closest("input, button, a, summary, .options")) return;
        swipeX = event.clientX;
        swipeY = event.clientY;
    });
    addEventListener("pointerup", (event) => {
        if (swipeX === null) return;
        const dx = event.clientX - swipeX;
        const dy = event.clientY - swipeY;
        swipeX = null;
        swipeY = null;
        if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
        go(index + (dx < 0 ? 1 : -1));
    });

    const particles = (() => {
        const canvas = document.getElementById("particles");
        const ctx = canvas.getContext("2d");
        const stage = document.getElementById("stage");
        const caption = document.getElementById("particle-caption");
        let mode = "hot";
        let dots = [];
        let running = false;
        let raf = 0;

        function seed() {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (!w || !h) return;
            dots = Array.from({ length: 42 }, () => {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.3 + Math.random() * 1.7;
                return {
                    x: 12 + Math.random() * Math.max(1, w - 24),
                    y: 12 + Math.random() * Math.max(1, h - 24),
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    r: 2 + Math.random() * 2.2
                };
            });
        }

        function resize() {
            const dpr = Math.min(devicePixelRatio || 1, 2);
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (!w || !h) return;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        }

        function frame() {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            ctx.clearRect(0, 0, w, h);
            const cold = mode === "cold";
            const scale = cold ? 0.08 : 1;
            ctx.fillStyle = cold ? "rgba(184, 255, 242, 0.92)" : "rgba(255, 140, 104, 0.92)";
            for (const dot of dots) {
                const jitter = cold ? (Math.random() - 0.5) * 0.4 : 0;
                dot.x += dot.vx * scale + jitter;
                dot.y += dot.vy * scale + jitter;
                if (dot.x < dot.r || dot.x > w - dot.r) dot.vx *= -1;
                if (dot.y < dot.r || dot.y > h - dot.r) dot.vy *= -1;
                dot.x = Math.max(dot.r, Math.min(w - dot.r, dot.x));
                dot.y = Math.max(dot.r, Math.min(h - dot.r, dot.y));
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
                ctx.fill();
            }
            if (running && !reduceMotion) raf = requestAnimationFrame(frame);
        }

        document.querySelectorAll(".choice").forEach((button) => {
            button.addEventListener("click", () => {
                mode = button.dataset.mode;
                document.querySelectorAll(".choice").forEach((item) => {
                    const on = item === button;
                    item.classList.toggle("is-on", on);
                    item.setAttribute("aria-pressed", String(on));
                });
                stage.classList.toggle("is-cold", mode === "cold");
                caption.textContent = mode === "cold"
                    ? "Nízká teplota. Pohyb skoro ustal, drobné chvění ale zůstává."
                    : "Vysoká teplota. Částice narážejí rychle a neuspořádaně.";
            });
        });

        addEventListener("resize", () => {
            resize();
            if (reduceMotion && running) frame();
        });

        return {
            start() {
                resize();
                if (running) return;
                running = true;
                if (reduceMotion) frame();
                else raf = requestAnimationFrame(frame);
            },
            stop() {
                running = false;
                cancelAnimationFrame(raf);
            }
        };
    })();

    const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

    function sup(exp) {
        const sign = exp < 0 ? "⁻" : "";
        return sign + String(Math.abs(exp)).replace(/\d/g, (digit) => SUP[digit]);
    }

    function cz(value, digits) {
        return new Intl.NumberFormat("cs-CZ", {
            maximumFractionDigits: digits,
            minimumFractionDigits: 0
        }).format(value).replace("-", "−");
    }

    function formatK(t) {
        if (t === 0) return "0\u00a0K";
        const abs = Math.abs(t);
        if (abs >= 1) return `${cz(t, 2)}\u00a0K`;
        if (abs >= 0.001) return `${cz(t, 3)}\u00a0K`;
        let exp = Math.floor(Math.log10(abs));
        let mant = abs / 10 ** exp;
        if (mant >= 9.995) {
            mant /= 10;
            exp += 1;
        }
        const signed = t < 0 ? -mant : mant;
        return `${cz(signed, 2)} × 10${sup(exp)}\u00a0K`;
    }

    function formatC(c) {
        const digits = Math.abs(c) >= 100 ? 0 : 2;
        return `${cz(c, digits)}\u00a0°C`;
    }

    function parseC(value) {
        const cleaned = String(value).trim().replace(/\s/g, "").replace("−", "-").replace(",", ".");
        if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.") return null;
        const number = Number(cleaned);
        return Number.isFinite(number) ? number : null;
    }

    const celsius = document.getElementById("celsius");
    const celsiusOut = document.getElementById("celsius-out");

    function renderCelsius() {
        const value = parseC(celsius.value);
        if (value === null) {
            celsiusOut.textContent = "Napiš teplotu ve stupních Celsia. Třeba 20, 0 nebo −196.";
            return;
        }
        if (value < -273.15 - 0.0005) {
            celsiusOut.textContent = "Tohle už je pod 0 K. Kelvinova stupnice tady končí. Nižší číslo neznamená ještě větší mráz.";
            return;
        }
        if (Math.abs(value + 273.15) < 0.0008) {
            celsiusOut.textContent = "−273,15 °C = 0 K. To je absolutní nula. Konečným počtem kroků se na ni nedostaneš.";
            return;
        }
        const kelvin = value + 273.15;
        if (Math.abs(value) < 0.0005) {
            celsiusOut.textContent = "0 °C = 273,15 K. To je tání ledu, ne absolutní nula. Chybí ještě právě těch 273,15 kelvinu.";
            return;
        }
        const line = `${formatC(value)} = ${formatK(kelvin)}. `;
        let tail = "Už těsně nad absolutní nulou, a pořád ne na ní.";
        if (value >= 100) tail = "Částice se pohybují velmi rychle.";
        else if (value > 0) tail = "Nad táním ledu, a od absolutní nuly pořád stovky kelvinů.";
        else if (kelvin > 77) tail = "Zima, ale pořád tepleji než kapalný dusík.";
        else if (kelvin > 4.2) tail = "Kolem kapalného dusíku a níž. K nule zbývá ještě pořádný kus.";
        else if (kelvin > 1) tail = "Území kapalného helia.";
        celsiusOut.textContent = line + tail;
    }

    celsius.addEventListener("input", renderCelsius);
    document.querySelectorAll(".c-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            celsius.value = chip.dataset.c.replace(".", ",").replace("-", "−");
            renderCelsius();
        });
    });

    document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            const name = tab.dataset.tab;
            document.querySelectorAll(".tab").forEach((item) => {
                const on = item === tab;
                item.classList.toggle("is-on", on);
                item.setAttribute("aria-pressed", String(on));
            });
            document.getElementById("panel-school").hidden = name !== "school";
            document.getElementById("panel-exact").hidden = name !== "exact";
        });
    });

    const coolTemp = document.getElementById("cool-temp");
    const coolSub = document.getElementById("cool-sub");
    const coolNote = document.getElementById("cool-note");
    const coolStep = document.getElementById("cool-step");
    const thermoFill = document.getElementById("thermo-fill");
    let steps = 0;

    function coolReadout(step) {
        if (step === 0) return { main: "293,15 K", sub: "20 °C · pokoj" };
        if (step === 1) return { main: "29,32 K", sub: "−243,8 °C" };
        if (step === 2) return { main: "2,93 K", sub: "−270,2 °C" };
        if (step === 3) return { main: "0,293 K", sub: "už pod jedním kelvinem" };
        if (step === 4) return { main: "0,029 K", sub: "setiny kelvinu" };
        const mant = 2.9315;
        const exp = 2 - step;
        return { main: `${cz(mant, 2)} × 10${sup(exp)} K`, sub: "pořád kladné číslo" };
    }

    function coolStory(step) {
        if (step === 0) return "Pokojová teplota. Částice ve vzduchu pořád létají stovky metrů za sekundu.";
        if (step === 1) return "29 K, tedy pod kapalným dusíkem. V laboratoři je takový skok mnohem těžší než jedno kliknutí.";
        if (step === 2) return "Necelé 3 K. Území kapalného helia, kde se v roce 1911 objevila supravodivost.";
        if (step <= 5) return "Už jen zlomky kelvinu. Číslo se scvrkává a pořád je větší než nula.";
        if (step <= 8) return "Mikrokelviny. Sem se makroskopická věc dostane jen složitým chlazením.";
        if (step <= 11) return "Nanokelviny. Tady v roce 1995 vznikl Boseho–Einsteinův kondenzát.";
        if (step <= 14) return "Pikokelviny. Sem spadá brémský pokus z roku 2021 (38 pK) i měření z vesmírné stanice v roce 2026 (9,7 pK).";
        return "Další krok přidá jen další nulu za čárkou. Do absolutní nuly jich zbývá nekonečně mnoho.";
    }

    function renderCool() {
        const readout = coolReadout(steps);
        coolTemp.textContent = readout.main;
        coolSub.textContent = readout.sub;
        coolNote.textContent = coolStory(steps);
        coolStep.textContent = `Krok ${steps}`;
        const height = Math.max(8, 100 - steps * 7);
        const hue = Math.min(172, 16 + steps * 11);
        thermoFill.style.height = `${height}%`;
        thermoFill.style.background = `linear-gradient(180deg, hsl(${hue} 85% 64%), hsl(${Math.min(188, hue + 24)} 70% 74%))`;
    }

    document.getElementById("cool-btn").addEventListener("click", () => {
        steps += 1;
        renderCool();
    });
    document.getElementById("cool-reset").addEventListener("click", () => {
        steps = 0;
        renderCool();
    });
    renderCool();

    const MARKS = [
        {
            t: 5800,
            chip: "Slunce",
            title: "Povrch Slunce",
            sub: "asi 5 500 °C",
            text: "Asi 5 800 K. Částice se pohybují tak rychle, že hmota září."
        },
        {
            t: 293.15,
            chip: "Pokoj",
            title: "Pokojová teplota",
            sub: "20 °C",
            text: "Nám je příjemně, ale molekuly vzduchu létají zhruba 500 m/s."
        },
        {
            t: 273.15,
            chip: "Led",
            title: "Tání ledu",
            sub: "0 °C",
            text: "0 °C není konec pohybu. Částice v ledu se pořád chvějí. K absolutní nule zbývá 273 kelvinů."
        },
        {
            t: 77,
            chip: "Dusík",
            title: "Kapalný dusík",
            sub: "asi −196 °C",
            text: "V laboratoři běžná kapalina. Od absolutní nuly ji pořád dělí 77 kelvinů."
        },
        {
            t: 4.2,
            chip: "Helium",
            title: "Kapalné helium",
            sub: "asi −269 °C",
            text: "4,2 K. Varem helia se fyzika v roce 1911 dostala k supravodivosti."
        },
        {
            t: 2.7,
            chip: "Vesmír",
            title: "Prázdný vesmír",
            sub: "asi −270,5 °C",
            text: "Reliktní záření má 2,7 K. I prázdný vesmír je nad absolutní nulou a je teplejší než supratekuté helium."
        },
        {
            t: 2.17,
            chip: "Supratekutost",
            title: "Supratekuté helium",
            sub: "asi −271 °C",
            text: "Pod asi 2,17 K teče helium bez tření a šplhá po stěnách. Vesmír za oknem je proti tomu teplý."
        },
        {
            t: 0.01,
            chip: "Kvantový počítač",
            title: "Kvantový počítač",
            sub: "asi −273,14 °C",
            text: "Procesory kvantových počítačů běží kolem 0,01 K. Od absolutní nuly je dělí setina stupně. Pořád nad ní."
        },
        {
            t: 1.7e-7,
            chip: "Kondenzát",
            title: "Boseho–Einsteinův kondenzát",
            sub: "170 nanokelvinů",
            text: "Roku 1995 ochladili atomy rubidia zhruba na 170 nanokelvinů. Začaly se chovat jako jedna vlna."
        },
        {
            t: 9.7e-12,
            chip: "Rok 2026",
            title: "Nejblíž, kam se člověk dostal",
            sub: "9,7 pikokelvinu",
            text: "V roce 2026 na stanici Tchien-kung ochladili rubidium na 9,7 pikokelvinu. V Brémách roku 2021 to bylo 38 pikokelvinů. Vždy jen na pár sekund a vždy nad nulou."
        },
        {
            t: 0,
            chip: "0 K",
            title: "Absolutní nula",
            sub: "přesně −273,15 °C",
            text: "Konec stupnice. Konečným počtem kroků se na ni nedojde. Blíž už to nejde, protože blíž není kam."
        }
    ];

    const LOG_MAX = Math.log10(5800);
    const LOG_MIN = Math.log10(1e-14);
    const range = document.getElementById("map-range");
    const mapTemp = document.getElementById("map-temp");
    const mapSub = document.getElementById("map-sub");
    const mapTitle = document.getElementById("map-title");
    const mapFact = document.getElementById("map-fact");
    const mapChips = document.getElementById("map-chips");

    function sliderToT(value) {
        const position = Number(value);
        if (position >= 999.5) return 0;
        const log = LOG_MAX - (position / 1000) * (LOG_MAX - LOG_MIN);
        return 10 ** log;
    }

    function tToSlider(t) {
        if (t <= 0) return 1000;
        const clamped = Math.min(5800, Math.max(1e-14, t));
        return (LOG_MAX - Math.log10(clamped)) / (LOG_MAX - LOG_MIN) * 1000;
    }

    function nearest(t) {
        if (t <= 0) return MARKS[MARKS.length - 1];
        let best = null;
        let bestDistance = Infinity;
        for (const mark of MARKS) {
            if (mark.t <= 0) continue;
            const distance = Math.abs(Math.log10(t) - Math.log10(mark.t));
            if (distance < bestDistance) {
                best = mark;
                bestDistance = distance;
            }
        }
        return bestDistance < 0.15 ? best : null;
    }

    function between(t) {
        let warmer = null;
        let colder = null;
        for (const mark of MARKS) {
            if (mark.t > t) warmer = mark;
            else if (mark.t < t && !colder) colder = mark;
        }
        if (warmer && colder) {
            return {
                title: "Mezi zastávkami",
                text: `Jsi mezi zastávkami ${warmer.title} (${formatK(warmer.t)}) a ${colder.title} (${formatK(colder.t)}).`
            };
        }
        return {
            title: "Pořád nad nulou",
            text: "Každá teplota na tomhle jezdci je větší než 0 K. Nula je až na konci."
        };
    }

    function subline(t) {
        if (t <= 0) return "Konec stupnice. Níž teplota nejde.";
        if (t < 1) return "Míň než jeden kelvin nad absolutní nulou.";
        return formatC(t - 273.15);
    }

    function renderMap(t, forced) {
        const mark = forced || nearest(t);
        const info = mark || between(t);
        mapTemp.textContent = formatK(t);
        mapSub.textContent = (mark && mark.sub) || subline(t);
        mapTitle.textContent = info.title;
        mapFact.textContent = info.text;
        range.setAttribute("aria-valuetext", formatK(t));
        [...mapChips.children].forEach((chip) => {
            chip.classList.toggle("is-on", mark ? Number(chip.dataset.i) === MARKS.indexOf(mark) : false);
        });
    }

    MARKS.forEach((mark, i) => {
        if (!mark.chip) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "m-chip";
        button.dataset.i = String(i);
        button.textContent = mark.chip;
        button.addEventListener("click", () => {
            range.value = String(Math.round(tToSlider(mark.t)));
            renderMap(mark.t, mark);
        });
        mapChips.append(button);
    });

    range.addEventListener("input", () => renderMap(sliderToT(range.value), null));
    const room = MARKS[1];
    range.value = String(Math.round(tToSlider(room.t)));
    renderMap(room.t, room);

    document.querySelectorAll(".flip").forEach((card) => {
        card.addEventListener("click", () => {
            const open = !card.classList.contains("is-open");
            card.classList.toggle("is-open", open);
            card.setAttribute("aria-expanded", String(open));
        });
    });

    const QUESTIONS = [
        {
            q: "Absolutní nula je…",
            options: [
                "0 °C, teplota tání ledu",
                "−100 °C, pořádný mrazák",
                "−273,15 °C, tedy 0 K",
                "4,2 K, teplota kapalného helia"
            ],
            correct: 2,
            why: "0 K je přesně −273,15 °C. Nula na Celsiovi je jen tání ledu."
        },
        {
            q: "Co teplota popisuje?",
            options: [
                "Hmotnost částic",
                "Jak rychle se částice tepelně pohybují",
                "Barvu látky",
                "Jen to, jestli je látka pevná"
            ],
            correct: 1,
            why: "Vyšší teplota znamená větší pohybovou energii částic. Ochladit znamená ten pohyb odebrat."
        },
        {
            q: "Proč absolutní nuly nelze dosáhnout?",
            options: [
                "Země je moc blízko Slunce",
                "Konečným počtem kroků se k ní jen blížíme",
                "Brání tomu vzduch v laboratoři",
                "Až bude silnější mrazák, půjde to"
            ],
            correct: 1,
            why: "Třetí termodynamický zákon. Každý krok teplotu jen zmenší. Na nulu by jich muselo být nekonečně mnoho."
        },
        {
            q: "Jak blízko se člověk dostal?",
            options: [
                "Přesně na 0 K",
                "Na kapalný dusík a dál už to nejde",
                "Na necelých 10 pikokelvinů, pořád nad nulou",
                "Na −300 °C, tedy pod absolutní nulu"
            ],
            correct: 2,
            why: "V roce 2026 naměřili na vesmírné stanici 9,7 pikokelvinu. To je těsně nad nulou, ne nula."
        }
    ];

    const quizProgress = document.getElementById("quiz-progress");
    const quizQuestion = document.getElementById("quiz-q");
    const quizOptions = document.getElementById("quiz-options");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizNext = document.getElementById("quiz-next");
    const quizPlay = document.getElementById("quiz-play");
    const quizScore = document.getElementById("quiz-score");
    const scoreNum = document.getElementById("score-num");
    const scoreText = document.getElementById("score-text");
    let questionIndex = 0;
    let score = 0;

    function scoreMessage(value) {
        if (value === 4) return "Čtyři ze čtyř. Tohle můžete v klidu odříkat.";
        if (value === 3) return "Tři ze čtyř. Ještě jednou ten třetí zákon a je to.";
        if (value === 2) return "Dva ze čtyř. Vraťte se na snímky o stupnici a o zákonu.";
        return "Stojí to na dvou větách: −273,15 °C a nekonečně mnoho kroků. Projdi ty snímky ještě jednou.";
    }

    function renderQuestion() {
        const item = QUESTIONS[questionIndex];
        quizProgress.textContent = `Otázka ${questionIndex + 1} / ${QUESTIONS.length}`;
        quizQuestion.textContent = item.q;
        quizOptions.replaceChildren();
        quizFeedback.textContent = "";
        quizFeedback.className = "feedback";
        quizNext.hidden = true;
        item.options.forEach((text, optionIndex) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "option";
            button.textContent = text;
            button.addEventListener("click", () => choose(optionIndex));
            quizOptions.append(button);
        });
    }

    function choose(optionIndex) {
        const buttons = [...quizOptions.children];
        if (buttons[0].disabled) return;
        const item = QUESTIONS[questionIndex];
        const correct = optionIndex === item.correct;
        buttons.forEach((button, i) => {
            button.disabled = true;
            if (i === item.correct) button.classList.add("is-right");
            if (i === optionIndex && !correct) button.classList.add("is-wrong");
        });
        if (correct) score += 1;
        quizFeedback.textContent = `${correct ? "Správně. " : "Tahle ne. "}${item.why}`;
        quizFeedback.classList.add(correct ? "is-good" : "is-bad");
        quizNext.hidden = false;
        quizNext.textContent = questionIndex === QUESTIONS.length - 1 ? "Výsledek" : "Další otázka";
    }

    function showScore() {
        quizPlay.hidden = true;
        quizScore.hidden = false;
        scoreNum.textContent = `${score} / ${QUESTIONS.length}`;
        scoreText.textContent = scoreMessage(score);
    }

    quizNext.addEventListener("click", () => {
        if (questionIndex === QUESTIONS.length - 1) showScore();
        else {
            questionIndex += 1;
            renderQuestion();
        }
    });
    document.getElementById("quiz-retry").addEventListener("click", () => {
        questionIndex = 0;
        score = 0;
        quizScore.hidden = true;
        quizPlay.hidden = false;
        renderQuestion();
    });
    renderQuestion();

    addEventListener("error", (event) => {
        const banner = document.createElement("p");
        banner.textContent = `Chyba skriptu: ${event.message}`;
        banner.style.cssText = "position:fixed;left:12px;right:12px;bottom:86px;z-index:8;background:#4a1612;color:#fff;padding:10px 12px;border-radius:10px";
        document.body.append(banner);
    });

    function indexFromHash() {
        const start = Number((location.hash || "").replace("#", ""));
        return Number.isInteger(start) && start >= 1 ? start - 1 : 0;
    }

    addEventListener("hashchange", () => go(indexFromHash()));
    go(indexFromHash());
})();
