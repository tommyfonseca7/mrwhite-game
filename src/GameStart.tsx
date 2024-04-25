import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const GameStart: React.FC = () => {
  const location = useLocation();
  const players: string[] = location.state.players;

  const wordList = ["Apple", "Banana", "Orange", "Pineapple", "Grape"];

  // Game state
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [word, setWord] = useState<string | null>(null);
  const [mrWhiteIndex, setMrWhiteIndex] = useState(
    Math.floor(Math.random() * players.length)
  );
  const [wordRevealed, setWordRevealed] = useState(false);

  // Function to reveal the word
  const revealWord = () => {
    if (word === null) {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      setWord(randomWord);
      setWordRevealed(true);
    }
  };

  // Function to hide the word
  const hideWord = () => {
    setWord(null);
    setWordRevealed(false);
  };

  // Function to pass to the next player
  const passToNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  // Function to handle voting for Mr. White
  const handleVoteMrWhite = (index: number) => {
    if (index === mrWhiteIndex) {
      // Mr. White guessed correctly
      handleGuessWord();
    } else {
      // Incorrect vote, remove player from the game
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      setCurrentPlayerIndex(
        currentPlayerIndex > index ? currentPlayerIndex - 1 : currentPlayerIndex
      );
      if (mrWhiteIndex > index) {
        setMrWhiteIndex(mrWhiteIndex - 1);
      }
    }
  };

  // Function for Mr. White to guess the word
  const handleGuessWord = () => {
    // Implement Mr. White's guessing logic here
    alert("Mr. White guessed the word correctly!");
  };

  return (
    <div>
      {currentPlayerIndex === mrWhiteIndex && wordRevealed && (
        <button onClick={passToNextPlayer}>Next Player</button>
      )}
      {currentPlayerIndex !== mrWhiteIndex && (
        <div>
          <h2>Game Start</h2>
          <div>
            <p>Current Player: {players[currentPlayerIndex]}</p>
            {word !== null && (
              <div>
                <p>Word: {word}</p>
                <button onClick={passToNextPlayer}>Next Player</button>
              </div>
            )}
            {!wordRevealed && (
              <div>
                <p>Word Hidden</p>
                <button onClick={revealWord}>Reveal Word</button>
              </div>
            )}
            {wordRevealed && (
              <div>
                <button onClick={hideWord}>Hide Word</button>
              </div>
            )}
          </div>
          <div>
            <h3>Voting</h3>
            <p>Vote for who you think is Mr. White:</p>
            <ul>
              {players.map((player, index) => (
                <li key={index}>
                  <button onClick={() => handleVoteMrWhite(index)}>
                    Vote {player}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {currentPlayerIndex !== mrWhiteIndex && !wordRevealed && (
        <div>
          <h2>Game Start</h2>
          <div>
            <p>Current Player: {players[currentPlayerIndex]}</p>
            <div>
              <p>Word Hidden</p>
              <button onClick={revealWord}>Reveal Word</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStart;
