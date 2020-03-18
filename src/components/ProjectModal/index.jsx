import React from 'react';

import { Modal } from '../../UiKit/Modal';
import { Text } from '../../UiKit/Text';
import { SizedBox } from '../../UiKit/SizedBox';
import { Scrollable } from '../../UiKit/Scrollable';
import { cropInvestments } from '../../mocks/cropInvestment';
import { CropCard } from '../CropCard';
import { TextField } from '../../UiKit/TextField';
import { moneyFormat } from '../../helpers/moneyFormat';
import { Button } from '../../UiKit/Button';

/**
 * The Projects
 * @param {*} props
 * @returns {JSX.Element} project component
 */
export function ProjectModal(props) {
  const {
    showModal,
    setShowModal,
    onSubmit,
    onSelect,
    selectedCrop,
    handleInputChange,
    noOfHectares,
    onClose,
  } = props;
  return (
    <Modal width="50%" smWidth="98%" isVisible={showModal} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="col">
          <Text color="#333539" size={16} weight="bold" className="padding__top--20">
            Select your preferred farming project
          </Text>
          <SizedBox height={10} />
          <Scrollable direction="horizontal">
            {cropInvestments.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onSelect={onSelect}
                selectedId={selectedCrop ? selectedCrop.id : ''}
              />
            ))}
          </Scrollable>
          <div className="row row__mainAxis--spaceBetween padding__top--20">
            <SizedBox width="48%" smWidth="100%">
              <TextField
                color="#F6F9FD"
                required
                type="number"
                placeholder="How many hectare do you want?"
                leftIcon="A"
                min={0}
                onChange={handleInputChange}
              />
              <SizedBox height={10} />
            </SizedBox>
            <SizedBox width="48%" smWidth="100%">
              <div className="col">
                <Text color="#333539" size={18} weight="bold">
                  Summary
                </Text>
                <div className="row row__mainAxis--spaceBetween">
                  <Text>Selected Crop</Text>
                  <Text color="accent">
                    {selectedCrop ? selectedCrop.name : 'None'}
                    {' '}
                    {selectedCrop && (
                      <Text size={12} color="primary">
                        (
                        {moneyFormat(selectedCrop.costPerHectare)}
                        /hectare)
                      </Text>
                    )}
                  </Text>
                </div>
                <div className="row row__mainAxis--spaceBetween">
                  <Text>Number of Hectres</Text>
                  <Text color="accent">{noOfHectares}</Text>
                </div>
                <div className="row row__mainAxis--spaceBetween">
                  <Text>Total</Text>
                  <Text color="accent">
                    {selectedCrop ? moneyFormat(selectedCrop.costPerHectare * noOfHectares) : 0}
                  </Text>
                </div>
                <SizedBox height={10} />
                <div className="row row__mainAxis--center">
                  <Button type="submit">Proceed</Button>
                </div>
              </div>
            </SizedBox>
          </div>
        </div>
      </form>
    </Modal>
  );
}
