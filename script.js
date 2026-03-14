var songs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 2,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        cover: "https://upload.wikimedia.org/wikipedia/en/2/29/Harry_Styles_-_Watermelon_Sugar.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 3,
        title: "Purpose",
        artist: "Justin Bieber",
        cover: "https://upload.wikimedia.org/wikipedia/en/2/27/Justin_Bieber_-_Purpose_%28Official_Album_Cover%29.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 4,
        title: "Shape of You",
        artist: "Ed Sheeran",
        cover: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 5,
        title: "As It Was",
        artist: "Harry Styles",
        cover: "https://upload.wikimedia.org/wikipedia/en/9/90/Harry_Styles_-_As_It_Was.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 6,
        title: "Starboy",
        artist: "The Weeknd",
        cover: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 7,
        title: "Rolling in the Deep",
        artist: "Adele",
        cover: "https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    },
    {
        id: 8,
        title: "Bad Guy",
        artist: "Billie Eilish",
        cover: "https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png",
        audioSrc: "02. The Weeknd - Blinding Lights.flac"
    }
];

var songsContainer = document.getElementById('songs-container');
var featuredContainer = document.getElementById('featured-container');
var mostLikedContainer = document.getElementById('most-liked-container');
var recapsContainer = document.getElementById('recaps-container');
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');

var audioPlayer = document.getElementById('audio-player');
var playBtn = document.getElementById('play-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');

var currentCover = document.getElementById('current-cover');
var currentTitle = document.getElementById('current-title');
var currentArtist = document.getElementById('current-artist');

var progressBar = document.getElementById('progress-bar');
var currentTimeEl = document.getElementById('current-time');
var durationTimeEl = document.getElementById('duration-time');

var currentSongIndex = 0;
var isPlaying = false;

function renderSongs(songsToRender, container) {
    if (!container) return;
    container.innerHTML = '';

    if (songsToRender.length === 0) {
        container.innerHTML = '<p>No songs found.</p>';
        return;
    }

    for (var i = 0; i < songsToRender.length; i++) {
        var song = songsToRender[i];

        var card = document.createElement('div');
        card.className = 'card';

        card.innerHTML =
            '<img src="' + song.cover + '" alt="Cover image for ' + song.title + '" ' +
            'onerror="this.onerror=null; this.src=\'https://placehold.co/200x200/333/fff?text=No+Cover\';">' +
            '<h3>' + song.title + '</h3>' +
            '<p>' + song.artist + '</p>';

        card.addEventListener('click', createClickHandler(song));

        container.appendChild(card);
    }
}

function createClickHandler(songItem) {
    return function () {
        currentSongIndex = -1;

        for (var i = 0; i < songs.length; i++) {
            if (songs[i].id === songItem.id) {
                currentSongIndex = i;
                break;
            }
        }

        if (currentSongIndex !== -1) {
            loadSong(songs[currentSongIndex]);
            playSong();
        }
    };
}

function loadSong(song) {
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentCover.src = song.cover;
    currentCover.onerror = function () {
        this.onerror = null;
        this.src = 'https://placehold.co/200x200/333/fff?text=No+Cover';
    };
    currentCover.style.display = 'block';

    if (audioPlayer) {
        audioPlayer.src = song.audioSrc || '';
    }
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    audioPlayer.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    audioPlayer.pause();
}

if (playBtn) {
    playBtn.addEventListener('click', function () {
        if (isPlaying === true) {
            pauseSong();
        } else {
            playSong();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', function () {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', function () {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
    });
}

if (audioPlayer) {
    audioPlayer.addEventListener('ended', function () {
        if (nextBtn) nextBtn.click();
    });
}

var volumeSlider = document.getElementById('volume-slider');
var muteBtn = document.getElementById('mute-btn');
var volumeIcon = document.getElementById('volume-icon');

if (volumeSlider && muteBtn && volumeIcon) {
    audioPlayer.volume = volumeSlider.value / 100;

    volumeSlider.addEventListener('input', function () {
        audioPlayer.volume = this.value / 100;
        updateVolumeIcon();
        if (audioPlayer.volume > 0) {
            audioPlayer.muted = false;
        }
    });

    muteBtn.addEventListener('click', function () {
        audioPlayer.muted = !audioPlayer.muted;
        updateVolumeIcon();
    });

    function updateVolumeIcon() {
        if (audioPlayer.muted || audioPlayer.volume === 0) {
            volumeIcon.className = 'fa-solid fa-volume-xmark';
        } else if (audioPlayer.volume < 0.5) {
            volumeIcon.className = 'fa-solid fa-volume-low';
        } else {
            volumeIcon.className = 'fa-solid fa-volume-high';
        }
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    return min + ':' + (sec < 10 ? '0' + sec : sec);
}

if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', function () {
        if (audioPlayer.duration) {
            var progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (progressBar) progressBar.value = progressPercent;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            if (durationTimeEl) durationTimeEl.textContent = formatTime(audioPlayer.duration);
        }
    });
}

if (progressBar) {
    progressBar.addEventListener('input', function () {
        if (audioPlayer && audioPlayer.duration) {
            var seekTime = (progressBar.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        }
    });
}

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var query = searchInput.value.toLowerCase().trim();
        var filteredSongs = songs.filter(function (song) {
            return song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
        });

        if (songsContainer) renderSongs(filteredSongs, songsContainer);
        if (featuredContainer) renderSongs(filteredSongs, featuredContainer);
        if (mostLikedContainer) renderSongs(filteredSongs, mostLikedContainer);
        if (recapsContainer) renderSongs(filteredSongs, recapsContainer);
    });
}

if (songsContainer) renderSongs(songs, songsContainer);
if (featuredContainer) renderSongs(songs.slice().reverse(), featuredContainer);
if (mostLikedContainer) renderSongs(songs.slice(0, 4), mostLikedContainer);
if (recapsContainer) renderSongs(songs.slice(4), recapsContainer);
