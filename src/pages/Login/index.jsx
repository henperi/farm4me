import React, { useState } from 'react';
import '../Signup/auth.scss';
import { Link, /* useHistory, */ Redirect } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { TextField } from '../../UiKit/TextField';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { useGlobalStore } from '../../store';
import { login } from '../../store/modules/auth/actions';

/**
 * The Login Page
 *
 * @returns {JSX.Element} the page
 */
export function LoginPage() {
  const { dispatch, state } = useGlobalStore();

  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (event) => {
    event.preventDefault();
    return dispatch(login(signinData));
  };


  if (state.auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className="main row">
      <div className="auth--image">
        <span className="logo">Logo</span>
        <div className="info">
          <Text color="white" size={34} type="subtitle">
            A contractual rental farming service that helps you generate profit through large scale
            industrial agriculture
          </Text>
        </div>
      </div>
      <div className="auth--form">
        <Text color="white" size={23}>
          <Text color="white" size={28} weight="bold">
            Welcome Back,
          </Text>
          {' '}
          Login to monitor your Agricultural Investments..
        </Text>
        <SizedBox height={50} />
        <form onSubmit={onSubmit}>
          <TextField
            required
            type="text"
            placeholder="Email"
            leftIcon="A"
            onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
          />
          <TextField
            required
            type="password"
            placeholder="Password"
            leftIcon="A"
            onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
          />

          <Button type="submit" color="accent">
            Login
          </Button>
        </form>
        <SizedBox height={25} />
        <Text color="white">Don’t have an account?</Text>
        <SizedBox height={10} />
        <Link to="/signup" className="link">
          <Text color="white" weight="bold" size={18}>
            Go To Sign Up Page
          </Text>
        </Link>
      </div>
    </main>
  );
}
