import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import "./CoinPage.css";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Paper, Typography } from "@mui/material";
import ReactHtmlParser from 'html-react-parser';
import { numberWithCommas } from "../Components/CoinsTable";
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>
  return (
    // <Paper  className="container1" sx={{height:"90vh",width:"100%",backgroundColor:"black",color:"white",marginTop:"10px"}}>
    <div className="container1" >
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {coin?.description.en&&ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className="marketData">
          <span style={{display:"flex"}}>
            <Typography variant="h5" className="heading">Rank:</Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{fontFamily:"Montserrat"}}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant="h5" className="heading">Current Price:</Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{fontFamily:"Montserrat"}}>{symbol}{" "} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant="h5" className="heading">Market Cap:</Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{fontFamily:"Montserrat"}}>{symbol}{" "} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))} M</Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
      
    </div>
  );
};

export default CoinPage;
