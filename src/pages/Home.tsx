import React from 'react';
import logoHRnet from './../assets/img_hrnet.png';
import { NavLinkComponent } from '../components/NavLinkComponent';
import { linkNewEmployee, linkCurrentEmployees } from '../utils/linkData';

/**
 * Home is a functional component that represents the home page.
 * It renders the main content section with the HRnet logo, a welcome message, and navigation links.
 *
 * @returns {JSX.Element} A JSX element representing the Home component.
 */
export default function Home(): JSX.Element {
  return (
    <main className="box_home" data-testid="home">
      <img src={logoHRnet} alt="" className="logoHome" />
      <h1 data-testid="pageApp_title">
        Welcome to <br className="br" />
        HRnet Service !
      </h1>
      <nav className="box_navHome">
        <NavLinkComponent {...linkNewEmployee} />
        <NavLinkComponent {...linkCurrentEmployees} />
      </nav>
    </main>
  );
}
