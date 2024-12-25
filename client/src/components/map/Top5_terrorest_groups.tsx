import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import {group} from "../../types/group"
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { country } from '../../types/country'
import './styles.css'
import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'


const Top5_Groups = () => {
    const [country, setCountry] = useState('')
    const [data, setData] = useState<country[]>([])

    function removeDuplicates(arr: group[]): group[] {
        return arr.reduce((unique: group[], item) => {
            if (!unique.find((obj : group) => obj.gname=== item.gname)) {
                unique.push(item);
            }
            return unique;
        }, []);
    }
    
  
    function handleClick(){
        get_Top5_Terrorist_groups()
    }
  
    const get_Top5_Terrorist_groups = async () => {
        try {
            const res = await fetch('https://terror-analasys-yo.onrender.com/api/attacks/all/search', {
                method: 'post',
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ area: country }),
              });
            const data = await res.json();
            const groups: group[] = data.tgroups
            const newGropus = removeDuplicates(groups)
            data.tgroups = newGropus
            data.tgroups.sort((a: group, b: group) => {
                if (a.aincidents < b.aincidents) {
                    return -1;
                }
                if (a.aincidents > b.aincidents) {
                    return 1;
                }
                return 0;
            });
            setData(data);
            // setIsLoading(false);
        } catch (err) {
            // setIsLoading(false);
        }
    };
   


    return (
        <div>
            <div style={{display: 'flex',
            justifyContent: 'space-around',
            margin: "5px"
            }}>
   <TextField id="outlined-basic" label="Outlined" placeholder="enter Country" onChange={(e)=>{setCountry(e.target.value)}} variant="outlined" />
    <Button onClick={handleClick}>Send</Button>
   </div>
        <MapContainer center={[37.005105,-89.176269]} zoom={13} scrollWheelZoom={false}>
             <TileLayer  
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
            {data.map((mark)=>(
                <Marker position={[mark.latitude, mark.longitude]}>
                    <Popup>
                        Country : {mark.cname} <br/>
                        
                       {mark.tgroup.map((g)=>(<div>
                        <p><strong>Group Name:</strong> {g.gname}</p>
                        <p><strong>Group Amount Of Incidents:</strong> {g.aincidents}</p>
                       </div>))}

                    </Popup>
                </Marker>
            ))}


        </MapContainer>
        </div>

    )
}

export default Top5_Groups