import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

//import Hello from "./Hello";
import Episodes from "./Episodes";
import Characters from "./Characters";
import SearchAdder from "./SearchAdder";
//import Tests from "./TestRender";
import reducer from "./reducer";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};
/*
const ulSty = {
  textAlign: "center",
  margin: "10 auto",
  padding: "10 auto",
  display: "flex",
}
const ulStyLi = {
  listStyleType: "none",
  width: "auto"
}
<header className="App-header">
      <Hello name="Rick and Morty" />
    </header>
    
*/
const App = () => (
  <div className="App container" style={styles} >
    <br/>
    <SearchAdder />
    <br />
    <div className="Episodes-workspace ">
      <Episodes />
    </div>
    <div className="Characters-workspace ">
      <Characters />
    </div>
  </div>
);

render(
  <Provider store={createStore(reducer)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
/**
<ul style={ulSty}>
      <li style={ulStyLi}>
        <a onClick={jQuery(".Characters-workspace").css("display","none") && jQuery(".Episodes-workspace").css("display","block")}>Personajes</a></li>	&nbsp;&nbsp;&nbsp;&nbsp;
      <li style={ulStyLi}>
      <a onClick={jQuery(".Characters-workspace").css("display","block") && jQuery(".Episodes-workspace").css("display","none")}>Episodes</a></li>
    </ul>
 */