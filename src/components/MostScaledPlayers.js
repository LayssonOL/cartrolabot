import React, {Component} from 'react';
import { Paper, FlatButton } from 'material-ui';

class MostScaledPlayers extends Component{
    render(){
        const foto = this.props.foto.replace('FORMATO', '140x140');
        return(
            <div>
                <article className='row'>
                    <div className='col'>
                        <div className='row justify-content-center'>
                            <img src={this.props.esc_clube} alt={this.props.clube} title={this.props.clube}/>
                        </div>
                        <div className='row justify-content-center'>
                            <span>{this.props.clube}</span>
                        </div>
                    </div>

                    <figure className='col'>
                        <img src={foto} alt={this.props.apelido} title={this.props.apelido}/>
                    </figure>

                    <header className='col'>
                        <div>
                            <h4>{this.props.apelido}</h4>
                            <span>{this.props.pos}</span>
                        </div>
                    </header>
                    <strong className='col'><h3>{this.props.rank}º</h3></strong>
                </article>
                {/* <Paper zDepth={2}>
                    <div className='row'>
                        <div className='col-sm-06'>
                            <div className='row'>
                                <img src={this.props.esc_clube} alt={this.props.clube} title={this.props.clube}/>
                            </div>
                            <div className='row'>
                                <h5>{this.props.clube}</h5>
                            </div>
                        </div>
                        <div className='col-sm-06'>
                            <img src={foto} alt={this.props.apelido} title={this.props.apelido}/>
                        </div>
                        <div className='col-sm-06'>
                            {this.props.apelido}
                        </div>
                        <div className='col-sm-06'>
                            posicao
                        </div>

                        
                    </div>
                </Paper> */}
            </div>
        )
    }
}
export default MostScaledPlayers;