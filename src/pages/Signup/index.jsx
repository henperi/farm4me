import React, { useState } from 'react';
import './auth.scss';
import { Link, Redirect } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { TextField } from '../../UiKit/TextField';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { useGlobalStore } from '../../store';
import { signup } from '../../store/modules/auth/actions';
import { Spinner } from '../../UiKit/Spinner';

/**
 * The Signup Page
 *
 * @returns {JSX.Element} the page
 */
export function SignupPage() {
  const { dispatch, state } = useGlobalStore();

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    firstName: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    await dispatch(signup(signUpData));

    return setIsSubmitting(false);
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
            Sign Up
          </Text>
          {' '}
          to start profiting from Agricultural Farming across Nigeria.
        </Text>
        <SizedBox height={50} />
        <form onSubmit={onSubmit}>
          <TextField
            className="margin__bottom--50"
            type="text"
            placeholder="First Name"
            leftIcon="A"
            required
            onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
          />
          <TextField
            className="margin__bottom--50"
            type="text"
            placeholder="Phone Number"
            leftIcon="A"
            required
            onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
          />
          <TextField
            required
            type="text"
            placeholder="Email"
            leftIcon="A"
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
          />
          <TextField
            required
            type="password"
            placeholder="Password"
            leftIcon="A"
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
          />

          <div className="col">
            <label htmlFor="terms" className="row row__crossAxis--center">
              <input required id="terms" type="checkbox" className="margin__right--10" />
              <Text color="white" size={14}>
                Accept Terms, Conditions and service agreement
              </Text>
            </label>
            <SizedBox height={20} />

            <Button type="submit" color="accent" className="row row__crossAxis--center">
              Sign Up
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </form>
        <SizedBox height={25} />
        <Text color="white">Already Have an account?</Text>
        <SizedBox height={10} />

        <Link to="/login" className="link">
          <Text color="white" weight="bold" size={18}>
            Go To Login Instead
          </Text>
        </Link>
      </div>
    </main>
  );
}
