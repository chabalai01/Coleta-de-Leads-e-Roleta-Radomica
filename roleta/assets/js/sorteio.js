let podeGirar = true;
const roleta = document.getElementById('interno-roleta');
const botaoGirar = document.getElementById('spin-button');
const container = document.getElementById('container');
const roletaSound = document.getElementById('roletaSound');

const verificarDisponibilidadePremio = (tipoPremio) => {
    const ultimoGanho = localStorage.getItem(`ultimo${tipoPremio}Premio`);
    const agora = new Date().getTime();
    const tempoEspera = tipoPremio === 'Grande' ? 3600000 : 1800000; // 1 hora ou 30 minutos
    return !ultimoGanho || (agora - parseInt(ultimoGanho)) >= tempoEspera;
};

botaoGirar.addEventListener('click', () => {
    if (!podeGirar) return;

    podeGirar = false;
    botaoGirar.disabled = false;
    
    // Adiciona animação ao ponteiro
    document.querySelector('.pointer').classList.add('pointer-animation');
    
    // Inicia o som
    roletaSound.currentTime = 0;
    roletaSound.play();
    
    const leadAtual = JSON.parse(localStorage.getItem('currentLead'));
    let anguloAleatorio;
    const premioGrandeDisponivel = verificarDisponibilidadePremio('Grande');
    const premioMedioDisponivel = verificarDisponibilidadePremio('Medio');

    const chance = Math.random();

    if (premioGrandeDisponivel && chance < 0.05) {
        anguloAleatorio = 240; // Prêmio Grande
    } else if (premioMedioDisponivel && chance < 0.10) {
        anguloAleatorio = 180; // Prêmio Médio
    } else if (chance < 0.20) {
        anguloAleatorio = 120; // Prêmio Baixo
    } else {
        const angulosSemPremio = [60, 300, 360];
        anguloAleatorio = angulosSemPremio[Math.floor(Math.random() * angulosSemPremio.length)];
    }

    const rotacao = 3600 + anguloAleatorio;
    console.log('Ângulo sorteado:', anguloAleatorio); // Debug do ângulo
    console.log('Rotação total:', rotacao); // Debug da rotação
    roleta.style.transition = 'transform 8s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    roleta.style.transform = `rotate(${rotacao}deg)`;

    setTimeout(() => {
        // Remove animação do ponteiro
        document.querySelector('.pointer').classList.remove('pointer-animation');
        
        // Para o som quando a roleta para
        roletaSound.pause();
        roletaSound.currentTime = 0;
        
        let premio;
        const resultClass = (anguloAleatorio === 60 || anguloAleatorio === 300 || anguloAleatorio === 360) ? "result-fail" : "result-success";
        
        switch (anguloAleatorio) {
            case 240:
                premio = "Prêmio Grande";
                break;
            case 180:
                premio = "Prêmio Médio";
                break;
            case 120:
                premio = "Prêmio Baixo";
                break;
            default:
                premio = "Não foi desta vez";
        }

        console.log('Ângulo final:', anguloAleatorio);
        console.log('Prêmio determinado:', premio);

        setTimeout(() => {
            container.innerHTML = `
                <h1>Roleta Randômica Camasso</h1>
                <h1 class="result ${resultClass}">Resultado: ${premio}</h1>
            `;

            if (premio === "Prêmio Grande") {
                localStorage.setItem('ultimoGrandePremio', new Date().getTime());
            } else if (premio === "Prêmio Médio") {
                localStorage.setItem('ultimoMedioPremio', new Date().getTime());
            }

            setTimeout(() => {
                window.location.href = '../pags/index.html';
            }, 5000);
        }, 2000);
    }, 8000);
});