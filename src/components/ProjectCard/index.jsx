import React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../UiKit/Text';
// import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { BgColors } from '../../UiKit/theme';
import { ReactComponent as MoreVert } from '../../assets/more_verti.svg';
import { ScreenSizes } from '../../UiKit/uiHelper/screenSizes';
import { AppProgressBar } from '../ProgressBar';
import { PayStackButton } from '../PayStackButton';
import { useGlobalStore } from '../../store';
import { toKobo } from '../../helpers/toKobo';
import { moneyFormat } from '../../helpers/moneyFormat';
import { startProject } from '../../store/modules/projects/actions';
import { flashToaster } from '../../store/modules/toaster/actions';

// import { ReactComponent as PersonIcon } from '../../assets/person.svg';

// BgColors

const StyledProjectCard = styled.div`
  background-color: ${BgColors.primary};
  border-radius: 25px;
  height: fit-content;
  margin: 10px 0px;
  min-height: 40px;
  box-shadow: 2px 1px 12px -1px  rgba(71.43206298351288, 89.78888556361198, 255, 0.45);
  overflow: hidden;
  margin-left: 3% !important;
  width: 265px;
  min-width: 265px;
  scroll-snap-align: start;
  padding: 20px;

  ${(props) => props.only && css`
    @media screen and (max-width: ${ScreenSizes.sm}) {
      /* width: 80%; */
      /* margin-right: 3%; */
    }
  `}

  .icon--project {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background-color: rgba(235.0000011920929, 240.00000089406967, 254.00000005960464, 0.55);
    margin-right: 5px;
  }

  .progressbar {
    background-color: #fff;
    width: 100%;
    height: 8px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      content: "";
      background-color: #A9AFF0;
      left: 0;
      top: 0;
      bottom: 0;
      width: 20%;
      border-radius: 12px;
    }
  }

  .icon--click {
    cursor: pointer;
  }

  .header {
  }

  .body {
  }
`;

/**
 * ProjectCard
 * @param {any} props
 * @returns {JSX.Element} ProjectCard
 */
export function ProjectCard(props) {
  const { state, dispatch } = useGlobalStore();
  /**
   * @type {import('../../store/modules/projects/actions').Project} project
   */
  const farmProject = props.project;

  const createdAt = new Date(farmProject.createdAt).toDateString();
  const startedAt = farmProject.startDate ? new Date(farmProject.startDate).toDateString() : 'Not yet stated';
  const endedAt = farmProject.endDate ? new Date(farmProject.endDate).toDateString() : '';

  const getPercent = () => {
    const today = Date.now();
    const secondsInADay = (60 * 60 * 24);

    if (farmProject.startDate && farmProject.endDate) {
      const constDiff = (farmProject.endDate - farmProject.startDate) / 1000 / secondsInADay;
      const timeDiff = (farmProject.endDate - today) / 1000 / secondsInADay;

      if (new Date(today) >= new Date(farmProject.endDate)) {
        return `${100}%`;
      }

      return `${Math.floor(((constDiff - timeDiff) / constDiff) * 100)}%`;
    }
    return `${0}%`;
  };

  const callback = (response) => {
    if (response.status === 'success') {
      dispatch(startProject({
        transactionRef: response.reference,
      }));
      dispatch(flashToaster({ message: 'We are being notified and your project will start as soon as this payment is verified', type: 'lightGrey' }));
    }
    return null;
  };

  return (
    <StyledProjectCard {...props} className="col">

      <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
        <div className="row row__crossAxis--center">
          <div className="icon--project row row__crossAxis--center row__mainAxis--center">
            A
          </div>
          <SizedBox width={10} />
          <Text size={17} color="white" weight="bold">{farmProject.name}</Text>
        </div>
        <MoreVert className="icon--click" />
      </div>

      <SizedBox height={10} />
      <Text size={13} color="white">
        {farmProject.numberOfHecters}
        {' '}
        hectares @
        {' '}
        N
        {moneyFormat(farmProject.totalCost)}
      </Text>
      <Text size={13} color="white">{farmProject.isPaid ? 'Paid' : 'Not Paid'}</Text>
      {
        !farmProject.startDate && (
        <Text size={13} color="white">
          Created on
          {' '}
          {createdAt}
        </Text>
        )
      }
      <Text size={13} color="white">
        Started on
        {' '}
        {startedAt}
      </Text>
      {endedAt
        && (
        <Text size={13} color="white">
          Ends on
          {' '}
          {endedAt}
        </Text>
        )}
      <SizedBox height={10} />
      <AppProgressBar percent={getPercent()} />
      <Text size={12} className="row row__mainAxis--start" color="white">
        {farmProject.isPaid ? 'Project Started' : 'Make payment to start project'}
      </Text>
      <SizedBox height={10} />
      <div className="row row__mainAxis--center">
        {/* <Button color="lightGrey">View</Button> */}
        <PayStackButton
          email={state.auth.user.email}
          amount={toKobo(farmProject.totalCost)}
          reference={farmProject.reference}
          callback={callback}
          label={farmProject.isPaid ? 'Paid' : 'Pay'}
          disabled={farmProject.isPaid}
        />
      </div>
    </StyledProjectCard>
  );
}

ProjectCard.propTypes = {
};

ProjectCard.defaultProps = {
};
