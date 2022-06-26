import React from 'react';
import './App.css';
import Main from "./components/Main"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Map from "./components/map";
import Tourlist from "./components/Tourlist";
import Fruits from "./components/fruits";
import Review from './components/review';
import Recommend from './components/recommend';

function App(){
    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/recommend" element={<Recommend/>}></Route>
                <Route path="/location" element={<Map/>}></Route>
                <Route path="/tourlist" element={<Tourlist/>}></Route>
                <Route path="/fruits" element={<Fruits/>}></Route>
                <Route path="/review" element={<Review/>}></Route>
            </Routes>
          </BrowserRouter>
      </div>
    );  
}

export default App;
