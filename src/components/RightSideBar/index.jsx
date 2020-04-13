import React, { Fragment, useState } from 'react';


import { SizedBox } from '../../UiKit/SizedBox';
import { Text } from '../../UiKit/Text';

import { ReactComponent as BellIcon } from '../../assets/bell.svg';
import { ReactComponent as QuestionInfoIcon } from '../../assets/questionInfo.svg';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

/**
 * Sidebar
 *
 * @returns {JSX.Element} Sidebar
 */
export function RightSideBar() {
  const [showRightSideMobile, setshowRightSideMobile] = useState(false);
  return (
    <Fragment>
      <div className="floating--sideIcons">
        <div className="row row__mainAxis--end">
          <BellIcon className="icon" />
          <QuestionInfoIcon onClick={() => setshowRightSideMobile(!showRightSideMobile)} className="icon" />
        </div>
      </div>
      <div className={`dashboard--partial${showRightSideMobile ? ' visible' : ''}`}>
        <SizedBox height={50} />
        <div className="info--section col col__mainAxis--spaceBetween">
          <div className="col activities">
            <Text weight="bold" color="#333539" size={20}>Recent Activities</Text>
            <Text color="#333539" size={14}>No new activities at the moment</Text>
          </div>
          <SizedBox height={75} />
          <div className="col activities">
            <Text weight="bold" color="#333539" size={20}>Official Doccuments</Text>
            <SizedBox height={10} />
            <div className="row row__crossAxis--center padding__bottom--10">
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>CAC Certificate</Text>
            </div>
            <div className="row row__crossAxis--center padding__bottom--10">
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>Insurance Certificate</Text>
            </div>
            <div className="row row__crossAxis--center padding__bottom--10">
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>Service Agreement</Text>
            </div>
            <div className="row row__crossAxis--center padding__bottom--10">
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>Police Service Agreement</Text>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
