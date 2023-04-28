"use client";

import { useContext } from 'react';
import { context } from '../context';

export default function DisplayModal() {

  const { setShowDisplayModal } = useContext(context);

  
  return (
    <div aria-hidden="true" tabIndex={-1} className="fixed top-0 left-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto bg-neutral-900/30 flex justify-center justify-self-center justify-items-center ease-in-out">
        <div className="relative bg-neutral-800 rounded-lg w-full max-w-md shadow self-center place-items-center">
            <button type="button" className="absolute top-3 right-2.5 hover:bg-neutral-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={()=>{setShowDisplayModal(false)}}>
                <svg className="w-7 h-7 text-neutral-200" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-neutral-200">Select display data</h3>
            </div>
        </div>
    </div> 
  );
}