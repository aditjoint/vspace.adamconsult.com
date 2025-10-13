document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------
  // 1️⃣ Dynamic Header & Footer
  // -----------------------------
  const headerEl = document.getElementById("header-placeholder");
  const footerEl = document.getElementById("footer-placeholder");

  if (headerEl) {
    fetch("/header.html")
      .then(res => res.text())
      .then(html => { headerEl.innerHTML = html; })
      .catch(err => console.error("Header load failed:", err));
  }

  if (footerEl) {
    fetch("/footer.html")
      .then(res => res.text())
      .then(html => { footerEl.innerHTML = html; })
      .catch(err => console.error("Footer load failed:", err));
  }

  // -----------------------------
  // 2️⃣ Video Grid Setup
  // -----------------------------
  const videos = document.querySelectorAll('main.video-grid video');

  videos.forEach(video => {
    // Ensure autoplay, muted, loop
    video.autoplay = true;
    video.muted = true;
    video.loop = true;

    // Handle autoplay block
    video.play().catch(err => console.warn("Video autoplay blocked:", err));
  });

  // -----------------------------
  // 3️⃣ Fullscreen Button
  // -----------------------------
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      const grid = document.querySelector("main.video-grid");
      if (!grid) return;

      if (!document.fullscreenElement) {
        grid.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
      } else {
        document.exitFullscreen();
      }
    });
  }

  // -----------------------------
  // 4️⃣ Picture-in-Picture Button
  // -----------------------------
  const pipBtn = document.getElementById("pipBtn");
  if (pipBtn) {
    pipBtn.addEventListener("click", async () => {
      const firstVideo = videos[0];
      if (!firstVideo) return;

      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await firstVideo.requestPictureInPicture();
        }
      } catch (err) {
        console.error("PiP error:", err);
      }
    });
  }

  // -----------------------------
  // 5️⃣ Hero Animation / Optional
  // -----------------------------
  if (typeof initHeroAnimation === "function") initHeroAnimation();

  // -----------------------------
  // 6️⃣ Tabs / Dynamic UI (Optional)
  // -----------------------------
  if (type
