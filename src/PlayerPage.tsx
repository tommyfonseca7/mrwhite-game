import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Div } from "./components/div";
import { Heading } from "./components/h1";
import { Button } from "./components/ui/button";

const PlayerPage: React.FC = () => {
  const location = useLocation();
  const players: string[] = location.state ? location.state.players : [];
  const playerNumber: string = location.state
    ? location.state.playerNumber
    : "0";
  const [wordOrRole, setWordOrRole] = useState<string | null>(null);
  const [wordVisible, setWordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const word: string = location.state ? location.state.word : "";

  const revealWordOrRole = () => {
    if (players[parseInt(playerNumber)].includes("Mr. White")) {
      setWordOrRole("Es o Mr. White");
    } else {
      setWordOrRole(word);
    }
    setWordVisible(true);
  };

  const handleNextPlayer = () => {
    setWordVisible(false); // Hide the word
    const number = parseInt(playerNumber) + 1;
    if (number === players.length) {
      navigate("/gameplay", {
        state: { players: players, word: location.state.word },
      });
    } else {
      navigate(`/player/${number}`, {
        state: {
          playerNumber: number,
          players: players,
          word: location.state.word,
        },
      });
    }
  };

  return (
    <Div>
      <br />
      <br />
      <Heading>
        Clica para veres se és o Mr. White, ou para veres a palavra,{" "}
        {players[parseInt(playerNumber)].split(":")[0]}!
      </Heading>
      {wordOrRole && wordVisible ? (
        <p>
          {wordOrRole === "Es o Mr. White"
            ? wordOrRole
            : `A tua palavra é ${wordOrRole}`}
        </p>
      ) : (
        <Button onClick={revealWordOrRole}>Descobrir!</Button>
      )}
      <br />
      {parseInt(playerNumber) < players.length && (
        <Button onClick={handleNextPlayer}>Proximo Jogador</Button>
      )}
    </Div>
  );
};

export default PlayerPage;
