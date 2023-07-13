import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  createTheme,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";
import NewsSearch from "./CryptoNews";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center", marginTop: 20 }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 50, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid container spacing={2} sx={{ gap: 2 }} display="flex">
          <Grid container  spacing={2}>
            {/* <Grid item > */}
              {loading ? (
                <LinearProgress style={{ backgroundColor: "gold" }} />
              ) : (
                handleSearch()
                  .slice((page - 1) * 12, (page - 1) * 12 + 12)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <Grid item xs={6} md={6} lg={4} key={row.name}>
                        <Card
                          component={Link}
                          to={`/coins/${row.id}`}
                          sx={{
                            boxShadow: "1px 1px 10px black",
                            borderRadius: 4,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: "100%",
                            

                          }}
                        >
                          <CardMedia
                            component="img"
                            alt={row.name}
                            image={row?.image}
                            style={{
                              marginBottom: 10,
                              padding: 10,
                              width: "200px",
                              height: "200px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          />
                          <CardContent sx={{ padding: 3 }}>
                            <Typography
                              variant="h6"
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                fontWeight: 600,
                                fontFamily: "Montserrat",
                              }}
                            >
                              {row.symbol}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              style={{ color: "darkgrey" }}
                            >
                              {row.name}
                            </Typography>
                            <Typography variant="body1">
                              <span style={{ fontWeight: 600 }}>Price </span>:{" "}
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                              <span style={{ fontWeight: 600 }}>Profit </span> :{" "}
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </Typography>
                            <Typography variant="body2">
                              <span style={{ fontWeight: 600 }}>
                                MarketCap{" "}
                              </span>{" "}
                              : {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
              )}
            {/* </Grid> */}
            <Grid item>
              <NewsSearch />
            </Grid>
          </Grid>
          <Pagination
            count={Math.ceil(handleSearch().length / 10)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
