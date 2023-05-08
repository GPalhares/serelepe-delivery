import React, { useEffect, useState, useContext } from 'react';
import fetchProduct from '../api/fetchProducts';
import Card from './Card';
import { sumItems, sumItemsValue } from '../helpers/cartFunctions';
import stateGlobalContext from '../context/stateGlobalContext';
import { readLocal, saveLocal } from '../helpers/localStorage';

function CardList() {
  const [productsList, setProductList] = useState([]);
  const [carItensLocal, setCarItensLocal] = useState([]);
  const { myArray, setMyArray } = useContext(stateGlobalContext);

  useEffect(() => {
    const gettingProducts = async () => {
      const productList = await fetchProduct();
      setProductList(productList.data);
    };
    gettingProducts();
  }, []);

  const incrementOrDecrement = (item) => {
    setCarItensLocal((prevCarItens) => {
      const updatedCarItens = [...prevCarItens, item];
      const updatedState = sumItems(updatedCarItens);
      console.log(carItensLocal);
      setMyArray(updatedState);
      saveLocal('cartItems', updatedState);
      saveLocal('cartValue', sumItemsValue(updatedState));

      return updatedCarItens;
    });
  };

  return (
    <>
      <h1>Cards</h1>
      <div className="card-list">
        {
          productsList.map((prod, index) => {
            const cartItem = readLocal('cartItems')?.find((item) => item.id === prod.id);
            const quantity = cartItem?.quantity ?? 0;

            return (
              <div key={ index }>
                <Card
                  name={ prod.name }
                  id={ prod.id }
                  quantity={ quantity }
                  price={ prod.price }
                  urlImage={ prod.url_image }
                  incrementOrDecrement={ incrementOrDecrement }
                />
              </div>
            );
          })
        }

      </div>
    </>
  );
}

export default CardList;
