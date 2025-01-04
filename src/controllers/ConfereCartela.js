let cartelaAndSorteio = {b: [], i: [], n: [], g: [], o: []}

function verColuna(){
  let controle = {b: 0, i: 0, n: 0, g: 0, o: 0};
	for(let colunaCartela in cartelaAndSorteio){
    for(let linhaCartela in cartelaAndSorteio[colunaCartela]){
      if(cartelaAndSorteio[colunaCartela][linhaCartela] != null){
        controle[colunaCartela]++;
      }
    }
    if(controle['n'] == 4 || controle[colunaCartela] == 5){
      return {coluna: colunaCartela, sequencia:cartelaAndSorteio[colunaCartela]};
    }
  }
}

function verLinha() {
  let controle = {0: [], 1: [], 2: [], 3: [], 4: []}
  for(let linhaCartela in controle) {
    for(let colunaCartela in cartelaAndSorteio) {
      if(cartelaAndSorteio[colunaCartela][linhaCartela] != null) {
        controle[linhaCartela].push(cartelaAndSorteio[colunaCartela][linhaCartela]);
      }
    }
    if(controle['2'].length == 4 || controle[linhaCartela].length == 5){
      return {linha: linhaCartela, sequencia:controle[linhaCartela]};
    }
  }
}

function verPernaED(){
  let sequencia = [];
  let i = 0
	for(let colunaCartela in cartelaAndSorteio){
    if(cartelaAndSorteio[colunaCartela][i] != null){
      sequencia.push(cartelaAndSorteio[colunaCartela][i])
    }
    i++;
  }
  if(sequencia.length == 4)
    return {sequencia: sequencia};
}

function verPernaDE(){
  let sequencia = [];
  let i = 4
	for(let colunaCartela in cartelaAndSorteio){
    if(cartelaAndSorteio[colunaCartela][i] != null){
      sequencia.push(cartelaAndSorteio[colunaCartela][i])
    }
    i--;
  }
  if(sequencia.length == 4)
    return {sequencia: sequencia};
}

function verQuatroCanto(){
  let sequencia = [];
  const colunaTemp = ['b', 'o']
  const linhaTemp = [0, 4]
  colunaTemp.forEach((coluna)=>{
    linhaTemp.forEach((linha) =>{
      if(cartelaAndSorteio[coluna][linha] != null){
        sequencia.push(cartelaAndSorteio[coluna][linha]);
      }
    })
  })
  if(sequencia.length == 4)
    return {sequencia: sequencia};
}

function verCruzAberta(){
  let sequencia = [];
  const poziCruz = {'b': [2], 'n': [0, 4], 'o': [2]}
  for(let coluna in poziCruz){
    for(let linha in poziCruz[coluna]){
        if(cartelaAndSorteio[coluna][poziCruz[coluna][linha]] != null){
          sequencia.push(cartelaAndSorteio[coluna][poziCruz[coluna][linha]]);
        }

    }
  }
  if(sequencia.length == 4)
    return {sequencia: sequencia};
}

function verCruzFechada(){
  let sequencia = [];
  const poziCruz = {'i': [2], 'n': [1, 3], 'g': [2]}
  for(let coluna in poziCruz){
    for(let linha in poziCruz[coluna]){
        if(cartelaAndSorteio[coluna][poziCruz[coluna][linha]] != null){
          sequencia.push(cartelaAndSorteio[coluna][poziCruz[coluna][linha]]);
        }

    }
  }
  if(sequencia.length == 4)
    return {sequencia: sequencia};
}

function montaCartelaAndSorteio(sorteio, cartela){
  let controle = {
    'b': [null, null, null, null, null],
    'i': [null, null, null, null, null], 
    'n': [null, null, null, null, null], 
    'g': [null, null, null, null, null], 
    'o': [null, null, null, null, null]
  };
  let verifica = true;
  for(let colunaCartela in cartela){
    for(let linhaCartela in cartela[colunaCartela]){
      for(let colunaSort in sorteio[colunaCartela]){
        if(sorteio[colunaCartela][colunaSort] == cartela[colunaCartela][linhaCartela]){
          for(let controleTemp in controle[colunaCartela]){
            if(controle[colunaCartela][controleTemp] == cartela[colunaCartela][linhaCartela]){
              verifica = false;
              break;
            }
          }
          if(verifica)
            controle[colunaCartela][linhaCartela] = (cartela[colunaCartela][linhaCartela])
        }
      }
    }
  }
  return controle;
}

export function confereCartela (sorteio, cartela) {
  cartelaAndSorteio = montaCartelaAndSorteio(sorteio, cartela);
  
  let retornoColuna = verColuna();
  let retornoLinha = verLinha();
  let retornoPernaED = verPernaED();
  let retornoPernaDE = verPernaDE();
  let retornoQuatroCanto = verQuatroCanto();
  let retornoCruzAberta = verCruzAberta();
  let retornoCruzFechada = verCruzFechada();

  if(retornoColuna)
    return({txt: `Bingo Coluna '${retornoColuna.coluna}'!`, sequencia: retornoColuna.sequencia});
  else if(retornoLinha)
    return({txt: `Bingo Linha '${retornoLinha.linha}'!`, sequencia: retornoLinha.sequencia});
  else if(retornoPernaED)
    return({txt: `Bingo Perna X Esquerda Direita!`, sequencia: retornoPernaED.sequencia});
  else if(retornoPernaDE)
    return({txt: `Bingo Perna X Direita Esquerda!`, sequencia: retornoPernaDE.sequencia});
  else if(retornoQuatroCanto)
    return({txt: `Bingo Quatro Canto!`, sequencia: retornoQuatroCanto.sequencia});
  else if(retornoCruzAberta)
    return({txt: `Bingo Cruz Aberta!`, sequencia: retornoCruzAberta.sequencia});
  else if(retornoCruzFechada)
    return({txt: `Bingo Cruz Fechada!`, sequencia: retornoCruzFechada.sequencia});
  else
    return({txt: "Segue!", sequencia: null});
}