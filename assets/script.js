async function loadLayout() {
  const res = await fetch('config/layout.json');
  const data = await res.json();
  const grid = document.getElementById('video-grid');

  data.tiles.forEach((tile, i) => {
    const div = document.createElement('div');
    div.className = 'tile';
    let element;

    if (tile.type === 'youtube') {
      element = document.createElement('iframe');
      element.src = tile.src + "?autoplay=1&mute=1";
      element.allow = "autoplay; encrypted-media";
    } else {
      element = document.createElement('video');
      element.controls = false;
      element.autoplay = true;
      element.muted = true;
      element.loop = true;

      if (tile.src.endsWith(".m3u8") && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(tile.src);
        hls.attachMedia(element);
      } else {
        element.src = tile.src;
      }
    }

    div.appendChild(element);
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
      <button onclick="toggleFullscreen(this)">⛶</button>
      <button onclick="togglePiP(this)">📺</button>
    `;
    div.appendChild(controls);
    grid.appendChild(div);
  });
}

function toggleFullscreen(btn) {
  const tile = btn.closest('.tile');
  if (!document.fullscreenElement) {
    tile.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function togglePiP(btn) {
  const tile = btn.closest('.tile');
  const el = tile.querySelector('video, iframe');
  if (el.classList.contains('pip')) {
    el.classList.remove('pip');
  } else {
    el.classList.add('pip');
    makeDraggable(el);
  }
}

function makeDraggable(el) {
  let offsetX, offsetY, isDragging = false;
  el.onmousedown = e => {
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
  };
  window.onmousemove = e => {
    if (isDragging) {
      el.style.left = e.clientX - offsetX + 'px';
      el.style.top = e.clientY - offsetY + 'px';
    }
  };
  window.onmouseup = () => isDragging = false;
}

loadLayout();

let sceneIndex = 0;

async function startSceneRotation() {
  const res = await fetch('config/layout.json');
  const data = await res.json();
  if (!data.playlists) return;

  setInterval(() => {
    sceneIndex = (sceneIndex + 1) % data.playlists.length;
    const layout = data.playlists[sceneIndex];
    renderLayout(layout.tiles);
  }, data.rotationInterval || 30000);
}

