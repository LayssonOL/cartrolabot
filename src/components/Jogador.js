import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';

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
                        avatar={<Avatar alt={this.props.apelido} src={foto}/>}
                        actAsExpander={true}>
                    </CardHeader>
                    <CardActions>
                        <Button variant='flat' label="Comprar" />
                    </CardActions>
                    <CardContent>
                        Media = {this.props.media}
                        <br/>
                        Variacao = {this.props.variacao}
                        <br/>
                        Media Scout = {this.props.scout_mean}
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default Jogador;