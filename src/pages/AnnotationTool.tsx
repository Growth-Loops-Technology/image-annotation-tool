import React, { useCallback, useMemo, useRef, useState } from "react";
import { Camera, Square, Circle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AnnotationContainer from "@/components/annotationTool/AnnotationContainer";
import { Annotation, AnnotationType, Shape } from "@/lib/types";

const ImageAnnotationTool = () => {
  const [selectedTool, setSelectedTool] = useState<AnnotationType | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const memoziedFile = useMemo(
    () => imageFile && URL.createObjectURL(imageFile),
    [imageFile]
  );
  console.log(annotations,selectedAnnotation,"annotations");

  const handleChangeShape = useCallback(
    (index: number, shapeProps: Annotation) => {
      setAnnotations((prev) =>
        prev.map((item, idx) => {
          if (index !== idx) {
            return item;
          }
          return idx === index ? { ...item, ...shapeProps } : item;
        })
      );
    },
    []
  );

  const handleAddAnnotation = useCallback(
    (shape: AnnotationType) => {
      if (!imageFile) return;
      const newAnnotation: Annotation = {
        id: `${Date.now()}`,
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        type: shape,
        color: "black",
        text: "",
        rotation: 0,
        stroke: "black",
        strokeWidth: 1,
      };
      setAnnotations((prev) => [...prev, newAnnotation]);
    },
    [imageFile]
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      setImageFile(file);
    },
    []
  );

  const shapes: Shape[] = [
    { name: "rectangle", icon: Square },
    { name: "circle", icon: Circle },
  ];

  return (
    <div className="border rounded-lg w-full h-full">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          {shapes.map((shape) => (
            <TooltipProvider key={shape.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      selectedTool === shape.name ? "secondary" : "ghost"
                    }
                    size="icon"
                    onClick={() => {
                      handleAddAnnotation(shape.name);
                      setSelectedTool(shape.name);
                    }}
                  >
                    <shape.icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{shape.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
            name="image-upload"
            ref={inputRef}
          />
          <label htmlFor="image-upload">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              <Camera className="h-5 w-5" />
            </Button>
          </label>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      </div>

      {/* Annotation Container */}
      <div className="">
        <AnnotationContainer
          imageUrl={memoziedFile}
          annotations={annotations}
          handleChangeShape={handleChangeShape}
          selectedAnnotation={selectedAnnotation}
          setSelectedAnnotation={setSelectedAnnotation}
        />
      </div>
    </div>
  );
};

export default ImageAnnotationTool;
