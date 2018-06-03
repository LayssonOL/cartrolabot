import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MostScaledPlayers from '.././components/MostScaledPlayers';
import axios from 'axios'
import { Collapse, withStyles, Grid } from '@material-ui/core';

const styles = {
    card_layout:{
        
    },
    destaque:{
        margin_bottom: '10px',
        width: '100%',
        height: 'auto',
        border_bottom: '2px solid #f1f1ef',
        border_bottom_width: '2px',
        border_bottom_style: 'solid',
    },
}

class BuscarJogMaisEscalados extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: sessionStorage.getItem('token'),
            jogs: [],
            expanded: false
        }
    }

    getJogMaisEscalados(){
        axios.get('https://api.cartolafc.globo.com/mercado/destaques',
                    {
                        'X-GLB-Token': this.state.token
                    }
                    )
                    .then((res) => {
                        this.setState({
                            jogs: res.data
                        });
                        console.log(this.state.jogs);
                              }).catch(err => {
                                if(err){
                                  window.alert(err);
                                }
                              });
        this.setState({
            expanded: !this.state.expanded
        });
    }

    hideDestaques(){
        this.setState({expanded: false});
    }

    render(){
        const { classes } = this.props
        return(
            <Fragment>
                <Card className={classes.card_layout}>
                    <CardHeader
                        title="Jogadores Mais Escalados"
                        subtitle="O jeito fácil de montar seu time!"
                        // actAsExpander={true}
                    />
                    <CardActions>
                        <Button variant='raised' color="primary" onClick={this.handleClick = this.getJogMaisEscalados.bind(this)}>
                            Destaques
                        </Button>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto">
                        <CardContent>
                             <List >
                                { this.state.jogs.map((player,index) => {
                                return( 
                                    <ListItem className={classes.destaque} key={player.Atleta.atleta_id}>
                                        <MostScaledPlayers 
                                            clube={player.clube}
                                            esc_clube={player.escudo_clube} 
                                            apelido={player.Atleta.apelido} 
                                            foto={player.Atleta.foto}
                                            pos={player.posicao}
                                            rank={index+1}/>
                                        <Divider />
                                    </ListItem>
                                    )})}
                            </List>
                            <Button variant='raised' color="primary" onClick={this.handleClick = this.hideDestaques.bind(this)}>
                                Esconder
                            </Button>
                        </CardContent>
                    </Collapse>
                </Card>
            </Fragment>
        )
    };
}
export default withStyles(styles)(BuscarJogMaisEscalados);