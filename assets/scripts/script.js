const html = document.querySelector('html');
const btnsMenu = document.querySelectorAll('.app__card-button');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

const inputMusica = document.querySelector('#alternar-musica');
const audio = new Audio('./assets/audios/luna-rise-part-one.mp3');
const audioPlay = new Audio('./assets/audios/play.wav');
const audioPause = new Audio('./assets/audios/pause.mp3');
const audioFinish = new Audio('./assets/audios/beep.mp3');
audio.loop = true;

const divTimer = document.querySelector('#timer');
const btnTemporizador = document.querySelector('#start-pause');
const iconButton = document.querySelector('#start-pause .app__card-primary-butto-icon');
const spanText = document.querySelector('#start-pause span');
let tempo = 25 * 60;
let interval = null;
let isRun = false;

function alterarContexto(context) {
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', `./assets/images/${context}.png`);
    btnsMenu.forEach((btn) => btn.classList.remove('active'));
    switch (context) {
        case 'foco': {
            title.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            btnFoco.classList.add('active');
            tempo = 25 * 60;
            break;
        }
        case 'descanso-curto': {
            title.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
            btnCurto.classList.add('active');
            tempo = 5 * 60;
            break;
        }
        case 'descanso-longo': {
            title.innerHTML = 'Hora de voltar à superfíce.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            btnLongo.classList.add('active');
            tempo = 15 * 60;
            break;
        }
    }
    exibirTemporizador();
}

const temporizador = () => {
    if (tempo <= 0) {
        audioFinish.play();
        pararTemporizador();
        return;
    }
    tempo -= 1;
    exibirTemporizador();
}

function pararTemporizador() {
    clearInterval(interval);
    interval = null;
}

function exibirTemporizador() {
    const timeDate = new Date(tempo * 1000);
    const tempoFormatado = timeDate.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    divTimer.innerHTML = `${tempoFormatado}`;
}

btnFoco.addEventListener('click', () => {
    alterarContexto('foco');
});

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
});

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
});

inputMusica.addEventListener('change', () => {
    audio.paused ? audio.play() : audio.pause();
});

btnTemporizador.addEventListener('click', () => {
    isRun = !isRun;
    if (isRun) {
        audioPlay.play();
        interval = setInterval(temporizador, 1000);
        spanText.innerHTML = 'Pausar';
        iconButton.setAttribute('src', './assets/images/pause.png');
    } else {
        audioPause.play();
        pararTemporizador();
        spanText.innerHTML = 'Começar';
        iconButton.setAttribute('src', './assets/images/play_arrow.png');
    }
});

exibirTemporizador();