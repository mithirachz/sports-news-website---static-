document.addEventListener("DOMContentLoaded", () => {
  console.log("Sports News Hub Loaded 🏟️");

  /* 🧭 NAVIGATION ACTIVE LINK */
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* 🎨 CARD HOVER EFFECT */
  const cards = document.querySelectorAll(".news-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), rgba(255,255,255,0.05))
      `;
    });
    card.addEventListener("mouseleave", () => {
      card.style.background = "rgba(255, 255, 255, 0.08)";
    });
  });

  /* 🔍 SEARCH FILTER */
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const query = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();
        card.style.display =
          title.includes(query) || description.includes(query)
            ? "block"
            : "none";
      });
    });
  }

  /* 📰 MODAL READ MORE */
  document.querySelectorAll(".news-card .read-more").forEach(button => {
    button.addEventListener("click", e => {
      const card = e.target.closest(".news-card");
      const title = card.querySelector("h2").textContent;
      const description = card.querySelector("p").textContent;
      let extraInfo = "";

      if (title.includes("Football"))
        extraInfo =
          "Liverpool and Real Madrid delivered a thrilling game with multiple goals and late drama...";
      else if (title.includes("Basketball"))
        extraInfo =
          "The NBA playoffs continue to surprise with underdogs taking the spotlight...";
      else if (title.includes("Tennis"))
        extraInfo = "The tournament saw intense rallies and emotional moments...";
      else if (title.includes("Cricket"))
        extraInfo = "India and Bangladesh continue their fierce rivalry...";

      modalTitle.textContent = title;
      modalText.textContent = `${description} ${extraInfo}`;
      modal.style.display = "flex";
    });
  });

  /* 🧭 HEADER HIDE ON SCROLL */
  let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScrollY && currentScroll > 100) {
      header.classList.add("hide");
    } else if (currentScroll < lastScrollY) {
      header.classList.remove("hide");
    }
    lastScrollY = currentScroll;
    scrollTimeout = null;
  }, 100); // runs every ~100ms instead of every pixel
});


  /* 🏎️ NEWS SLIDER */
  const slider = document.getElementById("newsSlider");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (slider && prevBtn && nextBtn) {
    const cardsPerView = 4;
    let currentIndex = 0;

    function getCardWidth() {
      const firstCard = slider.querySelector(".news-card");
      const gap = parseFloat(window.getComputedStyle(slider).gap) || 0;
      return firstCard ? firstCard.offsetWidth + gap : 0;
    }

    function updateSlider() {
      const offset = -(currentIndex * getCardWidth());
      slider.style.transform = `translateX(${offset}px)`;
      slider.style.transition = "transform 0.5s ease";
    }

    nextBtn.addEventListener("click", () => {
      const totalCards = slider.querySelectorAll(".news-card").length;
      if (currentIndex < totalCards - cardsPerView) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    window.addEventListener("resize", updateSlider);
  }
});
