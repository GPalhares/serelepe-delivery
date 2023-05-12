import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readLocal } from '../helpers/localStorage';
import fetchCardDetails from '../api/fethCardOrder';
import fetchSellers from '../api/fetchSellers';

function CardDetails() {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [seller, setSeller] = useState([]);

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

  const cardProducts = (obj) => {
    const { id, subTotal, name, unitPrice, quantity } = obj;
    return (
      <>
        <p>
          {' '}
          ID :
          {id}
        </p>
        <p>
          Nome :
          {' '}
          {name}
        </p>
        <p>
          Quantidade :
          {' '}
          {quantity}
        </p>
        <p>
          Unit price:
          {' '}
          {priceConverter(unitPrice)}
        </p>
        <p>
          SubTotal:
          {priceConverter(subTotal)}
        </p>
      </>

    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = readLocal('user');
      const { data } = await fetchCardDetails(user.token, params.id);
      const allSellers = await fetchSellers();

      setOrders(data);
      setSeller(allSellers.find((s) => s.id === orders[0].sale.sellerId).name);
    };

    fetchData();
  }, [params.id, orders]);

  const renderingProducts = () => {
    if (orders.length !== 0 || orders !== undefined) {
      return (
        orders.map((item) => {
          const obj = {
            id: item.productId,
            name: item.product.name,
            unitPrice: item.product.price,
            quantity: item.quantity,
            subTotal: item.product.price * item.quantity,
          };
          return <div key={ item.id }>{ cardProducts(obj)}</div>;
        })
      );
    }
  };

  return (
    <>
      <div>
        <h1>
          Order:
          {' '}
          {addingZero(params.id)}
        </h1>
        <h1>
          Seller:
          {' '}
          {seller}
        </h1>
      </div>

      { renderingProducts() }
    </>
  );
}

export default CardDetails;
