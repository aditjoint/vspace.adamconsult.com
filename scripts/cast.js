// cast.js
window.__onGCastApiAvailable = function(isAvailable) {
  if (isAvailable) initializeCastApi();
};

function initializeCastApi() {
  const context = cast.framework.CastContext.getInstance();
  context.setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });

  console.log("Chromecast API initialized.");
}
