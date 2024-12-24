import Grid from "@mui/material/Grid2";
import AttackCard from "./attackCardCompo";
import { attack } from "../../types/attack";


const AttackList: React.FC<{ attacks: attack[] }> = ({ attacks }) => {
    return (
      <Grid container spacing={3} style={{ padding: '16px' }}>
        {attacks.map((attack, index) => (
          <Grid container spacing={2} key={index}>
            <AttackCard attack={attack} />
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default AttackList;