const songs = [
    {title: "100 Million", artist: "Divine,Karan Aujla", src: "Song/100million.mp3", cover: "Photo/img1.png"},
    {title: "Wining Speech", artist: "Karan Aujla", src: "Song/Winning_speech.mp3", cover: "Photo/img2.png"},
    {title: "Thodi Si Daaru", artist: "AP Dhillon", src: "Song/Thodi_Si_Daaru.mp3", cover: "Photo/img3.png"}
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("coverImg");
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const progressFilled = document.getElementById("progressFilled");
const volumeControl = document.getElementById("volumeControl");
const playlistEl = document.getElementById("playlist");
const visualizer = document.getElementById("visualizer");

function loadSong(index) {
    const song = songs[index];
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    coverEl.src = song.cover;
    audio.src = song.src;
    updatePlaylistHighlight();
}

function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
    coverEl.classList.add("playing");
    visualizer.style.visibility = "visible";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";
    coverEl.classList.remove("playing");
    visualizer.style.visibility = "hidden";
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function updatePlaylistHighlight() {
    [...playlistEl.children].forEach((el, i) => {
        el.classList.toggle("active", i === currentSongIndex);
    });
}

playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

document.getElementById("nextBtn").addEventListener("click", nextSong);
document.getElementById("prevBtn").addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFilled.style.width = percent + "%";
});

progress.addEventListener("click", (e) => {
    const width = progress.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

audio.addEventListener("ended", nextSong);

// Playlist
songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = `${song.title} - ${song.artist}`;
    div.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(index);
        playSong();
    });
    playlistEl.appendChild(div);
});

// Load first song
loadSong(currentSongIndex);
volumeControl.value = 0.5;
audio.volume = 0.5;
visualizer.style.visibility = "hidden";


