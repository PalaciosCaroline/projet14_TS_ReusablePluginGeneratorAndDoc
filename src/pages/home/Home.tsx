import React from 'react';
import logoHRnet from './../../assets/logoHRnet_bg.png';
import { NavLinkComponent } from './../../components/NavLinkComponent';
import { linkNewEmployee, linkCurrentEmployees } from './../../utils/linkData';

export default function Home(): JSX.Element {
  return (
    <main className="box_home" data-testid="home">
      <img src={logoHRnet} alt="" className="logoHome" />
      <h1 data-testid="pageApp_title">Welcome to <br className='br'/>HRnet Service !</h1>
      <nav className="box_navHome">
        <NavLinkComponent {...linkNewEmployee} />
        <NavLinkComponent {...linkCurrentEmployees} />
      </nav>
    </main>
  );
}
