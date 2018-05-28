import React, {Component, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Jogador extends Component{
    render(){
        var foto = null;
        if(this.props.foto){
            foto = this.props.foto.replace('FORMATO', '140x140');
        }
        // console.log('POSICAO: '+this.props.pos);
        return(
            
            <Fragment>
                <Card>
                    <CardHeader
                        title={this.props.apelido}
                        subtitle={this.props.pos.nome}
                        avatar={<Avatar alt={this.props.apelido} src={foto}/>}
                        actAsExpander={true}>
                    </CardHeader>
                    {/* <CardActions>
                        <Button variant='flat' color='secondary'>Comprar</Button>
                    </CardActions> */}
                    <CardContent>
                        <Typography variant="body2">
                            Media = {this.props.media}
                        </Typography>
                        <Typography variant="body2">
                            Variacao = {this.props.variacao}
                        </Typography>
                        <Typography variant="body2">
                            Media Scout = {this.props.scout_mean}
                        </Typography>
                    </CardContent>
                </Card>
            </Fragment>
        )
    }
}
export default Jogador;