import React from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { LineChart, BarChart, PieChart } from '@fluidcharts/core';

const lineData = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 30 },
  { x: 3, y: 45 },
  { x: 4, y: 60 },
  { x: 5, y: 55 },
  { x: 6, y: 80 },
  { x: 7, y: 95 },
  { x: 8, y: 85 },
  { x: 9, y: 100 },
];

const barData = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 25 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 50 },
  { label: 'Jun', value: 75 },
];

const pieData = [
  { label: 'A', value: 30 },
  { label: 'B', value: 45 },
  { label: 'C', value: 25 },
  { label: 'D', value: 60 },
];

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: safeAreaInsets.top }]}>
      <Text style={styles.title}>React Native FluidCharts</Text>
      <Text style={styles.subtitle}>High-performance charts with Skia + D3</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Line Chart</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={lineData}
            width={320}
            height={220}
            color="#2563eb"
            strokeWidth={2}
            showDots={true}
            showGrid={true}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bar Chart</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={barData}
            width={320}
            height={220}
            color="#7c3aed"
            barWidth={35}
            showLabels={true}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pie Chart</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            width={280}
            height={280}
            innerRadius={40}
            outerRadius={100}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Edit App.tsx to see live changes!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default App;