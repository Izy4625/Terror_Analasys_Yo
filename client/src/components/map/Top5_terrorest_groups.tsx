import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import {group} from "../../types/group"
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { country } from '../../types/country'
import './styles.css'
import { useState } from "react"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import styles from "./MapStatsCompo.module.css"

const Top5_Groups = () => {
    const [country, setCountry] = useState('')
    const [data, setData] = useState<country[]>([])
    const [amount, setAmount] = useState(5)
    function removeDuplicates(arr: group[]): group[] {
        console.log('hey fellows')
        return arr.reduce((unique: group[], item) => {
            console.log(unique, item)
            if (!unique.find((obj : group) => obj.gname=== item.gname)) {
                unique.push(item);
            }
            console.log(unique)
            return unique;
        }, []);
    }
    
  
    function handleClick(){
        get_Top5_Terrorist_groups()
    }
  
    const get_Top5_Terrorist_groups = async () => {
        try {
            const res = await fetch('https://terror-analasys-yo.onrender.com/api/analysis/relationships/top-groups', {
                method: 'post',
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ area: country }),
              });
            const data : country[] = await res.json();
            console.log(data)
            const groups: group[] = data[0].tgroups
            console.log(data[0].tgroups)
            console.log('this is the ', groups)
            const newGropus = removeDuplicates(data[0].tgroups)
            console.log(newGropus)
            data[0].tgroups = newGropus
            data[0].tgroups.sort((a: group, b: group) => {
                if (a.aincidents < b.aincidents) {
                    return 1;
                }
                if (a.aincidents > b.aincidents) {
                    return -1;
                }
                return 0;
            });
            console.log(data)
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
    <TextField label='Outlined' type='Number' placeholder='Enter Amount OF terrorist Groups' onChange={(e)=>{setAmount(Number(e.target.value))}} variant='outlined'/>
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
                        <div className={styles.popupcontainer}>
                        Country : {mark.cname} <br/>
                        
                       {mark.tgroups.slice(0, amount).map((g)=>(<div>
                        <p><strong>Group Name:</strong> {g.gname} : Incidents : {g.aincidents} </p>
                       
                       </div>))}
                       </div>

                    </Popup>
                </Marker>
            ))}


        </MapContainer>
        </div>

    )
}

export default Top5_Groups