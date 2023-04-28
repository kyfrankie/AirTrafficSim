"use client";

import { useEffect, useContext } from 'react';
import { createWorldTerrain, CesiumWidget, JulianDate } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { context } from '../context';

export default function Map() {

  const { cesium, setCesium, clockDirection, clockMultiplier, setCurrentTime, setSliderTime } = useContext(context);

  useEffect(() => {
    console.log("Map-useEffect");
    const wdiget = new CesiumWidget('cesiumContainer', {
      terrainProvider: createWorldTerrain(),
      scene3DOnly: true,
      shadows: false,
      msaaSamples: 1,
    })
    setCesium(wdiget);
    wdiget.scene.debugShowFramesPerSecond = true;
    wdiget.clock.onTick.addEventListener(() => {
      setCurrentTime(wdiget.clock.currentTime);
      setSliderTime(Math.trunc(JulianDate.secondsDifference(wdiget.clock.currentTime, wdiget.clock.startTime)));
    })
  }, [])


  // Update clock logic
  useEffect(() => {
    console.log("Map-useEffect-clockDirection", clockDirection, clockMultiplier);
    if (cesium){
      cesium.clock.multiplier = clockDirection * clockMultiplier;
      cesium.clock.shouldAnimate = clockDirection !== 0;
    }
  }, [clockDirection, clockMultiplier])

  
  return (
    <div id="cesiumContainer" className='w-full h-full' />
  );
}