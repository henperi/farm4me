import React from 'react';
import './auth.scss';
import { Link } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { TextField } from '../../UiKit/TextField';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

/**
 * The Signup Page
 *
 * @returns {JSX.Element} the page
 */
export function SignupPage() {
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
        <form>
          <TextField
            className="margin__bottom--50"
            type="text"
            placeholder="First Name"
            leftIcon="A"
            required
          />
          <TextField required type="text" placeholder="Email" leftIcon="A" />
          <TextField required type="password" placeholder="Password" leftIcon="A" />

          <div className="col">
            <label htmlFor="terms" className="row row__crossAxis--center">
              <input required id="terms" type="checkbox" className="margin__right--10" />
              <Text color="white" size={14}>
                Accept Terms, Conditions and service agreement
              </Text>
            </label>
            <SizedBox height={20} />

            <Button type="submit" color="accent">Sign Up</Button>
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
