const fs = require('fs');

class Sorteio{

    // Ler o arquivo sorteio.json
    static ler(){
        return new Promise(
            (resolve, reject) =>{
                fs.readFile('./db/sorteio.json', 'utf-8', (err, data) => {
                    if (err)
                        reject('Erro ao ler o arquivo:', err);
                    
                    resolve(JSON.parse(data));
                });
            }
        )
    }
}

module.exports = Sorteio;