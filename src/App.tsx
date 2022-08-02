import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TitleBar from "./TitleBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleBar></TitleBar>
      </header>
    </div>
  );
}

export default App;
