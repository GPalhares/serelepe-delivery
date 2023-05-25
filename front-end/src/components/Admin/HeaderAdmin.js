import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/header.css';
import { clearLocal, readLocal } from '../../helpers/localStorage';

function HeaderAdmin() {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const deliveryApp = readLocal('user');
    setAdmin(deliveryApp);
  }, []);

  return (
    <div className="classHeader">
      <Link
        className="header-link"
        to="/admin/manage"
        data-testid="customer_products__element-navbar-link-orders"
      >
        User Manager
      </Link>

      <h3 className="header-user-seller">{`${admin.name}`}</h3>

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

export default HeaderAdmin;
