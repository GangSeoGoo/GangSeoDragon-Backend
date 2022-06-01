import React from 'react';
import './App.css';
import Main from "./components/Main"
import About from './components/About'
import {BrowserRouter, Route, Routes} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />}></Route>
                <Route path={"/about"} element={<About />}></Route>
            </Routes>
          </BrowserRouter>
      </div>
    );
    ;
  }
}

export default App;
