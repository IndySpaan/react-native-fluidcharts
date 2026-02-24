import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Skia, vec } from '@shopify/react-native-skia';
import * as d3 from 'd3';

interface DataPoint {
  label: string;
  value: number;
}

interface PieChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  colors?: string[];
  showLabels?: boolean;
}

const DEFAULT_COLORS = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#65a30d',
  '#0891b2',
];

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 300,
  height = 300,
  innerRadius = 0,
  outerRadius = 100,
  colors = DEFAULT_COLORS,
  showLabels = true,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const { pieData, colorScale } = useMemo(() => {
    const pie = d3.pie<DataPoint>()
      .value((d) => d.value)
      .sort(null);

    const pieData = pie(data);
    const colorScale = d3.scaleOrdinal(colors);

    return { pieData, colorScale };
  }, [data, colors]);

  const paths = useMemo(() => {
    const arcGenerator = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    return pieData.map((slice) => {
      const pathData = arcGenerator(slice) || '';
      const skPath = Skia.Path.MakeFromSVGString(pathData) ?? Skia.Path.Make();

      return {
        path: skPath,
        color: colorScale(slice.data.label),
        centroid: arcGenerator.centroid(slice),
      };
    });
  }, [pieData, innerRadius, outerRadius, colorScale]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Canvas style={{ width, height }}>
        {paths.map((slice, index) => (
          <Path
            key={"slice-" + index}
            path={slice.path}
            color={slice.color}
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
