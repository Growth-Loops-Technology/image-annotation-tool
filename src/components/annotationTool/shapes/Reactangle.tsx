import { useEffect, useRef } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
import Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { Annotation } from "@/lib/types";

interface Props {
  shapeProps: Annotation;
  dragable: boolean;
  count: number;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (props: Annotation) => void;
  containerHeight: number;
  containerWidth: number;
}

const Reactangle = ({
  shapeProps,
  dragable,
  count,
  isSelected,
  onSelect,
  onChange,
  containerHeight,
  containerWidth,
}: Props) => {
  const shapeRef = useRef<Konva.Group>(null);
  const transformRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    if (isSelected && transformRef.current && shapeRef.current) {
      transformRef.current.setNode(shapeRef.current);
      transformRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  if (!shapeProps) return null;

  const pixelX = (shapeProps.x * containerWidth) / 100;
  const pixelY = (shapeProps.y * containerHeight) / 100;
  const pixelWidth = (shapeProps.width * containerWidth) / 100;
  const pixelHeight = (shapeProps.height * containerHeight) / 100;

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const newX = e.target.x();
    const newY = e.target.y();

    const percentageX = (newX / containerWidth) * 100;
    const percentageY = (newY / containerHeight) * 100;

    onChange({ ...shapeProps, x: percentageX, y: percentageY });
  };

  const handleDragBoundFunc = (pos: { x: number; y: number }) => {
    const clampedX = Math.max(
      0,
      Math.min(containerWidth - shapeProps.width, pos.x)
    );
    const clampedY = Math.max(
      0,
      Math.min(containerHeight - shapeProps.height, pos.y)
    );

    return { x: clampedX, y: clampedY };
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;
  
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
  
    node.scaleX(1);
    node.scaleY(1);
  
    // Calculate the new position and size in percentage
    const newX = node.x();
    const newY = node.y();
    const newWidth = Math.max(5, node.width() * scaleX);
    const newHeight = Math.max(5, node.height() * scaleY);
  
    const percentageX = (newX / containerWidth) * 100;
    const percentageY = (newY / containerHeight) * 100;
    const percentageWidth = (newWidth / containerWidth) * 100;
    const percentageHeight = (newHeight / containerHeight) * 100;
  
    onChange({
      ...shapeProps,
      x: percentageX,
      y: percentageY,
      width: percentageWidth,
      height: percentageHeight,
      rotation: node.rotation(),
    });
  };
  

  return (
    <>
      <Group
        ref={shapeRef}
        draggable={dragable}
        {...shapeProps}
        x={pixelX}
        y={pixelY}
        height={pixelHeight}
        width={pixelWidth}

        onDragEnd={handleDragEnd}
        dragBoundFunc={handleDragBoundFunc}
        onTransformEnd={handleTransformEnd}
        onClick={onSelect}
      >
        <Rect
          stroke={shapeProps.stroke || "white"}
          strokeWidth={shapeProps.strokeWidth || 2}
          width={shapeProps.width}
          height={shapeProps.height}
        />

        {/* Count Label */}
        <Group x={shapeProps.width < 50 ? -20 : 4} y={4}>
          <Rect
            width={16}
            height={16}
            stroke={shapeProps.stroke || "white"}
            fill="white"
            cornerRadius={4}
          />
          <Text
            text={String(count)}
            fontSize={10}
            x={4}
            y={4}
            fill="black"
            perfectDrawEnabled={false}
          />
        </Group>
      </Group>

      {isSelected && dragable && (
        <Transformer
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Reactangle;
