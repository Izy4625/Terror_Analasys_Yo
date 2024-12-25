import { createBrowserRouter } from 'react-router-dom';

import Top5_Groups from './map/Top5_terrorest_groups';
import MapStatsCompo from  "../components/map/MapStatsCompo"

import Top5_Countries from '../components/map/Top5_Countries';
import ExampleRechart from '../components/graf/GrafCompo/ReChartExample';
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
  {
    path: 'top 5 TGroups',
    element: <Top5_Groups />,
    display: 'top 5 Groups',
  },
];

export const routes = createBrowserRouter(pages);
