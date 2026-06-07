/* ============================================================
   Xudumela — Prototype interactivity
   No build step. Plain ES, IntersectionObserver, light GSAP-ish.
   ============================================================ */

(() => {
  // ---- Nav active state on scroll
  const nav = document.querySelector('.nav-fixed');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Scroll progress bar — thin gold rail at the very top
  (() => {
    const wrap = document.createElement('div');
    wrap.className = 'scroll-progress';
    wrap.setAttribute('aria-hidden', 'true');
    const bar = document.createElement('div');
    bar.className = 'bar';
    wrap.appendChild(bar);
    document.body.appendChild(wrap);

    let ticking = false;
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  // ---- Hero mark: letter reveal
  const heroMark = document.querySelector('[data-hero-mark]');
  if (heroMark) {
    const text = heroMark.textContent.trim();
    heroMark.textContent = '';
    text.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.style.display = ch === ' ' ? 'inline' : 'inline-block';
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.transition = `transform 1.1s cubic-bezier(0.22,1,0.36,1) ${300 + i * 70}ms, opacity 1.1s ease ${300 + i * 70}ms`;
      heroMark.appendChild(s);
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroMark.querySelectorAll('.char').forEach(c => {
          c.style.transform = 'none';
          c.style.opacity = '1';
        });
      });
    });
  }

  // ---- Hero strap line reveal
  document.querySelectorAll('[data-strap]').forEach((el, idx) => {
    const lines = el.querySelectorAll('.line span');
    lines.forEach((line, i) => {
      line.style.transition = `transform 1.1s cubic-bezier(0.22,1,0.36,1) ${800 + idx * 200 + i * 120}ms`;
    });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      lines.forEach(line => { line.style.transform = 'none'; });
    }));
  });

  // ---- Reveal on scroll (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  document.querySelectorAll('.r-up, .r-fade, .r-split').forEach(el => io.observe(el));

  // ---- Word-split helper for .r-split elements that haven't been pre-split
  document.querySelectorAll('.r-split[data-split]').forEach(el => {
    const text = el.textContent.trim();
    el.textContent = '';
    text.split(/(\s+)/).forEach(part => {
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(' '));
      } else {
        const w = document.createElement('span');
        w.className = 'word';
        const inner = document.createElement('span');
        inner.textContent = part;
        w.appendChild(inner);
        el.appendChild(w);
      }
    });
  });

  // ---- Counter animation
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const dur = parseInt(el.dataset.duration || '1800', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = target * eased;
        el.textContent = prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  // ---- Parallax on .parallax-y elements
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    let ticking = false;
    const onScrollP = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        parallaxEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          const speed = parseFloat(el.dataset.parallax || '0.2');
          const offset = (rect.top + sy - window.innerHeight) * speed * -0.5;
          el.style.transform = `translateY(${offset.toFixed(1)}px)`;
        });
        ticking = false;
      });
    };
    document.addEventListener('scroll', onScrollP, { passive: true });
  }

  // ---- Year in footer
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // ---- Hero celestial panel — live local time + sun/moon arc
  (() => {
    const el = document.querySelector('[data-celestial]');
    if (!el) return;
    const lat = -19.27, lng = 22.85;
    const clockEl = el.querySelector('[data-clock]');
    const stateEl = el.querySelector('[data-sun-state]');
    const detailEl = el.querySelector('[data-sun-detail]');
    const body = el.querySelector('[data-arc-body]');

    // Minutes-since-midnight in Africa/Gaborone (SAST, UTC+2)
    const sastNowMin = () => {
      const p = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Africa/Gaborone' });
      return { h: +p.slice(0, 2), m: +p.slice(3, 5), s: +p.slice(6, 8), min: (+p.slice(0, 2)) * 60 + (+p.slice(3, 5)) };
    };

    // Live ticking clock
    const tick = () => {
      const t = sastNowMin();
      const hh = String(t.h).padStart(2, '0');
      const mm = String(t.m).padStart(2, '0');
      const ss = String(t.s).padStart(2, '0');
      if (clockEl) clockEl.innerHTML = `${hh}:${mm}<span class="secs">${ss}</span>`;
    };
    tick();
    setInterval(tick, 1000);

    let srMin = 6 * 60 + 15, ssMin = 17 * 60 + 50; // sensible defaults for Maun
    const fmt = min => {
      min = ((min % 1440) + 1440) % 1440;
      return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(Math.round(min % 60)).padStart(2, '0');
    };
    const dur = min => {
      const h = Math.floor(min / 60), m = Math.round(min % 60);
      return (h > 0 ? h + 'h ' : '') + m + 'm';
    };

    const place = () => {
      const now = sastNowMin().min;
      const isDay = now >= srMin && now < ssMin;
      let p;
      if (isDay) {
        p = (now - srMin) / Math.max(1, ssMin - srMin);
      } else {
        // Night: from sunset to next sunrise (srMin + 1440)
        const nightLen = (srMin + 1440) - ssMin;
        const into = now >= ssMin ? now - ssMin : now + 1440 - ssMin;
        p = into / Math.max(1, nightLen);
      }
      p = Math.max(0, Math.min(1, p));
      // Ellipse: centre (100,76), rx 85, ry 58; theta from 180deg (left) to 0deg (right)
      const theta = (1 - p) * Math.PI;
      const cx = 100 + 85 * Math.cos(theta);
      const cy = 76 - 58 * Math.sin(theta);
      body.setAttribute('transform', `translate(${cx.toFixed(1)},${cy.toFixed(1)})`);

      if (isDay) {
        el.classList.remove('is-night');
        body.classList.remove('moon');
        const toSunset = ssMin - now;
        // Golden-hour windows
        if (now - srMin < 45) stateEl.textContent = 'Sunrise · golden hour';
        else if (toSunset < 45) stateEl.textContent = 'Sunset · golden hour';
        else stateEl.textContent = 'Daylight';
        detailEl.innerHTML = `↑ ${fmt(srMin)} &nbsp; ↓ ${fmt(ssMin)} · in ${dur(toSunset)}`;
      } else {
        el.classList.add('is-night');
        body.classList.add('moon');
        const toSunrise = now >= ssMin ? (srMin + 1440 - now) : (srMin - now);
        stateEl.textContent = 'Night';
        detailEl.innerHTML = `↓ ${fmt(ssMin)} &nbsp; ↑ ${fmt(srMin)} · in ${dur(toSunrise)}`;
      }
    };

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=sunrise,sunset&timezone=Africa%2FGaborone&forecast_days=1`, { cache: 'default' })
      .then(r => r.json())
      .then(d => {
        const sr = d.daily?.sunrise?.[0];
        const ss = d.daily?.sunset?.[0];
        if (sr) srMin = (+sr.slice(11, 13)) * 60 + (+sr.slice(14, 16));
        if (ss) ssMin = (+ss.slice(11, 13)) * 60 + (+ss.slice(14, 16));
        place();
      })
      .catch(() => place());

    place();
    setInterval(place, 60000);
  })();

  // ---- Sky panel (sun + moon detail) — Weather page only
  (() => {
    const root = document.querySelector('[data-sky]');
    if (!root) return;
    const lat = -19.27, lng = 22.85;
    const TZ = 'Africa/Gaborone';

    const set = (sel, val) => {
      const el = root.querySelector(sel);
      if (el != null && val != null) el.textContent = val;
    };
    const pad = n => String(n).padStart(2, '0');
    const hhmmFromIso = iso => iso.slice(11, 16);
    const dur = mins => {
      const h = Math.floor(mins / 60);
      const m = Math.round(mins - h * 60);
      return `${h}h ${pad(m)}m`;
    };
    const dateLabel = d => d.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', timeZone: TZ,
    });

    // Moon phase: reference new moon JD 2451550.1 (2000-01-06 18:14 UTC)
    const moonPhase = (date) => {
      const jd = date.getTime() / 86400000 + 2440587.5;
      const synodic = 29.53058867;
      const p = ((jd - 2451550.1) % synodic + synodic) % synodic / synodic;
      const illum = (1 - Math.cos(p * 2 * Math.PI)) / 2;
      const buckets = [
        [0.03, 'New moon'],
        [0.22, 'Waxing crescent'],
        [0.28, 'First quarter'],
        [0.47, 'Waxing gibbous'],
        [0.53, 'Full moon'],
        [0.72, 'Waning gibbous'],
        [0.78, 'Last quarter'],
        [0.97, 'Waning crescent'],
        [1.01, 'New moon'],
      ];
      let name = 'New moon';
      for (const [t, n] of buckets) { if (p <= t) { name = n; break; } }
      return { phase: p, illum, name };
    };
    const nextPhase = (from, target) => {
      const synodic = 29.53058867;
      const { phase: now } = moonPhase(from);
      let dist = (target - now + 1) % 1;
      if (dist < 0.005) dist += 1;
      return new Date(from.getTime() + dist * synodic * 86400000);
    };

    // Moon info doesn't need the network
    const now = new Date();
    const m = moonPhase(now);
    set('[data-sky-moonphase]', m.name);
    set('[data-sky-moonillum]', Math.round(m.illum * 100) + '% illuminated');
    set('[data-sky-nextfull]', dateLabel(nextPhase(now, 0.5)));
    set('[data-sky-nextnew]', dateLabel(nextPhase(now, 0.0)));

    // Sun timings from Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=sunrise,sunset,daylight_duration&timezone=Africa%2FGaborone&forecast_days=1`;
    fetch(url, { cache: 'default' })
      .then(r => r.json())
      .then(d => {
        const sr = d.daily?.sunrise?.[0];
        const ss = d.daily?.sunset?.[0];
        const dl = d.daily?.daylight_duration?.[0];
        if (sr) set('[data-sky-sunrise]', hhmmFromIso(sr));
        if (ss) set('[data-sky-sunset]', hhmmFromIso(ss));
        if (sr && ss) {
          const sm = (+sr.slice(11, 13)) * 60 + (+sr.slice(14, 16));
          const em = (+ss.slice(11, 13)) * 60 + (+ss.slice(14, 16));
          const noon = (sm + em) / 2;
          set('[data-sky-noon]', `${pad(Math.floor(noon / 60))}:${pad(Math.round(noon % 60))}`);
          // Golden hour window: sunrise + 45m and sunset - 45m, rendered as two windows
          const goldStart1 = sm;
          const goldEnd1 = sm + 45;
          const goldStart2 = em - 45;
          const goldEnd2 = em;
          const fmt = mins => `${pad(Math.floor(mins / 60))}:${pad(Math.round(mins % 60))}`;
          set('[data-sky-golden]', `${fmt(goldStart1)}–${fmt(goldEnd1)}  ·  ${fmt(goldStart2)}–${fmt(goldEnd2)}`);
        }
        if (dl) set('[data-sky-daylength]', dur(dl / 60));
      })
      .catch(() => {});
  })();

  // ---- Live weather (Open-Meteo, no API key)
  (() => {
    const panel = document.querySelector('[data-weather]');
    if (!panel) return;

    const lat = -19.27, lng = 22.85;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Africa%2FGaborone&forecast_days=2`;

    const codeMap = {
      0:  { label: 'Clear sky',         icon: 'sun' },
      1:  { label: 'Mainly clear',      icon: 'sun-cloud' },
      2:  { label: 'Partly cloudy',     icon: 'sun-cloud' },
      3:  { label: 'Overcast',          icon: 'cloud' },
      45: { label: 'Fog',               icon: 'fog' },
      48: { label: 'Rime fog',          icon: 'fog' },
      51: { label: 'Light drizzle',     icon: 'rain' },
      53: { label: 'Drizzle',           icon: 'rain' },
      55: { label: 'Heavy drizzle',     icon: 'rain' },
      61: { label: 'Light rain',        icon: 'rain' },
      63: { label: 'Rain',              icon: 'rain' },
      65: { label: 'Heavy rain',        icon: 'rain' },
      71: { label: 'Snow',              icon: 'snow' },
      80: { label: 'Showers',           icon: 'rain' },
      81: { label: 'Heavy showers',     icon: 'rain' },
      82: { label: 'Violent showers',   icon: 'rain' },
      95: { label: 'Thunderstorm',      icon: 'thunder' },
      96: { label: 'Thunderstorm + hail', icon: 'thunder' },
      99: { label: 'Heavy thunderstorm',icon: 'thunder' },
    };

    const icons = {
      sun: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="12"/><line x1="32" y1="6" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="58"/><line x1="6" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="58" y2="32"/><line x1="14" y1="14" x2="20" y2="20"/><line x1="44" y1="44" x2="50" y2="50"/><line x1="14" y1="50" x2="20" y2="44"/><line x1="44" y1="20" x2="50" y2="14"/></svg>',
      'sun-cloud': '<svg viewBox="0 0 64 64"><circle cx="22" cy="22" r="8"/><line x1="22" y1="6" x2="22" y2="11"/><line x1="6" y1="22" x2="11" y2="22"/><line x1="11" y1="11" x2="14" y2="14"/><path d="M 24 42 C 24 35 30 32 36 33 C 40 28 50 28 52 35 C 58 36 58 46 50 46 H 26 C 22 46 22 42 24 42 Z"/></svg>',
      cloud: '<svg viewBox="0 0 64 64"><path d="M 14 42 C 14 32 22 28 30 30 C 34 22 50 22 54 32 C 60 34 60 48 50 48 H 18 C 12 48 12 42 14 42 Z"/></svg>',
      fog: '<svg viewBox="0 0 64 64"><path d="M 14 32 C 14 24 22 20 30 22 C 34 16 48 16 52 24 C 58 26 58 38 48 38 H 18 C 12 38 12 32 14 32 Z"/><line x1="10" y1="48" x2="54" y2="48"/><line x1="14" y1="56" x2="50" y2="56"/></svg>',
      rain: '<svg viewBox="0 0 64 64"><path d="M 14 30 C 14 22 22 18 30 20 C 34 14 48 14 52 22 C 58 24 58 36 48 36 H 18 C 12 36 12 30 14 30 Z"/><line x1="22" y1="44" x2="18" y2="54"/><line x1="32" y1="44" x2="28" y2="54"/><line x1="42" y1="44" x2="38" y2="54"/></svg>',
      thunder: '<svg viewBox="0 0 64 64"><path d="M 14 28 C 14 20 22 16 30 18 C 34 12 48 12 52 20 C 58 22 58 34 48 34 H 18 C 12 34 12 28 14 28 Z"/><path d="M 32 38 L 26 50 L 32 50 L 28 60"/></svg>',
      snow: '<svg viewBox="0 0 64 64"><path d="M 14 30 C 14 22 22 18 30 20 C 34 14 48 14 52 22 C 58 24 58 36 48 36 H 18 C 12 36 12 30 14 30 Z"/><line x1="20" y1="46" x2="20" y2="56"/><line x1="32" y1="46" x2="32" y2="56"/><line x1="44" y1="46" x2="44" y2="56"/></svg>',
    };

    const setIcon = name => {
      const wrap = panel.querySelector('[data-weather-icon]');
      if (wrap) wrap.innerHTML = icons[name] || icons.sun;
    };

    fetch(url, { cache: 'default' })
      .then(r => r.json())
      .then(d => {
        const c = d.current || {};
        const daily = d.daily || {};
        const code = c.weather_code;
        const info = codeMap[code] || { label: 'Conditions', icon: 'sun-cloud' };
        const isDay = c.is_day === 1;

        const set = (sel, val) => { const el = panel.querySelector(sel); if (el) el.textContent = val; };
        set('[data-weather-temp]', Math.round(c.temperature_2m) + '°');
        set('[data-weather-desc]', info.label);
        set('[data-weather-wind]', Math.round(c.wind_speed_10m) + ' km/h');
        set('[data-weather-humid]', Math.round(c.relative_humidity_2m) + '%');
        const mn = Math.round(daily.temperature_2m_min?.[0] ?? 0);
        const mx = Math.round(daily.temperature_2m_max?.[0] ?? 0);
        set('[data-weather-range]', mn + '° / ' + mx + '°');
        // Tomorrow's expected high (second day in the daily series)
        const tmax = daily.temperature_2m_max?.[1];
        set('[data-weather-tomorrow]', tmax != null ? Math.round(tmax) + '°' : '—');
        // Today's sunset (ISO local time → HH:MM)
        const sunset = daily.sunset?.[0];
        set('[data-weather-sunset]', sunset ? sunset.slice(11, 16) : '—');
        const now = new Date();
        set('[data-weather-time]', now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Gaborone' }) + ' SAST');
        setIcon(info.icon);
      })
      .catch(() => {
        const set = (sel, val) => { const el = panel.querySelector(sel); if (el) el.textContent = val; };
        set('[data-weather-temp]', '—');
        set('[data-weather-desc]', 'Live feed unavailable');
        set('[data-weather-tomorrow]', '—');
        set('[data-weather-sunset]', '—');
        setIcon('sun-cloud');
      });
  })();

  // ---- Monthly weather chart (climate averages for Maun)
  (() => {
    const chart = document.querySelector('[data-month-chart]');
    if (!chart) return;
    // Climate averages — high temp °C, rainfall mm
    // Source: Maun climate norm (approximate)
    const months = [
      { m: 'Jan', t: 32, r: 100 }, { m: 'Feb', t: 32, r: 85 },
      { m: 'Mar', t: 31, r: 75 },  { m: 'Apr', t: 30, r: 25 },
      { m: 'May', t: 27, r: 5 },   { m: 'Jun', t: 25, r: 1 },
      { m: 'Jul', t: 26, r: 1 },   { m: 'Aug', t: 29, r: 1 },
      { m: 'Sep', t: 33, r: 3 },   { m: 'Oct', t: 35, r: 25 },
      { m: 'Nov', t: 34, r: 60 },  { m: 'Dec', t: 33, r: 95 },
    ];
    const maxT = Math.max(...months.map(m => m.t));
    const maxR = Math.max(...months.map(m => m.r));
    const nowMonth = new Date().getMonth();
    chart.innerHTML = months.map((row, i) => {
      const tH = Math.round((row.t / maxT) * 78);
      const rH = Math.round((row.r / maxR) * 26);
      return `<div class="month-bar${i === nowMonth ? ' now' : ''}">
        <span class="month-tag">${i === nowMonth ? '· NOW ·' : ''}</span>
        <div class="bar-track">
          <span class="bar-temp-val">${row.t}°</span>
          <div class="bar-temp" style="height:${tH}px"></div>
          <div class="bar-rain" style="height:${rH}px"></div>
        </div>
        <span class="month-name">${row.m}</span>
      </div>`;
    }).join('');
  })();

  // ---- Days-until countdown for Poachella (2 Oct 2026)
  const dec = document.querySelector('[data-days-to]');
  if (dec) {
    const target = new Date(dec.dataset.daysTo);
    const ms = target.getTime() - Date.now();
    const days = Math.max(0, Math.ceil(ms / 86400000));
    dec.textContent = String(days);
  }

  // ============================================================
  // Topographic contour layer — strictly background, never above content
  // Four hand-drawn patterns rotated across sections like sheet music.
  // ============================================================
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // Contour generator — proper marching-squares isolines.
  // Every line is a level-set of a synthetic height field, so by
  // construction lines never cross each other.
  // ============================================================

  // Height fields per variant.
  //
  // Peaks come in two formats:
  //   [cx, cy, sigma, amplitude]                                    — circular
  //   [cx, cy, sigmaX, sigmaY, rotationRadians, amplitude]          — anisotropic
  //
  // Each variant stacks 3–5 peaks (mixed orientations) and a layered noise
  // field. The mix of features breaks the perfect-circle look so contours
  // bend irregularly, like a real Ordnance Survey sheet.
  //
  // placement: 'tr' | 'tl' | 'br' | 'bl' | 'r' | 'l' | 't' | 'b'
  // anchor:    SVG preserveAspectRatio align, matching placement
  const variantFields = {
    hill: {
      // Cluster of peaks anchored top-right: a main summit, an elongated
      // shoulder on each side, and a small foothill
      peaks: [
        [950, 220, 95, 1.35],                       // main rounded summit
        [870, 175, 45, 90,  -0.6, 0.55],            // elongated shoulder NW
        [1040, 305, 55, 110, 0.35, 0.55],           // ridge extending SE
        [800, 320, 70, 0.45],                       // detached foothill
        [1090, 200, 35, 0.3],                       // small bump on the side
      ],
      noise:    { amp: 0.12, freq: 0.022, phase: [1.7, 0.4] },
      gradient: { dx: 0, dy: 0 },
      levels:   stepRange(0.1, 1.32, 18),
      placement: 'tr',
      anchor: 'xMaxYMin slice',
    },
    valley: {
      // Depression cluster anchored bottom-left
      peaks: [
        [280, 600, 110, -1.4],                      // main basin
        [220, 540, 60, 95, 0.7, -0.6],              // elongated trough NW
        [360, 690, 65, 95, -0.4, -0.55],            // trough SE
        [400, 540, 50, -0.45],                      // secondary dip
        [180, 700, 40, -0.35],                      // small pit
      ],
      noise:    { amp: 0.13, freq: 0.024, phase: [0.8, 2.1] },
      gradient: { dx: 0, dy: 0 },
      levels:   stepRange(-1.32, -0.08, 18),
      placement: 'bl',
      anchor: 'xMinYMax slice',
    },
    ridge: {
      // A linear ridge running down the left edge — three elongated rotated
      // peaks stacked vertically, with small offset bumps for irregularity
      peaks: [
        [200, 180, 55, 130, 0.18, 1.05],
        [240, 380, 60, 140, -0.15, 1.1],
        [200, 580, 55, 130, 0.22, 1.0],
        [320, 280, 35, 0.35],                       // foothill bump
        [320, 480, 35, 0.35],
        [120, 460, 30, 0.3],                        // outlier on the far side
      ],
      noise:    { amp: 0.14, freq: 0.026, phase: [2.4, 1.1] },
      gradient: { dx: 0, dy: 0 },
      levels:   stepRange(0.08, 1.05, 16),
      placement: 'l',
      anchor: 'xMinYMid slice',
    },
    channel: {
      // Upper-left peak system — main summit plus a parallel ridge running off it
      peaks: [
        [200, 180, 95, 1.3],                        // summit
        [110, 130, 40, 75, 0.5, 0.55],              // outlier ridge NW
        [310, 270, 55, 100, -0.4, 0.55],            // descending arm SE
        [240, 350, 45, 0.4],                        // foothill
        [60, 240, 35, 0.35],                        // small detached bump
      ],
      noise:    { amp: 0.13, freq: 0.022, phase: [0.3, 1.5] },
      gradient: { dx: 0, dy: 0 },
      levels:   stepRange(0.1, 1.25, 17),
      placement: 'tl',
      anchor: 'xMinYMin slice',
    },
    confluence: {
      // Two peaks across the top with a saddle between, irregular sub-peaks
      peaks: [
        [340, 200, 85, 1.1],                        // peak W
        [880, 220, 85, 1.1],                        // peak E
        [600, 270, 110, 60, 0, 0.55],               // saddle ridge connecting them
        [220, 280, 45, 0.45],                       // shoulder W
        [1000, 290, 45, 0.45],                      // shoulder E
        [600, 130, 60, 35, 0, 0.4],                 // small ridge on the saddle top
      ],
      noise:    { amp: 0.12, freq: 0.02, phase: [1.2, 0.7] },
      gradient: { dx: 0, dy: 0 },
      levels:   stepRange(0.1, 1.1, 17),
      placement: 't',
      anchor: 'xMidYMin slice',
    },
    basin: {
      // Bowl in bottom-right with a raised lip and adjacent peaks outside it
      peaks: [
        [920, 600, 110, -1.4],                      // main basin
        [840, 540, 60, 90, 0.4, -0.55],             // elongated trough NW
        [1010, 660, 65, 100, -0.3, -0.55],          // trough SE
        [1080, 540, 35, 0.45],                      // raised lip NE
        [780, 700, 35, 0.4],                        // raised lip SW
        [950, 720, 30, -0.35],                      // small inner depression
      ],
      noise:    { amp: 0.12, freq: 0.024, phase: [2.6, 0.5] },
      gradient: { dx: 0, dy: 0 },
      levels:   stepRange(-1.3, -0.08, 18),
      placement: 'br',
      anchor: 'xMaxYMax slice',
    },
  };

  // Evenly-spaced level range generator
  function stepRange(min, max, count) {
    const step = (max - min) / (count - 1);
    const out = [];
    for (let i = 0; i < count; i++) out.push(min + step * i);
    return out;
  }

  const FIELD_W = 1200;
  const FIELD_H = 800;
  const GRID_X = 120;  // grid resolution X (cells) — finer for noise-driven detail
  const GRID_Y = 84;   // grid resolution Y (cells)

  function buildField(config) {
    const { peaks, gradient, noise } = config;
    // Pre-process peaks: each becomes a uniform record with rotation matrix.
    const compiled = peaks.map(p => {
      if (p.length === 4) {
        // [cx, cy, sigma, amp] — circular
        return { cx: p[0], cy: p[1], sx: p[2], sy: p[2], cos: 1, sin: 0, amp: p[3] };
      }
      // [cx, cy, sigmaX, sigmaY, rotation, amplitude] — anisotropic
      const r = p[4];
      return { cx: p[0], cy: p[1], sx: p[2], sy: p[3], cos: Math.cos(r), sin: Math.sin(r), amp: p[5] };
    });

    const gdx = (gradient && gradient.dx) || 0;
    const gdy = (gradient && gradient.dy) || 0;
    const nAmp = noise ? noise.amp : 0;
    const nFreq = noise ? noise.freq : 0;
    const nPhA = noise ? (noise.phase ? noise.phase[0] : 0) : 0;
    const nPhB = noise ? (noise.phase ? noise.phase[1] : 0) : 0;

    return (x, y) => {
      let z = 0;
      for (const p of compiled) {
        const dx = x - p.cx, dy = y - p.cy;
        // Rotate into peak's local frame
        const rx = dx * p.cos + dy * p.sin;
        const ry = -dx * p.sin + dy * p.cos;
        z += p.amp * Math.exp(-(rx * rx / (2 * p.sx * p.sx) + ry * ry / (2 * p.sy * p.sy)));
      }
      if (gdx || gdy) z += gdx * x + gdy * y;
      if (nAmp) {
        // Three-octave perturbation, plus a cross-term to break perfect periodicity
        const o1 = Math.sin(nFreq * x + nPhA) * Math.cos(nFreq * y + nPhB);
        const o2 = Math.sin(nFreq * 2.1 * x + nPhA * 1.6) * Math.cos(nFreq * 2.1 * y + nPhB * 1.6);
        const o3 = Math.sin(nFreq * 3.7 * x + nPhA * 2.3) * Math.cos(nFreq * 3.7 * y + nPhB * 2.3);
        const cross = Math.sin(nFreq * 0.6 * (x + y) + nPhA + nPhB);
        z += nAmp * (o1 + 0.55 * o2 + 0.28 * o3 + 0.2 * cross);
      }
      return z;
    };
  }

  function sampleGrid(field) {
    const dx = FIELD_W / GRID_X;
    const dy = FIELD_H / GRID_Y;
    const grid = new Array(GRID_X + 1);
    for (let i = 0; i <= GRID_X; i++) {
      const col = new Float32Array(GRID_Y + 1);
      const x = i * dx;
      for (let j = 0; j <= GRID_Y; j++) {
        col[j] = field(x, j * dy);
      }
      grid[i] = col;
    }
    return { grid, dx, dy };
  }

  // Marching squares: returns array of [[x1,y1],[x2,y2]] segments at given level
  function marchingSquares(grid, dx, dy, level) {
    const segs = [];
    const interp = (v1, v2, t) => t === 0 ? v1 : v1 + (level - v1) / (v2 - v1) * (t || 1);
    for (let i = 0; i < GRID_X; i++) {
      for (let j = 0; j < GRID_Y; j++) {
        const a = grid[i][j];           // top-left
        const b = grid[i + 1][j];       // top-right
        const c = grid[i + 1][j + 1];   // bottom-right
        const d = grid[i][j + 1];       // bottom-left

        let code = 0;
        if (a >= level) code |= 8;
        if (b >= level) code |= 4;
        if (c >= level) code |= 2;
        if (d >= level) code |= 1;
        if (code === 0 || code === 15) continue;

        const x0 = i * dx, y0 = j * dy;

        // Crossing points on the four edges
        const top   = (a >= level) !== (b >= level) ? [x0 + dx * (level - a) / (b - a), y0] : null;
        const right = (b >= level) !== (c >= level) ? [x0 + dx, y0 + dy * (level - b) / (c - b)] : null;
        const bot   = (d >= level) !== (c >= level) ? [x0 + dx * (level - d) / (c - d), y0 + dy] : null;
        const left  = (a >= level) !== (d >= level) ? [x0, y0 + dy * (level - a) / (d - a)] : null;

        switch (code) {
          case 1: case 14: segs.push([left, bot]); break;
          case 2: case 13: segs.push([bot, right]); break;
          case 3: case 12: segs.push([left, right]); break;
          case 4: case 11: segs.push([top, right]); break;
          case 6: case 9:  segs.push([top, bot]); break;
          case 7: case 8:  segs.push([left, top]); break;
          case 5: {
            // Saddle — sample centre to disambiguate
            const centre = (a + b + c + d) / 4;
            if ((centre >= level) === (a >= level)) {
              segs.push([left, top]); segs.push([bot, right]);
            } else {
              segs.push([left, bot]); segs.push([top, right]);
            }
            break;
          }
          case 10: {
            const centre = (a + b + c + d) / 4;
            if ((centre >= level) === (a >= level)) {
              segs.push([left, bot]); segs.push([top, right]);
            } else {
              segs.push([left, top]); segs.push([bot, right]);
            }
            break;
          }
        }
      }
    }
    return segs;
  }

  // Join segments that share endpoints into continuous polylines
  function joinSegments(segs) {
    const key = p => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
    const map = new Map(); // endpoint key -> array of {seg, end} where end is 0|1
    segs.forEach((seg, i) => {
      const k0 = key(seg[0]), k1 = key(seg[1]);
      if (!map.has(k0)) map.set(k0, []);
      if (!map.has(k1)) map.set(k1, []);
      map.get(k0).push({ i, end: 0 });
      map.get(k1).push({ i, end: 1 });
    });

    const used = new Array(segs.length).fill(false);
    const polylines = [];

    for (let s = 0; s < segs.length; s++) {
      if (used[s]) continue;
      used[s] = true;
      const path = [segs[s][0], segs[s][1]];

      // Walk forward from the second endpoint
      let cur = key(segs[s][1]);
      while (true) {
        const refs = map.get(cur) || [];
        const next = refs.find(r => !used[r.i]);
        if (!next) break;
        used[next.i] = true;
        const seg = segs[next.i];
        const nextPoint = seg[1 - next.end];
        path.push(nextPoint);
        cur = key(nextPoint);
      }

      // Walk backward from the first endpoint
      cur = key(segs[s][0]);
      while (true) {
        const refs = map.get(cur) || [];
        const next = refs.find(r => !used[r.i]);
        if (!next) break;
        used[next.i] = true;
        const seg = segs[next.i];
        const nextPoint = seg[1 - next.end];
        path.unshift(nextPoint);
        cur = key(nextPoint);
      }

      if (path.length >= 2) polylines.push(path);
    }
    return polylines;
  }

  // Render an SVG of all contours for a variant
  function generateContourSVG(variant) {
    const config = variantFields[variant];
    if (!config) return '';
    const field = buildField(config);
    const { grid, dx, dy } = sampleGrid(field);
    const lvls = config.levels;
    const pathStrings = [];

    lvls.forEach((level, idx) => {
      const segs = marchingSquares(grid, dx, dy, level);
      const polylines = joinSegments(segs);
      // Every 3rd level is a "major" line; alternate the rest between normal/minor
      const cls = (idx % 3 === 0) ? 'contour major'
                : (idx % 3 === 1) ? 'contour'
                : 'contour minor';
      for (const poly of polylines) {
        if (poly.length < 2) continue;
        const isClosed = poly.length >= 4
          && Math.hypot(poly[0][0] - poly[poly.length - 1][0],
                        poly[0][1] - poly[poly.length - 1][1]) < 0.5;
        const d = poly.map((p, k) => `${k === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
        pathStrings.push(`<path class="${cls}${isClosed ? ' closed' : ''}" d="${d}${isClosed ? ' Z' : ''}"/>`);
      }
    });

    const anchor = config.anchor || 'xMidYMid slice';
    return `<svg viewBox="0 0 ${FIELD_W} ${FIELD_H}" preserveAspectRatio="${anchor}" xmlns="http://www.w3.org/2000/svg">${pathStrings.join('')}</svg>`;
  }

  // Cache generated patterns — produce once, reuse for every section
  const contourPatterns = {};
  for (const v of Object.keys(variantFields)) {
    contourPatterns[v] = generateContourSVG(v);
  }

  // ============================================================
  // Line-drawn section icons — recurring visual language
  // ============================================================
  const iconLibrary = {
    compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 5 14 12 12 19 10 12 12 5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
    pin:     '<svg viewBox="0 0 24 24"><path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    tent:    '<svg viewBox="0 0 24 24"><path d="M3 20 L12 4 L21 20 Z"/><path d="M12 4 V20"/><path d="M9 20 L12 14 L15 20"/></svg>',
    track:   '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="16" rx="4" ry="3"/><circle cx="7" cy="9" r="1.8"/><circle cx="17" cy="9" r="1.8"/><circle cx="5" cy="13" r="1.4"/><circle cx="19" cy="13" r="1.4"/></svg>',
    eye:     '<svg viewBox="0 0 24 24"><path d="M2 12 C 5 6 9 4 12 4 S 19 6 22 12 C 19 18 15 20 12 20 S 5 18 2 12 Z"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    leaf:    '<svg viewBox="0 0 24 24"><path d="M5 19 C 5 11 11 5 19 5 C 19 13 13 19 5 19 Z"/><path d="M5 19 L 14 10"/></svg>',
    camera:  '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M9 7 L 10.5 4 L 13.5 4 L 15 7"/><circle cx="12" cy="13.5" r="3.8"/></svg>',
    flame:   '<svg viewBox="0 0 24 24"><path d="M12 21 C 7 21 5 17 5 14 C 5 10 9 9 9 5 C 11 7 13 7 15 11 C 19 12 19 16 19 17 C 19 19 17 21 12 21 Z"/><path d="M11 19 C 9 19 8 17 8 16 C 8 14 10 13 11 11"/></svg>',
    quill:   '<svg viewBox="0 0 24 24"><path d="M5 19 C 8 16 11 12 14 8 C 16 5.5 19 4 21 4 C 21 6 19.5 9 17 11 C 13 14 9 17 5 19 Z"/><path d="M5 19 L 3 21"/><path d="M9 14 L 13 15"/></svg>',
    acacia:  '<svg viewBox="0 0 24 24"><path d="M2.5 9.5 Q 4 7.1 5.6 9.3 Q 7.1 6.7 8.8 9.3 Q 10.4 6.3 12 9.3 Q 13.6 6.3 15.2 9.3 Q 16.9 6.7 18.4 9.3 Q 20 7.1 21.5 9.5"/><line x1="3" y1="9.6" x2="21" y2="9.6"/><path d="M12 9.6 V 21"/><path d="M12 13.4 L 7.4 9.9"/><path d="M12 12.6 L 16.6 9.9"/><path d="M9 21 Q 12 19.7 15 21"/></svg>',
    binoculars: '<svg viewBox="0 0 24 24"><rect x="3.5" y="7.5" width="6" height="12" rx="3"/><rect x="14.5" y="7.5" width="6" height="12" rx="3"/><path d="M9.5 11 L 14.5 11"/><path d="M5 7.5 L 5.8 5.4 L 7.2 5.4 L 8 7.5"/><path d="M16 7.5 L 16.8 5.4 L 18.2 5.4 L 19 7.5"/><circle cx="6.5" cy="15.5" r="1.5"/><circle cx="17.5" cy="15.5" r="1.5"/></svg>',
    ranger:  '<svg viewBox="0 0 24 24"><path d="M8.6 7.4 C 8.6 4.9 15.4 4.9 15.4 7.4"/><path d="M4.5 8 C 9 10.2 15 10.2 19.5 8"/><path d="M9.4 8.6 C 9.4 12.2 10 13.8 12 13.8 C 14 13.8 14.6 12.2 14.6 8.6"/><path d="M5.5 20.5 C 5.5 16.6 8.4 15 12 15 C 15.6 15 18.5 16.6 18.5 20.5"/></svg>',
    talking: '<svg viewBox="0 0 24 24"><rect x="2" y="4.5" width="14" height="9" rx="3"/><path d="M6 13.5 L 6 16.6 L 9.6 13.5"/><rect x="11" y="12.5" width="11" height="7.5" rx="2.6"/><path d="M18 20 L 18 22.6 L 15 20"/></svg>',
    landscape: '<svg viewBox="0 0 24 24"><circle cx="16.8" cy="7.6" r="2.4"/><path d="M2.5 17 L 8 9.5 L 12.5 15"/><path d="M10.5 17 L 15.5 11 L 21.5 17"/><line x1="2" y1="17.3" x2="22" y2="17.3"/></svg>',
    arrow:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="9 8 12 5 15 8"/><line x1="12" y1="5" x2="12" y2="19"/></svg>',
    map:     '<svg viewBox="0 0 24 24"><polyline points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20 3 6"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/></svg>',
    sun:     '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/><line x1="5.6" y1="5.6" x2="7" y2="7"/><line x1="17" y1="17" x2="18.4" y2="18.4"/><line x1="5.6" y1="18.4" x2="7" y2="17"/><line x1="17" y1="7" x2="18.4" y2="5.6"/></svg>',
  };

  // Contour injection. Cinematic video moments deliberately skip contours —
  // the footage itself is the texture, and the line layer was muddying the
  // moment-line type. Regular content sections alternate every other so the
  // pattern breathes rather than wallpapers.
  const variantKeys = ['channel', 'hill', 'valley', 'ridge', 'confluence', 'basin'];
  const sections = Array.from(document.querySelectorAll('section'));
  let contourCount = 0;
  sections.forEach((section, idx) => {
    if (section.querySelector('.contours-bg')) return;
    if (section.classList.contains('hero')) return;
    if (section.classList.contains('festival-band')) return;
    if (section.classList.contains('pin-story')) return;
    if (section.classList.contains('africa-section')) return;
    // Cinematic / bleed sections are skipped by default — they own their texture.
    // To restore a contour on one of them anyway, add data-contour-on in the markup.
    const optedIn = section.hasAttribute('data-contour-on');
    const cinematic =
      section.classList.contains('video-moment') ||
      section.classList.contains('usp-bleed') ||
      section.classList.contains('camp-showcase') ||
      section.classList.contains('testimonial-bleed') ||
      section.classList.contains('people-band');
    if (cinematic && !optedIn) return;
    if (section.querySelector('#map')) return;

    let myIndex;
    if (optedIn) {
      myIndex = contourCount; // borrow the next variant without consuming the counter
    } else {
      myIndex = contourCount++;
      if (myIndex % 2 !== 0) return;
    }

    const variant = section.dataset.contour || variantKeys[myIndex % variantKeys.length];
    if (!contourPatterns[variant]) return;
    const layer = document.createElement('div');
    layer.className = 'contours-bg' + (reduced ? '' : ' parallax');
    layer.setAttribute('aria-hidden', 'true');
    layer.setAttribute('data-variant', variant);
    // Placement comes from the variant config (anchor in a corner / edge)
    const placement = (variantFields[variant] && variantFields[variant].placement) || 'tr';
    layer.setAttribute('data-placement', placement);
    layer.innerHTML = contourPatterns[variant];

    if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
    section.insertBefore(layer, section.firstChild);
  });

  // Scroll-tied progression: as the section moves into view, the contour layer
  // fades from 0 to full opacity and gently scales — feels like the terrain
  // "comes up out of" the page rather than crossing it.
  if (!reduced) {
    const layers = Array.from(document.querySelectorAll('.contours-bg.parallax'));
    let cTicking = false;
    const onContourScroll = () => {
      if (cTicking) return;
      cTicking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        layers.forEach(layer => {
          const r = layer.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) { layer.style.opacity = '0'; return; }
          const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
          const ratio = Math.max(0, Math.min(1, visible / Math.min(r.height, vh)));
          // Ease-out for a slow reveal that doesn't pop.
          // Cap at 0.7 so the contour lines never fight the text.
          const eased = (1 - Math.pow(1 - ratio, 2)) * 0.7;
          layer.style.opacity = String(eased);
        });
        cTicking = false;
      });
    };
    document.addEventListener('scroll', onContourScroll, { passive: true });
    window.addEventListener('resize', onContourScroll);
    onContourScroll();
  }

  // Mount a single large section icon anchored top-right of each section.
  // Selector: any element with [data-icon] inside a section. The first match
  // per section wins — that becomes the section's visual ornament.
  const sectionsWithIcon = new Set();
  document.querySelectorAll('[data-icon]').forEach(node => {
    const iconName = node.dataset.icon;
    const svg = iconLibrary[iconName];
    if (!svg) return;

    const section = node.tagName === 'SECTION' ? node : node.closest('section');
    if (!section) return;
    if (section.classList.contains('hero')) return;        // hero owns its own world
    if (sectionsWithIcon.has(section)) return;             // first hit per section
    if (section.querySelector('.section-icon-anchor')) return;

    const iconWrap = document.createElement('div');
    iconWrap.className = 'section-icon-anchor';
    iconWrap.setAttribute('aria-hidden', 'true');
    iconWrap.setAttribute('data-icon-name', iconName);
    iconWrap.innerHTML = svg;

    if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
    section.insertBefore(iconWrap, section.firstChild);
    sectionsWithIcon.add(section);
  });

  // ============================================================
  // Lazy video loader. Videos tagged [data-lazy] keep their source
  // in data-src and only swap it in when they enter the viewport
  // (with a 400px lead so loading begins before the user arrives).
  // Plays once loaded; pauses when fully off-screen to free decode
  // bandwidth for whatever the user is actually looking at.
  // ============================================================
  const lazyVideos = document.querySelectorAll('video[data-lazy]');
  if (lazyVideos.length) {
    const loadVideo = (video) => {
      if (video.dataset.lazyLoaded === '1') return;
      video.dataset.lazyLoaded = '1';
      video.querySelectorAll('source[data-src]').forEach(s => {
        s.src = s.dataset.src;
        s.removeAttribute('data-src');
      });
      try { video.load(); } catch (_) {}
      const tryPlay = () => video.play().catch(() => {});
      if (video.readyState >= 2) tryPlay();
      else video.addEventListener('loadeddata', tryPlay, { once: true });
    };
    if ('IntersectionObserver' in window) {
      const playIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.target.dataset.lazyLoaded !== '1') return;
          if (e.isIntersecting) e.target.play().catch(() => {});
          else e.target.pause();
        });
      }, { rootMargin: '0px 0px', threshold: 0 });
      const preloadIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            loadVideo(e.target);
            preloadIO.unobserve(e.target);
            playIO.observe(e.target);
          }
        });
      }, { rootMargin: '400px 0px', threshold: 0 });
      lazyVideos.forEach(v => preloadIO.observe(v));
    } else {
      // Fallback for ancient browsers: just load everything immediately.
      lazyVideos.forEach(loadVideo);
    }
  }

  // ---- Mobile burger menu (deferred so #navOverlay — placed after the script tag — is in DOM)
  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('navBurger');
    const overlay = document.getElementById('navOverlay');
    if (!burger || !overlay) return;

    const openMenu = () => {
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
      overlay.querySelectorAll('.nav-overlay-link').forEach((link, i) => {
        link.style.transitionDelay = `${0.06 + i * 0.04}s`;
        link.style.opacity = '1';
        link.style.transform = 'none';
      });
    };
    const closeMenu = () => {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
      overlay.querySelectorAll('.nav-overlay-link').forEach(link => {
        link.style.transitionDelay = '';
        link.style.opacity = '';
        link.style.transform = '';
      });
    };

    burger.addEventListener('click', () => {
      burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    overlay.querySelectorAll('.nav-overlay-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Initial stagger state (hidden, offset right)
    overlay.querySelectorAll('.nav-overlay-link').forEach(link => {
      link.style.opacity = '0';
      link.style.transform = 'translateX(20px)';
      link.style.transition = 'opacity 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1)';
    });
  });
})();
