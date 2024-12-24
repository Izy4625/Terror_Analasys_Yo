import { createBrowserRouter } from 'react-router-dom';
import FormComponent from './attacks/createFormCompo';
import { attack } from '../types/attack';
import MapStatsCompo from  "../components/map/MapStatsCompo"
import BarsDataset from '../components/graf/GrafCompo/AttackTypesCompo'
import Top5_Countries from '../components/map/Top5_Countries';
import ExampleRechart from '../components/graf/GrafCompo/ReChartExample';
import ResponsiveDrawer from "./components/navbar";
import { Routes, Route } from 'react-router-dom';
import AttackPage from '../components/attacks/attackPage';

export const pages = [
  {
    path: 'mapStats',
    element: <MapStatsCompo />,
    display: 'mapstats',
  },
  {
    path: '/',
    element: <AttackPage />,
    display: 'Attacks',
  },
  {
    path: 'Chart',
    element: <ExampleRechart />,
    display: 'Chart',
  },
  {
    path: 'top 5 charts',
    element: <Top5_Countries />,
    display: 'top 5 charts',
  },
];

export const routes = createBrowserRouter(pages);
