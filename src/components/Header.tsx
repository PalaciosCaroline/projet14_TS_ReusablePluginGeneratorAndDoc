import React from 'react';
import logoHRnet from './../assets/img_hrnet.png';
import { NavLinkProps, NavLinkComponent } from './NavLinkComponent';

/**
 * `HeaderProps` is an interface for the Header component props.
 * @interface
 * @property {NavLinkProps} linkProps - The properties for the NavLinkComponent.
 */
export interface HeaderProps {
  linkProps: NavLinkProps;
}

/**
 * `Header` is a functional React component.
 * It renders a header with a logo and a NavLinkComponent.
 * The `logoHRnet` is used as the source for the logo image.
 * The logo and the service title are wrapped in a div with the "box_logoService" class.
 * The NavLinkComponent is rendered with all the `linkProps` passed in by props destructuring.
 * @component
 * @param {HeaderProps} { linkProps } - The properties for the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header = ({ linkProps }: HeaderProps): JSX.Element => {
  return (
    <header className="header_ListEmployees" data-testid="header_test">
      <div className="box_logoService">
        <img src={logoHRnet} alt="HRnet Logo" />
        <p className="titleService">HRnet</p>
      </div>
      <NavLinkComponent {...linkProps} />
    </header>
  );
};
