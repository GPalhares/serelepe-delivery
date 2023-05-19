import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import { act } from 'react-dom/test-utils';
import App from '../../App';
// import fetchLogin from '../../api/fetchLogin';

jest.mock('../../api/fetchLogin');

describe('LoginPage', () => {
  it('should render the login page', () => {
    render(<App />, { wrapper: MemoryRouter });

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
  });

  // it('should display an error message for invalid login', async () => {
  //   const mockUser = {
  //     role: 'costumer',
  //   };
  //   fetchLogin.mockResolvedValueOnce({
  //     status: 404,
  //     data: mockUser,
  //   });

  //   render(<App />, { wrapper: MemoryRouter });

  //   const emailInput = screen.getByTestId('common_login__input-email');
  //   const passwordInput = screen.getByTestId('common_login__input-password');
  //   const loginButton = screen.getByTestId('common_login__button-login');

  //   await act(async () => {
  //     fireEvent.change(emailInput, { target: { value: 'test1@example.com' } });
  //     fireEvent.change(passwordInput, { target: { value: 'password' } });
  //     fireEvent.click(loginButton);
  //   });

  //   expect(await screen.findByText('Invalid Login')).toBeInTheDocument();
  // });
});
