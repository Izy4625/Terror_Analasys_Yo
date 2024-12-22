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
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import CircularProgress from '@mui/material/CircularProgress';


export default function ExampleRechart() {
    const [dataKey, setDataKey] = useState<string>('')
    const [dataKey1, setDataKey1] = useState<string>('')
    const [dataKey2, setDataKey2] = useState<string>('')
    const [query, setQuery] = useState<number>()
    const [data, setData] = useState<attackTypes[] | year[]>([])
   
    const [isLoading, setIsLoading] = useState(true)
    const getAttackTypesData = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/analysis/deadliest-attack-types');
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
            const res = await fetch('http://localhost:3001/api/analysis/incident-trends');
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
        if(query === 1){
        getAttackTypesData()}
        else if(query === 2){
            getIncidentsTrendsData()
        }
    },[query])
  
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
                <input type='number' onChange={(e)=>setQuery(Number(e.currentTarget.value))} value={query} placeholder="Put In number of query"/>
            <CircularProgress/>
        </div>
    ) :(
    <>
    <input type='number' onChange={(e)=>setQuery(Number(e.currentTarget.value))} value={query} placeholder="Put In number of query"/>
    <ResponsiveContainer width={"100%"} height={'100%'}>
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey}/>
        <YAxis />
        <Tooltip />
        <Bar
          dataKey={dataKey1}
          fill="#B3CDAD"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      <Bar
          dataKey={dataKey2}
          fill="#FF5F5E"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> 

      </BarChart>
    </ResponsiveContainer>
    </>
  );
}
