import { useMemo, useEffect } from "react";
import { setState } from "../types";

const useCalculatedDimensions = (
  naturalWidth: number | undefined,
  naturalHeight: number | undefined,
  maxWidth: number,
  maxHeight: number,
  setWidth: setState<number>,
  setHeight: setState<number>
) => {
  const dimensions = useMemo(() => {
    if (!naturalWidth || !naturalHeight) return { width: 0, height: 0 };
    
    const widthRatio = maxWidth / naturalWidth;
    const heightRatio = maxHeight / naturalHeight;
    const scale = Math.min(widthRatio, heightRatio);

    return {
      width: naturalWidth * scale,
      height: naturalHeight * scale,
    };
  }, [naturalWidth, naturalHeight, maxWidth, maxHeight]);

  // Update parent state when dimensions change
  useEffect(() => {
    setWidth(dimensions.width);
    setHeight(dimensions.height);
  }, [dimensions.width, dimensions.height, setWidth, setHeight]);

  return dimensions;
};

export default useCalculatedDimensions;
