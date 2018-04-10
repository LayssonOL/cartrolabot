import React, {Component} from 'react';

class Jogador extends Component{
    render(){
        if(this.props.foto){
            const foto = this.props.foto.replace('FORMATO', '140x140');
        }
        return(
            <div>
                {this.props.apelido}
            </div>
        )
    }
}
export default Jogador;