import React from "react";
import styled from "styled-components";
import Colors from "./../utilities/Colors";

const LandingDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary};
  & > img {
    width: 80%;
  }
`;

export const Landing = () => {
  return (
    <LandingDiv>
      <img src="logo_trans.png" alt="picrazy" />
    </LandingDiv>
  );
};
