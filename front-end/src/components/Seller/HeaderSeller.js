import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearLocal, readLocal } from '../../helpers/localStorage';
import '../../styles/components/header.css';

function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const deliveryApp = readLocal('user');
    setUser(deliveryApp);
  }, []);

  return (
    <div className="classHeader">
      <br />
      <br />
      <Link
        className="header-link"
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Orders
      </Link>
      <h3 className="header-user-seller">{ ` ${user.name}` }</h3>

      <Link
        className="logoutLink"
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => clearLocal() }
      >
        Logout
      </Link>
    </div>
  );
}

export default Header;
