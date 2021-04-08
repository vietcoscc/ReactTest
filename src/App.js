import './App.css';
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './component/home/Home.react'
import Detail from './component/detail/Detail.react'

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={Home}/>
                <Route path="/detail" component={Detail}/>
            </div>
        </Router>
    );
}

export default App;
