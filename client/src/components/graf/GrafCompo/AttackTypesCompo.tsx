import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts';
import { attackTypes } from '../../../types/attackTypes';
import CircularProgress from '@mui/material/CircularProgress';
export default function Demo() {

    interface graphData{
        label: string,
        data: number[]
    }
    const [data, setData] = useState<attackTypes[]>([])
    const [names, setNames] = useState<string[]>([])
    const [amountData, setAmountData] = useState<graphData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const getAttackTypesData = async () => {
        try {
            const res = await fetch('https://terror-analasys-yo.onrender.com/api/analysis/deadliest-attack-types');
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        getAttackTypesData()
    },[])
    useEffect(()=>{
        data.map((group)=>{
            setNames((name)=>[...name,group.atype])
            const newData: graphData={
                label: 'nkill',
                data: [group.nkill,group.nwound]
            }
            setAmountData((prevData)=>[...prevData,newData])
           
      })
      console.log(amountData)
    },[isLoading])
    useEffect(()=>{
        console.log(amountData)
    },[amountData])
    
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

        <Box sx={{ height: '100vh', width: '100vh' }}>
            <BarChart
                xAxis={[{ scaleType: 'band', data:names}]}
                series= {amountData.map((da)=>da)}
               
                width={1000}
                height={1000}
            />
        </Box>
  );
}
