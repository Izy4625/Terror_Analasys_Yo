import { useState,useEffect } from "react";
import { attackTypes } from "../../../types/attackTypes";
import { year } from "../../../types/year";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import CircularProgress from '@mui/material/CircularProgress';


export default function ExampleRechart() {
    const [dataKey, setDataKey] = useState<string>('')
    const [dataKey1, setDataKey1] = useState<string>('')
    const [dataKey2, setDataKey2] = useState<string>('')
    const [data, setData] = useState<attackTypes[]>([])
   
    const [isLoading, setIsLoading] = useState(true)
    const getAttackTypesData = async () => {
        try {
            const res = await fetch('https://terror-analasys-yo.onrender.com/api/analysis/deadliest-attack-types');
            const data = await res.json();
            setData(data);
            setDataKey('atype')
            setDataKey1('nkill')
            setDataKey2('nwound')
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    const getIncidentsTrendsData = async () => {
        try {
            const res = await fetch('https://terror-analasys-yo.onrender.com/api/analysis/incident-trends');
            const data = await res.json();
            setData(data);
            setDataKey(`iyear`)
            setDataKey1('aincsedents')
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    useEffect(()=>{
       
        getAttackTypesData()
        
           
        
    },[])
  
    useEffect(()=>{
        console.log(data)
    },[data])
    
    return isLoading ? (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
                
            <CircularProgress/>
            </div>
        
    ) :(
    <ResponsiveContainer width={"100%"} height={'100%'} minHeight={500}>
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='atype' angle={20} fontSize={12} tickMargin={30}/>
        <YAxis />
        <Tooltip />
        <Bar
          dataKey='nkill'
          fill="#B3CDAD"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      <Bar
          dataKey='nwound'
          fill="#FF5F5E"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> 

      </BarChart>
    </ResponsiveContainer>
  
  );
}
