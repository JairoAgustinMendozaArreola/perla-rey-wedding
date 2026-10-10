const menuToggle =
  document.getElementById("menuToggle");

const siteMenu =
  document.getElementById("siteMenu");

const sectionCounter =
  document.getElementById("sectionCounter");

const scrollProgress =
  document.getElementById("scrollProgress");

const menuLinks =
  document.querySelectorAll(
    ".site-menu__links a"
  );

const sections =
  document.querySelectorAll(
    ".section"
  );


/* ========================================
   MENU
======================================== */

function openMenu() {
  document.body.classList.add("menu-open");

  siteMenu.classList.add("is-open");

  siteMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Cerrar menú"
  );
}


function closeMenu() {
  document.body.classList.remove("menu-open");

  siteMenu.classList.remove("is-open");

  siteMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Abrir menú"
  );
}


menuToggle.addEventListener(
  "click",
  () => {
    const isOpen =
      document.body.classList.contains(
        "menu-open"
      );

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
);


/* ========================================
   MENU LINKS
======================================== */

menuLinks.forEach((link) => {
  link.addEventListener(
    "click",
    () => {
      closeMenu();
    }
  );
});


/* ========================================
   ACTIVE SECTION
======================================== */

function setActiveSection(sectionNumber) {

  sectionCounter.textContent =
    `${sectionNumber} / 08`;

  menuLinks.forEach((link) => {

    const isActive =
      link.dataset.section ===
      sectionNumber;

    link.classList.toggle(
      "is-active",
      isActive
    );

  });
}


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.45
        ) {

          const sectionNumber =
            entry.target.dataset.section;

          setActiveSection(
            sectionNumber
          );

        }

      });

    },
    {
      threshold: [
        0.45,
        0.6
      ]
    }
  );


sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* ========================================
   SCROLL PROGRESS
======================================== */

function updateScrollProgress() {

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  scrollProgress.style.width =
    `${progress}%`;
}


window.addEventListener(
  "scroll",
  updateScrollProgress,
  {
    passive: true
  }
);

updateScrollProgress();


/* ========================================
   ESC KEY
======================================== */

window.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      document.body.classList.contains(
        "menu-open"
      )
    ) {
      closeMenu();
    }

  }
);


/* INITIAL STATE */

setActiveSection("00");


/* ========================================
   COUNTDOWN — CEREMONIA RELIGIOSA
======================================== */

(() => {
  const countdownDays = document.getElementById("countdownDays");
  const countdownHours = document.getElementById("countdownHours");
  const countdownMinutes = document.getElementById("countdownMinutes");
  const countdownSeconds = document.getElementById("countdownSeconds");

  // Si la cuenta regresiva no está en la página, no hacemos nada.
  if (
    !countdownDays ||
    !countdownHours ||
    !countdownMinutes ||
    !countdownSeconds
  ) {
    return;
  }

  // 28 de noviembre de 2026, a las 13:00 h en Toluca (UTC-6).
  const weddingDate = new Date(
    "2026-11-28T13:00:00-06:00"
  ).getTime();

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  let intervalId = null;

  function updateCountdown() {
    const remaining = weddingDate - Date.now();

    // Cuando llegue la hora, todos los valores quedarán en cero.
    if (remaining <= 0) {
      countdownDays.textContent = "00";
      countdownHours.textContent = "00";
      countdownMinutes.textContent = "00";
      countdownSeconds.textContent = "00";

      if (intervalId !== null) {
        clearInterval(intervalId);
      }

      return;
    }

    const days = Math.floor(remaining / DAY);

    const hours = Math.floor(
      (remaining % DAY) / HOUR
    );

    const minutes = Math.floor(
      (remaining % HOUR) / MINUTE
    );

    const seconds = Math.floor(
      (remaining % MINUTE) / SECOND
    );

    countdownDays.textContent = String(days).padStart(2, "0");
    countdownHours.textContent = String(hours).padStart(2, "0");
    countdownMinutes.textContent = String(minutes).padStart(2, "0");
    countdownSeconds.textContent = String(seconds).padStart(2, "0");
  }

  // Mostrar los valores inmediatamente.
  updateCountdown();

  // Actualizar cada segundo mientras la fecha esté en el futuro.
  if (weddingDate > Date.now()) {
    intervalId = setInterval(updateCountdown, 1000);
  }
})();


/* ========================================
   ARCHIVE — NAVEGACIÓN DE FOTOGRAFÍAS
======================================== */

(() => {
  const image = document.getElementById("archiveImage");
  const previous = document.getElementById("archivePrevious");
  const next = document.getElementById("archiveNext");
  const current = document.getElementById("archiveCurrent");
  const total = document.getElementById("archiveTotal");

  if (!image || !previous || !next || !current || !total) {
    return;
  }

  const photos = [
    {
      src: "assets/images/full/PyR-1.webp",
      alt: "Perla y David PyR-1",
    },
    {
      src: "assets/images/full/PyR-2.webp",
      alt: "Perla y David PyR-2",
    },
    {
      src: "assets/images/full/PyR-3.webp",
      alt: "Perla y David PyR-3",
    },
    {
      src: "assets/images/full/PyR-4.webp",
      alt: "Perla y David PyR-4",
    },
    {
      src: "assets/images/full/PyR-5.webp",
      alt: "Perla y David PyR-5",
    },
    {
      src: "assets/images/full/PyR-6.webp",
      alt: "Perla y David PyR-6",
    },
    {
      src: "assets/images/full/PyR-7.webp",
      alt: "Perla y David PyR-7",
    },
    {
      src: "assets/images/full/PyR-8.webp",
      alt: "Perla y David PyR-8",
    },
    {
      src: "assets/images/full/PyR-9.webp",
      alt: "Perla y David PyR-9",
    },
    {
      src: "assets/images/full/PyR-10.webp",
      alt: "Perla y David PyR-10",
    },
    {
      src: "assets/images/full/PyR-11.webp",
      alt: "Perla y David PyR-11",
    },
    {
      src: "assets/images/full/PyR-12.webp",
      alt: "Perla y David PyR-12",
    },
    {
      src: "assets/images/full/PyR-13.webp",
      alt: "Perla y David PyR-13",
    },
    {
      src: "assets/images/full/PyR-14.webp",
      alt: "Perla y David PyR-14",
    },
    {
      src: "assets/images/full/PyR-15.webp",
      alt: "Perla y David PyR-15",
    },
    {
      src: "assets/images/full/PyR-16.webp",
      alt: "Perla y David PyR-16",
    },
    {
      src: "assets/images/full/PyR-17.webp",
      alt: "Perla y David PyR-17",
    },
    {
      src: "assets/images/full/PyR-18.webp",
      alt: "Perla y David PyR-18",
    },
    {
      src: "assets/images/full/PyR-19.webp",
      alt: "Perla y David PyR-19",
    },
    {
      src: "assets/images/full/PyR-20.webp",
      alt: "Perla y David PyR-20",
    },
    {
      src: "assets/images/full/PyR-21.webp",
      alt: "Perla y David PyR-21",
    },
    {
      src: "assets/images/full/PyR-22.webp",
      alt: "Perla y David PyR-22",
    },
    {
      src: "assets/images/full/PyR-23.webp",
      alt: "Perla y David PyR-23",
    },
    {
      src: "assets/images/full/PyR-24.webp",
      alt: "Perla y David PyR-24",
    },
    {
      src: "assets/images/full/PyR-25.webp",
      alt: "Perla y David PyR-25",
    },
    {
      src: "assets/images/full/PyR-26.webp",
      alt: "Perla y David PyR-26",
    },
    {
      src: "assets/images/full/PyR-27.webp",
      alt: "Perla y David PyR-27",
    },
    {
      src: "assets/images/full/PyR-28.webp",
      alt: "Perla y David PyR-28",
    },
    {
      src: "assets/images/full/PyR-29.webp",
      alt: "Perla y David PyR-",
    },
    {
      src: "assets/images/full/PyR-30.webp",
      alt: "Perla y David PyR-30",
    },
    {
      src: "assets/images/full/PyR-31.webp",
      alt: "Perla y David PyR-31",
    },
    {
      src: "assets/images/full/PyR-32.webp",
      alt: "Perla y David PyR-32",
    },
    {
      src: "assets/images/full/PyR-33.webp",
      alt: "Perla y David PyR-33",
    },
    {
      src: "assets/images/full/PyR-34.webp",
      alt: "Perla y David PyR-34",
    },
    {
      src: "assets/images/full/PyR-35.webp",
      alt: "Perla y David PyR-35",
    }
  ];

  let index = 0;

  total.textContent = String(photos.length).padStart(2, "0");

  function showPhoto(newIndex) {
    index = (newIndex + photos.length) % photos.length;

    image.src = photos[index].src;
    image.alt = photos[index].alt;

    current.textContent = String(index + 1).padStart(2, "0");
  }

  previous.addEventListener("click", () => {
    showPhoto(index - 1);
  });

  next.addEventListener("click", () => {
    showPhoto(index + 1);
  });

  showPhoto(0);
})();


/* ========================================
   REPRODUCTOR MUSICAL — TURNING PAGE
======================================== */

(() => {
  const music = document.getElementById("backgroundMusic");
  const musicControl = document.getElementById("musicControl");

  if (!music || !musicControl) {
    console.error("No se encontró el reproductor musical en el HTML.");
    return;
  }

  const musicText = musicControl.querySelector(".music-control__text");

  if (!musicText) {
    console.error("No se encontró el texto del botón de música.");
    return;
  }

  function updateMusicControl(isPlaying) {
    musicControl.classList.toggle("is-playing", isPlaying);

    musicControl.setAttribute("aria-pressed", String(isPlaying));

    musicControl.setAttribute(
      "aria-label",
      isPlaying ? "Pausar música" : "Reproducir música"
    );

    musicText.textContent = isPlaying ? "Pausar" : "Música";
  }

  musicControl.addEventListener("click", async () => {
    if (!music.paused) {
      music.pause();
      return;
    }

    try {
      await music.play();
    } catch (error) {
      console.error("No fue posible reproducir la música:", error);
    }
  });

  // Mantener el botón sincronizado con el audio.
  music.addEventListener("play", () => {
    updateMusicControl(true);
  });

  music.addEventListener("pause", () => {
    updateMusicControl(false);
  });

  music.addEventListener("ended", () => {
    updateMusicControl(false);
  });

  music.addEventListener("error", () => {
    console.error(
      "No se pudo cargar Turning_Page.mp3. Revisa la ruta y el formato del archivo."
    );
  });

  updateMusicControl(false);
})();


/* ========================================
   GALERÍA: GESTOS TÁCTILES
======================================== */

(() => {
  const photo = document.getElementById("archiveImage");
  const previousButton = document.getElementById("archivePrevious");
  const nextButton = document.getElementById("archiveNext");

  if (!photo || !previousButton || !nextButton) {
    console.warn("No se encontraron todos los controles de la galería.");
    return;
  }

  let startX = 0;
  let startY = 0;

  const minimumSwipeDistance = 45;

  photo.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];

      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true }
  );

  photo.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];

      const differenceX = touch.clientX - startX;
      const differenceY = touch.clientY - startY;

      // Ignorar movimientos pequeños o principalmente verticales.
      if (
        Math.abs(differenceX) < minimumSwipeDistance ||
        Math.abs(differenceX) <= Math.abs(differenceY) * 1.2
      ) {
        return;
      }

      if (differenceX < 0) {
        // Deslizar hacia la izquierda: siguiente fotografía.
        nextButton.click();
      } else {
        // Deslizar hacia la derecha: fotografía anterior.
        previousButton.click();
      }
    },
    { passive: true }
  );
})();
