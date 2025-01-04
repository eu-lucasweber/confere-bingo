import { useState, useEffect } from "react";
import Cartela from "./Cartela";
import './Cartela.css';

function MinhasCartelas() {
    const [index, setIndex] = useState(0);
    const [cartelasdb, setCartelasdb] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/Cartelas', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json()) // Formata em json
        .then((data) => {
            setCartelasdb(data); // Salva em variavel local o retorno da API(banco de dados)
        })
        .catch((erro) => {
        console.error('Erro ao buscar as cartelas:', erro); // Mostra o erro no console
        });
    }, []); // Array vazio para executar apenas uma vez

    function menor(){
        if(index>0){
            setIndex(index-1);
        }
        console.log(index)
    }

    function maior(){
        if(index+1<cartelasdb.length){
            setIndex(index+1);
        }
        console.log(index)
    }

  return (
    <div className="minhasCartelas">
        {cartelasdb.length>0 && (
            <Cartela cartela={cartelasdb[index]} />
        )}
        <div className="selecionaCartela">
            <button className="menor" onClick={menor}>&lt;</button>
            <p className="numeros">{index+1} de {cartelasdb.length}</p>
            <button className="maior" onClick={maior}>&gt;</button>
        </div>
    </div>
  );
}

export default MinhasCartelas;
