import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const apiTest = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Secret-Token": "b40b820d1df04dc699a9929826ff2b8bdd5213c3c7ee01e8d8f54657d753902e",
        },
      };
      const res = await axios.get(
        "https://api.steppay.kr/api/v1/orders/46686/pay?successUrl=naver.com&errorUrl=naver.com&cancelUrl=naver.com",
        options
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    apiTest();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
