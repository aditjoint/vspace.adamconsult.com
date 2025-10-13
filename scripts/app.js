function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}

async function enablePiP() {
  const video = document.getElementById("mainVideo");
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  } else if (video) {
    try {
      await video.requestPictureInPicture();
    } catch (err) {
      alert("PiP not supported in this browser.");
    }
  }
}
