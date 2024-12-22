import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import {Marker} from 'react-leaflet'
import { Popup } from 'react-leaflet'
import styles from "./MapStatsCompo.module.css"
import "leaflet/dist/leaflet.css"
import './styles.css'
import {useState, useRef} from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface region{
    name: string,
    casualties: number,
    incidents: number,
    lat: number,
    long: number
    ave: number
}

interface cordinates{
    lon: number,
    lat: number
}
const MapStatsCompo = () => {
  const mapRef = useRef(null);
 const [cor, setCor] = useState<cordinates>({lon: 52.0873, lat: -9.075});
 const [lat, setLat] = useState<number>();
  const [query, setQuery] = useState('')
  const regions : region[]= [
{    name: "France",
    casualties: 100,
    incidents: 50,
    lat: 2.347,
    long: 46.2276,
    ave: 2},
    {    name: "UK",
        casualties: 200,
        incidents: 50,
        lat: 1.437,
        long: 52.3555,
        ave: 4},

  ]
  const cord: cordinates= {
    lon: 46.2276,
    lat: 2.437
  }
    const handleChange = (event: SelectChangeEvent) => {
        console.log('inside hadleChange')
        setQuery(event.target.value as string);
        // mapRef.current?.panTo(new L.LatLng(40.737, -73.923));
        setCor(cord)
      };
      function handleOnSetView() {
    
      }
  return (
   
<div>
    <Box sx={{m: 1, minWidth: 160} }>
    <FormControl size="medium">
        <InputLabel id="demo-simple-select-label">Query</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={query}
          label="Query"
          onChange={handleChange}
        >
          <MenuItem value={0}>Get Regions With MOst Average Casualties per incidents</MenuItem>
          <MenuItem value={1}>Top 5 Terror Oganazations in Region</MenuItem>
          <MenuItem value={2}>Top Groups That caused the most casualties in a Region</MenuItem>
        </Select>
      </FormControl>
    </Box>
     <MapContainer center={[cor.lon, cor.lat]} zoom={13} scrollWheelZoom={false}>
  <TileLayer  
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>
  )
}

export default MapStatsCompo