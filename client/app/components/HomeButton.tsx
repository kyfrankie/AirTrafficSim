"use client";

import { useContext } from 'react';
import { context } from '../context';

export default function HomeButton() {

  const { } = useContext(context);

  
  return (
    <button type="button" className="inline-flex items-center text-neutral-200 hover:bg-neutral-800 rounded-lg font-normal text-xl px-1.5 py-1.5 mx-2.5"
      onClick={()=>{window.open("https://hkust-octad-lab.github.io/AirTrafficSim/", '_blank')}}>
        <img className="h-9 w-9 mr-2 self-center" src="favicon.png"/>
        AirTrafficSim
    </button>
  );
}