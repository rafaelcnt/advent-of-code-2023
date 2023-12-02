const fs = require('fs');

const caminhoArquivo = 'input.txt';

const mapaDigitos = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
}

function identificaDigitos(linha){
    const chaves = Object.keys(mapaDigitos);
    const numerosLinha = linha.match(/\d/g);

    let primeiroDigitoPalavra, ultimoDigitoPalavra, primeiroIndicePalavra, ultimoIndicePalavra, indiceAtual = -1;
    let primeiroNumero, ultimoNumero, primeiroNumeroIndice, ultimoNumeroIndice;
    let primeiroDigito, ultimoDigito;
    let indicesPalavras = [];
    let existePalavra = false;
    let repetirPalavra = true;
    let indiceInicial = 0;

    if(numerosLinha){
        primeiroNumero = numerosLinha[0]; // 4
        ultimoNumero = numerosLinha[numerosLinha.length - 1]; // 2
        primeiroNumeroIndice = linha.indexOf(primeiroNumero); // 0
        ultimoNumeroIndice = linha.lastIndexOf(ultimoNumero); // 15
    }
    
    chaves.forEach((chave) => {
        if (linha.includes(chave)){
            existePalavra = true;

            do {
                indiceAtual = linha.indexOf(chave, indiceAtual + 1)
                if (indiceAtual == -1){
                    continue
                }
                indicesPalavras.push({ indice : indiceAtual , valor : mapaDigitos[chave]});
            } while(indiceAtual !== -1)
        }
    })

    if (existePalavra){
        indicesPalavras = indicesPalavras.sort(function (a, b) {
            return a.indice - b.indice;
        });
        
        primeiroIndicePalavra = indicesPalavras[0].indice;
        ultimoIndicePalavra = indicesPalavras[indicesPalavras.length - 1].indice;
        primeiroDigitoPalavra = indicesPalavras[0].valor;
        ultimoDigitoPalavra = indicesPalavras[indicesPalavras.length - 1].valor;
    }

    //Se a string possui ambos números e palavras
    if(numerosLinha && existePalavra){
        if(primeiroNumeroIndice < primeiroIndicePalavra){
            primeiroDigito = primeiroNumero;
        } else {
            primeiroDigito = primeiroDigitoPalavra;
        }

        if(ultimoNumeroIndice > ultimoIndicePalavra){
            ultimoDigito = ultimoNumero;
        } else {
            ultimoDigito = ultimoDigitoPalavra;
        }
    } else if (numerosLinha && !existePalavra){
        primeiroDigito = primeiroNumero;
        ultimoDigito = ultimoNumero;
    } else if (!numerosLinha && existePalavra){
        primeiroDigito = primeiroDigitoPalavra;
        ultimoDigito = ultimoDigitoPalavra;
    } else {
        console.log(`Deu merda na linha: ${linha}`)
    }

    if (ultimoDigito === undefined){
        return parseInt(`${primeiroDigito}${primeiroDigito}`);
    }

    return parseInt(`${primeiroDigito}${ultimoDigito}`);
}

function leArquivo(caminhoArquivo) {
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
    const linhas = conteudo.split('\n');
    let soma = 0;

    linhas.forEach((linha) => {
        soma += identificaDigitos(linha);
    });

    return soma;
}

const resultado = leArquivo(caminhoArquivo);
console.log(`O resultado da soma é: ${resultado}`);