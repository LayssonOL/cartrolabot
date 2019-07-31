import axios from "axios";
import * as React from "react";
import { useState } from "react";
import requests from "../../services/Requests";
import Club from "../Club/Club";

const SearchClubs = () => {
  const [clubs, setClubs] = useState([]);

  const handleClick = () => {
    const clubs$ = requests.getClubs();
    const clubsSubscription = clubs$.subscribe((clubes: any) => {
      setClubs(clubes);
    });
    return () => {
        clubsSubscription.unsubscribe();
    };
  };

  return (
    <div>
      {/* <div className='button__container'>
                    <button className='btn btn-primary' onClick={this.handleClick = this.getClubs.bind(this)}>
                        Clubes
                    </button>
                </div> */}
      <div className="card">
        <div className="card-header">Buscar Clubes</div>
        <div className="card-body">
          <h5 className="card-title">Quer mesmo pesquisar time por time?</h5>
          <p className="card-text">
            Busque em cada time um bom jogador para compor seu time nessa
            rodada!
          </p>
          <button
            className="btn btn-primary"
            onClick={handleClick()}
          >
            Clubes
          </button>
        </div>
      </div>
      <br />
      <div className="result-list-div">
        {/* <h3 id='content_recovered-list'>CLUBES:</h3> */}
        <div className="row">
          {/* transforma this.state.clubs em array e manuseia cada item do array*/}
          {Object.values(clubs).map((time) => {
            //  só imprime se tiver escudo no banco
            if (Object.values(time.escudos)[2]) {
              return (
                <div className="col-sm-6" key={time.id}>
                  {/* Importa um component Club para cada item do array de clubes*/}
                  <Club
                    time={time.nome}
                    escudo={Object.values(time.escudos)[2]}
                  />
                </div>
              );
            } else {
              return false;
            }
          })}
        </div>
        {/* <p id='result-paragraph'></p> */}
      </div>
    </div>
  );
};
export default SearchClubs;
