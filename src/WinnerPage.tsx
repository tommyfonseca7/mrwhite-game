// WinnerPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Div } from "./components/div";
import { Heading } from "./components/h1";
import { Button } from "./components/ui/button";

const WinnerPage: React.FC = () => {
  const location = useLocation();
  const winner: string = location.state ? location.state.winner : "No winner";
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate("/");
  };

  return (
    <Div>
      <br />
      <br />
      <Heading>🎊E os vencedores são🎊</Heading>
      <p>{winner === "Civis" ? "🚶Os Civis🚶" : "👨🏼O Mr. White👨🏼"}</p>
      <br />
      <br />
      <Button onClick={handlePlayAgain}>Joga de novo</Button>
    </Div>
  );
};

export default WinnerPage;
