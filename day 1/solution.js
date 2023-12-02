const fs = require('fs');

const caminhoArquivo = 'input.txt';
let soma = 0;

fs.readFile(caminhoArquivo, 'utf-8', (err, data) => {
  if(err){
    console.log("Ocorreu um erro ao ler o arquivo especificado.", err);
    return;
  }

  const linhas = data.split('\n');

  linhas.forEach((linha) => {
    const digitosLinha = linha.match(/\d/g);

    if(digitosLinha && digitosLinha.length >= 2){
      const primeiroDigito = digitosLinha[0];
      const ultimoDigito = digitosLinha[digitosLinha.length - 1];

      const numeroLinha = parseInt(`${primeiroDigito}${ultimoDigito}`);
      
      soma += numeroLinha;
    } else if (digitosLinha && digitosLinha.length == 1){
      primeiroDigito = digitosLinha[0];
      ultimoDigito = digitosLinha[0];

      numeroLinha = parseInt(`${primeiroDigito}${ultimoDigito}`);
        
      soma += numeroLinha;
    }

  })

  console.log(`O resultado da soma é: ${soma}`)
})