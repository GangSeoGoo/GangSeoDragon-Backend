import React from 'react';
import Header from "./header"
import Nav from "./nav"
import Fruitsitem from "./fruitsItem"
import data from "../fruitsData"

export default function Fruits(){
  const fruit = data.map((item) => {
    return <Fruitsitem {...item}/>;
  });
    return (
        <div className="App">
          <Header />
          <Nav />
          <section className='fruits'>{fruit}</section>
        </div>
    );
}