import React from "react";
import ReactDOM from "react-dom";
import { ToDoList } from "./components/todo-list";
import "./style.css"

ReactDOM.render(<App />, document.getElementById("app"));

function App(): JSX.Element {
    return (
        <>
            <h1>ToDo List (with MVVM)</h1>
            <div className="todo-list-app-content">
                <ToDoList />
            </div>
        </>
    );
}