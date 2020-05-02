import React, { useEffect, useState } from 'react';
import './SingleProject.scss';
import { useParams, useHistory } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { Sidebar } from '../../components/Sidebar';
import { useGlobalStore } from '../../store';
import { Spinner } from '../../UiKit/Spinner';
import { fetchSingleProject } from '../../store/modules/singleProject/actions';
import { PayStackButton } from '../../components/PayStackButton';
import { toKobo } from '../../helpers/toKobo';
import { startProject } from '../../store/modules/projects/actions';
import { flashToaster } from '../../store/modules/toaster/actions';
import { RightSideBar } from '../../components/RightSideBar';
import { AppProgressBar } from '../../components/ProgressBar';
import { moneyFormat } from '../../helpers/moneyFormat';

/**
 * The Dashboard
 * @returns {JSX.Element} dashboard
 */
export function SingleProject() {
  const { state, dispatch } = useGlobalStore();
  const [isFetching, setIsFetching] = useState(true);

  const { projectId } = useParams();
  const history = useHistory();

  const { singleProject } = state;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleProject({ projectId }));
      setIsFetching(false);
    };

    fetchData();
  }, [dispatch, projectId]);

  const callback = (response) => {
    if (response.status === 'success') {
      dispatch(
        startProject({
          transactionRef: response.reference,
        }),
      );
      dispatch(
        flashToaster({
          message:
            'We are being notified and your project will start as soon as this payment is verified',
          type: 'lightGrey',
        }),
      );
    }
    return null;
  };

  const getPercent = () => {
    const today = Date.now();
    const secondsInADay = 60 * 60 * 24;

    if (singleProject.startDate && singleProject.endDate) {
      const constDiff = (singleProject.endDate - singleProject.startDate) / 1000 / secondsInADay;
      const timeDiff = (singleProject.endDate - today) / 1000 / secondsInADay;

      if (new Date(today) >= new Date(singleProject.endDate)) {
        return `${100}%`;
      }

      return `${Math.floor(((constDiff - timeDiff) / constDiff) * 100)}%`;
    }
    return `${0}%`;
  };

  // const creationDate = new Date(singleProject.createdAt).toDateString();
  const startedDate = singleProject.startDate
    ? new Date(singleProject.startDate).toDateString()
    : 'Not yet stated';
  const completionDate = singleProject.endDate
    ? new Date(singleProject.endDate).toDateString()
    : '';

  return (
    <main className="dashboard row">
      <Sidebar />

      {isFetching ? (
        <div className="dashboard--main">
          <Spinner center size={50} text="Gathering necessary information" />
        </div>
      ) : (
        <div className="dashboard--main">
          <SizedBox height={30} />
          <Card>
            <SizedBox width="55%" smWidth="100%">
              <Text as="h2" size={24}>
                {singleProject.name}
                {' '}
                Investment
              </Text>
              <Text size={16}>
                {singleProject.isPaid
                  ? 'You have paid for this farming project'
                  : 'You have not paid for this farming project'}
              </Text>
            </SizedBox>
            <AppProgressBar darker percent={getPercent()} />
            <SizedBox height={10} />
            <Text size={12} className="row row__mainAxis--start" color="white">
              {singleProject.isPaid ? 'Project Started' : 'Make payment to start project'}
            </Text>
          </Card>
          <SizedBox height={20} />

          <SizedBox width="45%" smWidth="100%">
            <Card elevated className="col">
              <Text hexColor="#51504c" as="h2" size={24} alignment="center">
                Overview
              </Text>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Investment Name
                </Text>
                <Text size={16}>{singleProject.name}</Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Unit Cost
                </Text>
                <Text size={16}>
                  N
                  {moneyFormat(singleProject.costPerHectare)}
                </Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Number of hectares
                </Text>
                <Text size={16}>{singleProject.numberOfHecters}</Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Totla Cost
                </Text>
                <Text size={16}>
                  N
                  {moneyFormat(singleProject.totalCost)}
                </Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Amount Paid
                </Text>
                <Text size={16}>
                  N
                  {moneyFormat(singleProject.totalCost)}
                </Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Payment Status
                </Text>
                <Text size={16}>{singleProject.isPaid ? 'Paid' : 'Pending'}</Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Start Date
                </Text>
                <Text size={16}>{startedDate}</Text>
              </div>
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={16}>
                  Completion Date
                </Text>
                <Text size={16}>{completionDate}</Text>
              </div>

              <SizedBox height={10} />
              <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                <Text hexColor="#51504c" size={18}>
                  Returns
                </Text>
                <Text size={16}>
                  N
                  {moneyFormat(singleProject.totalReturns)}
                </Text>
              </div>
              <Text size={12}>
                Returns are generally paid 48 hours after a project has completed successfully
              </Text>
              <SizedBox height={20} />
              <div className="col col__crossAxis--center">
                <PayStackButton
                  email={state.auth.user.email}
                  amount={toKobo(singleProject.totalCost)}
                  reference={singleProject.reference}
                  callback={callback}
                  label={singleProject.isPaid ? 'Paid' : 'Pay'}
                  disabled={singleProject.isPaid}
                />
                <SizedBox height={10} />
                <Button color="accent" onClick={() => history.push(`/invoice/${singleProject.id}`)}>
                  View Invoice
                </Button>
              </div>
            </Card>
          </SizedBox>
          <SizedBox height={5} />
        </div>
      )}
      <RightSideBar />
    </main>
  );
}
