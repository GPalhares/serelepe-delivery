import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import stateGlobalContext from '../context/stateGlobalContext';

function ShoppingCartTotal() {
  console.log(useContext(stateGlobalContext));
  const total = useContext(stateGlobalContext);
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (total > 0) return setDisabled(false);
    return setDisabled(true);
  }, [total]);

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="submit"
        disabled={ disabled }
        onClick={ () => history.push('/customer/checkout') }
      >
        total shopping cart: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { `${total}` }
        </span>
      </button>
    </div>
  );
}

export default ShoppingCartTotal;
