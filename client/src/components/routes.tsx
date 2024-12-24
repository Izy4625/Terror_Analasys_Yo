import { createBrowserRouter } from 'react-router-dom';


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
];

export const routes = createBrowserRouter(pages);
