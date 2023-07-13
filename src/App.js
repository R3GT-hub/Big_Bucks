import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { ThemeProvider, createTheme } from '@mui/material';
const theme=createTheme({

})

function App() {
  
  return (
    <BrowserRouter>
    <div>
      <Header/>
    <Routes>
      <Route exact path="/" element={<Homepage/>}/>
      <Route path="/coins/:id" element={<CoinPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
