import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { clearLocal, readLocal } from '../../helpers/localStorage';

function HeaderAdmin() {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const deliveryApp = readLocal('user');
    setAdmin(deliveryApp);
  }, []);

  return (
    <div>
      <Link
        to="/admin/manage"
        data-testid="customer_products__element-navbar-link-orders"
      >
        {' '}
        User Manager
      </Link>
      <div data-testid="customer_products__element-navbar-user-full-name">
        <h3>{`User:${admin.name}`}</h3>
      </div>
      <Link
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
