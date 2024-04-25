import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Div } from "./components/div";
import { Heading } from "./components/h1";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { AiOutlineUserDelete } from "react-icons/ai";

const GameplayPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const players: string[] = location.state ? location.state.players : [];
  const [mrWhiteGuessed, setMrWhiteGuessed] = useState<boolean>(false);
  const [playerOrder, setPlayerOrder] = useState<string[]>([]);
  const word: string = location.state ? location.state.word : "";

  useEffect(() => {
    // Shuffle the array of players
    const shuffledPlayers = shuffleArray(players);

    // Ensure that Mr. White is not the first player in the order
    if (shuffledPlayers[0].includes("Mr. White")) {
      // Find a non-Mr. White player and swap with the first player
      for (let i = 1; i < shuffledPlayers.length; i++) {
        if (!shuffledPlayers[i].includes("Mr. White")) {
          // Swap Mr. White with the non-Mr. White player
          const temp = shuffledPlayers[0];
          shuffledPlayers[0] = shuffledPlayers[i];
          shuffledPlayers[i] = temp;
          break;
        }
      }
    }

    // Set the shuffled player order
    setPlayerOrder(shuffledPlayers);
  }, [players]);

  const handleKickPlayer = (index: number) => {
    if (players[index].includes("Mr. White")) {
      // Mr. White was kicked
      setMrWhiteGuessed(true);
    } else {
      // Non-Mr. White player was kicked
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1, "Civil");
      navigate("/gameplay", {
        state: { players: updatedPlayers, word: location.state.word },
      });
    }
  };

  const handleGuess = () => {
    console.log("GAMEPLAY WORD:", word);
    navigate("/guess-word", { state: { word: location.state.word } });
  };

  return (
    <Div>
      <br />
      <br />
      <Heading>ORDER:</Heading>
      <p>
        {playerOrder.map((player, index) => (
          <span key={index}>
            {player.split(":")[0]} {index < playerOrder.length - 1 && "➡️ "}
          </span>
        ))}
      </p>
      <br />
      <Heading>Players</Heading>
      {players.map((player, index) => (
        <Card key={index}>
          <CardHeader>
            {player.includes("Mr. White") ? player.split(":")[0] : player}
          </CardHeader>
          <CardContent>
            {player !== "Civil" && (
              <Button onClick={() => handleKickPlayer(index)}>
                <AiOutlineUserDelete size={16} />
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      {mrWhiteGuessed && (
        <Div>
          <Heading>Hora de adivinhar</Heading>
          <p>Os jogadores encontraram-te Mr.White, sera que sabes a palavra?</p>
          <Button onClick={handleGuess}>Vamos a isso!</Button>
        </Div>
      )}
    </Div>
  );
};

// Function to shuffle array elements randomly
const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default GameplayPage;
