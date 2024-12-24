import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'

import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { country } from '../../types/country'
import './styles.css'
import { useState, useEffect } from "react"



const Top5_Countries = () => {
    const [data, setData] = useState<country[]>([])
  
    const get_Top5_Countries = async () => {
        try {
            const res = await fetch('https://terror-analasys-yo.onrender.com/api/analysis/highest-casualty-countries');
            const data = await res.json();
            setData(data);
            // setIsLoading(false);
        } catch (err) {
            // setIsLoading(false);
        }
    };
    useEffect(() => {
        get_Top5_Countries()
    }, []);



    return (

        <MapContainer center={[37.005105,-89.176269]} zoom={13} scrollWheelZoom={false}>
             <TileLayer  
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
            {data.map((mark)=>(
                <Marker position={[mark.latitude, mark.longitude]}>
                    <Popup>
                        Country : {mark.cname} <br/>
                        Amount Killed : {mark.nkill} <br/>
                        Amount Injured : {mark.nwound} <br/>
                        Total Incidents : {mark.aincidents} <br/>
                        Average Casualties per incident : {(Math.round(mark.average * 100) / 100).toFixed(2)}

                    </Popup>
                </Marker>
            ))}


        </MapContainer>

    )
}

export default Top5_Countries