// GuessWordPage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Div } from "./components/div";
import { Heading } from "./components/h1";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const GuessWordPage: React.FC = () => {
  const location = useLocation();
  const word: string = location.state ? location.state.word : "";
  const [guess, setGuess] = useState("");
  const navigate = useNavigate();
  console.log("WORD: ", word);
  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    if (guess === word.toLowerCase()) {
      navigate("/winner", { state: { winner: "Mr. White" } });
    } else {
      navigate("/winner", { state: { winner: "Civis" } });
    }
  };

  return (
    <Div>
      <br />
      <br />
      <Heading>Adivinha a Palavra</Heading>
      <Input type="text" value={guess} onChange={handleGuessChange} />
      <br />
      <Button onClick={handleGuessSubmit}>Submit</Button>
    </Div>
  );
};

export default GuessWordPage;
