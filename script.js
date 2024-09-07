let musicas = [
    { titulo: 'Doppelgänger', artista: 'Anny', src: 'sons/Anny - Doppelgänger ft. @M4rkim.mp3', img: 'fotos/anny2.jpg' },
    { titulo: 'Euforia', artista: 'VMZ', src: 'sons/VMZ - Euforia (Undertale) Feat. Anny.mp3', img: 'fotos/vmz.jfif' },
    { titulo: 'Save Me', artista: 'XXXtentacion', src: 'sons/XXXTENTACION - Save Me (Audio).mp3', img: 'fotos/XXX.jpg' },
    { titulo: 'Só denovo', artista: 'Yuri Bla4ck', src: 'sons/Yuri Bl4ck x VMZ - Estou só de novo (Prod. BXV).mp3', img: 'fotos/Alone.png' }
]

let musica = document.querySelector('audio')
let indexMusica = 0

let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descricao h2')
let nomeArtista = document.querySelector('.descricao i')
let progressBar = document.getElementById('progressBar')

renderizarMusica(indexMusica)

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica)

document.querySelector('.botao-pause').addEventListener('click', pausarMusica)

musica.addEventListener('timeupdate', atualizarBarra)

document.querySelector('.anterior').addEventListener('click', () => {
    const estavaTocando = !musica.paused

    indexMusica--
    if (indexMusica < 0) {
        indexMusica = musicas.length - 1
    }
    renderizarMusica(indexMusica)

    if (estavaTocando) {
        musica.play()
    }
})

document.querySelector('.proxima').addEventListener('click', () => {
    const estavaTocando = !musica.paused

    indexMusica++
    if (indexMusica >= musicas.length) {
        indexMusica = 0
    }
    renderizarMusica(indexMusica)

    if (estavaTocando) {
        musica.play()
    }
})

// Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src)
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo
        nomeArtista.textContent = musicas[index].artista
        imagem.src = musicas[index].img
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
        progressBar.max = Math.floor(musica.duration)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.botao-like').addEventListener('click', () => {
        const iconeLike = document.querySelector('.botao-like i')

        iconeLike.classList.toggle('fas')
        iconeLike.classList.toggle('far')
    })
})

function tocarMusica() {
    musica.play()
    document.querySelector('.botao-pause').style.display = 'block'
    document.querySelector('.botao-play').style.display = 'none'
}

function pausarMusica() {
    musica.pause()
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
}

function atualizarBarra() {
    progressBar.value = Math.floor(musica.currentTime)
    let tempoDecorrido = document.querySelector('.inicio')
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime))
    atualizarCorBarra()
}

function atualizarCorBarra() {
    const progresso = (progressBar.value / progressBar.max) * 100
    progressBar.style.background = `linear-gradient(to right, #4caf50 ${progresso}%, #444 ${progresso}%)`
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60)
    let campoSegundos = segundos % 60
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos
    }
    return campoMinutos + ':' + campoSegundos
}

// Atualizar a música quando a barra de progresso é manipulada
progressBar.addEventListener('input', () => {
    musica.currentTime = progressBar.value
})
