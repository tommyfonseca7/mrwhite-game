// MainPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Heading } from "./components/h1";
import { Div } from "./components/div";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/setup");
  };

  return (
    <Div>
      <br />
      <br />
      <Heading>👨🏼Mr. White👨🏼</Heading>
      <Button onClick={handleStartGame} className="text-xl">
        Start Game
      </Button>
    </Div>
  );
};

export default MainPage;
