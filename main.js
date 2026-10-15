(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = matchMedia("(max-width: 820px)").matches;
  // ---- signal type: each letter of the name powers on with an irregular flicker, then hums
  const signal = () => { const h = document.querySelector(".sig-type"); if (!h || h.dataset.done) return; h.dataset.done = 1;
    const L = [...h.querySelectorAll(".lt")]; if (reduce) { L.forEach(l => l.classList.add("on")); h.classList.add("lit"); return; }
    const R = (a, b) => a + Math.random() * (b - a); const order = L.map((l, i) => [Math.random(), l]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
    const flick = (l, steps, done) => { let k = 0; const go = () => { if (k >= steps.length) { l.classList.remove("dim"); l.classList.add("on"); done && done(); return; }
      const s = steps[k++]; l.classList.toggle("on", s === 1); l.classList.toggle("dim", s === 2); setTimeout(go, R(25, 110)); }; go(); };
    let left = order.length;
    order.forEach((l, i) => setTimeout(() => flick(l, Array.from({ length: Math.round(R(3, 8)) }, () => [1, 0, 2][Math.floor(Math.random() * 3)]), () => { if (--left === 0) idle(); }), R(0, 1400) + i * 40));
    const idle = () => { h.classList.add("lit"); const tick = () => { const l = L[Math.floor(Math.random() * L.length)];
      flick(l, [0, 1, 2, 1].slice(0, Math.round(R(2, 4)))); setTimeout(tick, R(3500, 9000)); }; setTimeout(tick, R(2500, 5000)); };
  };
  const maxS = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
  // ---- chroma halo: soft ink blooms behind the cursor on the hero
  const hc = document.querySelector(".halo-ink");
  if (hc && !reduce) { const hero = hc.parentElement, ctx = hc.getContext("2d"), S = .5; let bl = [], vis = true, last = 0, raf = 0;
    const cols = [[122,31,53],[70,81,44],[194,162,102],[107,26,44],[94,107,58]];
    const size = () => { hc.width = hero.clientWidth * S; hc.height = hero.clientHeight * S; }; size(); addEventListener("resize", size);
    const add = (x, y, f = 1) => { if (bl.length > 70) bl.shift(); const c = cols[Math.random() < .12 ? 2 : Math.floor(Math.random() * 5)];
      bl.push({ x: x * S, y: y * S, r: (60 + Math.random() * 90) * S * f, a: c[0] === 194 ? .09 : .2, c, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 - .15 }); };
    hero.addEventListener("pointermove", ev => { const r = hero.getBoundingClientRect(), n = performance.now(); if (n - last < 28) return; last = n; add(ev.clientX - r.left, ev.clientY - r.top); }, { passive: true });
    const touch = !matchMedia("(hover: hover)").matches; let idleT = 0;
    const frame = now => { raf = requestAnimationFrame(frame); if (!vis) return;
      if (touch && now - idleT > 140) { idleT = now; const t = now / 1000, w = hero.clientWidth, h = hero.clientHeight; add(w * (.5 + .32 * Math.sin(t * .37)), h * (.45 + .25 * Math.sin(t * .53 + 1)), .9); }
      ctx.clearRect(0, 0, hc.width, hc.height); ctx.globalCompositeOperation = "source-over";
      for (const b of bl) { b.r *= 1.006; b.a *= .982; b.x += b.vx; b.y += b.vy;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r); g.addColorStop(0, `rgba(${b.c},${b.a.toFixed(3)})`); g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.fill(); }
      bl = bl.filter(b => b.a > .01);
      hc.style.opacity = Math.max(0, .9 * (1 - scrollY / (hero.offsetHeight * .8))).toFixed(3); };
    new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe(hero); raf = requestAnimationFrame(frame);
  }
  if (!document.getElementById("price")) return;
  // ---- gold price line through the page
  const svg = document.getElementById("price"), pulse = svg.querySelector(".pulse"), halo = svg.querySelector(".halo"), path = svg.querySelector(".pl"), pc = svg.querySelector(".pc"), tip = svg.querySelector(".tip");
  let len = 0, drawn = 0;
  // live trace: a bright ECG style blip runs along the drawn line into the tip, looping
  if (!reduce) { let lastP = 0; const seg = 140, period = 2400;
    const live = now => { requestAnimationFrame(live); if (mobile && now - lastP < 40) return; lastP = now; if (!len) return;
      const span = Math.min(drawn, innerHeight * 1.4), ph = (now % period) / period, head = drawn - span + span * ph;
      pulse.style.strokeDasharray = `0 ${Math.max(0, head - seg).toFixed(1)} ${seg} ${len}`; pulse.style.opacity = (Math.sin(ph * Math.PI)).toFixed(2); };
    requestAnimationFrame(live); }
  const drawLine = () => {
    const H = document.querySelector("main").scrollHeight, W = innerWidth; svg.setAttribute("height", H); svg.style.height = H + "px"; svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    let r = 11; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    const lo = mobile ? .9 : .88, hi = mobile ? .98 : .97; let x = W * (lo + hi) / 2, d = `M${x.toFixed(1)} ${innerHeight * .9}`, c = "";
    for (let y = innerHeight * .9, i = 0; y < H - 120; y += 46, i++) {
      const nx = Math.min(W * hi, Math.max(W * lo, x + (rnd() - .5) * W * .05)); d += ` L${nx.toFixed(1)} ${y + 46}`;
      if (i % 9 === 4 && !mobile) { const cx = nx - 22, top = y + 10, h = 18 + rnd() * 20, up = rnd() > .45;
        c += `<g class="${up ? "up" : "dn"}"><line x1="${cx}" x2="${cx}" y1="${top - 8}" y2="${top + h + 8}"/><rect x="${cx - 4}" y="${top}" width="8" height="${h.toFixed(0)}"/></g>`; }
      x = nx; }
    path.setAttribute("d", d); pulse.setAttribute("d", d); pc.innerHTML = c; len = path.getTotalLength(); path.style.strokeDasharray = len; };
  const setLine = () => { if (!len) return; const target = scrollY + innerHeight * .6; let lo = 0, hi = len;
    for (let i = 0; i < 16; i++) { const mid = (lo + hi) / 2; if (path.getPointAtLength(mid).y < target) lo = mid; else hi = mid; }
    const at = lo; path.style.strokeDashoffset = len - at; const pt = path.getPointAtLength(at);
    tip.setAttribute("cx", pt.x); tip.setAttribute("cy", pt.y); halo.setAttribute("cx", pt.x); halo.setAttribute("cy", pt.y); drawn = at; };
  drawLine(); setLine(); addEventListener("resize", () => { drawLine(); setLine(); });
  const label = document.querySelector(".now-lbl"), clockLinks = [...document.querySelectorAll(".clock a")];
  const setSession = () => { let cur = clockLinks[0]; clockLinks.forEach(a => { const s = document.getElementById(a.dataset.k); if (s.getBoundingClientRect().top < innerHeight * .5) cur = a; });
    if (scrollY < innerHeight * .5) { label.textContent = "Before the bell"; clockLinks.forEach(a => a.classList.remove("on")); return; }
    clockLinks.forEach(a => a.classList.toggle("on", a === cur)); label.textContent = cur.querySelector("span").textContent; };
  setSession();
  if (reduce || !window.gsap || !window.ScrollTrigger) { signal(); addEventListener("scroll", () => { setLine(); setSession(); }, { passive: true }); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) { const lenis = new Lenis({ lerp: .085 }); lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", ev => { const t = a.getAttribute("href"); if (t.length > 1) { ev.preventDefault(); lenis.scrollTo(t); } })); }
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: () => { setLine(); setSession(); } });
  // hero
  const tl = gsap.timeline({ delay: .2 });
  tl.from(".frame", { clipPath: "inset(0 50% 0 50%)", duration: 1.4, ease: "expo.inOut" })
    .from(".dl,.mast,.mast-sub", { opacity: 0, y: 10, stagger: .1, duration: .8 }, "-=.5")
    .add(() => signal(), "-=.6")
    .from(".tagline", { opacity: 0, y: 8, duration: 1 }, "+=1.4")
    .from(".role,.cue", { opacity: 0, duration: .8, stagger: .1 }, "-=.6");
  gsap.to(".frame", { yPercent: -12, opacity: .3, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  // ledger print: lines are inked left to right
  gsap.utils.toArray(".sec .print").forEach(el => gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)", opacity: .2 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.3, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 88%" } }));
  gsap.utils.toArray(".stage .print").forEach(el => gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.inOut", scrollTrigger: { trigger: el.closest(".scene"), start: "top 70%" } }));
  gsap.from(".stmt", { clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: ".stmt", start: "top 85%" } });
  // The Open: daily candles compress into intraday candles
  const o = gsap.timeline({ scrollTrigger: { trigger: "#open", start: "top top", end: "bottom bottom", scrub: .6 } });
  o.from("#open .c0 .cd, #open .c0 .vol", { scaleY: 0, transformOrigin: "50% 100%", stagger: { amount: .6 }, duration: .2 })
   .from("#open .c0 .piv", { scaleX: 0, transformOrigin: "0% 50%", duration: .2 })
   .from("#open .a0 .clbl", { opacity: 0, y: 6, stagger: .05, duration: .15 })
   .to("#open .c0, #open .a0", { opacity: 0, duration: .4 }, "+=.4")
   .to("#open .c1", { opacity: 1, duration: .1 }, "<")
   .from("#open .c1 .cd", { opacity: 0, stagger: { amount: .6 }, duration: .1 }, "<")
   .from("#open .c1 .sfpl, #open .c1 .mssl", { scaleX: 0, transformOrigin: "0% 50%", duration: .2 })
   .from("#open .c1 .fvg", { opacity: 0, duration: .2 })
   .to("#open .a1", { opacity: 1, duration: .05 }, "<").from("#open .a1 .clbl", { opacity: 0, y: 6, stagger: .05, duration: .15 }, "<")
   .to(".tf span", { yPercent: -100, duration: .2 }, "<")
   .to(".ph0", { opacity: 0, y: -30, duration: .3 }, "<").fromTo(".ph1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .3 }, "<.1")
   .from(".note", { opacity: 0, duration: .3 });
  // Risk: rules turn like pages in a rulebook, stop line draws first
  const rules = gsap.utils.toArray(".rule"); gsap.set(rules.slice(1), { opacity: 0, y: 40 });
  const rk = gsap.timeline({ scrollTrigger: { trigger: "#risk", start: "top top", end: "bottom bottom", scrub: .6 } });
  rk.from(".stop", { scaleX: 0, duration: .4 });
  rules.forEach((r, i) => { if (i) rk.to(rules[i - 1], { opacity: 0, y: -40, duration: .3 }, "+=.4").to(r, { opacity: 1, y: 0, duration: .3 }, "<.1"); });
  rk.to({}, { duration: .3 });
  gsap.to("main>.tape div", { x: -200, ease: "none", scrollTrigger: { trigger: "main>.tape", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".sig", { opacity: 0, x: -20, duration: 1.2, scrollTrigger: { trigger: ".sig", start: "top 92%" } });
  addEventListener("load", () => { ScrollTrigger.refresh(); drawLine(); setLine(); });
  ScrollTrigger.addEventListener("refresh", () => { drawLine(); setLine(); });
})();
