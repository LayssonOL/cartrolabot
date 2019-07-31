import * as React from "react";
import IProps from "../../interfaces/IClub";

const Club = (props: IProps) => {
    const getClubInfo = () => {
        console.log("SHOW, PAPAI!");
    };

    return (
        <div className="club-container">
            {console.log("\n\n")}
            {console.log(`\nTime: ${props.time}`)}
            <button className="btn btn-light" onClick={getClubInfo}>
                <img src={props.escudo} alt={props.time}/>
            </button>
        </div>
    );
};

export default Club;
