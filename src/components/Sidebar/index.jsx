import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '../../UiKit/Text';

import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import { ReactComponent as ProjectIcon } from '../../assets/projects.svg';
import { ReactComponent as PersonIcon } from '../../assets/person.svg';

/**
 * Sidebar
 *
 * @returns {JSX.Element} Sidebar
 */
export function Sidebar() {
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
    </div>
  );
}
