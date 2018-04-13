import React, { Component } from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { Divider, Slider } from 'material-ui';
// import Club from '../components/Club';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rodada: 1,
      clubes: {},
      posicoes: {},
      status: {},
      precos: [0 - 25],
      partidas: [],
      sorted: 0,
      hosts: [],
      guests: [],
      open: false
    };
  }

  getFilters() {
    axios
    .get("https://api.cartolafc.globo.com/atletas/mercado")
    .then(res => {
      this.setState({
        clubes: res.data.clubes,
        posicoes: res.data.posicoes,
        status: res.data.status,
      });
      // console.log(this.state.clubes)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
    this.getPartidas();
    this.handleOpen();
  }

    mode(arr) {
        return arr.reduce(function(current, item) {
            var val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
            if (val > current.greatestFreq) {
                current.greatestFreq = val;
                current.mode = item;
            }
            return current;
        }, {mode: null, greatestFreq: -Infinity, numMapping: {}}, arr).mode;
    };

  getPartidas(){
    axios
    .get("https://api.cartolafc.globo.com/partidas/"+this.state.rodada)
    .then(res => {
      this.setState({
        partidas: res.data.partidas
      });
      this.getHostsAndGuests();
      // console.log(this.state.partidas)
    })
    .catch(err => {
      if (err) {
        window.alert(err);
      }
    });
  }

  getHostsAndGuests(){
    var hosts = [];
    var guests = [];
    console.log('PARTIDAS')
    console.log(this.state.partidas)
    console.log('CLUBES')
    console.log(this.state.clubes)
    this.state.partidas.map(
      (partida) =>  
      {
        Object.values(this.state.clubes).map(
          (club) => {
            if(club.id === partida.clube_casa_id){
              hosts.push({nome: club.nome, escudo: Object.values(club.escudos)[2]})
            }else if (club.id === partida.clube_visitante_id){
              guests.push({nome: club.nome, escudo: Object.values(club.escudos)[2]})
            }
          }
        )
      }
    )
    this.setState({hosts: hosts, guests: guests});
    console.log('Dentro da função: ')
    console.log(this.state.hosts)
    console.log(this.state.guests)
    // return {hosts: hosts, guests: guests}
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    const actions = [
      <FlatButton label="Cancelar" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Filtrar"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    const poss = [];
    Object.values(this.state.posicoes).map(
        (pos) => {
            poss.push(
                <RadioButton className='border-bottom'
                    key={pos.id}
                    value={pos.nome}
                    label={pos.nome}
                />
            );
        }
    );

    const stats = [];
    Object.values(this.state.status).map(
        (stat) => {
            stats.push(
                <RadioButton className='border-bottom'
                    key={stat.id}
                    value={stat.nome}
                    label={stat.nome}
                />
            );
        }
    );

    return (
      <div>
        <RaisedButton
          label="Filtros"
          primary={true}
          onClick={this.getFilters.bind(this)}
        />
            

        <Dialog
          title="Aplicar Filtros"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={customContentStyle}
          >
          <div className="container">
            <div className="row border">
              <div className="col border">
                <strong>Posição</strong>
                <Divider />
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                  {poss}
                </RadioButtonGroup>
              </div>
              <div className="col border">
                <strong>Status</strong>
                <Divider />
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                  {stats}
                </RadioButtonGroup>
              </div>
            </div>
            <div className='row border'>
              <div className='col'>
                <strong>Preço</strong>
                <Divider />
                <Slider className='border' step={0.04} value={1} defaultValue={1} />
              </div>
            </div>


            {/* ###################################################################################### */}
              <div className='row border'>
                <div className='col border'>
                  <strong>Times</strong>
                </div>
              </div>
              {/* ###################################################################################### */}
              <div className="row border">
                <div className="row">
                  <div className="col">
                    <strong>Mandantes</strong>
                  </div>
                </div>
                {/* <Divider /> */}
                <div className="row border">
                  {this.state.hosts.map( (host) => {
                    console.log(host);
                    <div className='col border'>
                      <strong>Manda nessa bosta</strong>
                      {host.nome}
                      {/* <Club time={host.nome} escudo={host.escudo}/> */}
                    </div>
                  })}
                </div>
              </div>
              {/* ###################################################################################### */}
              {/* <div className="w-100"></div> */}
              <div className="row border">
                <div className="row">
                  <div className="col">
                    <strong>Visitantes</strong>
                  </div>
                </div>
                {/* <Divider /> */}
                <div className="row border">
                  {this.state.guests.map( (guest) => {
                    console.log(guest);
                    <div className='col border'>
                      Visita aquela bosta
                      {guest.nome}
                      {/* <Club time={guest.nome} escudo={guest.escudo}/> */}
                    </div>
                  })}
                </div>
              </div>
              {/* ###################################################################################### */}
              {/* </div> */}
          </div>
        </Dialog>
      </div>
    );
  }
}
export default Filters;