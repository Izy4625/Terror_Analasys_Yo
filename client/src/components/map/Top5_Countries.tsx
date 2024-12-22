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
    const [names, setNames] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const get_Top5_Countries = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/analysis/highest-casualty-countries');
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        get_Top5_Countries()
    }, []);



    return (

        <MapContainer center={[-89.176269, 37.005105]} zoom={20} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((mark)=>(
                <Marker position={[mark.longitude, mark.latitude]}>
                    <Popup>
                        nkill
                    </Popup>
                </Marker>
            ))}
<Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>

        </MapContainer>

    )
}

export default Top5_Countries