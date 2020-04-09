import React from "react";
import Lottie from "react-lottie";
import animationData from "./../../utilities/animations/pencil.json";
import styled from "styled-components";
import Colors from "./../../utilities/Colors";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

const LoadingDiv = styled.div`
  background-color: ${Colors.primary};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span {
    color: ${Colors.accent3};
    font-size: 4em;
  }
`;

export const Loading = () => {
  return (
    <LoadingDiv>
      <Lottie options={defaultOptions} height={400} width={400} />
      <span>Loading...</span>
    </LoadingDiv>
  );
};
