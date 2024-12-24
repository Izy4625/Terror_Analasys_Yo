import { pages } from './routes';

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    // const navigate = useNavigate();
    function handlenavigate(path: string){
        // navigate("/" + path)
    }
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
