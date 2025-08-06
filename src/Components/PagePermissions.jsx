// PagePermissions.jsx

import Admin from "./Admin";
import Profile from './Profile';
import EmployeeList from './EmployeeList';
import Performance from './Performance';
import EmployeeData from './EmployeeData';

const PagePermissions = {
  'GL-P-EAD-RW': {
    name: 'Admin',
    path: '/Admin',
    component: Admin,
  },
  'GL-P-EP-RW': {
    name: 'Profile',
    path: '/',
    component: Profile,
  },
  'GL-P-EL-RW': {
    name: 'Employee List',
    path: '/EmployeeList',
    component: EmployeeList,
  },
  
  'GL-P-P-RW': {
    name: 'EmployeeData',
    path: '/EmployeeData',
    component: EmployeeData,
  },
};

export default PagePermissions;
