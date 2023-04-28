"use client";

import { useContext, useState } from 'react';
import { context } from '../context';
import { JulianDate } from 'cesium';

export default function Slider() {

  const { cesium, sliderTime, setSliderTime } = useContext(context);
  
  return (
    <div className="inline-flex items-center mx-2.5 grow">
      <input type="range" value={sliderTime} min={0} max={3600} 
        onChange={(e)=>{
          setSliderTime(parseInt(e.target.value)); 
          if (cesium)
            cesium.clock.currentTime = JulianDate.addSeconds(cesium.clock.startTime, parseInt(e.target.value), cesium.clock.currentTime);
        }} 
        className="grow h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer range-sm" 
      />
      <p className="text-sm text-neutral-200 ml-2.5">{sliderTime} s</p>
    </div>
  );
}