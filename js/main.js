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
        <video muted playsinline loop preload="metadata" data-src="${p.preview}#t=${p.start ?? 1}"></video>
        <div class="slide__top">
          <span class="tag">${p.category.toUpperCase()}</span>
          <span class="slide__play" aria-hidden="true"></span>
        </div>
        <div class="slide__bottom">
          <div>
            <h3 class="slide__title">${p.title}</h3>
            <p class="slide__desc">${p.description}</p>
          </div>
          <span class="pill pill--lime pill--sm">Watch film <i class="arrow"></i></span>
        </div>
      </div>
      <aside class="slide__info">
        <div class="slide__person">
          <strong>${p.quote?.name ?? p.client}</strong>
          <span>${p.quote?.role ?? p.year}</span>
        </div>
        <div>
          ${p.quote ? `<p class="slide__quote">“${p.quote.text}”</p>` : ""}
          ${p.stat ? `<p class="slide__stat" style="margin-top:20px"><strong>${p.stat.value}</strong><span>${p.stat.label}</span></p>` : ""}
        </div>
      </aside>
    </article>`;

  if (track && PROJECTS.length) {
    track.innerHTML = PROJECTS.map(slideHTML).join("");
    watchLazy(track);
    $$("[data-hover-video]", track).forEach(bindHoverVideo);

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
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1`;
    return url;
  };

  const openProject = (i) => {
    const p = PROJECTS[i];
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

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-project]");
    if (trigger) openProject(Number(trigger.dataset.openProject));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeProject(); closeMenu(); }
    if (e.key === "Enter") {
      const trigger = e.target.closest && e.target.closest("[data-open-project]");
      if (trigger) openProject(Number(trigger.dataset.openProject));
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
})();
