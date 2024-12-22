import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import {Marker} from 'react-leaflet'
import { Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import './styles.css'
import { attack } from '../../types/attack'
import {useState, useRef, useEffect} from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import styles from "./MapStatsCompo.module.css"
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


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
  const [data, setData] = useState<attack[]>([])
 const [cor, setCor] = useState<cordinates>({lon: 52.0873, lat: -9.075});
 const [lat, setLat] = useState<number>();
   const [kewWords, setKewWords] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const searchKeywords: string[] = [
    "Bombing",
    "Explosion",
    "Explosives",
    "Pipe bomb",
    "General Electric",
    "Strikers",
    "Educational Institution",
    "Government",
    "Jurists Ball",
    "Black Nationalists",
    "Commune 1",
    "North America",
    "United States",
    "East Germany",
    "GDR (German Democratic Republic)",
    "Berlin",
    "New York City",
    "Rio Grande",
    "Seattle",
    "Attack",
    "Terrorism",
    "Violent",
    "Target",
    "Perpetrator",
    "Attack Type",
    "Terrorist Group",
    "Victims",
    "Wounded",
    "Bomb",
    "Bomb Threat",
    "Civil unrest",
    "Political violence",
    "Radical groups",
    "Military action",
    "Political targets",
    "Explosive devices",
    "Urban warfare",
    "Public safety",
    "Emergency response",
    "National security",
    "Casualties",
    "Attack Strategy",
    "Attack Plan",
    "Anti-government",
    "Protest",
    "Protestors",
    "Bomb maker",
    "Criminal acts",
    "Political clash",
    "Freedom Fighters",
    "Historical attacks",
    "1970",
    "1970s",
    "Political violence history",
    "Military explosives",
    "Public spaces",
    "Strategic target",
    "International attack",
    "Violent demonstration",
    "Radical movements",
    "Social unrest",
    "Resistance movement",
    "Terrorist threat",
    "Attacks on civilians",
    "School bombing",
    "Pipe bomb attack",
    "Factory explosion",
    "Mass casualty event",
    "Anti-authority",
    "Civilian casualties",
    "Guerrilla warfare",
    "Assailants",
    "Military base attack",
    "Political assassination",
    "Infiltration",
    "Protest march",
    "Political target",
    "Occupation",
    "Historical violence",
    "Global terrorism",
    "Geopolitical conflict",
    "Protest violence",
    "Armed attack",
    "Explosive attack",
    "International terrorism",
    "Detonated bomb",
    "Strategic location",
    "Demolition",
    "Resistance group",
    "Urban terrorism",
    "International attack",
    "Bomb damage",
    "Damage control",
    "Explosive ordinance",
    "Political disruption",
    "Domestic attack",
    "Global unrest",
    "Violent protests",
    "Anti-establishment",
    "Civil rights group"
  ];
  
  const handleChangeKeyWords = (event: SelectChangeEvent<typeof kewWords>) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setKewWords(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
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
      const getAllByKewWords = async()=>{
        try {
          const longString: string |undefined= kewWords?.join(' ')
          if(!longString) return
          const res = await fetch('http://localhost:3001/api/attacks/all/search',{
            method: 'post',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ query : longString}),
          });
          const data = await res.json();
          setData(data);
          
      } catch (err) {
          console.log(err)
      }
  };
      useEffect(()=>{

      getAllByKewWords();
        
       
      },[kewWords])
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
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={kewWords}
          onChange={handleChangeKeyWords}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {searchKeywords.map((name) => (
            <MenuItem
              key={name}
              value={name}
              
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
     <MapContainer center={[cor.lon, cor.lat]} zoom={13} scrollWheelZoom={false}>
  <TileLayer  
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
 {data.map((mark)=>(
      <Marker position={[mark.latitude, mark.longitude]}>
             <Popup>
             <div className={styles.popupcontainer}>
        <h4>Attack Details</h4>
        <p><strong>Event ID:</strong> {mark.eventid}</p>
        <p><strong>Date:</strong> {`${mark.iyear}-${mark.imonth}-${mark.iday}`}</p>
        <p><strong>Country:</strong> {mark.country_txt}</p>
        <p><strong>Region:</strong> {mark.region_txt}</p>
        <p><strong>City:</strong> {mark.city}</p>
        <p><strong>Attack Type:</strong> {mark.attacktype1_txt}</p>
        <p><strong>Target Type:</strong> {mark.targtype1_txt}</p>
        <p><strong>Target:</strong> {mark.target1}</p>
        <p><strong>Group Name:</strong> {mark.gname}</p>
        <p><strong>Weapon Type:</strong> {mark.weaptype1_txt}</p>
        <p><strong>Killed:</strong> {mark.nkill}</p>
        <p><strong>Wounded:</strong> {mark.nwound}</p>
        <p><strong>Number of Perpetrators:</strong> {mark.nperps}</p>
        <p><strong>Summary:</strong> {mark.summary}</p>
      </div>

             </Popup>
      </Marker>
 ))}
</MapContainer>
    </div>
  )
}

export default MapStatsCompo