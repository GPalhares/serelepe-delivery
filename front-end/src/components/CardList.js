import React, { useEffect, useState, useContext } from 'react';
import fetchProduct from '../api/fetchProducts';
import Card from './Card';
// import addAndRemoveTotal from '../helpers/cartFunctions';
import sumItems from '../helpers/cartFunctions';
import stateGlobalContext from '../context/stateGlobalContext';

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
    if (carItensLocal.length > 0) setCarItensLocal([...carItensLocal, item]);
    if (carItensLocal.length === 0) setCarItensLocal([item]);
    const updatedState = sumItems(carItensLocal);
    setMyArray(updatedState);
    console.log(myArray);
  };

  return (
    <>
      <h1>Cards</h1>
      <div className="card-list">
        {
          productsList.map((prod, index) => (
            <div key={ index }>
              <Card
                name={ prod.name }
                id={ prod.id }
                price={ prod.price }
                urlImage={ prod.url_image }
                incrementOrDecrement={ incrementOrDecrement }
              />
            </div>
          ))
        }
      </div>
    </>
  );
}

export default CardList;
