import useCalculatedDimensions from "@/lib/hooks/useCalculatedDimensions";
import { setState } from "@/lib/types";
import { Image } from "react-konva";
import useImage from "use-image";

type Props = {
  imageUrl: string | null;
  maxHeight: number;
  setWidth: setState<number>;
  setHeight: setState<number>;
};

const ImageContainer = ({
  imageUrl,
  maxHeight,
  setWidth,
  setHeight,
}: Props) => {
  const [image] = useImage(imageUrl || "", "anonymous"); // Use anonymous mode for cross-origin images

  const { height, width } = useCalculatedDimensions(
    image?.width,
    image?.height,
    window.innerWidth - 20,
    maxHeight,
    setWidth,
    setHeight
  );

  if (!image) return null;

  return <Image image={image} width={width} height={height} />;
};

export default ImageContainer;
