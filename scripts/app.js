// app.js
document.addEventListener("DOMContentLoaded", () => {
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const pipBtn = document.getElementById("pipBtn");
  const castBtn = document.getElementById("castBtn");
  const videos = document.querySelectorAll("main.video-grid video");

  // ----- Fullscreen -----
  fullscreenBtn.addEventListener("click", () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable full-screen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  // ----- Picture-in-Picture (PiP) -----
  pipBtn.addEventListener("click", async () => {
    // Try PiP with the first video in the grid
    const firstVideo = videos[0];
    if (firstVideo) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await firstVideo.requestPictureInPicture();
        }
      } catch (err) {
        console.warn("PiP not supported:", err);
      }
    }
  });

  // ----- Chrome Cast -----
  castBtn.addEventListener("click", () => {
    if (!window.cast || !cast.framework) {
      alert("Chrome Cast not available or not initialized.");
      return;
    }
    const context = cast.framework.CastContext.getInstance();
    context.requestSession().then(() => {
      alert("Connected to Chromecast. Select a video to cast.");
    }).catch(err => {
      console.error("Cast error:", err);
    });
  });

  // Optional: Auto-play all videos muted
  videos.forEach(video => {
    video.muted = true;
    video.play().catch(err => console.warn("Video play error:", err));
  });
});
