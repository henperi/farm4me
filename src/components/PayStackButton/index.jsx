import React, { useState, Fragment } from 'react';
import Script from 'react-load-script';
import PropTypes from 'prop-types';

import { Button } from '../../UiKit/Button';
import { config } from '../../config';
import { Spinner } from '../../UiKit/Spinner';

/**
 * AppProgressBar
 * @param {any} props
 * @returns {JSX.Element} AppProgressBar
 */
export function PayStackButton(props) {
  const { label, className, disabled } = props;

  const [payStackLoaded, setpayStackLoaded] = useState(false);

  const handleScriptCreate = () => {
    // console.log('create');
  };

  const handleScriptError = () => {
    // console.log('error');
  };

  const handleScriptLoad = () => {
    setpayStackLoaded(true);
  };

  const payWithPaystack = () => {
    const { metadata } = props;
    const paystackOptions = {
      key: config.payStack.pubKey,
      email: props.email,
      amount: props.amount,
      currency: 'NGN',
      ref: props.reference,
      // metadata: props.metadata || {},
      callback: (response) => props.callback(response),
      onClose: () => props.onClose(),
      plan: props.plan,
      quantity: props.quantity,
      subaccount: props.subaccount,
      transaction_charge: props.transactionCharge,
      bearer: props.bearer,
    };
    if (payStackLoaded) {
      // @ts-ignore
      const handler = window.PaystackPop.setup(paystackOptions);
      handler.openIframe();
    }
  };

  return (
    <Fragment>
      <Script
        url="https://js.paystack.co/v1/inline.js"
        onCreate={handleScriptCreate}
        onError={handleScriptError}
        onLoad={handleScriptLoad}
      />
      {
        payStackLoaded ? (
          <Button
            onClick={payWithPaystack}
            className={className}
            disabled={disabled}
          >
            {label}

          </Button>
        ) : (
          <Button className={className} disabled>
            Wait...
            {' '}
            <Spinner />
          </Button>
        )
      }
    </Fragment>
  );
}

PayStackButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  plan: PropTypes.string,
  quantity: PropTypes.string,
  subaccount: PropTypes.string,
  transactionCharge: PropTypes.number,
  bearer: PropTypes.string,
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  reference: PropTypes.string.isRequired,
  metadata: PropTypes.objectOf(PropTypes.object),
  callback: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
};

PayStackButton.defaultProps = {
  className: '',
  plan: '',
  quantity: '',
  subaccount: '',
  transactionCharge: 0,
  bearer: '',
  label: 'Pay',
  metadata: {},
  onClose: () => null,
  disabled: false,
};
