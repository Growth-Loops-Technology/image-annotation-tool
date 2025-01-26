export type Annotation = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: AnnotationType;
  color: string;
  text: string;
  rotation: number;
  stroke: string;
  strokeWidth: number;
};

export type AnnotationType = "rectangle" | "circle" | "text";

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type Shape = {
  name: AnnotationType;
  icon: LucideIcon;
};
