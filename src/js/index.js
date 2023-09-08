//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import ToDoList from "./component/ToDoList.jsx";

//render your react application
ReactDOM.render(<ToDoList />, document.querySelector("#app"));