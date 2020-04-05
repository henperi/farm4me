import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectModal } from '../../components/ProjectModal';
import { ProjectPaymentModal } from '../../components/ProjectPaymentModal';
import { Spinner } from '../../UiKit/Spinner';
import { flashToaster } from '../../store/modules/toaster/actions';
import { fetchProfile } from '../../store/modules/profile/actions';

/**
 * The Projects
 * @returns {JSX.Element} project component
 */
export function Project() {
  const { dispatch, state } = useGlobalStore();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [noOfHectares, setNoOfHectares] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdProject, setCreatedProject] = useState(null);

  const [isFetching, setIsFetching] = useState(true);

  const handleInputChange = (event) => {
    if (!event.target.value) {
      return setNoOfHectares(0);
    }
    return setNoOfHectares(parseInt(event.target.value, 10));
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
    setIsSubmitting(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCrop) {
      return dispatch(flashToaster({ message: 'Select a farming project to proceed!', type: 'error' }));
    }

    if (!noOfHectares) {
      return dispatch(flashToaster({ message: 'Input your preffered number of hectares to proceed!', type: 'error' }));
    }

    if (typeof noOfHectares !== 'number') {
      return dispatch(flashToaster({ message: 'Number of hectares must be a number!', type: 'error' }));
    }

    const investmentId = selectedCrop.id;
    setIsSubmitting(true);

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

    return setIsSubmitting(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!state.profile.userId) {
        return dispatch(fetchProfile());
      }

      if (state.profile.percentageComplete < 75) {
        setTimeout(() => {
          history.push('/profile');
        }, 1500);

        return dispatch(
          flashToaster({
            message: `You profile is incomplete, you can not access this page at the moment,
              you will be redirected to complete your profile in a moment`,
            type: 'error',
            timeOut: 5000,
          }),
        );
      }

      await dispatch(fetchProjects());
      return setIsFetching(false);
    };

    fetchData();
  }, [dispatch, history, state.profile.percentageComplete, state.profile.userId]);

  const renderProjects = () => (state.projects.length > 0 ? (
    <Scrollable>
      {state.projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          only={state.projects.length === 1}
        />
      ))}
    </Scrollable>
  ) : (<Text size={16}>You have no farming projects at the moment</Text>));


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
        isSubmitting={isSubmitting}
      />
      {createdProject && (
      <ProjectPaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
        project={createdProject}
      />
      )}
      <div className="dashboard--main">
        {state.profile.percentageComplete >= 75 && (
        <Button
          className="floatingAction--button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <AddProjectIcon />
        </Button>
        )}
        <Text color="#333539" size={20}>
          Pojects Board
        </Text>
        <SizedBox height={20} />
        <Card>
          <SizedBox width="58%" smWidth="100%">
            <Text as="div" size={30}>
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
          {state.profile.percentageComplete >= 75 && (
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Start a new Project
          </Button>
          )}
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
          <SizedBox width="100%" smWidth="100%" height={250}>
            {
            isFetching ? (
              <Spinner center size={50} text="fetching your projects..." />) : (
              renderProjects()
            )
              }
          </SizedBox>
        </div>
      </div>
    </main>
  );
}
