import React from "react";

import {Footer,Header} from './containers';
import {CTA, NaviBar} from './components';
import './App.css';

const App=() =>{
  return (
    <div className="App">
      <div className="background-container">
        <div className="gradient-box-left"></div>
        <div className="gradient-box-right"></div>
      </div>
      <NaviBar/>
      <Header/>
      <CTA/> 
      <Footer/>
    </div>
  );
}

export default App;
