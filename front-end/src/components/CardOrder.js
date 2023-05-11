import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { readLocal } from '../helpers/localStorage';
import fetchCardOrder from '../api/fethCardOrder';

function CardOrder() {
  const params = useParams();
  const [orders, setOrders] = useState([]);

  const addingZero = (num) => {
    let zeroPlusNumber = String(num);
    let counter = zeroPlusNumber.length;
    const maxLength = 4;

    while (counter < maxLength) {
      zeroPlusNumber = `0${zeroPlusNumber}`;
      counter += 1;
    }

    return zeroPlusNumber;
  };

  const dateConverter = (date) => {
    const currentDate = newDate(date);
    const sliceNumber = -2;
    const day = (`0${currentDate.getDate()}`).slice(sliceNumber);
    const month = (`0${currentDate.getMonth() + 1}`).slice(sliceNumber);
    const result = `${day}/${month}/${currentDate.getFullYear()}`;
    return result;
  };

  const priceConverter = (currency) => {
    const brlCurrency = currency.toString().replace('.', ',');
    return `R$ ${brlCurrency}`;
  };

  const dataTestid = 'customer_orders__element-order-id-';
  const dataTestidStatus = 'customer_orders__element-delivery-status-';
  const dataTestidDate = 'customer_orders__element-order-date-';
  const dataTestidPrice = 'customer_orders__element-card-price-';

  const card = (obj) => {
    const { id, status, saleDate, total } = obj;
    return (
      <div key={ id }>
        <Link to={ `/customer/orders/${id}` }>
          <p data-testid={ `${dataTestid}-${id}` }>
            Order:
            {' '}
            { addingZero(id) }
          </p>

          <p data-testid={ `${dataTestidStatus}-${id}` }>
            Status:
            {' '}
            { status }
          </p>

          <p>
            Date:
            {' '}
            <span
              data-testid={ `${dataTestidDate}-${id}` }
            >
              { dateConverter(saleDate) }
            </span>
          </p>

          <p data-testid={ `${dataTestidPrice}-${id}` }>
            Total Price:
            {' '}
            { priceConverter(total) }
          </p>
        </Link>
      </div>
    );
  };

  useEffect(async () => {
    const token = readLocal('user');
    const { data } = await fetchCardOrder(token.token, params.id);
    setOrders(data);
  }, []);

  const renderingCardOrders = () => {
    if (orders.lenght !== 0 || orders !== undefined) {
      return (
        orders.map((item) => {
          const obj = {
            id: item.id,
            status: item.status,
            saleDate: item.saleDate,
            total: item.total,
          };
          return card(obj);
        })
      );
    }
  };

  return (
    <div>
      { renderingCardOrders() }
    </div>
  );
}

export default CardOrder;
