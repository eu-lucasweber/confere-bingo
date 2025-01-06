import CartelaEdit from "./CartelaEdit";
import './Cartela.css';
import { FiSave, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NovaCartela(){
    const cartela = {
        'b': [null, null, null, null, null],
        'i': [null, null, null, null, null],
        'n': [null, null, 0, null, null],
        'g': [null, null, null, null, null],
        'o': [null, null, null, null, null],
      };
    const navigate = useNavigate();

    async function salvarEdit(event) {
        event.preventDefault();
        /*
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
        */
    }

    function cancelarEdit(){
        navigate(-1);
    }

    return(
        <div className="minhasCartelas">
            <form className="cartelas" onSubmit={salvarEdit}>
                <CartelaEdit cartela={cartela} />
                <div className='subMenu'>
                    <button className='salvar' type="submit"><FiSave className="icon" />Salvar</button>
                    <button className='cancelar' onClick={cancelarEdit}><FiXCircle className="icon" />Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default NovaCartela;