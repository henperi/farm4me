import React from 'react';
import './Dashboard.scss';
import { Text } from '../../UiKit/Text';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { ReactComponent as AddProjectIcon } from '../../assets/add-project.svg';
import { Sidebar } from '../../components/Sidebar';

/**
 * The Dashboard
 * @returns {JSX.Element} dashboard
 */
export function Dashboard() {
  return (
    <main className="dashboard row">
      <Sidebar />
      <div className="dashboard--main">
        <Button className="floatingAction--button">
          <AddProjectIcon />
        </Button>
        <Text color="#333539" size={20} weight="bold">
          Dashboard
        </Text>
        <Card>
          <SizedBox width="55%" smWidth="100%">
            <Text as="h2" color="#333539" size={30} weight="bold">
              Welcome Back Jannie
              {' '}
            </Text>
            <Text size={16}>
              Complete your profile to subscribe to a profitable farming project.
            </Text>
          </SizedBox>
          <SizedBox height={20} />
          <Button>Complete Profile</Button>
        </Card>

        <SizedBox height={20} />
        <div className="col">
          <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
            <Text weight="bold" size={20}>
              Farming Projects
            </Text>
            <Button size="xs" color="accent">
              View All
            </Button>
          </div>
          <SizedBox height={10} />
          <Text size={16}>You have no farming projects at the moment</Text>
        </div>
      </div>
    </main>
  );
}
