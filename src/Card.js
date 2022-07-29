import React from "react";

function Card({ player }) {
  return (
    <div className="text-left" style={{ maxWidth: "200px" }}>
      <div style={{ height: "200px", width: "200px" }}>
        <img
          src={process.env.PUBLIC_URL + `/player-images/${player.Id}.jpg`}
          alt="Not Available"
          className="w-100"
        />
      </div>
      <div className="d-flex">
        <p>Name:-</p>
        <p>{player.PFName}</p>
      </div>
      <div className="d-flex">
        <p>Team:-</p>
        <p>{player.TName}</p>
      </div>
      <div className="d-flex">
        <p>Skill:-</p>
        <p>{player.SkillDesc}</p>
      </div>
      <div className="">
        <p className="bold">UpComingMatchesList</p>
        <ul>
          {player.UpComingMatchesList.map((match, index) => {
            if (match.CCode) {
              return (
                <li key={index}>
                  Match:- {match.CCode} Vs {match.VsCCode} <br />
                  Match Time :- {match.MDate}
                </li>
              );
            } else {
              return <li key={index}>No Match</li>;
            }
          })}
        </ul>
      </div>
      <div className="d-flex">
        <p>Value:-</p>
        <p>$ {player.Value}</p>
      </div>
    </div>
  );
}

export default Card;
