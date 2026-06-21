(function () {
  const data = window.invitationData || {};
  const coupleNames = `${data.brideName || ""} & ${data.groomName || ""}`.trim();
  const coupleNamesText = `${data.brideName || ""} dhe ${data.groomName || ""}`.trim();
  const weddingDate = new Date(data.weddingDate);
  const previousCountdown = {};

  const els = {
    introScreen: document.getElementById("introScreen"),
    openingVideoLayer: document.getElementById("openingVideoLayer"),
    openingVideo: document.getElementById("openingVideo"),
    ambientLayer: document.getElementById("ambientLayer"),
    music: document.getElementById("backgroundMusic"),
    musicToggle: document.getElementById("musicToggle"),
    musicState: document.querySelector(".music-state"),
    heroVideo: document.getElementById("heroVideo"),
    heroImage: document.getElementById("heroImage"),
    galleryTrack: document.getElementById("galleryTrack"),
    lightbox: document.getElementById("lightbox"),
    lightboxImage: document.getElementById("lightboxImage"),
    lightboxClose: document.getElementById("lightboxClose"),
    giftSection: document.getElementById("giftSection"),
    giftInfo: document.getElementById("giftInfo"),
    mapButton: document.getElementById("mapButton"),
    rsvpYes: document.getElementById("rsvpYes"),
    rsvpNo: document.getElementById("rsvpNo"),
    contactButton: document.getElementById("contactButton"),
    poweredLink: document.getElementById("poweredLink"),
    countdown: document.getElementById("countdown"),
    passedMessage: document.getElementById("passedMessage")
  };

  function init() {
    setTextFields();
    setMedia();
    applyDesignAssets();
    setOptionalSections();
    setLinks();
    createAmbientParticles();
    setupIntro();
    setupMusicToggle();
    setupLightbox();
    setupRevealAnimations();
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  function setTextFields() {
    const values = {
      coupleNames,
      studioName: data.studioName,
      poweredByName: data.poweredByName,
      introLine: data.introLine,
      displayDate: data.displayDate,
      displayTime: data.displayTime,
      locationName: data.locationName,
      address: data.address,
      familyText: data.familyText,
      brideFamily: data.brideFamily,
      groomFamily: data.groomFamily,
      dressCode: data.dressCode,
      contactPhone: data.contactPhone
    };

    document.querySelectorAll("[data-field]").forEach((element) => {
      const key = element.getAttribute("data-field");
      element.textContent = values[key] || "";
    });

    animateHeroName();
    document.title = `Ftesë Dasme - ${coupleNames}`;
  }

  function animateHeroName() {
    const heroName = document.querySelector(".hero-names");
    if (!heroName) return;

    heroName.innerHTML = coupleNames
      .split(" ")
      .map((word) => `<span class="name-word">${word}</span>`)
      .join(" ");
  }

  function setMedia() {
    if (data.openingVideo) {
      els.openingVideo.src = data.openingVideo;
      els.openingVideo.load();
      els.openingVideo.pause();
    }

    if (data.heroImage) {
      els.heroImage.style.backgroundImage = `url("${data.heroImage}")`;
      els.heroVideo.setAttribute("poster", data.heroImage);
    }

    prepareHeroVideo();

    if (data.music) {
      els.music.src = data.music;
    }

    els.galleryTrack.innerHTML = "";
    (data.galleryImages || []).forEach((imagePath, index) => {
      const button = document.createElement("button");
      button.className = "gallery-item";
      button.type = "button";
      button.style.backgroundImage = `url("${imagePath}")`;
      button.setAttribute("aria-label", `Hape foton ${index + 1}`);
      button.addEventListener("click", () => openLightbox(imagePath));
      els.galleryTrack.appendChild(button);
    });
  }

  function showHeroImage() {
    els.heroVideo.classList.remove("is-ready");
    els.heroImage.classList.add("is-visible");
  }

  async function applyDesignAssets() {
    if (window.location.protocol === "file:") return;

    const assets = data.designAssets || {};
    const assetMap = [
      ["luxuryBackground", "--asset-luxury-bg", "has-luxury-bg"],
      ["goldFrame", "--asset-gold-frame", "has-gold-frame"],
      ["floralCornerTop", "--asset-floral-top", "has-floral-top"],
      ["floralCornerBottom", "--asset-floral-bottom", "has-floral-bottom"],
      ["waxSeal", "--asset-wax-seal", "has-wax-seal"],
      ["invitationCard", "--asset-invitation-card", "has-invitation-card"]
    ];

    await Promise.all(assetMap.map(async ([key, property, className]) => {
      const path = assets[key];
      if (!path) return;

      try {
        const response = await fetch(path, { method: "HEAD", cache: "no-store" });
        if (response.ok) {
          document.documentElement.style.setProperty(property, `url("${path}")`);
          document.body.classList.add(className);
        }
      } catch (error) {
        // Dekorimet CSS mbeten aktive kur skedari opsional mungon.
      }
    }));
  }

  async function prepareHeroVideo() {
    els.heroVideo.addEventListener("error", showHeroImage);
    els.heroVideo.addEventListener("loadeddata", () => {
      els.heroVideo.classList.add("is-ready");
      els.heroVideo.play().catch(showHeroImage);
    });

    if (!data.heroVideo) {
      showHeroImage();
      return;
    }

    if (window.location.protocol === "file:") {
      showHeroImage();
      return;
    }

    try {
      const response = await fetch(data.heroVideo, { method: "HEAD" });
      const size = Number(response.headers.get("content-length") || "0");
      if (response.ok && size > 0) {
        els.heroVideo.src = data.heroVideo;
        return;
      }
    } catch (error) {
      els.heroVideo.src = data.heroVideo;
      return;
    }

    showHeroImage();
  }

  function setOptionalSections() {
    const giftInfo = (data.giftInfo || "").trim();
    if (giftInfo) {
      els.giftInfo.textContent = giftInfo;
    } else {
      els.giftSection.hidden = true;
    }
  }

  function setLinks() {
    els.mapButton.href = data.googleMapsLink || "#";
    els.poweredLink.href = data.poweredByInstagram || "#";
    const contactPhone = String(data.contactPhone || "").replace(/[^\d+]/g, "");
    els.contactButton.href = contactPhone ? `tel:${contactPhone}` : "#";
    els.rsvpYes.addEventListener("click", () => openWhatsApp(true));
    els.rsvpNo.addEventListener("click", () => openWhatsApp(false));
  }

  function openWhatsApp(isAttending) {
    const message = isAttending
      ? `Përshëndetje, konfirmoj pjesëmarrjen time në dasmën e ${coupleNamesText}.`
      : `Përshëndetje, më vjen keq, nuk mund të marr pjesë në dasmën e ${coupleNamesText}.`;
    const phone = String(data.rsvpPhone || "").replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  function setupIntro() {
    let introFinished = false;
    let introStarted = false;
    let fallbackTimer;

    const finishIntro = () => {
      if (introFinished) return;
      introFinished = true;
      clearTimeout(fallbackTimer);
      els.openingVideo.pause();
      els.introScreen.classList.add("intro-complete");
      els.musicToggle.classList.remove("is-hidden");

      setTimeout(() => els.introScreen.classList.add("is-open"), 520);
      setTimeout(() => els.introScreen.remove(), 1400);
    };

    els.openingVideo.addEventListener("ended", finishIntro);
    els.openingVideo.addEventListener("error", finishIntro);

    const startIntro = async () => {
      if (introStarted) return;
      introStarted = true;
      els.introScreen.setAttribute("aria-disabled", "true");
      els.introScreen.classList.add("opening");

      if (data.music) {
        try {
          await els.music.play();
        } catch (error) {
          els.music.pause();
        }
      }

      updateMusicButton();

      if (!data.openingVideo) {
        finishIntro();
        return;
      }

      if (els.openingVideo.getAttribute("src") !== data.openingVideo) {
        els.openingVideo.src = data.openingVideo;
      }
      els.openingVideo.pause();
      els.openingVideo.currentTime = 0;
      els.openingVideo.muted = true;
      els.openingVideo.playsInline = true;
      els.openingVideoLayer.setAttribute("aria-hidden", "false");
      els.introScreen.classList.add("video-playing");

      try {
        await els.openingVideo.play();
        const duration = Number.isFinite(els.openingVideo.duration)
          ? els.openingVideo.duration * 1000 + 2000
          : 30000;
        fallbackTimer = setTimeout(finishIntro, Math.min(duration, 60000));
      } catch (error) {
        finishIntro();
      }
    };

    els.introScreen.addEventListener("click", startIntro);
    els.introScreen.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startIntro();
      }
    });
  }

  function setupMusicToggle() {
    els.musicToggle.addEventListener("click", async () => {
      if (els.music.paused) {
        try {
          await els.music.play();
        } catch (error) {
          els.music.pause();
        }
      } else {
        els.music.pause();
      }
      updateMusicButton();
    });

    els.music.addEventListener("play", updateMusicButton);
    els.music.addEventListener("pause", updateMusicButton);
  }

  function updateMusicButton() {
    const isPlaying = !els.music.paused;
    els.musicToggle.classList.toggle("is-paused", !isPlaying);
    els.musicToggle.setAttribute("aria-pressed", String(isPlaying));
    els.musicToggle.setAttribute("aria-label", isPlaying ? "Muzika ndezur" : "Muzika fikur");
    els.musicState.textContent = isPlaying ? "Muzika ndezur" : "Muzika fikur";
  }

  function updateCountdown() {
    const diff = weddingDate - new Date();

    if (Number.isNaN(weddingDate.getTime()) || diff <= 0) {
      els.countdown.hidden = true;
      els.passedMessage.hidden = false;
      return;
    }

    const values = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };

    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      const text = String(value).padStart(2, "0");
      if (previousCountdown[id] !== text) {
        element.textContent = text;
        element.classList.remove("pulse");
        void element.offsetWidth;
        element.classList.add("pulse");
        previousCountdown[id] = text;
      }
    });
  }

  function setupRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".glass-card, .countdown-card, .gallery-item, .button-stack > *").forEach((item, index) => {
            item.style.transitionDelay = `${90 + index * 85}ms`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    });

    document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));
  }

  function setupLightbox() {
    els.lightboxClose.addEventListener("click", closeLightbox);
    els.lightbox.addEventListener("click", (event) => {
      if (event.target === els.lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });
  }

  function openLightbox(imagePath) {
    els.lightboxImage.src = imagePath;
    els.lightbox.classList.add("is-open");
    els.lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    els.lightbox.classList.remove("is-open");
    els.lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function createAmbientParticles() {
    if (!els.ambientLayer) return;

    for (let i = 0; i < 18; i += 1) {
      const particle = document.createElement("span");
      particle.style.left = `${5 + Math.random() * 90}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${10 + Math.random() * 12}s`;
      els.ambientLayer.appendChild(particle);
    }
  }

  init();
})();
