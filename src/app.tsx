import React from "react";
import ReactDOM from "react-dom";
import "./style.css"

ReactDOM.render(<App />, document.getElementById("app"));

function App(): JSX.Element {
    return (
        <h1>Hello World!</h1>
    );
}