import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateEmail(emailTest) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailTest);
  }
  function enableButton() {
    const minLength = 6;
    return password.length >= minLength && validateEmail(email);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <label htmlFor="login">
        Email
        <input
          onChange={ (event) => setEmail(event.target.value) }
          value={ email }
          data-testid="common_login__input-email"
          id="login"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          onChange={ (event) => setPassword(event.target.value) }
          value={ password }
          data-testid="common_login__input-password"
          id="password"
        />
      </label>
      <button
        disabled={ !enableButton() }
        data-testid="common_login__button-login"
        type="button"
      >
        Login

      </button>
      <button
        data-testid="common_login__button-register"
        type="button"
      >
        Register

      </button>
      <p
        data-testid="common_login__element-invalid-email"
        hidden={ validateEmail(email) }
      >
        Invalid Email Format

      </p>
    </div>
  );
}

export default LoginPage;
