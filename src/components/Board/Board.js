import React, { useState } from "react";
import styled from "styled-components";
import { Canvas } from "../Canvas/Canvas";
import { Controllers } from "../Controllers/Controllers";

const BoardDiv = styled.div`
  margin: 0 auto;
`;

const colorsArray = [
  { selected: true, color: "#C0392B" },
  { selected: false, color: "#E74C3C" },
  { selected: false, color: "#9B59B6" },
  { selected: false, color: "#8E44AD" },
  { selected: false, color: "#2980B9" },
  { selected: false, color: "#3498DB" },
  { selected: false, color: "#1ABC9C" },
  { selected: false, color: "#16A085" },
  { selected: false, color: "#27AE60" },
  { selected: false, color: "#2ECC71" },
  { selected: false, color: "#F1C40F" },
  { selected: false, color: "#F39C12" },
  { selected: false, color: "#E67E22" },
  { selected: false, color: "#D35400" },
  { selected: false, color: "#34495E" },
  { selected: false, color: "#2C3E50" }
];

const brushesArray = [
  { selected: true, fontClass: "fa-paint-brush", code: "\uf1fc", size: 5 },
  { selected: false, fontClass: "fa-brush", code: "\uf55d", size: 10 },
  { selected: false, fontClass: "fa-paint-roller", code: "\uf5aa", size: 15 }
];

export const Board = () => {
  const [colors, setColors] = useState(colorsArray);
  const [color, setColor] = useState(colors[0].color);
  const [brushes, setBrushes] = useState(brushesArray);
  const [brush, setBrush] = useState(brushesArray[0]);

  const changeColorHanlder = color => {
    setColor(color);
    setColors(
      colors.map(el => {
        return {
          ...el,
          selected: color === el.color
        };
      })
    );
  };

  const changeBrushHandler = brush => {
    setBrush(brush);
    setBrushes(
      brushes.map(el => {
        return {
          ...el,
          selected: brush.code === el.code
        };
      })
    );
  };

  return (
    <BoardDiv>
      <Canvas color={color} brush={brush} />
      <Controllers
        color={color}
        colors={colors}
        colorHandler={changeColorHanlder}
        brush={brush}
        brushes={brushes}
        brushHandler={changeBrushHandler}
      />
    </BoardDiv>
  );
};
