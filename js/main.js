/* =====================================================================
   NASH BROWIN — interactions
   ===================================================================== */
(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad2 = (n) => String(n).padStart(2, "0");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PROJECTS = window.PROJECTS || [];

  /* ---------------- smooth scroll (Lenis) ---------------- */
  let lenis = null;
  if (window.Lenis && !reducedMotion) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      if (a.hasAttribute("data-book")) return; // booking buttons open the form instead
      const id = a.getAttribute("href");
      const target = id === "#top" ? document.body : $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(target);
    });
  });

  /* ---------------- nav ---------------- */
  const nav = $("#nav");
  let lastY = window.scrollY;
  let navTicking = false;
  const updateNav = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (y > lastY + 4 && y > 240) nav.classList.add("is-hidden");
    else if (y < lastY - 4) nav.classList.remove("is-hidden");
    lastY = y;
    navTicking = false;
  };
  window.addEventListener("scroll", () => {
    if (!navTicking) { navTicking = true; requestAnimationFrame(updateNav); }
  }, { passive: true });

  const menuBtn = $(".nav__menu-btn");
  const menu = $("#mobile-menu");
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "Menu";
    lenis && lenis.start();
  }
  menuBtn.addEventListener("click", () => {
    if (menu.hidden) {
      menu.hidden = false;
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.textContent = "Close";
      lenis && lenis.stop();
    } else closeMenu();
  });

  /* ---------------- videos ---------------- */
  const ensureSrc = (v) => {
    if (!v.getAttribute("src") && v.dataset.src) {
      v.src = v.dataset.src;
      if (v.preload === "none") v.preload = "metadata";
    }
  };
  const playVideo = (v) => {
    if (!v) return;
    ensureSrc(v);
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  };
  const pauseVideo = (v) => v && !v.paused && v.pause();

  // Lazy-load: give videos their src shortly before they scroll into view
  const lazyIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const v = e.target;
      if (v.preload !== "none") ensureSrc(v);
      lazyIO.unobserve(v);
    });
  }, { rootMargin: "600px 0px" });
  const watchLazy = (scope = document) => $$("video[data-src]", scope).forEach((v) => lazyIO.observe(v));
  watchLazy();

  // Background videos that should play only while visible (hero, contact)
  const inviewIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? playVideo(e.target) : pauseVideo(e.target)));
  }, { threshold: 0.15 });
  $$(".hero__video, [data-autoplay-inview]").forEach((v) => inviewIO.observe(v));

  // Hover-to-play on desktop, play-while-visible on touch screens
  const touchIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = $("video", e.target);
      e.isIntersecting ? playVideo(v) : pauseVideo(v);
    });
  }, { threshold: 0.6 });

  const bindHoverVideo = (el) => {
    const v = $("video", el);
    if (!v) return;
    if (finePointer) {
      el.addEventListener("mouseenter", () => playVideo(v));
      el.addEventListener("mouseleave", () => pauseVideo(v));
    } else {
      touchIO.observe(el);
    }
  };
  $$("[data-hover-video]").forEach(bindHoverVideo);

  /* ---------- YouTube hover previews (muted, cropped, no YouTube chrome) ---------- */
  let ytReady = null;
  const loadYT = () => {
    if (ytReady) return ytReady;
    ytReady = new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      const prevCb = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prevCb && prevCb(); resolve(window.YT); };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    });
    return ytReady;
  };
  // size the iframe to "cover" its card, oversized so YouTube's title bar and logo sit outside the crop
  const fitYT = (wrap) => {
    const f = $("iframe", wrap);
    if (!f) return;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    const fw = Math.max(w, (h * 16) / 9) * 1.28;
    f.style.width = `${fw}px`;
    f.style.height = `${(fw * 9) / 16}px`;
  };
  window.addEventListener("resize", () => $$(".slide__yt").forEach(fitYT));

  const bindHoverYT = (el) => {
    const wrap = $(".slide__yt", el);
    const id = wrap.dataset.yt;
    const start = parseInt(wrap.dataset.start, 10) || 0;
    const end = parseInt(wrap.dataset.end, 10) || 0; // optional: loop just start → end
    let player = null, want = false;
    const play = () => {
      want = true;
      if (player && player.playVideo) { player.mute(); player.playVideo(); return; }
      if (player) return; // still being created
      player = "pending";
      loadYT().then((YT) => {
        player = new YT.Player($(".slide__yt-player", wrap), {
          videoId: id,
          playerVars: Object.assign({ autoplay: 1, mute: 1, controls: 0, start, playsinline: 1, rel: 0, modestbranding: 1,
                        disablekb: 1, fs: 0, iv_load_policy: 3, cc_load_policy: 0 },
                        end ? { end } : { loop: 1, playlist: id }),
          events: {
            onReady: (e) => { fitYT(wrap); e.target.mute(); want ? e.target.playVideo() : e.target.pauseVideo(); },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.PLAYING) wrap.classList.toggle("is-playing", want);
              if (e.data === YT.PlayerState.ENDED) { e.target.seekTo(start); e.target.playVideo(); }
            },
          },
        });
      });
    };
    const stop = () => {
      want = false;
      wrap.classList.remove("is-playing");
      if (player && player.pauseVideo) player.pauseVideo();
    };
    if (finePointer) {
      el.addEventListener("mouseenter", play);
      el.addEventListener("mouseleave", stop);
    } else {
      new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? play() : stop())), { threshold: 0.6 }).observe(el);
    }
  };

  /* ---------------- hero intro + reveals ---------------- */
  const markLoaded = () => document.body.classList.add("is-loaded");
  if (document.readyState === "complete") requestAnimationFrame(markLoaded);
  else window.addEventListener("load", markLoaded);
  setTimeout(markLoaded, 1200); // don't wait on slow video loads

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      revealIO.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  const watchReveal = (scope = document) => $$("[data-reveal]", scope).forEach((el) => revealIO.observe(el));
  watchReveal();

  /* ---------------- about: words light up as you scroll ---------------- */
  const scrollText = $("[data-scroll-text]");
  if (scrollText) {
    const words = scrollText.textContent.trim().split(/\s+/);
    scrollText.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(" ");
    const spans = $$(".w", scrollText);
    const update = () => {
      const r = scrollText.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = reducedMotion ? 1 : clamp((vh * 0.88 - r.top) / (vh * 0.62), 0, 1);
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
    };
    window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------- marquees: duplicate for a seamless loop ---------------- */
  $$(".marquee__track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------------- services accordion ---------------- */
  const services = $$(".service");
  const openService = (li) => {
    services.forEach((s) => {
      const isTarget = s === li;
      s.classList.toggle("is-open", isTarget);
      $(".service__head", s).setAttribute("aria-expanded", String(isTarget));
      if (!isTarget) pauseVideo($("video", s));
    });
    const v = $("video", li);
    if (v) { ensureSrc(v); if (!finePointer) playVideo(v); }
  };
  services.forEach((li) => {
    $(".service__head", li).addEventListener("click", () => {
      if (li.classList.contains("is-open") && !finePointer) return;
      openService(li);
    });
  });

  /* ---------------- works carousel ---------------- */
  const track = $("[data-works-track]");
  const isEmbed = (url) => /vimeo\.com|youtube\.com|youtu\.be/.test(url || "");

  const slideHTML = (p, i) => `
    <article class="slide">
      <div class="slide__media" data-hover-video data-open-project="${i}" data-cursor="play" role="button" tabindex="0" aria-label="Play ${p.title}">
        ${p.youtube
          ? `<div class="slide__yt" data-yt="${p.youtube}" data-start="${p.start ?? 30}"><img src="https://i.ytimg.com/vi/${p.youtube}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${p.youtube}/hqdefault.jpg'" alt="" loading="lazy" /><div class="slide__yt-player"></div></div>`
          : `<video muted playsinline loop preload="metadata" data-src="${p.preview}#t=${p.start ?? 1}"></video>`}
        <div class="slide__top">
          <span class="tag">${p.category.toUpperCase()}</span>
          <span class="slide__play" aria-hidden="true"></span>
        </div>
        <div class="slide__bottom">
          <div>
            <h3 class="slide__title">${p.title}</h3>
            <p class="slide__desc">${p.description ?? ""}</p>
          </div>
          <span class="pill pill--lime pill--sm">Watch film <i class="arrow"></i></span>
        </div>
      </div>
      <aside class="slide__info">
        <div class="slide__person">
          <strong>${p.quote?.name ?? p.client}</strong>
          <span>${p.quote?.role ?? p.year ?? p.category}</span>
        </div>
        <div>
          ${p.quote ? `<p class="slide__quote">“${p.quote.text}”</p>` : ""}
          ${p.stat ? `<p class="slide__stat" style="margin-top:20px"><strong>${p.stat.value}</strong><span>${p.stat.label}</span></p>` : ""}
        </div>
      </aside>
    </article>`;

  /* ---------------- viral work grid ---------------- */
  const VIRAL = window.VIRAL || [];
  const fmtViews = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M` : `${Math.round(n / 1e3)}K`);
  const viralGrid = $("[data-viral-grid]");
  if (viralGrid && VIRAL.length) {
    viralGrid.innerHTML = VIRAL.map((v, i) => `
      <article class="vcard" data-open-viral="${i}" data-cursor="play" role="button" tabindex="0" aria-label="Play ${v.title}">
        <div class="vcard__media">
          <div class="slide__yt" data-yt="${v.youtube}" data-start="${v.start ?? 20}">
            <img src="https://i.ytimg.com/vi/${v.youtube}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg'" alt="" loading="lazy" />
            <div class="slide__yt-player"></div>
          </div>
          <span class="tag vcard__views">${fmtViews(v.views)} views</span>
          <span class="slide__play" aria-hidden="true"></span>
        </div>
        <div class="vcard__meta">
          <h3 class="vcard__title">${v.title}</h3>
          <p class="vcard__sub">${v.artist} · ${new Date(v.date).getFullYear()}</p>
        </div>
      </article>`).join("");
    $$(".vcard", viralGrid).forEach(bindHoverYT);
    const total = VIRAL.reduce((s, v) => s + v.views, 0);
    const totalEl = $("[data-viral-total]");
    if (totalEl) totalEl.textContent = `${fmtViews(total)} views across these ${VIRAL.length} videos`;
  }

  /* ---------------- AI work grids (real footage + AI, motion graphics + AI) ---------------- */
  const AI_LISTS = { footage: window.AI_WORK || [], motion: window.AI_MOTION || [] };
  const AI_TOOLS = window.AI_TOOLS || [];
  const aiSection = $("#ai");
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const aiCardHTML = (a, key) => {
    const media = a.youtube
      ? `<div class="slide__yt" data-yt="${esc(a.youtube)}" data-start="${a.start ?? 0}"${a.end ? ` data-end="${a.end}"` : ""}>
           <img src="https://i.ytimg.com/vi/${esc(a.youtube)}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${esc(a.youtube)}/hqdefault.jpg'" alt="" loading="lazy" />
           <div class="slide__yt-player"></div>
         </div>`
      : `<video muted playsinline loop preload="none"${a.poster ? ` poster="${esc(a.poster)}"` : ""} data-src="${esc(a.preview || a.full)}${a.poster ? "" : "#t=0.1"}"></video>`;
    const tools = (a.tools || []).slice(0, 3).map((t) => `<span class="tag ai-card__tool">${esc(t)}</span>`).join("");
    return `
      <article class="ai-card${a.featured ? " ai-card--featured" : ""}" data-open-ai="${key}" data-cursor="play" role="button" tabindex="0" aria-label="Play ${esc(a.title)}">
        <div class="ai-card__media">
          ${media}
          <span class="ai-card__badge">AI</span>
          <span class="slide__play" aria-hidden="true"></span>
          ${tools ? `<div class="ai-card__tools">${tools}</div>` : ""}
        </div>
        <div class="ai-card__meta">
          <h3 class="ai-card__title">${esc(a.title)}</h3>
          <p class="ai-card__sub">${esc([a.client, a.year].filter(Boolean).join(" · "))}</p>
          ${a.note ? `<p class="ai-card__note">${esc(a.note)}</p>` : ""}
        </div>
      </article>`;
  };
  const anyAI = AI_LISTS.footage.length || AI_LISTS.motion.length;
  if (aiSection && anyAI) {
    aiSection.hidden = false;
    const toolsEl = $("[data-ai-tools]", aiSection);
    if (toolsEl && AI_TOOLS.length) {
      toolsEl.innerHTML = AI_TOOLS.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
      toolsEl.hidden = false;
    }
    Object.entries(AI_LISTS).forEach(([group, list]) => {
      const wrap = $(`[data-ai-group="${group}"]`, aiSection);
      if (!wrap || !list.length) return;
      wrap.hidden = false;
      const grid = $(`[data-ai-grid="${group}"]`, wrap);
      grid.innerHTML = list.map((a, i) => aiCardHTML(a, `${group}:${i}`)).join("");
      watchLazy(grid);
      $$(".ai-card", grid).forEach((el) => ($(".slide__yt", el) ? bindHoverYT(el) : bindHoverVideo(el)));
    });
  } else {
    $$('a[href="#ai"]').forEach((a) => a.remove());
  }

  if (track && PROJECTS.length) {
    track.innerHTML = PROJECTS.map(slideHTML).join("");
    watchLazy(track);
    $$("[data-hover-video]", track).forEach((el) => ($(".slide__yt", el) ? bindHoverYT(el) : bindHoverVideo(el)));

    const slides = $$(".slide", track);
    const total = slides.length;
    $$("[data-works-total], [data-works-count]").forEach((el) => (el.textContent = pad2(total)));
    const cur = $("[data-works-current]");
    const bar = $("[data-works-progress]");
    const prev = $("[data-works-prev]");
    const next = $("[data-works-next]");
    let index = 0;

    const slideLeft = (s) => s.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - parseFloat(getComputedStyle(track).paddingLeft);
    const goTo = (i) => {
      index = clamp(i, 0, total - 1);
      track.scrollTo({ left: slideLeft(slides[index]), behavior: reducedMotion ? "auto" : "smooth" });
    };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const frac = max > 0 ? track.scrollLeft / max : 0;
      let nearest = 0;
      let best = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(slideLeft(s) - track.scrollLeft);
        if (d < best) { best = d; nearest = i; }
      });
      if (frac > 0.995) nearest = total - 1;
      index = nearest;
      cur.textContent = pad2(index + 1);
      bar.style.width = `${(1 / total + frac * (1 - 1 / total)) * 100}%`;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = frac > 0.995;
    };
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    window.addEventListener("resize", sync);
    prev.addEventListener("click", () => goTo(index - 1));
    next.addEventListener("click", () => goTo(index + 1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
    });
    sync();

    // click-and-drag with a mouse
    let down = false, startX = 0, startLeft = 0, startIndex = 0, moved = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; startIndex = index;
      startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add("is-dragging"); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", (e) => {
      if (!down) return;
      down = false;
      if (!moved) return;
      track.classList.remove("is-dragging");
      const dx = e.clientX - startX;
      sync();
      // snap one slide in the direction of the drag
      let target = index;
      if (dx < -60) target = Math.max(index, startIndex + 1);
      if (dx > 60) target = Math.min(index, startIndex - 1);
      goTo(target);
    });
    track.addEventListener("click", (e) => {
      if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
    }, true);
  }

  /* ---------------- testimonials ---------------- */
  const tItems = $$(".testimonial");
  if (tItems.length) {
    let t = 0;
    const tCur = $("[data-t-current]");
    $("[data-t-total]").textContent = pad2(tItems.length);
    const showT = (i) => {
      t = (i + tItems.length) % tItems.length;
      tItems.forEach((el, j) => el.classList.toggle("is-active", j === t));
      tCur.textContent = pad2(t + 1);
    };
    $("[data-t-prev]").addEventListener("click", () => showT(t - 1));
    $("[data-t-next]").addEventListener("click", () => showT(t + 1));
  }

  /* ---------------- lightbox ---------------- */
  const lb = $("#lightbox");
  const lbMedia = $("[data-lb-media]");
  let lastFocus = null;

  const embedURL = (url) => {
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&title=0&byline=0&portrait=0`;
    const yt = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    const t = url.match(/[?&](?:t|start)=(\d+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1${t ? `&start=${t[1]}` : ""}`;
    return url;
  };

  const openProject = (i) => {
    const p = typeof i === "object" ? i : /^\d+$/.test(String(i)) ? PROJECTS[Number(i)] : PROJECTS.find((x) => x.id === i);
    if (!p) return;
    lastFocus = document.activeElement;
    $$("video").forEach((v) => { if (!v.closest(".lightbox")) pauseVideo(v); });

    const src = p.full || p.preview;
    lbMedia.innerHTML = isEmbed(src)
      ? `<iframe src="${embedURL(src)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${p.title}"></iframe>`
      : `<video src="${src}" controls autoplay playsinline></video>`;
    $("[data-lb-meta]").textContent = [p.category, p.client, p.year].filter(Boolean).join(" — ");
    $("[data-lb-title]").textContent = p.title;
    $("[data-lb-desc]").textContent = p.description || "";
    $("[data-lb-credits]").innerHTML = (p.credits || [])
      .map(([role, name]) => `<div><dt>${role}</dt><dd>${name}</dd></div>`)
      .join("");

    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("is-open"));
    lenis && lenis.stop();
    document.body.style.overflow = "hidden";
    $(".lightbox__close", lb).focus();
  };

  const closeProject = () => {
    if (lb.hidden) return;
    lb.classList.remove("is-open");
    lenis && lenis.start();
    document.body.style.overflow = "";
    setTimeout(() => { lb.hidden = true; lbMedia.innerHTML = ""; }, 450);
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  };

  const openViral = (n) => {
    const v = VIRAL[n];
    if (!v) return;
    openProject({
      title: v.title, client: v.artist, category: "Music Video", year: new Date(v.date).getFullYear(),
      description: `${fmtViews(v.views)} views on YouTube.`, full: `https://youtu.be/${v.youtube}`, credits: [],
    });
  };
  const openAI = (key) => {
    const [group, n] = String(key).split(":");
    const a = (AI_LISTS[group] || [])[Number(n)];
    if (!a) return;
    const credits = [[a.role || "Director / Editor", "Nash Browin"]];
    if (a.tools && a.tools.length) credits.push(["AI tools", a.tools.join(", ")]);
    openProject({
      title: a.title, client: a.client || "", category: group === "motion" ? "Motion Graphics + AI" : "AI", year: a.year,
      description: a.note || "", full: a.youtube ? `https://youtu.be/${a.youtube}${a.start ? `?t=${a.start}` : ""}` : a.full || a.preview, credits,
    });
  };
  const openFilm = (el) => {
    const d = el.dataset;
    openProject({ title: d.filmTitle, client: d.filmClient, category: d.filmCategory, full: d.filmSrc, credits: [[d.filmRole || "Director", "Nash Browin"]] });
  };
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-project]");
    if (trigger) openProject(trigger.dataset.openProject);
    const vt = e.target.closest("[data-open-viral]");
    if (vt) openViral(Number(vt.dataset.openViral));
    const ft = e.target.closest("[data-open-film]");
    if (ft) openFilm(ft);
    const at = e.target.closest("[data-open-ai]");
    if (at) openAI(at.dataset.openAi);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeProject(); closeMenu(); }
    if (e.key === "Enter") {
      const trigger = e.target.closest && e.target.closest("[data-open-project]");
      if (trigger) openProject(trigger.dataset.openProject);
      const vt = e.target.closest && e.target.closest("[data-open-viral]");
      if (vt) openViral(Number(vt.dataset.openViral));
      const ft = e.target.closest && e.target.closest("[data-open-film]");
      if (ft) openFilm(ft);
      const at = e.target.closest && e.target.closest("[data-open-ai]");
      if (at) openAI(at.dataset.openAi);
    }
  });
  $(".lightbox__close", lb).addEventListener("click", closeProject);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeProject(); });

  /* ---------------- "Play" cursor bubble ---------------- */
  const cursor = $(".cursor");
  if (finePointer && cursor) {
    let x = -200, y = -200, cx = x, cy = y;
    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      cursor.style.setProperty("--x", `${cx}px`);
      cursor.style.setProperty("--y", `${cy}px`);
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => {
      const hit = e.target.closest("[data-cursor]");
      cursor.classList.toggle("is-active", !!hit && !e.target.closest(".is-dragging"));
    });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  }

  /* ---------------- giant footer wordmark: fit to width ---------------- */
  const fitEl = $("[data-fit]");
  const fit = () => {
    if (!fitEl) return;
    const box = fitEl.parentElement;
    const cs = getComputedStyle(box);
    const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    box.style.fontSize = "";
    const size = parseFloat(getComputedStyle(box).fontSize);
    box.style.fontSize = `${size * (avail / fitEl.getBoundingClientRect().width)}px`;
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
  window.addEventListener("resize", fit);

  /* ---------------- booking form → email (FormSubmit) ---------------- */
  const book = $("#book");
  if (book) {
    const ENDPOINT = "https://formsubmit.co/ajax/nashbrowin@gmail.com";
    const form = $("[data-book-form]", book);
    const formView = $("[data-book-form-view]", book);
    const doneView = $("[data-book-done]", book);
    const errEl = $("[data-book-error]", book);
    const labelEl = $("[data-book-label]", book);
    const submitBtn = $(".book__submit", book);
    let returnFocus = null;

    const openBook = () => {
      returnFocus = document.activeElement;
      if (typeof closeMenu === "function") closeMenu();
      formView.hidden = false;
      doneView.hidden = true;
      book.hidden = false;
      requestAnimationFrame(() => book.classList.add("is-open"));
      lenis && lenis.stop();
      document.body.style.overflow = "hidden";
      setTimeout(() => { const f = $('input[name="name"]', book); f && f.focus({ preventScroll: true }); }, 420);
    };
    const closeBook = () => {
      if (book.hidden) return;
      book.classList.remove("is-open");
      lenis && lenis.start();
      document.body.style.overflow = "";
      setTimeout(() => { book.hidden = true; }, 600);
      returnFocus && returnFocus.focus && returnFocus.focus({ preventScroll: true });
    };
    $$("[data-book]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); openBook(); }));
    $$("[data-book-close]", book).forEach((b) => b.addEventListener("click", closeBook));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBook(); });

    // accept "@name", "name" or a full profile link
    const handle = (v) => String(v || "").trim()
      .replace(/^https?:\/\/(www\.|m\.)?(instagram\.com|tiktok\.com)\/@?/i, "")
      .replace(/^@/, "").replace(/[/?#].*$/, "");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errEl.hidden = true;
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        const bad = $(":invalid", form);
        bad && bad.focus();
        return;
      }
      const fd = new FormData(form);
      if (fd.get("_honey")) return; // bots
      const ig = handle(fd.get("instagram"));
      const tt = handle(fd.get("tiktok"));
      const name = String(fd.get("name")).trim();
      const email = String(fd.get("email")).trim();
      const payload = {
        _subject: `New booking inquiry: ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
        Name: name,
        Email: email,
        Instagram: ig ? `@${ig}  (https://www.instagram.com/${ig})` : "-",
        TikTok: tt ? `@${tt}  (https://www.tiktok.com/@${tt})` : "-",
        "Looking for": fd.getAll("services").join(", ") || "-",
        Budget: fd.get("budget") || "-",
        "Release / shoot date": fd.get("date") || "-",
        Project: String(fd.get("message")).trim(),
      };
      submitBtn.disabled = true;
      labelEl.textContent = "Sending…";
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "send failed");
        $("[data-book-name]", book).textContent = name.split(" ")[0];
        $("[data-book-email]", book).textContent = email;
        form.reset();
        form.classList.remove("was-validated");
        formView.hidden = true;
        doneView.hidden = false;
        $(".book__panel", book).scrollTop = 0;
      } catch (err) {
        errEl.innerHTML = 'That didn’t go through. Please try again, or email me at <a href="mailto:nashbrowin@gmail.com?subject=Booking%20inquiry">nashbrowin@gmail.com</a>.';
        errEl.hidden = false;
      } finally {
        submitBtn.disabled = false;
        labelEl.textContent = "Send inquiry";
      }
    });
  }
})();
