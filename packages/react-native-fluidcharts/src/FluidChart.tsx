import { Canvas } from "@shopify/react-native-skia";
import { Line } from "./primitives/Line";
import { createSimpleLinePath } from "./core/geometry/createSimpleLinePath";

export function FluidChart() {
    const path = createSimpleLinePath();

    return (
        <Canvas style={{ width: 300, height: 200 }}>
            <Line path={path} />
        </Canvas>
    );
}