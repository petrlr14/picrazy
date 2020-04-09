import React from "react";
import styled from "styled-components";
import { selectedItem } from "./Palette.module.css";

const Item = styled.i`
  font-size: 20px;
  color: ${(props) => props.color};
  transition: all ease-in-out 0.2s;
  &:hover {
    font-size: 30px;
  }
`;

const Holder = styled.div`
  display: grid;
  justify-content: center;
  border: 5px solid #000;
  background-color: #e2e2e2;
  padding: 0.5em;
  border-radius: 1em;
  & > * {
    margin: 0.5em auto;
    & > * {
      margin: 0 0.1em;
    }
  }
`;

const Palette = () => {};

export const Controllers = ({
  color,
  colors,
  colorHandler,
  brushes,
  brush,
  brushHandler,
}) => {
  return (
    <Holder>
      <div style={{ display: "inline" }}>
        {colors.map((el, index) => {
          return (
            <Item
              onClick={() => {
                colorHandler(el.color);
              }}
              className={`fas ${brush.fontClass} ${
                el.selected ? selectedItem : ""
              }`}
              color={el.color}
              key={index}
            />
          );
        })}
      </div>
      <div style={{ display: "inline" }}>
        {brushes.map((el) => {
          return (
            <Item
              onClick={() => {
                brushHandler(el);
              }}
              className={`fas ${el.fontClass} ${
                el.selected ? selectedItem : ""
              }`}
              style={{ color }}
              key={el.code}
            />
          );
        })}
      </div>
    </Holder>
  );
};
