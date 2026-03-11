import {useEffect, useState} from "react";
import { Path, type SkPath } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
    path: SkPath;
};

export function Line({ path }: Props) {
    const progress = useSharedValue(0);
    const [thickness, setThickness] = useState(5)

    useEffect(() => {
        progress.value = withTiming(1, { duration: 2200 });
    }, [thickness, progress]);

    return (
        <Path
            path={path}
            style="stroke"
            color={'red'}
            strokeWidth={thickness}
            start={0}
            end={progress}
        />
    );
}