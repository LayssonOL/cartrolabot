import React, {Component} from 'react';

class Club extends Component{

    getClubInfo(){
        window.alert('SHOW, PAPAI!');
    }

    render(){
        return(
            <button className='btn btn-light' onClick={this.handleClick = this.getClubInfo.bind(this)}>
                <img src={this.props.escudo} alt={this.props.time}/>
            </button>
        )
    };
}
export default Club;