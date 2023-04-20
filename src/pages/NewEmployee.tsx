// import React from 'react'
// import FormNewEmployee from '../components/FormNewEmployee'
// import { NavLink } from 'react-router-dom'
// import logoHRnet from './../assets/logoHRnet_bg.png'

// export default function NewEmployee() {
//   return (
//     <>
//     <header className='header_ListEmployees'>
//       <div className='box_logoService'>
//         <img src={logoHRnet} alt="" />
//         <p className="titleService">HRnet</p>
//       </div>
//       <NavLink to="/listemployees" className="linkNewEmployee linkListEmployee">
//         List of current employees</NavLink>    
//     </header>
//     <main className='main_newEmployee containerNewEmployee'> 
//           <h1>Create Employee</h1>
//           <FormNewEmployee />
//     </main>
//     </>
//   )
// }


import React from 'react';
import FormNewEmployee from '../components/FormNewEmployee';
import { NavLink } from 'react-router-dom';
import logoHRnet from './../assets/logoHRnet_bg.png';

export default function NewEmployee(): JSX.Element {
return (
<>
<header className='header_ListEmployees'>
<div className='box_logoService'>
<img src={logoHRnet} alt='' />
<p className='titleService'>HRnet</p>
</div>
<NavLink
       to='/listemployees'
       className='linkNewEmployee linkListEmployee'
     >
List of current employees
</NavLink>
</header>
<main className='main_newEmployee containerNewEmployee'>
<h1>Create Employee</h1>
<FormNewEmployee />
</main>
</>
);
}