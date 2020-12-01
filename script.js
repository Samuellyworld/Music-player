const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
   {
   	name: 'strong',
   	displayName: 'Strong Will Continue',
   	artist: 'Nas & Darmian Marley'
   },
     {
   	name: 'Africa',
   	displayName: 'Africa Must Wake Up',
   	artist: 'Nas & Darmian Marley'
   },
    {
   	name: 'Patience',
   	displayName: 'Patience',
   	artist: 'Nas & Darmian Marley'
   },
   {
   	name: 'Tribes',
   	displayName: 'Tribes At War',
   	artist: 'Nas & Darmian Marley'
   }
]
// set is playing

let isPlaying =false;

// play
function playSong(){
	 isPlaying= true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// pause
function pauseSong(){
	 isPlaying= false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

// pause and play eventListener
playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong(): playSong()));

// update the Dom
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `/music/${song.name}.mp3`;
	image.src = `/img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// prevSong 
function prevSong() {
	songIndex--
	if(songIndex < 0) {
       songIndex = songs.length -1
}
   loadSong(songs[songIndex]);
   playSong();
}

// next song
function nextSong() {
	songIndex++
	if(songIndex > songs.length-1) {
		songIndex =0 
	}
	loadSong(songs[songIndex]);
   playSong();
}
// load song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
	if(isPlaying) {
		const {duration, currentTime} = e.srcElement;
		// Update progress bar width
		const progressPercent = (currentTime/duration)* 100;
		progress.style.width = `${progressPercent}%`;
		// calculate display for duration
		const durationMinutes = Math.floor(duration/60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		// delay switching the duration element to avoid NaN
		if(durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`
		}
		// calculate display for current
		const currentMinutes = Math.floor(currentTime/60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
	}
}
function setProgressBar(e) {
	const width= this.clientWidth;
	const clickX = e.offsetX;
	const {duration} = music;
	music.currentTime =(clickX / width)* duration;
}

// Eventlistener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);