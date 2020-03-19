import React, { useState, useEffect } from 'react';
import { Text } from '../../UiKit/Text';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { ReactComponent as AddProjectIcon } from '../../assets/add-project.svg';
import { Sidebar } from '../../components/Sidebar';

import './Project.scss';
import { Scrollable } from '../../UiKit/Scrollable';
import { cropInvestments } from '../../mocks/cropInvestment';
import { useGlobalStore } from '../../store';
import { createProject, fetchProjects } from '../../store/modules/projects/actions';
import { toaster } from '../../helpers/toaster';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectModal } from '../../components/ProjectModal';
import { ProjectPaymentModal } from '../../components/ProjectPaymentModal';

/**
 * The Projects
 * @returns {JSX.Element} project component
 */
export function Project() {
  const { dispatch, state } = useGlobalStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [noOfHectares, setNoOfHectares] = useState(0);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdProject, setCreatedProject] = useState(null);

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


  const onClose = () => {
    setSelectedCrop(null);
    setShowModal(false);
    setNoOfHectares(0);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCrop) {
      toaster('select a farming project');
      return null;
    }

    const investmentId = selectedCrop.id;

    /**
     * @type {import('../../store/modules/projects/actions').Project} project
     */
    // @ts-ignore
    const newProject = await dispatch(createProject({
      investmentId,
      numberOfHecters: noOfHectares,
    }));

    if (newProject && newProject.id) {
      setShowPaymentModal(true);
      setCreatedProject(newProject);

      onClose();
    }

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProjects());
    };

    fetchData();
  }, [dispatch]);


  return (
    <main className="dashboard row">
      <Sidebar />
      <ProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={onSubmit}
        onSelect={onSelect}
        selectedCrop={selectedCrop}
        handleInputChange={handleInputChange}
        noOfHectares={noOfHectares}
        onClose={() => onClose()}
      />
      {createdProject && (
      <ProjectPaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
        project={createdProject}
      />
      )}
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
          {
            state.projects.length > 0 ? (
              <Scrollable>
                {state.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    only={state.projects.length === 1}
                  />
                ))}
              </Scrollable>
            ) : (<Text size={16}>You have no farming projects at the moment</Text>)
          }
        </div>
      </div>
    </main>
  );
}
