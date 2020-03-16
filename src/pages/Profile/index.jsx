import React from 'react';
import { TextField } from '../../UiKit/TextField';
import { Text } from '../../UiKit/Text';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { Sidebar } from '../../components/Sidebar';
import { useGlobalStore } from '../../store';

/**
 * The Projects
 * @returns {JSX.Element} project component
 */
export function Profile() {
  const { state } = useGlobalStore();

  return (
    <main className="dashboard row">
      <Sidebar />
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
            />
          </SizedBox>
          <SizedBox width="100%" smWidth="100%">
            <TextField
              as="textarea"
              rows={5}
              color="#F6F9FD"
              required
              type="text"
              placeholder="Address"
              leftIcon="A"
              value={state.auth.user.address}
            />
          </SizedBox>
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
          <Button>Save</Button>
        </div>

        <SizedBox height={50} />
        <div className="col margin__bottom--20">
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
              />
            </SizedBox>
            <SizedBox width="48%" smWidth="100%">
              <TextField
                color="#F6F9FD"
                required
                type="text"
                placeholder="Account Number"
                leftIcon="A"
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
            />
          </SizedBox>
          <SizedBox height={10} />
          <Button>Save</Button>
        </div>
      </div>
    </main>
  );
}
