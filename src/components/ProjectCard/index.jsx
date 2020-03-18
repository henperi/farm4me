import React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../UiKit/Text';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';
import { BgColors } from '../../UiKit/theme';
import { ReactComponent as MoreVert } from '../../assets/more_verti.svg';
import { ScreenSizes } from '../../UiKit/uiHelper/screenSizes';

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
      // width: 80%;
      // margin-right: 3%;
    }
  `}

  .icon--project {
    width:36px;
    height:36px;
    border-radius: 12px;
    background-color:rgba(235.0000011920929, 240.00000089406967, 254.00000005960464, 0.55);
    margin-right: 5px;
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
  /**
   * @type {import('../../store/modules/projects/actions').Project} project
   */
  const farmProject = props.project;

  const createdAt = new Date(farmProject.createdAt).toDateString();
  const startedAt = farmProject.startDate ? new Date(farmProject.startDate).toDateString() : 'Not yet stated';
  const endedAt = farmProject.endDate ? new Date(farmProject.endDate).toDateString() : '';
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
        hectares
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
      <div className="row row__mainAxis--center">
        <Button color="lightGrey">View</Button>
      </div>
    </StyledProjectCard>
  );
}

ProjectCard.propTypes = {
};

ProjectCard.defaultProps = {
};
