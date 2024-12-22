import { useState,useEffect } from "react";
import { attackTypes } from "../../../types/attackTypes";
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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ExampleRechart() {

    const [data, setData] = useState<attackTypes[]>([])
    const [names, setNames] = useState<string[]>([])
   
    const [isLoading, setIsLoading] = useState(true)
    const getAttackTypesData = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/analysis/deadliest-attack-types');
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
        console.log(data)
    },[data])
    
  return (
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
        <XAxis dataKey="atype" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="nkill"
          fill="#B3CDAD"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="nwound"
          fill="#FF5F5E"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
