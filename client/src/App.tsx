
import './App.css'
import MapStatsCompo from './components/map/MapStatsCompo'
import BarsDataset from './components/graf/GrafCompo/AttackTypesCompo'
import Top5_Countries from './components/map/Top5_Countries';
import ExampleRechart from './components/graf/GrafCompo/ReChartExample';
import ResponsiveDrawer from "./components/navbar";
import { Routes, Route } from 'react-router-dom';
import FormComponent from './components/attacks/UpdateFormCompo';
import AttackPage from './components/attacks/attackPage';

function App() {

  return (
    <>
      <Routes>

      </Routes>

      {/* <FormComponent defaultValues={{
        eventid:4235,
        iyear:2024,
        imonth: 45,
        iday:24,
        country_txt: "djfbd",
        region_txt:"djfbd",
        city: "djfbd",
        latitude: -2.345,
        longitude: 34.4565,
        attacktype1_txt: "djfbd",
        targtype1_txt: "djfbd",
        target1: "djfbd",
        gname: "djfbd",
        weaptype1_txt:"djfbd",
        nkill: 2,
        nwound: 3,
        nperps:4,
        summary: "djfbd"
    }}/> */}
      <AttackPage />
    </>
  )
}

export default App
