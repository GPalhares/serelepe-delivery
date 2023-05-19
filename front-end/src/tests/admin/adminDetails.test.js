import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { readLocal } from '../../helpers/localStorage';
import fetchGetAllUsers from '../../api/fetchGetAllUsers';
import fetchDeleteUser from '../../api/fetchDeleteUser';
import AdminDetail from '../../components/Admin/adminDetail';
import stateGlobalContext from '../../context/stateGlobalContext';

jest.mock('../../helpers/localStorage', () => ({
  readLocal: jest.fn(),
}));

jest.mock('../../api/fetchGetAllUsers', () => jest.fn());
jest.mock('../../api/fetchDeleteUser', () => jest.fn());

describe('AdminDetail', () => {
  beforeEach(() => {
    readLocal.mockReturnValue({ token: 'dummy-token' });
    fetchGetAllUsers.mockResolvedValue({
      data: [
        { id: 1, name: 'User 1', email: 'user1@example.com', role: 'admin' },
        { id: 2, name: 'User 2', email: 'user2@example.com', role: 'user' },
      ],
    });
    fetchDeleteUser.mockResolvedValue({});
  });

  test('User list Render', async () => {
    await act(async () => {
      render(
        <stateGlobalContext.Provider
          value={{
            arrayUsers: [
                { id: 1, name: 'User 1', email: 'user1@example.com', role: 'admin' },
                { id: 2, name: 'User 2', email: 'user2@example.com', role: 'user' },
              ],
            setArrayUsers: jest.fn(),
            sellerStatus: [],
            setSellerStatus: jest.fn(),
          }}
        >
          <AdminDetail />
        </stateGlobalContext.Provider>
      );
    });

    expect(screen.getByText('User List')).toBeInTheDocument();

    expect(screen.getByTestId('admin_manage__element-user-table-item-number-0')).toHaveTextContent('1');
    expect(screen.getByTestId('admin_manage__element-user-table-name-0')).toHaveTextContent('User 1');
    expect(screen.getByTestId('admin_manage__element-user-table-email-0')).toHaveTextContent('user1@example.com');
    expect(screen.getByTestId('admin_manage__element-user-table-role-0')).toHaveTextContent('admin');

    expect(screen.getByTestId('admin_manage__element-user-table-item-number-1')).toHaveTextContent('2');
    expect(screen.getByTestId('admin_manage__element-user-table-name-1')).toHaveTextContent('User 2');
    expect(screen.getByTestId('admin_manage__element-user-table-email-1')).toHaveTextContent('user2@example.com');
    expect(screen.getByTestId('admin_manage__element-user-table-role-1')).toHaveTextContent('user');
  });

  test('Delete Button', async () => {
    await act(async () => {
      render(
        <stateGlobalContext.Provider
          value={{
            arrayUsers: [
                { id: 1, name: 'User 1', email: 'user1@example.com', role: 'admin' },
                { id: 2, name: 'User 2', email: 'user2@example.com', role: 'user' },
              ],
            setArrayUsers: jest.fn(),
            sellerStatus: [],
            setSellerStatus: jest.fn(),
          }}
        >
          <AdminDetail />
        </stateGlobalContext.Provider>
      );
    });

    const deleteButton = screen.getAllByRole('button')[0];

    await act(async () => {
      fireEvent.click(deleteButton);
    });

  });
});
