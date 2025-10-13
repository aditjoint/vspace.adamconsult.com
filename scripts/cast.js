// ------------------------
// Google Cast Initialization
// ------------------------
window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
    console.log("Cast API initialized");
  } else {
    console.log("Cast API not available");
  }
};

// ------------------------
// DOM Content Loaded
// ------------------------
document.addEventListener("DOMContentLoaded", function () {
  const castBtn = document.getElementById('castBtn');
  const pipBtn = document.getElementById('pipBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const videos = document.querySelectorAll('main.video-grid video');

  // ------------------------
  // Cast Button Handler
  // ------------------------
  if (castBtn) {
    castBtn.addEventListener('click', function() {
      const castContext = cast.framework.CastContext.getInstance();
      const session = castContext.getCurrentSession();

      if (!session) {
        castContext.requestSession().then(() => {
          console.log("Casting session started");
          sendCurrentVideoToCast();
        }).catch(err => {
          console.error("Failed to start casting session:", err);
        });
      } else {
        console.log("Already casting");
        sendCurrentVideoToCast();
      }
    });
  }

  // Function to cast the first video in grid (can modify for multi-video)
  function sendCurrentVideoToCast() {
    const session = cast.framework.CastContext.getInstance().getCurrentSession();
    if (!session) return;

    // Pick the first video in grid for casting
    const videoEl = videos[0];
    if (!videoEl) return;

    const mediaInfo = new chrome.cast.media.MediaInfo(videoEl.currentSrc, 'video/mp4');
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    session.loadMedia(request).then(() => {
      console.log("Video sent to Chromecast");
    }).catch(err => {
      console.error("Failed to load media:", err);
    });
  }

  // ------------------------
  // Picture-in-Picture Handler
  // ------------------------
  if (pipBtn) {
    pipBtn.addEventListener('click', async function() {
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

  // ------------------------
  // Fullscreen Handler
  // ------------------------
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
      const grid = document.querySelector('main.video-grid');
      if (!grid) return;

      if (!document.fullscreenElement) {
        grid.requestFullscreen().catch(err => {
          console.error("Fullscreen error:", err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // ------------------------
  // Optional: Auto-play all videos (for signage)
  // ------------------------
  videos.forEach(video => {
    video.play().catch(err => console.warn("Video autoplay blocked:", err));
  });
});
