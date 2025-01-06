import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiSave, FiXCircle, FiPlusSquare } from "react-icons/fi";
import Cartela from "./Cartela";
import { useNavigate, useParams } from "react-router-dom";
import CartelaEdit from "./CartelaEdit";
import './Cartela.css';

function MinhasCartelas({editar}) {
    const { id } = useParams();
    let numId = parseInt(id)
    const navigate = useNavigate();
    const [index, setIndex] = useState(numId-1);
    const [cartelasdb, setCartelasdb] = useState([]);
    const [editarVerifica, setEditarVerifica] = useState(editar);

    useEffect(() => {
        fetch('http://localhost:5000/Cartelas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCartelasdb(data); // Salva em variavel local o retorno da API(banco de dados)
        })
        .catch((erro) => {
        console.error('Erro ao buscar as cartelas:', erro); // Mostra o erro no console
        });
    }, []); // Array vazio para executar apenas uma vez

    async function atualizaCartelaDB(cartela){
        fetch(`http://localhost:5000/Cartelas/${cartela['id']}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartela),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setEditarVerifica(true);
        })
        .catch((erro) => {
            alert(`Erro ao atualizar a cartela: ${cartela['id']}`); //Mensagem erro 
            console.error(erro); // Mostra o erro no console
        });
    }

    async function deletaCartelaDB(cartela){
        fetch(`http://localhost:5000/Cartelas/${cartela['id']}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setEditarVerifica(true);
            setCartelasdb(cartelasdb.filter((carteladb) => carteladb['id'] !== cartela['id']));
            alert(`Deletado com sucesso!`);
            setIndex(0);
            atualizaUrl(0);
            
        })
        .catch((erro) => {
            alert(`Erro ao atualizar a cartela: ${cartela['id']}`); //Mensagem erro 
            console.error(erro); // Mostra o erro no console
        });
    }

    function atualizaUrl(valor){
        navigate(`/minhasCartelas/${valor+1}`);
    }

    function atualizaEditarUrl(){
        navigate(`/minhasCartelas/editar/${index+1}`);
    }

    function menor(){
        if(index>0){
            setIndex(index-1);
            atualizaUrl(index-1);
        }
    }

    function maior(){
        if(index+1<cartelasdb.length){
            setIndex(index+1);
            atualizaUrl(index+1);
        }
    }

    function alteraStatusEdit(){
        setEditarVerifica(!editarVerifica);
        atualizaEditarUrl();
    }
    
    function cancelarEdit(){
        setEditarVerifica(true)
        navigate(-1);
    }

    async function verificaNumero(coluna, colunaCartela, numero){
        const intervalos = {
            'b': [1, 15],
            'i': [16, 30],
            'n': [31, 45],
            'g': [46, 60],
            'o': [61, 75],
          };

        
        if (colunaCartela.includes(numero)) {
            return false;
        } else if (numero < intervalos[coluna][0] || numero > intervalos[coluna][1]) {
            return false;
        } else {
            return true;
        }
    }

    async function salvarEdit(event) {
        event.preventDefault();
    
        const formElement = event.target;
        const formData = new FormData(formElement);    
        const cartelaTemp = cartelasdb[index];
        const coluna = ['b', 'i', 'n', 'g', 'o'];
    
        coluna.forEach((c) => {
            cartelaTemp[c].forEach((numero) => {
                let info = formData.get(`${c + numero}`);
                let index = cartelaTemp[c].indexOf(numero);
                if(info != numero && !(c=='n'&&index==2)){
                    if(verificaNumero(c, cartelaTemp[c], info)){
                        cartelaTemp[c][index] = parseInt(info);
                    }
                }
            });
        });

        atualizaCartelaDB(cartelaTemp);

    }

    function confirmaExcluir(){
        const cartelaTemp = cartelasdb[index];
        const retorno = window.confirm(`Confirma Exclusão Cartela: ${cartelaTemp['id']}`);
        if(retorno)
            deletaCartelaDB(cartelaTemp);
    }
    
    function novaCartela(){
        navigate(`/minhasCartelas/nova`);
    }

  return (
    <div className="minhasCartelas">
        <button className="novaCartela" onClick={novaCartela}><FiPlusSquare className="icon" />Nova Cartela</button>
        {cartelasdb.length>0 && (
            editarVerifica ? (
                <div className="cartelas">
                    <Cartela cartela={cartelasdb[index]} />
                    <div className='subMenu'>
                        <button className='editar' onClick={alteraStatusEdit}><FiEdit className="icon" />Editar</button>
                        <button className='excluir' onClick={confirmaExcluir}><FiTrash2 className="icon" />Excluir</button>
                    </div>
                    <div className="selecionaCartela">
                        <button className="menor" onClick={menor}>&lt;</button>
                        <p className="numeros">{index+1} de {cartelasdb.length}</p>
                        <button className="maior" onClick={maior}>&gt;</button>
                    </div>
                </div>

            ) : (
                <form className="cartelas" onSubmit={salvarEdit}>
                    <CartelaEdit cartela={cartelasdb[index]} />
                    <div className='subMenu'>
                        <button className='salvar' type="submit"><FiSave className="icon" />Salvar</button>
                        <button className='cancelar' onClick={cancelarEdit}><FiXCircle className="icon" />Cancelar</button>
                    </div>
                </form>
            )
        )}
    </div>
  );
}

export default MinhasCartelas;