import React, {Component}from 'react'
import { ClubProps } from "./ComponentsInterface";


class Club extends Component{
    constructor(props){
        super(props)
    }

    getClubInfo = () => {
        window.alert('SHOW, PAPAI!')
    }

    
    render(){
    
    console.log('\n\n')
    console.log('\nTime: '+this.props.time)
    return(
        <button className='btn btn-light' onClick={this.getClubInfo.bind(this)}>
            <img src={this.props.escudo} alt={this.props.time}/>
        </button>
    )
    }
}
export default Club;