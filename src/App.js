import React, { Component } from 'react'
import BuscarClubes from './requests/BuscarClubes'
import BuscarJogMaisEscalados from './requests/BuscarJogMaisEscalados'
import './App.css'

  export default class App extends Component {
  
    constructor(props) {
       super(props);
       this.state = {
         times: []
       };
     }

    render() {
      return (
        <div id='request-query-result'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand mb-0 h1 text-white" >CartolaFC AutoManager</a>
        </nav>
        <div className='container'>
          <div className="row">
            <div className="col-sm-6">
              <BuscarClubes />
            </div>
            <div className="col-sm-6">
              <BuscarJogMaisEscalados />
            </div>
          </div>        
        </div>
        <br/>
      </div>
      
    )
    }
  }