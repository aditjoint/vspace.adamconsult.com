window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) initializeCastApi();
};

function initializeCastApi() {
  const context = cast.framework.CastContext.getInstance();
  context.setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });
}

async function castTile(videoSrc) {
  const context = cast.framework.CastContext.getInstance();
  const session = context.getCurrentSession();
  if (!session) return alert("No cast session!");

  const mediaInfo = new chrome.cast.media.MediaInfo(videoSrc, "video/mp4");
  const request = new chrome.cast.media.LoadRequest(mediaInfo);
  await session.loadMedia(request);
  alert("Casting to TV: " + videoSrc);
}
