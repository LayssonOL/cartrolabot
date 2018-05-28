import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import './App.css';
import Auth from './posts/Auth';

  export default class App extends Component {
  
    constructor(props) {
       super(props);
       this.state = {
          token: '',
          times: []
       };
     }
     
    render() {
      
      return (
        <div id='request-query-result'>
        {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/> */}
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand mb-0 h1 text-white" >CartolaFC AutoManager</a>
        </nav> */}
        {/* <AppBar 
          title='CartolaFC AutoManager'
        /> */}
        <div className='container'>
            <Auth />
        </div>
        <br/>
      </div>
      
    )
    }
  }