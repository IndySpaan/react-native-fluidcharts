import { Skia } from "@shopify/react-native-skia";

export function createSimpleLinePath() {
    const path = Skia.Path.Make();

    path.moveTo(10, 100);
    path.lineTo(60, 20);
    path.lineTo(120, 80);
    path.lineTo(200, 40);

    return path;
}