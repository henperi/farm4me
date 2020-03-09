import React, { useState } from 'react';
import { Text } from '../../UiKit/Text';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { ReactComponent as AddProjectIcon } from '../../assets/add-project.svg';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../UiKit/Modal';

import './Project.scss';
import { CropCard } from '../../components/CropCard';
import { Scrollable } from '../../UiKit/Scrollable';
import { TextField } from '../../UiKit/TextField';
import { moneyFormat } from '../../helpers/moneyFormat';

/**
 * The Projects
 * @returns {JSX.Element} project component
 */
export function Project() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [noOfHectres, setNoOfHectres] = useState(0);

  const handleInputChange = (event) => {
    if (!event.target.value) {
      return setNoOfHectres(0);
    }
    return setNoOfHectres(event.target.value);
  };

  const cropInvestments = [
    {
      id: '1a2wQrd',
      name: 'Maize',
      amount: 227000,
      profit: 73000,
      duration: '6 months',
      season: 'Dry and Wet',
      insurance: 'Leadway Insurance',
      refundPercent: '100%',
    },
    {
      id: '2a2wQrd',
      name: 'Sesam',
      amount: 127000,
      profit: 33000,
      duration: '6 months',
      season: 'Dry and Wet',
      insurance: 'Leadway Insurance',
      refundPercent: '100%',
    },
    {
      id: '3a2wQrd',
      name: 'Millet',
      amount: 170000,
      profit: 43000,
      duration: '6 months',
      season: 'Dry and Wet',
      insurance: 'Leadway Insurance',
      refundPercent: '100%',
    },
    {
      id: '4a2wQrd',
      name: 'Mellon',
      amount: 250000,
      profit: 83000,
      duration: '6 months',
      season: 'Dry and Wet',
      insurance: 'Leadway Insurance',
      refundPercent: '100%',
    },
  ];

  const onSelect = (id) => {
    cropInvestments.map((crop) => {
      if (crop.id === id) {
        setSelectedCrop(crop);
      }
      return crop;
    });
  };

  return (
    <main className="dashboard row">
      <Sidebar />
      <Modal
        noPadding
        width="50%"
        smWidth="98%"
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="col">
          <Text
            color="#333539"
            size={16}
            weight="bold"
            className="padding__horizontal--20 padding__top--20"
          >
            Select your preferred crop
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
          <div className="row row__mainAxis--spaceBetween padding__all--20">
            <SizedBox width="48%" smWidth="100%">
              <TextField
                color="#F6F9FD"
                required
                type="number"
                placeholder="How many hecters do you want?"
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
                        {moneyFormat(selectedCrop.amount)}
                        /hectre)
                      </Text>
                    )}
                  </Text>
                </div>
                <div className="row row__mainAxis--spaceBetween">
                  <Text>Number of Hectres</Text>
                  <Text color="accent">{noOfHectres}</Text>
                </div>
                <div className="row row__mainAxis--spaceBetween">
                  <Text>Total</Text>
                  <Text color="accent">
                    {selectedCrop ? moneyFormat(selectedCrop.amount * noOfHectres) : 0}
                  </Text>
                </div>
                <SizedBox height={10} />
                <div className="row row__mainAxis--center">
                  <Button>Proceed</Button>
                </div>
              </div>
            </SizedBox>
          </div>
        </div>
      </Modal>
      <div className="dashboard--main">
        <Button className="floatingAction--button">
          <AddProjectIcon />
        </Button>
        <Text color="#333539" size={20} weight="bold">
          Pojects Board
        </Text>
        <Card>
          <SizedBox width="58%" smWidth="100%">
            <Text as="h2" color="#333539" size={30} weight="bold">
              Welcome To Your Projects
            </Text>
            <Text size={16}>
              Your farming projects are your investments. You decide what crop to invest in, the
              number of hectres, you make payment and we take it from there.
            </Text>
            <SizedBox height={10} />
            <Text size={12} color="primary">
              All farming projects are insured, and we offer 100% money back guarantee. Click here
              to learn more...
            </Text>
          </SizedBox>
          <SizedBox height={20} />
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Start a new Project
          </Button>
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
