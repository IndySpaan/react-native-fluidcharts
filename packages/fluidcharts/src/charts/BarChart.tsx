import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Skia, vec } from '@shopify/react-native-skia';
import * as d3 from 'd3';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  barWidth?: number;
  showLabels?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 300,
  height = 200,
  color = '#2563eb',
  barWidth = 30,
  showLabels = true,
}) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const { yScale, bars } = useMemo(() => {
    const yMax = d3.max(data, (d) => d.value) || 0;

    const yScale = d3.scaleLinear()
      .domain([0, yMax * 1.1])
      .range([height - padding, padding]);

    const barCount = data.length;
    const totalBarWidth = chartWidth / barCount;
    const actualBarWidth = Math.min(barWidth, totalBarWidth * 0.8);
    const barPadding = (totalBarWidth - actualBarWidth) / 2;

    const bars = data.map((item, index) => {
      const x = padding + index * totalBarWidth + barPadding;
      const barHeight = chartHeight - (yScale(0) - yScale(item.value));
      const y = yScale(item.value);
      return {
        x,
        y,
        width: actualBarWidth,
        height: barHeight,
        label: item.label,
      };
    });

    return { yScale, bars };
  }, [data, width, height, padding, chartWidth, chartHeight, barWidth]);

  const gridLines = useMemo(() => {
    const yTicks = yScale.ticks(5);
    return yTicks.map((tick) => ({
      y: yScale(tick),
      value: tick,
    }));
  }, [yScale]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Canvas style={{ width, height }}>
        {gridLines.map((line, index) => (
          <Path
            key={"grid-" + index}
            path={"M" + padding + "," + line.y + " L" + (width - padding) + "," + line.y}
            color="#e5e7eb"
            style="stroke"
            strokeWidth={1}
          />
        ))}
        {bars.map((bar, index) => (
          <Path
            key={"bar-" + index}
            path={
              "M" + bar.x + "," + bar.y + 
              " L" + (bar.x + bar.width) + "," + bar.y + 
              " L" + (bar.x + bar.width) + "," + (height - padding) + 
              " L" + bar.x + "," + (height - padding) + 
              " Z"
            }
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
