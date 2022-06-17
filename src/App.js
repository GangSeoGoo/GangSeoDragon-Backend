import React from 'react';
import './App.css';
import Main from "./components/Main"
import About from './components/About'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Map from "./components/map";
import Tourlist from "./components/Tourlist";
import Fruits from "./components/fruits";

function App(){

    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />}></Route>
                <Route path={"/about"} element={<About />}></Route>
                <Route path={"/location"} element={<Map/>}></Route>
                <Route path={"/tourlist"} element={<Tourlist/>}></Route>
                <Route path={"/fruits"} element={<Fruits/>}></Route>
            </Routes>
          </BrowserRouter>
      </div>
    );
    ;

}

export default App;
