import React from 'react'
import { NavLink } from 'react-router-dom';

export interface NavLinkProps {
  path: string;
  className: string;
  icon: JSX.Element;
  text: string;
}

export const NavLinkComponent = ({ path, className, icon, text }: NavLinkProps): JSX.Element => {
  return (
    <NavLink to={path} className={className} data-testid={className}>
      {icon}
      <span className='textLink'>{text}</span>
    </NavLink>
  );
};