import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readLocal } from '../helpers/localStorage';
import fetchCardOrder from '../api/fetchCardDetail';
import fetchGetUserId from '../api/fetchGetUserId';

function CardOrder() {
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
    const currentDate = new Date(date);
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

  useEffect(() => {
    const fetchData = async () => {
      const user = readLocal('user');
      const userId = await fetchGetUserId({ userEmail: user.email });
      const { data } = await fetchCardOrder(user.token, userId);

      setOrders(data);
    };
    fetchData();
  }, []);

  const renderingCardOrders = () => {
    if (orders.length !== 0 || orders !== undefined) {
      return (
        orders.map((item) => {
          const obj = {
            id: item.product.id,
            status: item.sale.status,
            saleDate: item.sale.saleDate,
            total: item.sale.totalPrice,
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
