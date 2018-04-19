import React, {Component} from 'react';
import {Card, CardActions, CardText, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

class Jogador extends Component{
    render(){
        var foto = null;
        if(this.props.foto){
            foto = this.props.foto.replace('FORMATO', '140x140');
        }
        // console.log('POSICAO: '+this.props.pos);
        return(
            
            <div>
                <Card>
                    <CardHeader
                        title={this.props.apelido}
                        subtitle={this.props.pos.nome}
                        avatar={foto}
                        actAsExpander={true}>
                    </CardHeader>
                    <CardActions>
                        <FlatButton label="Comprar" />
                    </CardActions>
                    <CardText>
                        Media = {this.props.media}
                        <br/>
                        Variacao = {this.props.variacao}
                        <br/>
                        Media Scout = {this.props.scout_mean}
                    </CardText>
                </Card>
            </div>
        )
    }
}
export default Jogador;