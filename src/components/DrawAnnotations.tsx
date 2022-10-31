import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import {
  updateAction,
  updateTotalItems,
  selectedColor,
} from "../Store/ActionSlice";

import Konva from "konva";
import { useAppDispatch, useAppSelector } from "../Hooks";

const DrawAnnotations = () => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [drawAnnotations, setDrawAnnotations] = useState<boolean>(false);
  const { action, fillColor, totalItems } = useAppSelector(
    (state) => state.action
  );
  const dispatch = useAppDispatch(); // updatind state

  useEffect(() => {
    if (action === "add") {
      setDrawAnnotations(true);
    } else if (action === "remove") {
      setDrawAnnotations(false);
    } else if (action === "clear") {
      setDrawAnnotations(false);
      setAnnotations([]);
      // dispatch update items
    }
  }, [action]);

  useEffect(() => {
    dispatch(updateTotalItems(annotations.length));
  }, [annotations.length]);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>): void => {
    if (!drawAnnotations) return;

    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        { x, y, width: 0, height: 0, key: "0", fillColor: fillColor },
      ]);
    }
  };

  const handleMouseUp = (event) => {
    if (!drawAnnotations) return;

    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
        fillColor: fillColor,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event) => {
    if (!drawAnnotations) return;

    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
          fillColor: fillColor,
        },
      ]);
    }
  };

  const handleClick = (event) => {
    console.log(event.target, "event");
    console.log(annotations, " annotaions");
    if (action === "remove") {
      const currItemIndex = event.target.index;
      const updateAnnotation = annotations.filter((item, idx) => {
        return currItemIndex !== idx;
      });
      setAnnotations(updateAnnotation);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={900}
      height={700}
    >
      <Layer>
        {annotationsToDraw.map((value) => {
          return (
            <Rect
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill={value.fillColor}
              stroke="black"
              onClick={handleClick}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};
export default DrawAnnotations;
