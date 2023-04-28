"use client";

import { useContext } from 'react';
import { context } from '../context';

export default function PlayControl() {

  const { clockDirection, setClockDirection, setClockMultiplier} = useContext(context);

  
  return (
    <div className='inline-flex items-center mx-2.5'>
      <button type="button" className="hover:bg-neutral-800 rounded-full px-1 py-1" onClick={()=> {setClockDirection(-1)}}>
        <svg className="w-8 h-8 text-neutral-200" fill={clockDirection < 0?"currentColor":"none"} stroke={clockDirection < 0?"none":"currentColor"} strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
        </svg>
      </button>
      <button type="button" className="hover:bg-neutral-800 rounded-full px-1 py-1" onClick={()=> {setClockDirection(0)}}>
        <svg className="w-8 h-8 text-neutral-200" fill={clockDirection === 0?"currentColor":"none"} stroke={clockDirection === 0?"none":"currentColor"} strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
        </svg>
      </button>
      <button type="button" className="hover:bg-neutral-800 rounded-full px-1 py-1" onClick={()=> {setClockDirection(1)}}>
        <svg className="w-8 h-8 text-neutral-200 " fill={clockDirection > 0?"currentColor":"none"} stroke={clockDirection > 0?"none":"currentColor"} strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
        </svg>
      </button>
      <select defaultValue={1} onChange={(e)=>{setClockMultiplier(parseInt(e.target.value))}} className="text-neutral-200 bg-neutral-900 border border-neutral-700 text-sm rounded-lg text-center py-2 ml-2">
        <option value={1}>1X</option>
        <option value={2}>2X</option>
        <option value={5}>5X</option>
        <option value={10}>10X</option>
        <option value={20}>20X</option>
        <option value={50}>50X</option>
        <option value={100}>100X</option>
      </select>
    </div>
  );
}