import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import { searchKeywords } from '../../utils/listKeyWords'
import "leaflet/dist/leaflet.css"
import './styles.css'
import { attack } from '../../types/attack'
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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




const MapStatsCompo = () => {

  const [data, setData] = useState<attack[]>([])

  const [kewWords, setKewWords] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const showForm = () => {

  }

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

  const handleChange = (event: SelectChangeEvent) => {
    console.log('inside hadleChange')
    setQuery(event.target.value as string);
    // mapRef.current?.panTo(new L.LatLng(40.737, -73.923));
   
  };

  const getAllByKewWords = async () => {
    try {
      const longString: string | undefined = kewWords?.join(' ')
      if (!longString) return
      const res = await fetch('https://terror-analasys-yo.onrender.com/api/attacks/all/search', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ query: longString }),
      });
      const data = await res.json();
      setData(data);

    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {

    getAllByKewWords();


  }, [kewWords])
  return (
    <>

      <div>
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
        <MapContainer center={[49.3884, -125.0]} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((mark) => (
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
                <button onClick={showForm}>update</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  )
}

export default MapStatsCompo