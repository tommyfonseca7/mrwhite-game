// PlayerSetup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div } from "./components/div";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { RiPencilLine, RiDeleteBin2Line } from "react-icons/ri";

const PlayerSetup: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const navigate = useNavigate();
  const playerNumber = 0;
  const generateRandomWord = (): string => {
    const wordList = [
      "bicicleta",
      "carro",
      "camião",
      "ar/vento",
      "oxigénio",
      "terra",
      "fogo",
      "gás",
      "areia",
      "espelho",
      "sobrancelha",
      "maldivas",
      "perfume",
      "arroz",
      "massa",
      "opel",
      "gelado",
      "cristiano ronaldo",
      "messi",
      "kobe bryant",
      "benfica",
      "porto",
      "sporting",
      "águias unidas",
      "mota",
      "borboleta",
      "maçã",
      "cevada",
      "milho",
      "história",
      "filem",
      "pokémon",
      "nissan",
      "prisão",
      "cinema",
      "padel",
      "ténis",
      "presunto",
      "piscina",
      "janela",
      "carta",
      "joelho",
      "oceano/mar",
      "pesca",
      "barco",
      "uber",
      "festival",
      "árvore",
      "guerra",
      "preservativo",
      "cascata",
      "tijolo",
      "raio",
      "carteiro",
      "frango",
      "seringa",
      "tanque",
      "elefante",
      "rede",
      "nariz",
      "sushi",
      "chocolate",
      "algodão",
      "fonte da telha/ fonte",
      "nuvem",
      "tesla",
      "rádio",
      "aparelho",
      "suíça",
      "cartas",
      "bar",
      "bowling",
      "vinho",
      "bengala",
      "breile",
      "botão",
      "película",
      "pinça",
      "antena",
      "coliseu",
      "carrossel",
      "crina",
      "cadeado",
      "estores",
      "encandeamento",
      "jaula",
      "crustáceos",
      "sabugal",
      "tépida",
      "esquizofrenia",
      "vulva",
      "Anão",
      "ostra",
      "pornografia",
      "cogumelo",
      "spliff",
      "rasta",
      "fade",
      "nigga",
      "durag",
      "balaclava",
      "rizz",
    ];

    return wordList[Math.floor(Math.random() * wordList.length)];
  };
  const selectedWord = generateRandomWord();

  const handleAddPlayer = () => {
    if (playerName.trim() !== "") {
      // Append the player name to the list of players
      setPlayers([...players, playerName]);
      setPlayerName(""); // Clear the input field after adding the player
    }
  };

  const assignMrWhite = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    const updatedPlayers = players.map((player, index) => {
      if (index === randomIndex) {
        return `${player}:Mr. White`;
      }
      return player;
    });
    return updatedPlayers;
  };

  const handleStartGame = () => {
    const updatedPlayers = assignMrWhite();
    navigate(`/player/${playerNumber}`, {
      state: {
        players: updatedPlayers,
        playerNumber: playerNumber,
        word: selectedWord,
      },
    });
  };

  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handleEditPlayer = (index: number) => {
    const newPlayerName = prompt("Enter new name for the player:");
    if (newPlayerName !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[index] = newPlayerName;
      setPlayers(updatedPlayers);
    }
  };

  return (
    <Div>
      <br />
      <br />
      <h2 className="mb-4">Add Players</h2>
      <Input
        type="text"
        placeholder="Enter player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleAddPlayer} className="mb-4">
        Adicionar Jogador
      </Button>
      {players.length >= 4 && (
        <Button onClick={handleStartGame} className="mb-4">
          Começar o Jogo
        </Button>
      )}
      <CardGrid>
        {players.map((player, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>{player}</CardHeader>
            <CardContent>
              <Button
                onClick={() => handleEditPlayer(index)}
                className="mt-2 mr-2"
              >
                <RiPencilLine size={16} />
              </Button>
              <Button
                onClick={() => handleDeletePlayer(index)}
                className="mt-2"
              >
                <RiDeleteBin2Line size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </Div>
  );
};

export default PlayerSetup;
