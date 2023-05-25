import React, { useContext, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import fetchGetAllUsers from '../../api/fetchGetAllUsers';
import { readLocal } from '../../helpers/localStorage';
import fetchDeleteUser from '../../api/fetchDeleteUser';
import stateGlobalContext from '../../context/stateGlobalContext';
import '../../styles/checkoutPage/checkout.css';

function AdminDetail() {
  const { arrayUsers, setArrayUsers } = useContext(stateGlobalContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = readLocal('user');
        const result = await fetchGetAllUsers(user.token);
        setArrayUsers(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setArrayUsers]);

  const deleteUser = async (id) => {
    const user = readLocal('user');
    const userToBeDeleted = await fetchDeleteUser(user.token, id);
    const result = await fetchGetAllUsers(user.token);
    setArrayUsers(result.data);
    return userToBeDeleted;
  };
  return (
    <div className="shopping-cart-table">
      <h2>User List</h2>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Delete Item</th>
          </tr>
          { arrayUsers && arrayUsers.map((item, index) => {
            const itemNumber = `admin_manage__element-user-table-item-number-${index}`;
            const personName = `admin_manage__element-user-table-name-${index}`;
            const email = `admin_manage__element-user-table-email-${index}`;
            const role = `admin_manage__element-user-table-role-${index}`;
            return (
              <tr key={ item.id }>
                <td data-testid={ itemNumber }>{ index + 1 }</td>
                <td data-testid={ personName }>{ item.name }</td>
                <td data-testid={ email }>{item.email }</td>
                <td data-testid={ role }>{ item.role }</td>
                <td>
                  <IconButton
                    type="submit"
                    onClick={ () => deleteUser(item.id) }
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDetail;
