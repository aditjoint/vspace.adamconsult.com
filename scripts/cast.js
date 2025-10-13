window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

function initializeCastApi() {
  const context = cast.framework.CastContext.getInstance();
  context.setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });
}

function castToTV() {
  const video = document.getElementById("mainVideo");
  if (!video) return alert("No video found to cast!");

  const mediaInfo = new chrome.cast.media.MediaInfo(video.src, 'video/mp4');
  const request = new chrome.cast.media.LoadRequest(mediaInfo);
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();

  if (castSession) {
    castSession.loadMedia(request).then(
      () => console.log('Cast started'),
      (errorCode) => console.error('Error casting:', errorCode)
    );
  } else {
    alert("No cast session available.");
  }
}
