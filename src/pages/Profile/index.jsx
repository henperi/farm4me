import React, { useEffect, useState } from 'react';
import { TextField } from '../../UiKit/TextField';
import { Text } from '../../UiKit/Text';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { Sidebar } from '../../components/Sidebar';
import { useGlobalStore } from '../../store';
import { fetchProfile, addBankInfo, addAddressInfo } from '../../store/modules/profile/actions';
import { Spinner } from '../../UiKit/Spinner';

/**
 * The Projects
 * @returns {JSX.Element} project component
 */
export function Profile() {
  const { state, dispatch } = useGlobalStore();

  const [bankState, setBankState] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
  });

  const [addressState, setAddressState] = useState({
    city: '',
    state: '',
    addressLine1: '',
  });

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmittingBankInfo, setIsSubmittingBankInfo] = useState(false);
  const [isSubmittingAddressInfo, setIsSubmittingAddressInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProfile());

      setIsFetching(false);
    };

    fetchData();
  }, [dispatch]);

  const willDisable = (data) => {
    const vals = Object.values(data);

    return !!vals.find((val) => {
      if (!val) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    setBankState(state.profile.bank);
  }, [state.profile.bank]);

  useEffect(() => {
    setAddressState(state.profile.address);
  }, [state.profile.address]);

  const submitBankForm = async (event) => {
    setIsSubmittingBankInfo(true);
    event.preventDefault();

    await dispatch(addBankInfo(bankState));
    setIsSubmittingBankInfo(false);
  };

  const submitAddressForm = async (event) => {
    setIsSubmittingAddressInfo(true);
    event.preventDefault();

    await dispatch(addAddressInfo(addressState));
    setIsSubmittingAddressInfo(false);
  };

  return (
    <main className="dashboard row">
      <Sidebar />
      {isFetching ? (
        <div className="dashboard--main">
          <Spinner center size={50} text="fetching your profile..." />
        </div>
      ) : (
        <div className="dashboard--main">
          <Text as="h2" color="#333539" size={20} weight="bold">
            Complete Your KYC Profile
          </Text>
          <SizedBox height={10} />
          <div className="col">
            <Text color="#333539" size={18}>
              Personal Info
            </Text>
            <div className="row row__mainAxis--spaceBetween">
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  placeholder="First Name"
                  leftIcon="A"
                  value={state.auth.user.firstName}
                  disabled
                />
              </SizedBox>
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  placeholder="Last Name"
                  leftIcon="A"
                  value={state.auth.user.lastName}
                  disabled
                />
              </SizedBox>
            </div>
            <SizedBox width="48%" smWidth="100%">
              <TextField
                color="#F6F9FD"
                required
                type="text"
                placeholder="Phone Number"
                leftIcon="A"
                value={state.auth.user.phone}
                disabled
              />
            </SizedBox>
            <SizedBox height={10} />
            <Button disabled>Save</Button>
          </div>

          <SizedBox height={50} />
          <form className="col" onSubmit={submitBankForm}>
            <Text color="#333539" size={18}>
              Bank Info
            </Text>
            <div className="row row__mainAxis--spaceBetween">
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  placeholder="Bank Name"
                  leftIcon="A"
                  onChange={(e) => setBankState({
                    ...bankState,
                    bankName: e.target.value,
                  })}
                  value={bankState.bankName}
                />
              </SizedBox>
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  placeholder="Account Number"
                  leftIcon="A"
                  onChange={(e) => setBankState({
                    ...bankState,
                    accountNumber: e.target.value,
                  })}
                  value={bankState.accountNumber}
                />
              </SizedBox>
            </div>
            <SizedBox width="48%" smWidth="100%">
              <TextField
                color="#F6F9FD"
                required
                type="text"
                placeholder="Name on Bank"
                leftIcon="A"
                onChange={(e) => setBankState({
                  ...bankState,
                  accountName: e.target.value,
                })}
                value={bankState.accountName}
              />
            </SizedBox>
            <SizedBox height={10} />
            <Button type="submit" disabled={willDisable(state.profile.bank)} className="row">
              {willDisable(state.profile.bank) ? 'Saved' : 'Save'}
              {isSubmittingBankInfo && <Spinner />}
            </Button>
          </form>

          <SizedBox height={50} />
          <form className="col" onSubmit={submitAddressForm}>
            <Text color="#333539" size={18}>
              Address Info
            </Text>
            <div className="row row__mainAxis--spaceBetween">
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  placeholder="City"
                  leftIcon="A"
                  onChange={(e) => setAddressState({
                    ...addressState,
                    city: e.target.value,
                  })}
                  value={addressState.city}
                />
              </SizedBox>
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  placeholder="State"
                  leftIcon="A"
                  onChange={(e) => setAddressState({
                    ...addressState,
                    state: e.target.value,
                  })}
                  value={addressState.state}
                />
              </SizedBox>
            </div>
            <SizedBox width="100%" smWidth="100%">
              <TextField
                as="textarea"
                rows={5}
                color="#F6F9FD"
                required
                type="text"
                placeholder="Address line 1"
                leftIcon="A"
                onChange={(e) => setAddressState({
                  ...addressState,
                  addressLine1: e.target.value,
                })}
                value={addressState.addressLine1}
              />
            </SizedBox>
            <SizedBox height={10} />
            <Button type="submit" disabled={willDisable(state.profile.address)} className="row">
              {willDisable(state.profile.address) ? 'Saved' : 'Save'}
              {isSubmittingAddressInfo && <Spinner />}
            </Button>
          </form>

          <SizedBox height={50} />
          <div className="col">
            <Text color="#333539" size={18}>
              Personal Documents
            </Text>
            <SizedBox width="100%" smWidth="100%">
              <div className="fileUpload">
                <TextField
                  type="file"
                  color="#F6F9FD"
                  required
                  placeholder="Address"
                  leftIcon="A"
                  accept="image/png, image/jpeg"
                />
                <Text className="label" color="primary" size={13}>
                  Upload a Valid Id Card
                </Text>
              </div>
            </SizedBox>
            <SizedBox height={10} />
            <SizedBox width="100%" smWidth="100%">
              <div className="fileUpload">
                <TextField
                  type="file"
                  color="#F6F9FD"
                  required
                  placeholder="Address"
                  leftIcon="A"
                  accept="image/png, image/jpeg"
                />
                <Text className="label" color="primary" size={13}>
                  Your profile picture
                </Text>
              </div>
            </SizedBox>
            <SizedBox height={10} />
            <Button>Save</Button>
          </div>
        </div>
      )}
    </main>
  );
}
