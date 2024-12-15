
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const pausa = document.getElementById('pausa');
const botonA = document.getElementById('botonA');
const botonR = document.getElementById('botonB');
const tiempo = document.getElementById('tiempo');
const tiempoF = document.getElementById('tiempoF');
const barraT = document.getElementById('barraT');
const barrraTiempo = document.getElementById('barraTiempo')
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

barraTiempo.addEventListener('click', (event) => {
    const rect = barraTiempo.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const anchoTotal = rect.width; 
    const porcentaje = x / anchoTotal;
    audio.currentTime = porcentaje * audio.duration; 
  });

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
