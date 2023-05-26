import React from 'react';
import logoHRnet from './../assets/logoHRnet_bg.png';
// import NavLinkComponent from './NavLinkComponent';
import { NavLinkProps, NavLinkComponent } from './NavLinkComponent';

interface HeaderProps {
  linkProps: NavLinkProps;
}

export const Header = ({ linkProps }: HeaderProps): JSX.Element => {
  return (
    <header className="header_ListEmployees" data-testid="header_ListEmployees">
      <div className="box_logoService">
        <img src={logoHRnet} alt="HRnet Logo" />
        <p className="titleService">HRnet</p>
      </div>
      <NavLinkComponent {...linkProps} />
    </header>
  );
};
