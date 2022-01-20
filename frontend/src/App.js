import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login, Register } from "./components/auth/index";
//import ReviewList from "./components/review/index";
//import  ReviewAddForm from "./components/review/index";

//import { reviewList } from "./components/review/index";
//import {reviews} from "./components/review/index";


//import { DataTable } from 'primereact/datatable'
//import { Column } from 'primereact/column'

import DataTable from 'react-data-table-component';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { backendResponse: "" };
    }

    callBackend() {
        fetch("http://localhost:3001/reviews/2ddc3e7e-d82f-40f7-9a34-35802d702fd6")
            .then(res => res.text())
            .then(res => this.setState({ backendResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callBackend();
    }



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React app testing</h1>
                </header>
                <dataTable title="Reviews">
                
                data = {this.state.backendResponse} 
              </dataTable>
                <p className="App-intro">{this.state.backendResponse}</p>
            </div>
        );
    }

}
//}
export default App;