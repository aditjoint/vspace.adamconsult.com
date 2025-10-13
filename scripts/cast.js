window.__onGCastApiAvailable = function(isAvailable) {
  if (isAvailable) {
    const context = cast.framework.CastContext.getInstance();
    context.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
  }
};

document.getElementById("castBtn").addEventListener("click", async () => {
  const videos = document.querySelectorAll("video");
  const activeVideo = videos[0];
  const mediaInfo = new chrome.cast.media.MediaInfo(activeVideo.src, "video/mp4");
  const request = new chrome.cast.media.LoadRequest(mediaInfo);
  const session = cast.framework.CastContext.getInstance().getCurrentSession();

  if (session) {
    session.loadMedia(request).then(
      () => console.log("Cast started successfully"),
      (error) => console.error("Error casting:", error)
    );
  } else {
    alert("Please connect to a Chromecast device first.");
  }
});
