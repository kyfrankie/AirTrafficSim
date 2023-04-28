"use client";

import dynamic from 'next/dynamic';
import { useEffect, useContext } from 'react';
import { context } from './context';
import InfoPannel from './components/InfoPannel';
import ModeSelector from './components/ModeSelector';
import ChartSelector from './components/ChartSelector';
import PlayControl from './components/PlayControl';
import Clock from './components/Clock';
import Slider from './components/Slider';
import HomeButton from './components/HomeButton';
import Chart from './components/Chart';
import DisplayModal from './components/DisplayModal';
import SimulateModal from './components/SimulateModal';

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
})

export default function Home() {

  const { cesium, height, width, showChart, showInfoPanel, showDisplayModal, showSimulateModal } = useContext(context);

  useEffect(() => {
    cesium?.clock.onTick.addEventListener(() => {
      // console.log(cesium?.clock.currentTime);
    })
  }, [cesium])


  return (
    <div>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-900">
        {/* Map and info pannel */}
        <div className='flex w-full' style={{height: height+'px'}}>
          <div className='flex grow' style={{width: width+'%'}}>
            <Map/>
          </div>
          {showInfoPanel && <InfoPannel/>}
        </div>
        {/* Tool bar */}
        <div id="Tool_bar" className='flex-none relative h-14'>
          <div className="flex flex-row justify-center content-center items-center h-full">
            <HomeButton/>
            <ModeSelector/>
            <ChartSelector/>
            <PlayControl/>
            <Clock/>
            <Slider/>
          </div>
        </div>
        {/* Chart */}
        {showChart && <Chart/>}
      </div>
      {/* Modal */}
      {showDisplayModal && <DisplayModal/>}
      {showSimulateModal && <SimulateModal/>}
    </div>
  )
}
