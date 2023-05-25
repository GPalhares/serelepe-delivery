import React from 'react';
import HeaderSeller from '../../components/Seller/HeaderSeller';
import CardDetailSeller from '../../components/Seller/CardDetailSeller';
import '../../styles/cardDetailsPage/cardDetails.css';

function OrderDetailSeller() {
  return (
    <div className="checkoutPage">
      <HeaderSeller />
      <CardDetailSeller />
    </div>
  );
}

export default OrderDetailSeller;
