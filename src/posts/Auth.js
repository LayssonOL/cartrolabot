import React, { Component } from 'react'
import axios from 'axios'

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: 'layssonol@hotmail.com',
            password: 'n0th1ng1mp',
            serviceId: 438,
            url: 'https://login.globo.com/login/438?url=https://cartolafc.globo.com'
            // url: 'https://login.globo.com/login/438?url=http://globoesporte.globo.com/cartola-fc/&tam=WIDGET'
        }
    }

    getAuthentication(){
        axios.post(
            'https://login.globo.com/api/authentication',
            
        )
    }

    render(){

    }
}
export default Auth;