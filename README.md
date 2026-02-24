# React Native FluidCharts

A high-performance React Native chart library using `@shopify/react-native-skia` and `d3.js`.

## Project Structure

```
react-native-fluidcharts/
├── apps/
│   └── showcase/          # React Native showcase app
├── packages/
│   └── fluidcharts/       # The @fluidcharts/core chart library
├── package.json           # Root package.json for workspace management
├── tsconfig.json          # Root TypeScript config
├── metro.config.js        # Metro bundler config for monorepo
└── babel.config.js        # Root babel config
```

## Getting Started

### Prerequisites

- Node.js >= 22
- React Native CLI
- CocoaPods (for iOS)

### Installation

1. Install npm dependencies:

```bash
npm install
```

2. Install CocoaPods dependencies (for iOS):

```bash
cd apps/showcase/ios && pod install && cd ../..
```

### Running the App

**iOS:**

```bash
cd apps/showcase
npm run ios
```

**Android:**

```bash
cd apps/showcase
npm run android
```

**Start Metro bundler (if needed separately):**

```bash
cd apps/showcase
npm start
```

## Development

### Live Development

The monorepo is set up with npm workspaces. When you edit files in `packages/fluidcharts/src`, changes will automatically reflect in the showcase app via Fast Refresh.

### Adding New Charts

1. Create new chart components in `packages/fluidcharts/src/charts/`
2. Export them from `packages/fluidcharts/src/index.ts`

## Available Charts

- **LineChart** - Line chart with customizable stroke, dots, and grid
- **BarChart** - Vertical bar chart with labels support
- **PieChart** - Pie/donut chart with customizable radii