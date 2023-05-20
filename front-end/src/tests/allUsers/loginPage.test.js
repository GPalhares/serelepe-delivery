import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import App from '../../App';
import fetchLogin from '../../api/fetchLogin';

jest.mock('../../api/fetchLogin');

describe('LoginPage', () => {
  const emailInput = () => screen.getByTestId('common_login__input-email');
  const passwordInput = () => screen.getByTestId('common_login__input-password');
  const loginButton = () => screen.getByTestId('common_login__button-login');

  const login = async (email, password) => {
    await act(async () => {
      fireEvent.change(emailInput(), { target: { value: email } });
      fireEvent.change(passwordInput(), { target: { value: password } });
      fireEvent.click(loginButton());
    });
  };

  it('Login Page Render', () => {
    render(<App />, { wrapper: MemoryRouter });

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(loginButton()).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
  });

  it('Customer Login', async () => {
    const mockUser = {
      role: 'customer',
    };
    fetchLogin.mockResolvedValueOnce({
      status: 404,
      data: mockUser,
    });

    render(<App />, { wrapper: MemoryRouter });

    await login('customer@example.com', 'password');
  });

  it('Seller Login', async () => {
    const mockUser = {
      role: 'seller',
    };
    fetchLogin.mockResolvedValueOnce({
      status: 200,
      data: mockUser,
    });

    render(<App />, { wrapper: MemoryRouter });

    await login('seller@example.com', 'password');
  });

  it('Administrator Login', async () => {
    const mockUser = {
      role: 'administrator',
    };
    fetchLogin.mockResolvedValueOnce({
      status: 200,
      data: mockUser,
    });

    render(<App />, { wrapper: MemoryRouter });

    await login('admin@example.com', 'password');
  });
});
