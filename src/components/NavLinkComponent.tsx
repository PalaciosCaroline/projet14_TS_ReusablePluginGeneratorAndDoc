import React from 'react'
import { NavLink } from 'react-router-dom';

/**
 * `NavLinkProps` is an interface for the NavLinkComponent component props.
 * @interface
 * @property {string} path - The path where the link should navigate to.
 * @property {string} className - The className for the NavLink component.
 * @property {JSX.Element} icon - The icon to be displayed in the NavLink component.
 * @property {string} text - The text to be displayed in the NavLink component.
 */
export interface NavLinkProps {
  path: string;
  name: string;
  icon: JSX.Element;
  text: JSX.Element;
}

/**
 * `NavLinkComponent` is a functional React component.
 * It renders a NavLink component from react-router-dom with the provided path, className, icon and text.
 * @component
 * @param {NavLinkProps} { path, className, icon, text } - The properties for the NavLinkComponent.
 * @returns {JSX.Element} The rendered NavLinkComponent.
 */
export const NavLinkComponent = ({ path, name, icon, text }: NavLinkProps): JSX.Element => {
  return (
    <NavLink to={path} className='linkApp' data-testid={name}>
      {icon}
      {text}
    </NavLink>
  );
};