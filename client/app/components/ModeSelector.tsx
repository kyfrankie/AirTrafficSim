"use client";

import { useContext } from 'react';
import { context } from '../context';

export default function ModeSelector() {

  const { setShowDisplayModal, setShowSimulateModal } = useContext(context);

  
  return (
    <div className="inline-flex mx-2.5 items-center">
      <button 
        type="button" 
        className="text-neutral-200 hover:bg-neutral-800 rounded-full font-normal text-sm px-3 py-2 mr-2 border border-neutral-700"
        onClick={() => {setShowDisplayModal(true);}}
      >
        Display
      </button>
      <button 
        type="button" 
        className="text-neutral-200 hover:bg-neutral-800 rounded-full font-normal text-sm px-3 py-2 border border-neutral-700"
        onClick={() => {setShowSimulateModal(true);}}
      >
        Simulate
      </button>
    </div>
  );
}