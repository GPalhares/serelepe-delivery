import React, { useMemo, useState } from 'react';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import AdminDetail from '../../components/Admin/adminDetail';
import AdminRegister from '../../components/Admin/adminRegister';
import stateGlobalContext from '../../context/stateGlobalContext';
import '../../styles/checkoutPage/checkout.css';

function Admin() {
  const [arrayUsers, setArrayUsers] = useState([]);

  const stateValue = useMemo(() => ({ arrayUsers,
    setArrayUsers }), [
    arrayUsers,
    setArrayUsers,
  ]);

  return (
    <div className="checkoutPage">
      <stateGlobalContext.Provider value={ stateValue }>
        <HeaderAdmin />
        <AdminRegister />
        <AdminDetail />
      </stateGlobalContext.Provider>
    </div>
  );
}

export default Admin;
