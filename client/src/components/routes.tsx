import { createBrowserRouter } from 'react-router-dom';
import FormComponent from './attacks/UpdateFormCompo';
import { attack } from '../types/attack';

export const pages = [
  {
    path: 'form',
    element: <FormComponent defaultValues={attack} />,
    display: 'form',
  },
  {
    path: '',
    element: <Variables />,
    display: 'Variables',
  },
  {
    path: 'consts',
    element: <Consts />,
    display: 'Consts',
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    display: 'Dashboard',
  },
];

export const routes = createBrowserRouter(pages);
