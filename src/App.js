import React from "react";
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { SpinnerProvider } from "./utils/SpinnerContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const App=() =>{

  return (
    <SpinnerProvider>
    <div className="App">
        <AppRoutes/>
    </div>
    </SpinnerProvider>
  );
}

export default App;

