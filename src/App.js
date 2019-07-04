import React, { Component } from 'react';
import './App.css';
import Auth from './posts/Auth';

  export default class App extends React.Component {
  
    constructor(props) {
       super(props);
       this.state = {
          token: '',
          times: []
       };
     }
     
    render() {
      
      return (
        <div id='request-query-result' >
          <div className='container' >
            <Auth />
          </div>
          <br/>
        </div>
        
        )
      }
    }
    // criar uma funcao que chama a BaseURL
    // window.location.origin