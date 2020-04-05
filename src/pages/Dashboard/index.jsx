import React, { Fragment, useEffect, useState } from 'react';
import './Dashboard.scss';
import { useHistory } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

// import { ReactComponent as AddProjectIcon } from '../../assets/add-project.svg';
import { Sidebar } from '../../components/Sidebar';
import { useGlobalStore } from '../../store';
import { Divider } from '../../UiKit/Divider';
import { fetchProfile } from '../../store/modules/profile/actions';
import { Spinner } from '../../UiKit/Spinner';
import { flashToaster } from '../../store/modules/toaster/actions';

/**
 * The Dashboard
 * @returns {JSX.Element} dashboard
 */
export function Dashboard() {
  const { state, dispatch } = useGlobalStore();
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // if there is a profile.userId, do not fetch the profile
      if (state.profile.userId) {
        if (state.profile.percentageComplete < 75) {
          dispatch(
            flashToaster({
              message: `Hello ${state.auth.user.firstName}, You profile is incomplete,
                to utilize this app to the fullest please complete your profile as soon as possible`,
              type: 'primary',
              timeOut: 12000,
            }),
          );
        }

        return setIsFetching(false);
      }

      return dispatch(fetchProfile());
    };

    fetchData();
  }, [
    dispatch,
    history,
    state.auth.user.firstName,
    state.profile.percentageComplete,
    state.profile.userId,
  ]);

  return (
    <main className="dashboard row">
      <Sidebar />
      {isFetching ? (
        <div className="dashboard--main">
          <Spinner center size={50} text="Gathering necessary information" />
        </div>
      ) : (
        <div className="dashboard--main">
          <Text color="#333539" size={20}>
            Your Dashboard
          </Text>
          <SizedBox height={20} />
          <Card>
            <SizedBox width="55%" smWidth="100%">
              <Text as="div" size={24}>
                Welcome
                {' '}
                {state.profile.address.state && 'Back'}
                {' '}
                {state.auth.user.firstName}
                {' '}
              </Text>
              {(!state.profile.address.state || !state.profile.bank.bankName) && (
                <Text size={16}>
                  Complete your profile to subscribe to a profitable farming project.
                </Text>
              )}
            </SizedBox>
            {(!state.profile.address.state || !state.profile.bank.bankName) && (
              <Fragment>
                <SizedBox height={20} />
                <Button onClick={() => history.push('/profile')}>Complete Profile</Button>
              </Fragment>
            )}
          </Card>
          <SizedBox height={20} />

          <Text color="#333539" size={20}>
            Overview
          </Text>
          <SizedBox height={5} />
          <div className="row row__mainAxis--center">
            <Card padding="20px" elevated className="col col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <div className="row row__mainAxis--spaceBetween">
                <Card padding="10px" color="primary">
                  TP
                </Card>
                <div className="col col__crossAxis--end">
                  <Text size={12}>Total Projects</Text>
                  <Text size={26}>0</Text>
                </div>
              </div>
              <div className="col">
                <Divider />
                <Text size={10}>Just Updated</Text>
              </div>
            </Card>
            <Card padding="20px" elevated className="col col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <div className="row row__mainAxis--spaceBetween">
                <Card padding="10px" color="success">
                  TCI
                </Card>
                <div className="col col__crossAxis--end">
                  <Text size={12}>Total Cash Invested</Text>
                  <Text size={26}>0</Text>
                </div>
              </div>
              <div className="col">
                <Divider />
                <Text size={10}>Just Updated</Text>
              </div>
            </Card>
            <Card padding="20px" elevated className="col col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <div className="row row__mainAxis--spaceBetween">
                <Card padding="10px" color="error">
                  CA
                </Card>
                <div className="col col__crossAxis--end">
                  <Text size={12}>Cash Available For Withdrawal</Text>
                  <Text size={26}>0</Text>
                </div>
              </div>
              <div className="col">
                <Divider />
                <Text size={10}>Just Updated</Text>
              </div>
            </Card>
            <Card padding="20px" elevated className="col col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <div className="row row__mainAxis--spaceBetween">
                <Card padding="10px" color="accent">
                  RP
                </Card>
                <div className="col col__crossAxis--end">
                  <Text size={12}>Running Projects</Text>
                  <Text size={26}>0</Text>
                </div>
              </div>
              <div className="col">
                <Divider />
                <Text size={10}>Just Updated</Text>
              </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
