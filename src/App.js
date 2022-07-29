// import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { REQ_URL } from "./Constant";

function App() {
  let [loader, setLoader] = useState(true);
  let [players, setPlayers] = useState([]);
  let [sortPlayer, setSortPlayer] = useState([]);

  // fetching data from server after mounting the component
  useEffect(() => {
    fetchData();
  }, []);

  // setting loader false after fetching data from server
  useEffect(() => {
    if (sortPlayer.length > 0) {
      setLoader(false);
    }
  }, [sortPlayer]);

  const fetchData = async () => {
    const response = await fetch(REQ_URL);
    const data = await response.json();
    let playerInAsce = data.playerList.sort((a, b) => {
      return Number(a.Value) - Number(b.Value);
    });
    setPlayers(playerInAsce);
    setSortPlayer(playerInAsce);
  };

  const SearchFun = (e) => {
    if (
      e.target.value &&
      e.target.value.trim() &&
      e.target.value.trim().length > 0
    ) {
      let searchInput = e.target.value.trim();
      let playerInAsce = players.filter(
        (player) =>
          player.PFName.toLowerCase().includes(searchInput.toLowerCase()) ||
          player.TName.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (playerInAsce.length > 0) {
        setSortPlayer(playerInAsce);
      } else {
        setSortPlayer([]);
      }
    } else {
      setSortPlayer(players);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="m-5 d-flex justify-content-center ">
          <input
            type="text"
            onChange={(e) => {
              SearchFun(e);
            }}
            placeholder="Search"
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {loader
            ? "Loading..."
            : sortPlayer && sortPlayer.length > 0
            ? sortPlayer.map((player, index) => {
                return <Card key={index} player={player} />;
              })
            : players && players.length > 0
            ? "Not Found"
            : "No Data"}
        </div>
      </div>
    </div>
  );
}

export default App;
