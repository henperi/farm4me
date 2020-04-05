import React, { useState } from 'react';
import '../Signup/auth.scss';
import { Link, /* useHistory, */ Redirect } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { TextField } from '../../UiKit/TextField';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { useGlobalStore } from '../../store';
import { login } from '../../store/modules/auth/actions';
import { Spinner } from '../../UiKit/Spinner';
import { flashToaster } from '../../store/modules/toaster/actions';

/**
 * The Login Page
 *
 * @returns {JSX.Element} the page
 */
export function LoginPage() {
  const { dispatch, state } = useGlobalStore();

  const defaultState = {
    email: '',
    password: '',
  };

  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setformErrors] = useState({
    email: '',
    password: '',
  });

  const [mainError, setmainError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setformErrors(defaultState);
    setmainError('');

    /** @type {any} */
    const response = await dispatch(login(signinData, setIsSubmitting));

    if (response && response.statusCode > 300) {
      if (response.errors && response.errors.detailsObject) {
        setformErrors({
          ...formErrors,
          ...response.errors.detailsObject,
        });
      } else if (response.message) {
        dispatch(flashToaster({ message: response.message, timeOut: 9000 }));
      }
    }

    return null;
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
          {
            mainError && (
            <Text color="white" weight="bold">
              {mainError}
            </Text>
            )
          }
          <TextField
            required
            type="text"
            placeholder="Email"
            leftIcon="A"
            error={formErrors.email}
            errorColor="white"
            onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
          />
          <TextField
            required
            type="password"
            placeholder="Password"
            leftIcon="A"
            error={formErrors.password}
            errorColor="white"
            onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
          />

          <Button type="submit" color="accent" className="row row__crossAxis--center" disabled={isSubmitting}>
            Login
            {isSubmitting && <Spinner />}
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
