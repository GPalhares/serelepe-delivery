// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import LoginPage from '../pages/login/login';
// import fetchLogin from './mocks/costumer/users.mock';

// jest.mock('../../api/fetchLogin');

// describe('LoginPage', () => {
//   it('should render the login page', () => {
//     render(<LoginPage />, { wrapper: MemoryRouter });

//     expect(screen.getByText('Login Page')).toBeInTheDocument();
//     expect(screen.getByText('Email')).toBeInTheDocument();
//     expect(screen.getByText('Password')).toBeInTheDocument();
//     expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
//     expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
//   });

//   it('should handle form submission and redirect based on user role', async () => {
//     const mockUser = {
//       role: 'customer',
//     };

//     fetchLogin.mockResolvedValueOnce({
//       status: 200,
//       data: mockUser,
//     });

//     render(<LoginPage />, { wrapper: MemoryRouter });

//     const emailInput = screen.getByTestId('common_login__input-email');
//     const passwordInput = screen.getByTestId('common_login__input-password');
//     const loginButton = screen.getByTestId('common_login__button-login');

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.click(loginButton);
//     await screen.findByText('Login Page');

//     expect(screen.queryByText('Login Page')).toBeNull();
//     expect(screen.getByText('Customer Products Page')).toBeInTheDocument();
//   });

//   it('should display an error message for invalid login', async () => {
//     const mockUser = {
//       role: 'administrator',
//     };

//     fetchLogin.mockResolvedValueOnce({
//       status: 404,
//       data: mockUser,
//     });

//     render(<LoginPage />, { wrapper: MemoryRouter });

//     const emailInput = screen.getByTestId('common_login__input-email');
//     const passwordInput = screen.getByTestId('common_login__input-password');
//     const loginButton = screen.getByTestId('common_login__button-login');

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.click(loginButton);

//     await screen.findByText('Invalid Login');

//     expect(screen.getByText('Invalid Login')).toBeInTheDocument();
//   });
// });
