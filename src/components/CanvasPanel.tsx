import { useEffect, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";
import { updateTotalItems } from "../store/globalSlice";

import { useAppDispatch, useAppSelector } from "../hooks";
import { KonvaEventObject } from "konva/lib/Node";

interface IAnnotation {
  x: number;
  y: number;
  width: number;
  height: number;
  key: string | number;
  fillColor: string;
}

const CanvasPanel = () => {
  const [annotations, setAnnotations] = useState<IAnnotation[]>([]);
  const [newAnnotation, setNewAnnotation] = useState<IAnnotation[]>([]);
  const [drawAnnotations, setDrawAnnotations] = useState<boolean>(false);
  const { action, fillColor } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (action === "add") {
      setDrawAnnotations(true);
    } else if (action === "remove") {
      setDrawAnnotations(false);
    } else if (action === "clear") {
      setDrawAnnotations(false);
      setAnnotations([]);
    }
  }, [action]);

  useEffect(() => {
    dispatch(updateTotalItems(annotations.length));
  }, [annotations.length]);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>): void => {
    if (!drawAnnotations) return;

    if (newAnnotation.length === 0) {
      const { x, y } = event?.target.getStage()?.getPointerPosition();
      setNewAnnotation([
        { x, y, width: 0, height: 0, key: "0", fillColor: fillColor },
      ]);
    }
  };

  const handleMouseUp = (event: KonvaEventObject<MouseEvent>): void => {

    if (!drawAnnotations) return;

    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage()?.getPointerPosition();
      const width = x - sx;
      const height = y - sy;
      if (width >= 5 && height >= 5) {
        const annotationToAdd: IAnnotation = {
          x: sx,
          y: sy,
          width,
          height,
          key: annotations.length + 1,
          fillColor: fillColor,
        };
        annotations.push(annotationToAdd);
        setNewAnnotation([]);
        setAnnotations(annotations);
      }
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>): void => {
    if (!drawAnnotations) return;

    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage()?.getPointerPosition();
      const width = x - sx;
      const height = y - sy;

      if (width >= 5 && height >= 5) {
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width,
            height,
            key: "0",
            fillColor: fillColor,
          },
        ]);
      }
    }
  };

  const handleClick = (event: KonvaEventObject<MouseEvent>): void => {
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
    <div className="container-right">
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={650}
        height={650}
      >
        <Layer>
          {annotationsToDraw.map((value) => {
            return (
              <Rect
                key={value.key}
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
    </div>
  );
};
export default CanvasPanel;
