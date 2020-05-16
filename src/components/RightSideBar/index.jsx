import React, { Fragment, useState } from 'react';

import { SizedBox } from '../../UiKit/SizedBox';
import { Text } from '../../UiKit/Text';

import { ReactComponent as BellIcon } from '../../assets/bell.svg';
import { ReactComponent as QuestionInfoIcon } from '../../assets/questionInfo.svg';
import { ReactComponent as StarIcon } from '../../assets/star.svg';
import { Modal } from '../../UiKit/Modal';
import { RenderPDF } from '../RenderPDF';

import './RightSideBar.scss';

// @ts-ignore
import insuranceCert from '../../assets/doccuments/insurance.pdf';
// @ts-ignore
import ServiceAgreement from '../../assets/doccuments/ServiceAgreement.pdf';
// @ts-ignore
import CAC from '../../assets/doccuments/CAC.pdf';
// @ts-ignore
import PoliceCertificate from '../../assets/doccuments/PoliceCertificate.pdf';

/**
 * Sidebar
 *
 * @returns {JSX.Element} Sidebar
 */
export function RightSideBar() {
  const [showRightSideMobile, setshowRightSideMobile] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const [pdfFile, setPdfFile] = useState(null);

  const openPdfFileModal = (file) => {
    setShowModal(true);
    setPdfFile(file);
  };

  return (
    <Fragment>
      <Modal width="50%" smWidth="98%" isVisible={showModal} onClose={onClose}>
        {pdfFile && <RenderPDF file={pdfFile} />}
      </Modal>
      <div className="floating--sideIcons">
        <div className="row row__mainAxis--end">
          <BellIcon className="icon" />
          <QuestionInfoIcon
            onClick={() => setshowRightSideMobile(!showRightSideMobile)}
            className="icon"
          />
        </div>
      </div>
      <div className={`rightSidebar dashboard--partial${showRightSideMobile ? ' visible' : ''}`}>
        <SizedBox height={50} />
        <div className="info--section col col__mainAxis--spaceBetween">
          <div className="col activities">
            <Text weight="bold" color="#333539" size={20}>
              Recent Activities
            </Text>
            <Text color="#333539" size={14}>
              No new activities at the moment
            </Text>
          </div>
          <SizedBox height={75} />
          <div className="col activities">
            <Text weight="bold" color="#333539" size={20}>
              Official Doccuments
            </Text>
            <SizedBox height={10} />
            <div
              className="row row__crossAxis--center padding__bottom--10 pdf-link"
              onClick={() => openPdfFileModal(CAC)}
              role="presentation"
            >
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>
                CAC Certificate
              </Text>
            </div>
            <div
              className="row row__crossAxis--center padding__bottom--10 pdf-link"
              onClick={() => openPdfFileModal(insuranceCert)}
              role="presentation"
            >
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>
                Insurance Certificate
              </Text>
            </div>
            <div
              className="row row__crossAxis--center padding__bottom--10 pdf-link"
              onClick={() => openPdfFileModal(ServiceAgreement)}
              role="presentation"
            >
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>
                Service Agreement
              </Text>
            </div>
            <div
              className="row row__crossAxis--center padding__bottom--10 pdf-link"
              onClick={() => openPdfFileModal(PoliceCertificate)}
              role="presentation"
            >
              <StarIcon className="icon" />
              <Text color="#333539" size={14}>
                Police Character Certificate
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
