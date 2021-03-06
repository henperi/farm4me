import React from 'react';

import { Modal } from '../../UiKit/Modal';
import { Text } from '../../UiKit/Text';
import { SizedBox } from '../../UiKit/SizedBox';
import { moneyFormat } from '../../helpers/moneyFormat';
import { useGlobalStore } from '../../store';
import { toKobo } from '../../helpers/toKobo';
import { startProject } from '../../store/modules/projects/actions';
import { flashToaster } from '../../store/modules/toaster/actions';
import { PayStackButton } from '../PayStackButton';

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
      dispatch(flashToaster({ message: 'We are being notified and your project will start as soon as this payment is verified', type: 'lightGrey' }));

      return setShowModal(false);
    }
    return null;
  };

  return (
    <Modal width="50%" smWidth="98%" isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="col col__crossAxis--center">
        <SizedBox height={20} />
        <Text
          color="#333539"
          alignment="center"
          size={20}
          weight="bold"
          className="padding__top--20"
        >
          New Farming Project Created, An invoice has been generated and sent to your email
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
            <Text color="#333539" size={16}>
              Number of Hectares
            </Text>
            <Text color="#333539" size={16}>
              {createdProject.numberOfHecters}
              {' '}
              hectres
            </Text>
          </div>
          <div className="row row__mainAxis--spaceBetween">
            <Text color="#333539" size={16}>
              Total
            </Text>
            <Text color="#333539" size={16}>
              {moneyFormat(createdProject.totalCost)}
            </Text>
          </div>
        </SizedBox>

        <SizedBox height={25} />
        <Text color="#333539" size={18}>
          Make Payment to start this project right
        </Text>
        <SizedBox height={5} />

        {/* <PaystackButton
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
        /> */}
        <PayStackButton
          email={state.auth.user.email}
          amount={toKobo(createdProject.totalCost)}
          reference={createdProject.reference}
          callback={callback}
          label="Make Payment"
          disabled={createdProject.isPaid}
        />
      </div>
    </Modal>
  );
}
