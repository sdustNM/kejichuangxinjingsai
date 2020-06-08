import React, { Component } from 'react';
import Axios from 'axios';
import {getJwt} from '../utils/jwtHelper'
class getUserTest  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log("ready..");
        Axios.get("http://localhost:5000/api/Values/Test_Authorize?id=991823", { headers: { Authorization: getJwt() } }).then(
            res=>{
                console.log("have done...")
                console.log(res.data);    
            })
        return (  
             <div><h1>This is getUserTest</h1></div>
        );
    }
}
 
export default getUserTest;