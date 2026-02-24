import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import * as d3 from 'd3';

interface DataPoint {
  x: number | Date;
  y: number;
}

interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  showDots?: boolean;
  showGrid?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 300,
  height = 200,
  color = '#2563eb',
  strokeWidth = 2,
  showDots = true,
  showGrid = true,
}) => {
  const padding = 40;

  const { xScale, yScale, path } = useMemo(() => {
    const xExtent = d3.extent(data, (d) => d.x instanceof Date ? d.x.getTime() : d.x) as [number, number];
    const yExtent = d3.extent(data, (d) => d.y) as [number, number];

    const xScaleDomain = [xExtent[0], xExtent[1]];
    const yScaleDomain = [0, yExtent[1] * 1.1];

    const xScale = d3.scaleLinear()
      .domain(xScaleDomain)
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain(yScaleDomain)
      .range([height - padding, padding]);

    const lineGenerator = d3.line<DataPoint>()
      .x((d) => xScale(d.x instanceof Date ? d.x.getTime() : d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const points = lineGenerator(data);
    const skPath = Skia.Path.MakeFromSVGString(points || '') ?? Skia.Path.Make();

    return { xScale, yScale, path: skPath };
  }, [data, width, height, padding]);

  const gridLines = useMemo(() => {
    if (!showGrid) return [];

    const yTicks = yScale.ticks(5);
    return yTicks.map((tick) => ({
      y: yScale(tick),
      value: tick,
    }));
  }, [yScale, showGrid]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Canvas style={{ width, height }}>
        {showGrid && gridLines.map((line, index) => (
          <Path
            key={"grid-" + index}
            path={"M" + padding + "," + line.y + " L" + (width - padding) + "," + line.y}
            color="#e5e7eb"
            style="stroke"
            strokeWidth={1}
          />
        ))}
        <Path
          path={path}
          color={color}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          strokeJoin="round"
        />
        {showDots && data.map((point, index) => (
          <Path
            key={"dot-" + index}
            path={"M" + xScale(point.x instanceof Date ? point.x.getTime() : point.x) + "," + yScale(point.y) + " m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0"}
            color={color}
          />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});
