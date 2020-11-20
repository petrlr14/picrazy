import React, { useRef, useEffect, useState } from "react";
import { canvas } from "./Canvas.module.css";
import { db } from "../../services/firebase";

export const Canvas = ({ color, brush }) => {
  const [canRecive, setCanRecive] = useState(true);
  const canvasRef = useRef(null);

  let isPainting = false;
  let prevPos = { offsetX: 0, offsetY: 0 };
  let currentDraw = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = brush.size;

    const room = db.ref("/room/1/data");
    room.on("value", (snapshot) => {
      const lines = snapshot.val();
      if (canRecive) {
        lines.forEach((position) => {
          paint(position.stop, position.start);
        });
      }
    });

    return () => {
      room.off();
    };
  });

  const saveChanges = (draw) => {
    db.ref("/room/1/data/").set(draw);
  };

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    isPainting = true;
    prevPos = { offsetX, offsetY };
  };

  const paint = (currPos, prevPosition = prevPos) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPosition;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    prevPos = { offsetX, offsetY };
  };

  const onMouseMove = ({ nativeEvent }) => {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      const positionData = {
        start: { ...prevPos },
        stop: { ...offSetData },
      };
      currentDraw = currentDraw.concat(positionData);
      paint(offSetData);
      saveChanges(currentDraw);
      currentDraw = [];
    }
  };

  const onMouseEnter = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.font = "24px FontAwesome";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    switch (brush.code) {
      case "\uf1fc":
        ctx.translate(12, 12);
        ctx.rotate(Math.PI / 2);
        ctx.fillText(brush.code, 1, 1);
        break;
      default:
        ctx.fillText(brush.code, 12, 12);
        break;
    }
    const dataURL = canvas.toDataURL("image/png");
    canvasRef.current.style.cursor = `url(${dataURL}), auto`;
  };

  const endPaint = () => {
    if (isPainting) {
      isPainting = false;
    }
  };

  const saveData = () => {};

  return (
    <>
      <button onClick={() => setCanRecive(!canRecive)}>
        {canRecive ? "Can Recive" : "Cannot recive"}
      </button>
      <canvas
        ref={canvasRef}
        className={canvas}
        width={500}
        height={500}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endPaint}
      />
    </>
  );
};
