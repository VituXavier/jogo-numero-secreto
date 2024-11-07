let listaDeNUmerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Função para alterar o que esta escrito 
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

//Função com o conteúdo da mensagem já alterado
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

//Função papra verificar se o usuário acertou ou se esta proximo de acertar e exibir o número de tentativas
function verificarChute() {
    let chute = document.querySelector('input').value;  
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou, mizeravi!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
}

//Gera um número e verifica numa array se é repetido ou não
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNUmerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNUmerosSorteados= [];
    }

    if (listaDeNUmerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNUmerosSorteados.push(numeroEscolhido)
        console.log(listaDeNUmerosSorteados)
        return numeroEscolhido;
    }
}

//Limpa o campo de chute na tela depois de uma tentativa
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//habilita e desabilita o botao de novo jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}