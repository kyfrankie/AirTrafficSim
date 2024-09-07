import { useRef, useEffect } from "react";
import { useIonViewDidEnter } from "@ionic/react";
import {Viewer, Ion, Terrain} from "cesium";

Ion.defaultAccessToken = import.meta.env.VITE_REACT_APP_CESIUMION_ACCESS_TOKEN;

console.log(Ion.defaultAccessToken);

const CesiumViewer: React.FC = () => {

    const cesiumContainerRef = useRef<HTMLDivElement>(null);
    const cesiumRef = useRef<Viewer>(null);

    useIonViewDidEnter(() => {
        if (cesiumContainerRef.current){
            const cesiumRef = new Viewer(cesiumContainerRef.current, {
                terrain: Terrain.fromWorldBathymetry()
            })
        };
    });
    
    return (
        <div ref={cesiumContainerRef} style={{ width: '100%', height: '100%' }} />
    );
}

export default CesiumViewer