// Fullscreen
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Picture-in-Picture
document.getElementById("pipBtn").addEventListener("click", async () => {
  const videos = document.querySelectorAll("video");
  const activeVideo = videos[0];
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await activeVideo.requestPictureInPicture();
    }
  } catch (error) {
    alert("PiP not supported in this browser.");
  }
});

