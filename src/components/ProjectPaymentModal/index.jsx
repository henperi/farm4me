import React from 'react';

import PaystackButton from 'react-paystack';

import { Modal } from '../../UiKit/Modal';
import { Text } from '../../UiKit/Text';
import { SizedBox } from '../../UiKit/SizedBox';
import { moneyFormat } from '../../helpers/moneyFormat';
import { useGlobalStore } from '../../store';
import { toKobo } from '../../helpers/toKobo';
import { startProject } from '../../store/modules/projects/actions';
import { config } from '../../config';

/**
 * The Projects
 * @param {*} props
 * @returns {JSX.Element} project component
 */
export function ProjectPaymentModal(props) {
  const { state, dispatch } = useGlobalStore();
  const { showModal, setShowModal } = props;

  /**
   * @type {import('../../store/modules/projects/actions').Project}
   */
  const createdProject = props.project;

  const callback = (response) => {
    if (response.status === 'success') {
      dispatch(startProject({
        transactionRef: response.reference,
      }));

      return setShowModal(false);
    }
    return null;
  };

  const close = () => {

  };

  return (
    <Modal width="50%" smWidth="98%" isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="col col__crossAxis--center">
        <Text
          color="#333539"
          alignment="center"
          size={18}
          weight="bold"
          className="padding__top--20"
        >
          Project created
        </Text>
        <SizedBox height={20} />
        <Text
          color="#333539"
          alignment="center"
          size={18}
          weight="bold"
          className="padding__top--20"
        >
          An invoice has been generated and sent to your email
        </Text>
        <SizedBox height={25} />
        <Text color="#333539" size={20} weight="bold">
          Summary
        </Text>
        <SizedBox width="60%" smWidth="80%">
          <div className="row row__mainAxis--spaceBetween">
            <Text color="#333539" size={14}>
              Project
            </Text>
            <Text color="#333539" size={14}>
              {createdProject.name}
              {' '}
              (
              {`${createdProject.costPerHectare} /hectre`}
              )
            </Text>
          </div>
          <div className="row row__mainAxis--spaceBetween">
            <Text color="#333539" size={14}>
              Number of Hectares
            </Text>
            <Text color="#333539" size={14}>
              {createdProject.numberOfHecters}
              {' '}
              hectres
            </Text>
          </div>
          <div className="row row__mainAxis--spaceBetween">
            <Text color="#333539" size={14}>
              Total
            </Text>
            <Text color="#333539" size={14}>
              {moneyFormat(createdProject.totalCost)}
            </Text>
          </div>
        </SizedBox>

        <SizedBox height={25} />
        <Text color="#333539" size={16}>
          Make Payment to start this project right
        </Text>
        <SizedBox height={5} />

        <PaystackButton
          text="Make Payment"
          className="button"
          callback={callback}
          close={close}
          disabled={false}
          embed={false}
          reference={createdProject.reference}
          email={state.auth.user.email}
          amount={toKobo(createdProject.totalCost)}
          paystackkey={config.payStack.pubKey}
          tag="button"
        />
      </div>
    </Modal>
  );
}
