import type { ReactNode } from "react";
import React, { useMemo } from "react";

import type { Fit } from "../image";
import { rect2rect, fitRects } from "../image";
import type { SkRect } from "../../../skia";
import { Group } from "../Group";

interface FitProps {
  fit: Fit;
  src: SkRect;
  dst: SkRect;
  children: ReactNode | ReactNode[];
}

export const fitbox = (fit: Fit, src: SkRect, dst: SkRect) => {
  const rects = fitRects(fit, src, dst);
  return rect2rect(rects.src, rects.dst);
};

export const FitBox = ({ fit, src, dst, children }: FitProps) => {
  const transform = useMemo(() => fitbox(fit, src, dst), [dst, fit, src]);
  return <Group transform={transform}>{children}</Group>;
};

FitBox.defaultProps = {
  fit: "contain",
};
