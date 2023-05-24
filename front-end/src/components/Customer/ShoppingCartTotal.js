import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal } from '../../helpers/localStorage';
import { sumItems } from '../../helpers/cartFunctions';
import '../../styles/components/shopButton.css';

function ShoppingCartTotal() {
  const { myArray, setMyArray } = useContext(stateGlobalContext);
  const [total, setTotal] = useState('0.00');
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const localCart = readLocal('cartValue');

  useEffect(() => {
    if (readLocal('cartValue')) {
      setTotal(readLocal('cartValue'));
      setDisabled(false);
    }
  }, [myArray, localCart]);

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="submit"
        className="shopButton"
        disabled={ disabled }
        onClick={ () => {
          setMyArray(sumItems(myArray));
          history.push('/customer/checkout');
        } }
        style={ {

        } }
      >
        <FaShoppingCart style={ { marginRight: '5px' } } />
        {' '}
        {/* Ícone de carrinho de compras */}
        Buy Now
        {' '}
        {/* Texto do botão */}
        <span data-testid="customer_products__checkout-bottom-value">
          {' '}
          R$
          {' '}
          {total.replace('.', ',')}
        </span>
        {' '}
        {/* Valor total */}
      </button>
    </div>
  );
}

export default ShoppingCartTotal;
