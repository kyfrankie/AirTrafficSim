"use client";

import { createContext, useState } from "react";
import { CesiumWidget, JulianDate } from "cesium";

const useValue = () => {
    // UI related
    const [width, setWidth] = useState(75);
    const [height, setHeight] = useState(window.innerHeight-56);
    const [showInfoPanel, setShowInfoPannel] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [showDisplayModal, setShowDisplayModal] = useState(false);
    const [showSimulateModal, setShowSimulateModal] = useState(false);
  
    // Cesium related
    const [cesium, setCesium] = useState<CesiumWidget>();
    const [currentTime, setCurrentTime] = useState<JulianDate>(JulianDate.now());
    const [clockDirection, setClockDirection] = useState(0);
    const [clockMultiplier , setClockMultiplier] = useState(1);
    const [sliderTime, setSliderTime] = useState(0);

    return {
        width,
        setWidth,
        height,
        setHeight,
        showInfoPanel,
        setShowInfoPannel,
        showChart,
        setShowChart,
        showDisplayModal,
        setShowDisplayModal,
        showSimulateModal,
        setShowSimulateModal,

        cesium,
        setCesium,
        currentTime,
        setCurrentTime,
        clockDirection,
        setClockDirection,
        clockMultiplier,
        setClockMultiplier,
        sliderTime,
        setSliderTime,
    }
}

export const context = createContext({} as ReturnType<typeof useValue>);

export const ContextProvider = (props:any) => {
    return (
        <context.Provider value={useValue()}>
        {props.children}
        </context.Provider>
    );
}