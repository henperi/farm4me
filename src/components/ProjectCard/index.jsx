import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Link, useHistory } from 'react-router-dom';
import { Text } from '../../UiKit/Text';
// import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { BgColors } from '../../UiKit/theme';
import { ReactComponent as MoreVert } from '../../assets/more_verti.svg';
import { ScreenSizes } from '../../UiKit/uiHelper/screenSizes';
import { AppProgressBar } from '../ProgressBar';
import { moneyFormat } from '../../helpers/moneyFormat';
import { Button } from '../../UiKit/Button';

const StyledProjectCard = styled.div`
  background-color: ${BgColors.primary};
  border-radius: 25px;
  height: fit-content;
  margin: 10px 0px;
  margin-bottom: 30px;
  min-height: 40px;
  box-shadow: 0px 35px 18px -25px rgba(71.43206298351288, 89.78888556361198, 255, 0.35);
  overflow: hidden;
  margin-left: 3% !important;
  width: 265px;
  min-width: 265px;
  scroll-snap-align: start;
  padding: 20px;

  ${(props) => props.only
    && css`
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
      content: '';
      background-color: #a9aff0;
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
 * @typedef {import('../../store/modules/projects/actions').Project} Project
 */

/**
 * ProjectCard
 * @param {{
 *  project: Project
 * }} props
 * @returns {JSX.Element} ProjectCard
 */
export function ProjectCard(props) {
  const { project } = props;
  const history = useHistory();

  const getPercent = () => {
    const today = Date.now();
    const secondsInADay = 60 * 60 * 24;

    if (project.startDate && project.endDate) {
      const constDiff = (project.endDate - project.startDate) / 1000 / secondsInADay;
      const timeDiff = (project.endDate - today) / 1000 / secondsInADay;

      if (new Date(today) >= new Date(project.endDate)) {
        return `${100}%`;
      }

      return `${Math.floor(((constDiff - timeDiff) / constDiff) * 100)}%`;
    }
    return `${0}%`;
  };

  return (
    <StyledProjectCard {...props} className="col">
      <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
        <div className="row row__crossAxis--center">
          <div className="icon--project row row__crossAxis--center row__mainAxis--center">A</div>
          <SizedBox width={10} />
          <Link to={`/projects/${project.id}`}>
            <Text size={17} color="white" weight="bold">
              {project.name}
            </Text>
          </Link>
        </div>
        <MoreVert className="icon--click" />
      </div>

      <SizedBox height={10} />
      <Text size={13} color="white">
        {project.numberOfHecters}
        {' '}
        hectares @ N
        {moneyFormat(project.totalCost)}
      </Text>
      <SizedBox height={10} />
      <AppProgressBar percent={getPercent()} />
      <Text size={12} className="row row__mainAxis--start" color="white">
        {project.isPaid ? 'Project Started' : 'Make payment to start project'}
      </Text>
      <SizedBox height={10} />
      <div className="row row__mainAxis--center">
        <Button onClick={() => history.push(`/projects/${project.id}`)} color="lightGrey">View</Button>
      </div>
    </StyledProjectCard>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    numberOfHecters: PropTypes.number,
    isPaid: PropTypes.bool,
    name: PropTypes.string,
    createdAt: PropTypes.number,
    totalCost: PropTypes.number,
    season: PropTypes.string,
    startDate: PropTypes.any,
    totalReturns: PropTypes.number,
    profit: PropTypes.number,
    duration: PropTypes.number,
    costPerHectare: PropTypes.number,
    ownerId: PropTypes.string,
    endDate: PropTypes.any,
    percentageProfit: PropTypes.number,
    id: PropTypes.string,
    reference: PropTypes.string,
  }).isRequired,
  only: PropTypes.bool,
};

ProjectCard.defaultProps = {
  only: false,
};
