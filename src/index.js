import React, { createContext } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
export const context = createContext();
const Wrapper = ()=>{
  const [isauthenticated, setisauthenticated] = useState(false);
  const [isloading, setisloading] = useState(false);
  return(
    <context.Provider value={{isauthenticated, isloading, setisauthenticated, setisloading}}>
    <App />
    </context.Provider>
  )
}
root.render(
  <React.StrictMode>
    <Wrapper/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
