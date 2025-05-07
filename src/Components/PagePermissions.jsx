// PagePermissions.jsx

import Admin from "./Admin";
import Profile from './Profile';
import EmployeeList from './EmployeeList';

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
};

export default PagePermissions;
