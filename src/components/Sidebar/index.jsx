import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '../../UiKit/Text';

import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import { ReactComponent as ProjectIcon } from '../../assets/projects.svg';
import { ReactComponent as PersonIcon } from '../../assets/person.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { useGlobalStore } from '../../store';
import { removeAuthUser } from '../../store/modules/auth/actions';
import { AppProgressBar } from '../ProgressBar';

/**
 * Sidebar
 *
 * @returns {JSX.Element} Sidebar
 */
export function Sidebar() {
  const { dispatch } = useGlobalStore();

  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className="sidebar--link" activeClassName="sidebar--link--active">
        <DashboardIcon className="icon" />
        <Text color="white" weight="bold">
          Dashboard
        </Text>
      </NavLink>
      <NavLink to="/projects" className="sidebar--link" activeClassName="sidebar--link--active">
        <ProjectIcon className="icon" />
        <Text color="white" weight="bold">
          Projects
        </Text>
      </NavLink>
      <NavLink to="/profile" className="sidebar--link" activeClassName="sidebar--link--active">
        <PersonIcon className="icon" />
        <Text color="white" weight="bold">
          Profile
        </Text>
      </NavLink>

      <div className="logout col hidden-sm-down">
        <NavLink to="/profile" className="profile--progress hidden-sm-down">
          <AppProgressBar percent="20%" />
          <Text size={12} className="" color="white">Your profile is incomplete</Text>
        </NavLink>

        <NavLink onClick={() => dispatch(removeAuthUser())} to="/login" className="sidebar--link" activeClassName="sidebar--link--active">
          <LogoutIcon className="icon" />
          <Text color="white" weight="bold">
            Logout
          </Text>
        </NavLink>
      </div>

    </div>
  );
}
