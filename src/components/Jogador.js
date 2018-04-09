import React, {Component} from 'react';

class Jogador extends Component{
    render(){
        const foto = this.props.foto.replace('FORMATO', '140x140');
        return(
            <div>
                <img src={this.props.esc_clube} alt={this.props.clube} title={this.props.clube}/>
                <img src={foto} alt={this.props.apelido} title={this.props.apelido}/>
                {this.props.apelido}
            </div>
        )
    }
}
export default Jogador;