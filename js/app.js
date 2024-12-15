/*
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const pausa = document.getElementById('pausa');
const botonA = document.getElementById('botonA');
const botonR = document.getElementById('botonB');
const tiempo = document.getElementById('tiempo');
const tiempoF = document.getElementById('tiempoF');
const barraT = document.getElementById('barraT');
const cover1 = document.getElementById('cover1');
const cover2 = document.getElementById('cover2');
const tituloCancion = document.getElementById('tituloC')
const subtituloCancion = document.getElementById('subtituloC')
let audio= audio1;
let i = 0;
let f = 0;
let tiempoC, tiempoC2;
let tiempoFaltante, minutero, secundero, tiempoP;




tituloC(audio)


setInterval(() => {
    tiempoduraicon();   
}, 500);

audio.addEventListener("loadedmetadata",(event) => {   
    tiempoCancion(audio)   
})

botonA.addEventListener("click", (event) => {
    cancion(audio)
    tiempoCancion(audio)
    tituloC(audio)
})

botonR.addEventListener("click", (event) => {
    cancion(audio)
    tiempoCancion(audio)  
    tituloC(audio)
})


pausa.addEventListener("click", (event) => {
    tiempoCancion(audio)
    if(i === 0){
        audio.play();
        i = 1;
        pausaB.style.display = "none";
        despausaB.style.display = "block";
        return
    }
    if(i === 1){
        audio.pause();
        i = 0;
        pausaB.style.display = "block";
        despausaB.style.display = "none"
    }
})



function tiempoCancion(varia){
    tiempoC = Math.floor(audio.duration / 60)
    tiempoC2 = Math.floor(audio.duration) % 60
    tiempo.textContent =  `${tiempoC}:${tiempoC2}`
}



function tiempoduraicon(){
    tiempoFaltante = parseInt(audio.currentTime)
    tiempoP = (tiempoFaltante / Math.floor(audio.duration)) * 100
    minutero = Math.floor(tiempoFaltante / 60)
    secundero = Math.floor(tiempoFaltante) %60
    tiempoF.textContent =  `${minutero}:${secundero}`
    barraT.style.width = `${tiempoP}%`
}


function cancion(varia){
    i = 1
    if(f === 1){
        audio.pause();
        audio = audio1;
        audio.play();
        f = 0
        pausaB.style.display = "none";
        despausaB.style.display = "block";
        cover1.style.display = "block";
        cover2.style.display = "none";

        return audio , i 
    }
    if(f === 0){
        audio.pause();
        audio = audio2;
        audio.play();
        f = 1
        pausaB.style.display = "none";
        despausaB.style.display = "block"
        cover1.style.display = "none";
        cover2.style.display = "block";
        return audio, i
    }
}


function tituloC(vario){
    let rutaCompleta = vario.src;

    
    let division = rutaCompleta.split("/").pop(); 
    division = division.split(".")[0];
    
    division = division.split("-").filter(word => isNaN(word)).join(" "); 
    
    tituloCancion.textContent = division

    let Mensaje = (division === "lost in city lights")? "Cosmo Sheldrake" : "Lesfm" 

    subtituloCancion.textContent = Mensaje

    
}
*/

class MusicPlayer {
    constructor() {
        // Elementos DOM
        this.audioElements = [
            document.getElementById('audio1'),
            document.getElementById('audio2')
        ];
        this.pausaButton = document.getElementById('pausa');
        this.playButton = document.getElementById('botonA');
        this.nextButton = document.getElementById('botonB');
        this.currentTimeDisplay = document.getElementById('tiempo');
        this.remainingTimeDisplay = document.getElementById('tiempoF');
        this.progressBar = document.getElementById('barraT');
        this.covers = [
            document.getElementById('cover1'),
            document.getElementById('cover2')
        ];
        this.songTitle = document.getElementById('tituloC');
        this.songSubtitle = document.getElementById('subtituloC');

        // Estado inicial
        this.currentAudioIndex = 0;
        this.isPlaying = false;

        // Inicialización
        this.init();
    }

    init() {
        this.updateSongInfo();
        this.addEventListeners();
        setInterval(() => this.updateProgressBar(), 500);
    }

    addEventListeners() {
        // Listeners para botones
        this.playButton.addEventListener('click', () => this.switchSong());
        this.nextButton.addEventListener('click', () => this.switchSong());
        this.pausaButton.addEventListener('click', () => this.togglePlay());

        // Listener para actualizar duración cuando se cargan metadatos
        this.audioElements.forEach(audio => {
            audio.addEventListener('loadedmetadata', () => {
                this.updateDurationDisplay();
            });
        });
    }

    getCurrentAudio() {
        return this.audioElements[this.currentAudioIndex];
    }

    togglePlay() {
        const currentAudio = this.getCurrentAudio();
        
        if (this.isPlaying) {
            currentAudio.pause();
            this.updatePauseState(false);
        } else {
            currentAudio.play();
            this.updatePauseState(true);
        }
    }

    updatePauseState(isPlaying) {
        this.isPlaying = isPlaying;
        document.getElementById('pausaB').style.display = isPlaying ? 'none' : 'block';
        document.getElementById('despausaB').style.display = isPlaying ? 'block' : 'none';
    }

    switchSong() {
        // Pausa la canción actual
        this.getCurrentAudio().pause();
        this.updatePauseState(false);

        // Cambia al siguiente audio
        this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audioElements.length;
        
        // Actualiza UI
        this.updateSongInfo();
        this.toggleCovers();

        // Reproduce la nueva canción
        this.togglePlay();
        this.updateDurationDisplay(); // Aseguramos que se actualice la duración
    }

    updateSongInfo() {
        const currentAudio = this.getCurrentAudio();
        const songTitle = this.extractSongTitle(currentAudio.src);
        this.songTitle.textContent = songTitle;

        // Subtítulo dinámico
        this.songSubtitle.textContent = (songTitle === 'Lost in City Lights') ? 'Cosmo Sheldrake' : 'Lesfm';

        // Actualizar duración al cambiar de canción
        if (!isNaN(currentAudio.duration)) {
            this.updateDurationDisplay();
        }
    }

    extractSongTitle(audioSrc) {
        const fileName = audioSrc.split('/').pop().split('.')[0];
        return fileName.split('-').filter(word => isNaN(word)).join(' ');
    }

    toggleCovers() {
        this.covers.forEach((cover, index) => {
            cover.style.display = index === this.currentAudioIndex ? 'block' : 'none';
        });
    }

    updateDurationDisplay() {
        const currentAudio = this.getCurrentAudio();
        const duration = currentAudio.duration;

        if (!isNaN(duration)) {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
            this.currentTimeDisplay.textContent = `${minutes}:${seconds}`;
        }
    }

    updateProgressBar() {
        const currentAudio = this.getCurrentAudio();
        const currentTime = currentAudio.currentTime;
        const duration = currentAudio.duration;

        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progressBar.style.width = `${progressPercent}%`;

            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
            this.remainingTimeDisplay.textContent = `${minutes}:${seconds}`;
        }cir, cuand
    }
}

// Inicializa el reproductor
const musicPlayer = new MusicPlayer();
