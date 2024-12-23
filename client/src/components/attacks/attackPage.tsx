import { useState ,useEffect} from 'react';
import { searchKeywords } from '../../utils/listKeyWords';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { attack } from '../../types/attack';
import OutlinedInput from '@mui/material/OutlinedInput';
import AttackList from './attaclListCompo';
import FormWithDialog from './createFormCompo';
const AttackPage = () => {
    const [kewWords, setKewWords] = useState<string[]>([])
    const [data, setData] = useState<attack[]>([])

    const handleChangeKeyWords = (event: SelectChangeEvent<typeof kewWords>) => {
        const {
          target: { value },
        } = event;
        console.log(value)
        setKewWords(
          
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const getAllByKewWords = async()=>{
        try {
          const longString: string |undefined= kewWords?.join(' ')
          if(!longString) return
          const res = await fetch('https://terror-analasys-yo.onrender.com/api/attacks/all/search',{
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
    <>
    <div className='headercontainer'>
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
    <div>
        <FormWithDialog/>
    </div>
    </div>
        <div>
          <AttackList attacks={data}/>
        </div>
    
    </>
  )
}

export default AttackPage