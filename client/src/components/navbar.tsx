import { pages } from './routes';


import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const Navbar = () => {
   
    
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
       
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        <Box>
       
          {pages.map((page,index)=>(
            <Button color='inherit'href={page.path} key={index}>
                {page.display}
            </Button>
          ))}
         
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
