import React, { useEffect, useState } from 'react';
import { TextField } from '../../UiKit/TextField';
import { Text } from '../../UiKit/Text';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { Sidebar } from '../../components/Sidebar';
import { useGlobalStore } from '../../store';
import {
  fetchProfile,
  addBankInfo,
  addAddressInfo,
  addProfileDocImages,
} from '../../store/modules/profile/actions';
import { Spinner } from '../../UiKit/Spinner';
import { flashToaster } from '../../store/modules/toaster/actions';
import { Card } from '../../UiKit/Card';
import './Profile.scss';

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

  const [addressFormErrors, setaddressFormErrors] = useState({
    city: '',
    state: '',
    addressLine1: '',
  });

  const [bankFormErrors, setbankFormErrors] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
  });

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmittingBankInfo, setIsSubmittingBankInfo] = useState(false);
  const [isSubmittingAddressInfo, setIsSubmittingAddressInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (state.profile.userId) {
        return setIsFetching(false);
      }

      await dispatch(fetchProfile());
      return null;
    };

    fetchData();
  }, [dispatch, state.profile.userId]);

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
    setbankFormErrors({
      bankName: '',
      accountName: '',
      accountNumber: '',
    });

    /** @type {any} */
    const response = await dispatch(addBankInfo(bankState));

    if (response && response.statusCode > 300) {
      if (response.errors && response.errors.detailsObject) {
        setbankFormErrors({
          ...bankFormErrors,
          ...response.errors.detailsObject,
        });
      } else if (response.message) {
        dispatch(flashToaster({ message: response.message, timeOut: 9000 }));
      }
    }

    setIsSubmittingBankInfo(false);
  };

  const submitAddressForm = async (event) => {
    setIsSubmittingAddressInfo(true);
    event.preventDefault();
    setaddressFormErrors({
      city: '',
      state: '',
      addressLine1: '',
    });

    /** @type {any} */
    const response = await dispatch(addAddressInfo(addressState));

    if (response && response.statusCode > 300) {
      if (response.errors && response.errors.detailsObject) {
        setaddressFormErrors({
          ...addressFormErrors,
          ...response.errors.detailsObject,
        });
      } else if (response.message) {
        dispatch(flashToaster({ message: response.message, timeOut: 9000 }));
      }
    }
    setIsSubmittingAddressInfo(false);
  };

  /** @type {[
   * { validId: string, photo: string },
   * React.Dispatch<React.SetStateAction<{
   * validId: string | ArrayBuffer, photo: string | ArrayBuffer
   * }>>]} */
  const [imagePreview, setimagePreview] = useState({
    validId: '',
    photo: '',
  });


  /** @type {[
   * { validId: File, photo: File },
   * React.Dispatch<React.SetStateAction<{
   * validId: File, photo: File
   * }>>]} */
  const [filesToUpload, setfilesToUpload] = useState();
  // const [uploadPercent, setuploadPercent] = useState(0);
  // const [showProgress, setshowProgress] = useState(false);

  const handleNewImage = (event, key) => {
    const mb = 1000000;
    const maxFileSize = 5 * mb;
    const validFormats = ['image/png', 'image/jpg', 'image/jpeg'];

    if (event.target.files.length) {
      const reader = new FileReader();
      const imageFile = event.target.files[0];

      if (imageFile.size > maxFileSize) {
        return alert('file size is too large, please select an image less than 5mb');
      }

      if (!validFormats.includes(imageFile.type)) {
        return alert('file format not supported, please select a valid image');
      }

      reader.onload = () => {
        setimagePreview({
          ...imagePreview,
          [key]: reader.result,
        });

        setfilesToUpload({
          ...filesToUpload,
          [key]: imageFile,
        });
      };


      // console.log(imageFile);

      return reader.readAsDataURL(imageFile);
    }

    return null;
  };

  const submitDocImagesForm = async (event) => {
    event.preventDefault();
    // setIsSubmittingAddressInfo(true);
    // setaddressFormErrors({
    //   city: '',
    //   state: '',
    //   addressLine1: '',
    // });
    if (!filesToUpload) {
      return dispatch(flashToaster({ message: 'Select a new image and try again', timeOut: 9000, type: 'error' }));
    }

    /** @type {any} */
    const response = await dispatch(addProfileDocImages(filesToUpload));

    if (response && response.statusCode > 300) {
      if (response.errors && response.errors.detailsObject) {
        // setaddressFormErrors({
        //   ...addressFormErrors,
        //   ...response.errors.detailsObject,
        // });
      } else if (response.message) {
        dispatch(flashToaster({ message: response.message, timeOut: 9000 }));
      }
    }
    // setIsSubmittingAddressInfo(false);
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
                  name="accountName"
                  error={bankFormErrors.accountName}
                  placeholder="Account Name"
                  leftIcon="A"
                  onChange={(e) => setBankState({
                    ...bankState,
                    accountName: e.target.value,
                  })}
                  value={bankState.accountName}
                />
              </SizedBox>
              <SizedBox width="48%" smWidth="100%">
                <TextField
                  color="#F6F9FD"
                  required
                  type="text"
                  name="accountNumber"
                  error={bankFormErrors.accountNumber}
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
                name="bankName"
                error={bankFormErrors.bankName}
                placeholder="Bank Name eg GTB"
                leftIcon="A"
                onChange={(e) => setBankState({
                  ...bankState,
                  bankName: e.target.value,
                })}
                value={bankState.bankName}
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
                  error={addressFormErrors.city}
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
                  error={addressFormErrors.state}
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
                error={addressFormErrors.addressLine1}
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
            <SizedBox height={10} />

            <form onSubmit={submitDocImagesForm}>
              <Card className="row row__mainAxis--spaceBetween">
                <SizedBox width="48%" smWidth="100%">
                  <div className="col col__mainAxis--center col__crossAxis--center ">
                    <div className="photo-box">
                      <img src={imagePreview.validId || state.profile.docs.validId} alt="" />
                    </div>
                    Upload your Valid ID Card
                    <Button size="sm" color="accent" className="upload-button">
                      Choose Image
                      <input
                        type="file"
                        accept="image/jpg, image/png, image/jpeg"
                        onChange={(e) => handleNewImage(e, 'validId')}
                      />
                    </Button>
                    <SizedBox height={10} />
                  </div>
                </SizedBox>

                <SizedBox width="48%" smWidth="100%">
                  <div className="col col__mainAxis--center col__crossAxis--center ">
                    <div className="photo-box">
                      <img src={imagePreview.photo || state.profile.docs.photo} alt="" />
                    </div>
                    Upload your Photo
                    <Button size="sm" color="accent" className="upload-button">
                      Choose Image
                      <input
                        type="file"
                        accept="image/jpg, image/png, image/jpeg"
                        onChange={(e) => handleNewImage(e, 'photo')}
                      />
                    </Button>
                    <SizedBox height={10} />
                  </div>
                </SizedBox>

                <SizedBox width="100%" smWidth="100%" className="margin__top--10">
                  <div className="row row__mainAxis--center">
                    <Button type="submit">Upload and Save</Button>
                  </div>
                </SizedBox>
              </Card>
            </form>
            <SizedBox height={10} />
          </div>
        </div>
      )}
    </main>
  );
}
