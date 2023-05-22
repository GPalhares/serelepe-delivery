import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import fetchLogin from '../../api/fetchLogin';
import { saveLocal, readLocal } from '../../helpers/localStorage';
import LogoSerepele from '../../images/logoSerelepe.png';
import '../../styles/loginPage/login.css';

function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [messageError, setMessageError] = useState('');

  const checkingFormatt = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minSize = 6;
    const isAValidEmail = emailRegex.test(email);
    const isAValidPassword = password.length >= minSize;
    return (!(isAValidEmail && isAValidPassword));
  };

  const handleInputChange = async (target) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const apiError = 404;

    const dataResult = await fetchLogin({ email, password });

    if (dataResult.status === apiError) {
      setInvalidLogin(true);
      return setMessageError('Invalid Login');
    }
    setInvalidLogin(false);
    saveLocal('user', { ...dataResult.data });

    if (readLocal('user').role === 'customer') {
      history.push('/customer/products');
    }
    if (readLocal('user').role === 'seller') {
      history.push('/seller/orders');
    }
    if (readLocal('user').role === 'administrator') {
      history.push('/admin/manage');
    }
  };

  useEffect(() => {
    if (readLocal('user')) {
      if (readLocal('user').role === 'customer') {
        history.push('/customer/products');
      }
      if (readLocal('user').role === 'seller') {
        history.push('/seller/orders');
      }
      if (readLocal('user').role === 'administrator') {
        history.push('/admin/manage');
      }
    }
  }, [history]);

  return (
    <div className="divLogin">
      <div className="divLogoSerelepe">
        <img className="logoSerelepe" src={ LogoSerepele } alt="Logo" />
      </div>
      <form className="login-form">
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1 },
          } }
        >
          <h1>Login Page</h1>

          <TextField
            className="inputField"
            type="text"
            onChange={ ({ target }) => handleInputChange(target) }
            value={ email }
            data-testid="common_login__input-email"
            id="email"
            name="email"
            label="Email"
          />

          <TextField
            className="inputField"
            onChange={ ({ target }) => handleInputChange(target) }
            value={ password }
            data-testid="common_login__input-password"
            id="password"
            name="password"
            label="Password"
          />

          <div>
            <button
              disabled={ checkingFormatt() }
              data-testid="common_login__button-login"
              type="submit"
              name="Login"
              onClick={ (event) => handleClick(event) }
            >
              Login

            </button>
            <button
              data-testid="common_login__button-register"
              type="submit"
              onClick={ () => history.push('/register') }
            >
              Register

            </button>
          </div>
        </Box>
      </form>
      { invalidLogin
      && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          {messageError}

        </p>)}
    </div>
  );
}

export default LoginPage;
