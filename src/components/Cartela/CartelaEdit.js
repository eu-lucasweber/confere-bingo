import React, { useRef } from 'react';
import './Cartela.css'

const CartelaEdit = ({ cartela }) => {
    const coluna = ['b', 'i', 'n', 'g', 'o'];
      
    // Verifica se a cartela é válida
    if (!cartela || Object.keys(cartela).length === 0) {
      return <p>Cartela não disponível.</p>;
    }
  
    return (
        <div className='cartela'>
            {coluna.map((c) => (
            <div key={c} className='coluna'>
                <h3 className='index'>{c.toUpperCase()}</h3>
                <ol>
                {cartela[c].map((numero) => (
                        <li className='numero edit'>
                            {(numero > 0 || numero == null) ? 
                                <input className='input' name={c+numero} type='number' defaultValue={numero}/>
                            :
                                (<img src="/indio.png"/>)
                            }
                        </li>
                ))}
                </ol>
            </div>
            ))}
        </div>
    );
  };
  
  export default CartelaEdit;
  