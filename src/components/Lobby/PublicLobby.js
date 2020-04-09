import React, { useState } from "react";
import styled from "styled-components";
import Colors from "./../../utilities/Colors";

const ButtonsControl = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Button = styled.button`
  background-color: ${Colors.accent2};
  color: ${Colors.white};
  font-family: "Indie Flower", cursive;
  font-size: 2em;
  border: none;
`;

const MarkBanner = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  & > img {
    width: 300px;
    height: 100px;
  }
`;

const PublicLobbyDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary};
`;

const AvatarAndNickDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 400px;
  height: 600px;
  & > img {
    width: 200px;
    height: 200px;
  }
  & > input {
    text-align: center;
    font-size: 2em;
    font-family: "Indie Flower", cursive;
  }
`;

export const PublicLobby = () => {
  const [avatarURL, setAvatarURL] = useState("");
  return (
    <PublicLobbyDiv>
      {/* <MarkBanner>
        <img src="/logo_trans.png" alt="picrazy logo" />
      </MarkBanner> */}
      <AvatarAndNickDiv>
        <img src={`https://api.adorable.io/avatars/200/${avatarURL}.png`} />
        <input
          onChange={({ target }) => {
            setAvatarURL(target.value);
          }}
          value={avatarURL}
          placeholder="Enter your nickname"
        />
        <ButtonsControl>
          <Button>Let's play!</Button>
          <Button>Create a room</Button>
        </ButtonsControl>
      </AvatarAndNickDiv>
    </PublicLobbyDiv>
  );
};
