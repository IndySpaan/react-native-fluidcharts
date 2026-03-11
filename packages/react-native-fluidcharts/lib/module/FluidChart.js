"use strict";

import { Canvas } from "@shopify/react-native-skia";
import { Line } from "./primitives/Line.js";
import { createSimpleLinePath } from "./core/geometry/createSimpleLinePath.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function FluidChart() {
  const path = createSimpleLinePath();
  return /*#__PURE__*/_jsx(Canvas, {
    style: {
      width: 300,
      height: 200
    },
    children: /*#__PURE__*/_jsx(Line, {
      path: path
    })
  });
}
//# sourceMappingURL=FluidChart.js.map