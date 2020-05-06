import React, { useState, Fragment } from 'react';
import './auth.scss';
import { Link, Redirect } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { TextField } from '../../UiKit/TextField';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { useGlobalStore } from '../../store';
import { signup } from '../../store/modules/auth/actions';
import { Spinner } from '../../UiKit/Spinner';
import { flashToaster } from '../../store/modules/toaster/actions';
import { Modal } from '../../UiKit/Modal';
import { RenderPDF } from '../../components/RenderPDF';

// @ts-ignore
import ServiceAgreement from '../../assets/doccuments/ServiceAgreement.pdf';

/**
 * The Signup Page
 *
 * @returns {JSX.Element} the page
 */
export function SignupPage() {
  const { dispatch, state } = useGlobalStore();

  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const [pdfFile, setPdfFile] = useState(null);

  const openPdfFileModal = (file) => {
    setShowModal(true);
    setPdfFile(file);
  };

  const defaultState = {
    email: '',
    password: '',
    firstName: '',
    phone: '',
  };

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    firstName: '',
    phone: '',
  });

  const [formErrors, setformErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    phone: '',
  });

  // const [mainError, setmainError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    setformErrors(defaultState);
    // setmainError('');

    /** @type {any} */
    const response = await dispatch(signup(signUpData));

    if (response && response.statusCode > 300) {
      if (response.errors && response.errors.detailsObject) {
        setformErrors({
          ...formErrors,
          ...response.errors.detailsObject,
        });
      } else if (response.message) {
        dispatch(flashToaster({ message: response.message, timeOut: 6000, type: 'error' }));
      }
    }

    return setIsSubmitting(false);
  };

  if (state.auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Modal width="50%" smWidth="98%" isVisible={showModal} onClose={onClose}>
        {pdfFile && <RenderPDF file={pdfFile} />}
      </Modal>
      <main className="main row">
        <div className="auth--image">
          <span className="logo">Logo</span>
          <div className="info">
            <Text color="white" size={34} type="subtitle">
              A contractual rental farming service that helps you generate profit through large
              scale industrial agriculture
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
              placeholder="Full Name"
              name="firstName"
              error={formErrors.firstName}
              errorColor="white"
              leftIcon="A"
              required
              onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
            />
            <TextField
              className="margin__bottom--50"
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              error={formErrors.phone}
              errorColor="white"
              leftIcon="A"
              required
              onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
            />
            <TextField
              required
              type="text"
              placeholder="Email"
              name="email"
              error={formErrors.email}
              errorColor="white"
              leftIcon="A"
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
            />
            <TextField
              required
              type="password"
              placeholder="Password"
              name="password"
              error={formErrors.password}
              errorColor="white"
              leftIcon="A"
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            />

            <div className="col">
              <label htmlFor="terms" className="row row__crossAxis--center">
                <input required id="terms" type="checkbox" className="margin__right--10" />
                <Text color="white" size={14}>
                  Accept Terms, Conditions and
                  {' '}
                  <Text color="white" className="link" onClick={() => openPdfFileModal(ServiceAgreement)}>Service agreement</Text>
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
    </Fragment>
  );
}
