import React, { useState, useEffect } from 'react';
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
import { cropInvestments } from '../../mocks/cropInvestment';
// import { logger } from '../../helpers/logger';
import { useGlobalStore } from '../../store';
import { createProject, fetchProjects } from '../../store/modules/projects/actions';
import { toaster } from '../../helpers/toaster';

/**
 * The Projects
 * @returns {JSX.Element} project component
 */
export function Project() {
  const { dispatch, state } = useGlobalStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [noOfHectares, setNoOfHectares] = useState(0);

  const handleInputChange = (event) => {
    if (!event.target.value) {
      return setNoOfHectares(0);
    }
    return setNoOfHectares(event.target.value);
  };

  const onSelect = (id) => {
    cropInvestments.map((crop) => {
      if (crop.id === id) {
        setSelectedCrop(crop);
      }
      return crop;
    });
  };


  const onSubmit = (event) => {
    event.preventDefault();

    if (!selectedCrop) {
      toaster('select a farming project');
      return null;
    }

    const investmentId = selectedCrop.id;

    return dispatch(createProject({
      investmentId,
      numberOfHecters: noOfHectares,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchProjects());

      console.log(response);
    };

    fetchData();
  }, [dispatch]);

  // logger.log(state.projects);

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
        <form onSubmit={onSubmit}>
          <div className="col">
            <Text
              color="#333539"
              size={16}
              weight="bold"
              className="padding__horizontal--20 padding__top--20"
            >
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
            <div className="row row__mainAxis--spaceBetween padding__all--20">
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
          {state.projects.length > 0
            ? <Text size={16}>You have Projects</Text>
            : <Text size={16}>You have no farming projects at the moment</Text>}
        </div>
      </div>
    </main>
  );
}
