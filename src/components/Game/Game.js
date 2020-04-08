import React, { useEffect } from "react";
import styled from "styled-components";
import { Board } from "../Board/Board";


const Main = styled.main`
  display: grid;
  grid-template-columns: 60% 40%;
  width: 100vw;
  height: 100vh;
`;


export const Game = () => {
  return (
    <Main>
      <Board />
      <div>hola</div>
    </Main>
  );
};
