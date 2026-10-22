// PERSONALISE THIS FILE: edit the songs and reasons below.
const tracks = [
  {
    title: "Slicked Back",
    artist: "Zach Bryan",
    src: "music/slicked-back.mp3",
    note: "The song that reminds me of our first adventure together..."
  },
  {
    title: "So Easy (To Fall In Love)",
    artist: "Olivia Dean",
    src: "music/so-easy.mp3",
    note: "The song that reminds me of a Spring afternoon in Derby..."
  },
  {
    title: "Nervous Tics",
    artist: "Maribou State",
    src: "music/nervous-tics.mp3",
    note: "The song that reminds me of our first date..."
  },
  {
    title: "Hoedown Throwdown",
    artist: "Hannah Montana",
    src: "music/hoedown-throwdown.mp3",
    note: "The song that reminds of how fun you are..."
  },
  {
    title: "Just Keep Watching",
    artist: "Tate McRae",
    src: "music/just-keep-watching.mp3",
    note: "The song that reminds me of you even when I'm working..."
  },
  {
    title: "Hampstead",
    artist: "Ariana Grande",
    src: "music/hampstead.mp3",
    note: "The song that reminds me of how much I love you..."
  },
  {
    title: "ROS",
    artist: "Mac Miller",
    src: "music/ros.mp3",
    note: "The song that reminds me that I will always love you..."
  }
];

const audio = document.querySelector("#audio");
const trackTitle = document.querySelector("#trackTitle");
const trackArtist = document.querySelector("#trackArtist");
const trackNote = document.querySelector("#trackNote");
const trackList = document.querySelector("#trackList");
const playPause = document.querySelector("#playPause");
const playerStatus = document.querySelector("#playerStatus");
const progress = document.querySelector("#progress");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const toast = document.querySelector("#toast");

let currentTrack = 0;
let toastTimeout;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2400);
}

function renderTrackList() {
  trackList.replaceChildren();
  tracks.forEach((track, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `track-row${index === currentTrack ? " active" : ""}`;
    button.setAttribute("aria-label", `Play ${track.title}`);
    button.innerHTML = `
      <span class="track-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="track-row-text">
        <span class="track-row-title"></span>
        <span class="track-row-artist"></span>
      </span>
      <span class="track-row-note" aria-hidden="true">♡</span>`;
    button.querySelector(".track-row-title").textContent = track.title;
    button.querySelector(".track-row-artist").textContent = track.artist;
    button.addEventListener("click", () => loadTrack(index, true));
    trackList.append(button);
  });
}

function loadTrack(index, shouldPlay = false) {
  currentTrack = (index + tracks.length) % tracks.length;
  const track = tracks[currentTrack];
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  trackNote.textContent = track.note;
  audio.src = track.src;
  progress.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";
  renderTrackList();
  playerStatus.textContent = `Selected: ${track.title}`;
  if (shouldPlay) playAudio();
}

async function playAudio() {
  if (!audio.src) loadTrack(currentTrack);
  try {
    await audio.play();
    playPause.textContent = "Ⅱ";
    playPause.setAttribute("aria-label", "Pause music");
    playerStatus.textContent = "Playing just for you ♡";
  } catch (error) {
    playPause.textContent = "▶";
    playPause.setAttribute("aria-label", "Play music");
    playerStatus.textContent = "Couldn't play this file. Check the MP3 path and try again.";
  }
}

function pauseAudio() {
  audio.pause();
  playPause.textContent = "▶";
  playPause.setAttribute("aria-label", "Play music");
  playerStatus.textContent = "Paused — press play whenever you're ready.";
}

playPause.addEventListener("click", () => {
  if (audio.paused) playAudio();
  else pauseAudio();
});
document.querySelector("#prevTrack").addEventListener("click", () => loadTrack(currentTrack - 1, true));
document.querySelector("#nextTrack").addEventListener("click", () => loadTrack(currentTrack + 1, true));

audio.addEventListener("timeupdate", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }
});
audio.addEventListener("ended", () => loadTrack(currentTrack + 1, true));
audio.addEventListener("error", () => {
  if (audio.currentSrc) playerStatus.textContent = "Audio file not found. Add the MP3 to the music folder or update its path in script.js.";
});
progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  }
});

const particles = document.querySelector("#particles");
const symbols = ["♡", "♥", "✧", "✦"];
function makeParticle() {
  const el = document.createElement("span");
  el.className = "particle";
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = `${Math.random() * 100}%`;
  el.style.fontSize = `${10 + Math.random() * 15}px`;
  el.style.animationDuration = `${8 + Math.random() * 9}s`;
  el.style.animationDelay = `${Math.random() * 2}s`;
  particles.append(el);
  el.addEventListener("animationend", () => el.remove(), { once: true });
}
function makeHeartBurst() {
  for (let i = 0; i < 14; i++) {
    const el = document.createElement("span");
    el.className = "particle";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${25 + Math.random() * 50}%`;
    el.style.bottom = `${10 + Math.random() * 20}%`;
    el.style.fontSize = `${12 + Math.random() * 16}px`;
    el.style.animationDuration = `${3 + Math.random() * 3}s`;
    particles.append(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }
}
for (let i = 0; i < 13; i++) setTimeout(makeParticle, i * 420);

// Start with the first playlist item selected. Browsers require a user click to start audio.
loadTrack(0);
