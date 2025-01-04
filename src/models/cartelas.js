const fs = require('fs');

class Cartelas{

    // Ler o arquivo cartela.json
    static ler(){
        return new Promise(
            (resolve, reject) =>{
                fs.readFile('./db/cartelas.json', 'utf-8', (err, data) => {
                    if (err)
                        reject('Erro ao ler o arquivo:', err);
                    
                    resolve(JSON.parse(data));
                });
            }
        )
    }
}

module.exports = Cartelas;