import './Cartela.css'

const Cartela = ({ cartela }) => {
    let img = <img src="/indio.png"/>
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
                    <li className='numero'>{(numero > 0) ? numero:img}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    );
  };
  
  export default Cartela;
  