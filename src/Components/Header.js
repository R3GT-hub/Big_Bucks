import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
    // const darkTheme=createTheme({
    //     palette:{
    //         main:"#000"
    //     },
    //     mode:"dark"
    // })
    const {currency,setCurrency,symbol}=CryptoState()
  return (
    // <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static" sx={{backgroundColor:"black" ,display:"flex",justifyContent:"space-between"}}>
      <Container>
        <Toolbar sx={{backgroundColor:"black" ,display:"flex",justifyContent:"space-between"}}>
          <Link to="/"><Typography variant="h4" sx={{flex:1,color:"gold",fontFamily:"Montserrat",fontWeight:"bold",cursor:"pointer"}}>BigBucks</Typography></Link>
          <Select value={currency} onChange={(e)=>setCurrency(e.target.value)} variant="outlined" 
           sx={{
                color: "white", // Set the color of the Select component to white
                width: 100,
                height: 40,
                "& fieldset": {
                  borderColor: "white", // Set the border color of the Select component
                },
                
              
                // marginRight: 15,
              }}>
            <MenuItem value={'USD'}>USD &nbsp;$</MenuItem>
            <MenuItem value={'INR'}>INR &nbsp;&nbsp;₹</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
};

export default Header;