import { Layer, Stage } from "react-konva";
import ImageContainer from "./ImageContainer";
import { useState } from "react";
import Reactangle from "./shapes/Reactangle";
import { Annotation } from "@/lib/types";
// import {  useRef, useState } from "react";
type Props = {
  imageUrl: string | null;
  annotations: Annotation[];
  handleChangeShape: (index: number, shapeProps: Annotation) => void;
  selectedAnnotation: Annotation | null;
  setSelectedAnnotation: (annotation: Annotation | null) => void;
};
const AnnotationContainer = ({
  imageUrl,
  annotations,
  handleChangeShape,
  selectedAnnotation,
  setSelectedAnnotation,
}: Props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <div className="mx-auto">
      <Stage
        width={width}
        height={height}
        className=" shadow-lg flex items-center justify-center"
       
      >
        <Layer>
          <ImageContainer
            imageUrl={imageUrl}
            maxHeight={window.innerHeight - 160}
            setWidth={setWidth}
            setHeight={setHeight}
          />
          {annotations.map((annotation, index) => {
            return (
              <Reactangle
                key={annotation.id}
                count={index}
                dragable={true}
                shapeProps={annotation}
                onChange={(shapeProps: Annotation) =>
                  handleChangeShape(index, shapeProps)
                }
                isSelected={selectedAnnotation?.id === annotation.id}
                onSelect={() => {
                  setSelectedAnnotation(annotation);
                }}
                containerHeight={height}
                containerWidth={width}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default AnnotationContainer;
