import React from 'react';
import './App.css';
import Main from "./components/Main"
import About from './components/About'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Map from "./components/map";
import Tourlist from "./components/Tourlist";

class App extends React.Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />}></Route>
                <Route path={"/about"} element={<About />}></Route>
                <Route path={"/location"} element={<Map/>}></Route>
                <Route path={"/tourlist"} element={<Tourlist/>}></Route>
            </Routes>
          </BrowserRouter>
      </div>
    );
    ;
  }
}

export default App;
