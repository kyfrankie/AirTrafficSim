"use client";

import { useContext } from 'react';
import { context } from '../context';

export default function ChartSelector() {

  const { } = useContext(context);

  
  return (
    <div className="relative mx-2.5 items-center">
      <select defaultValue={1} id="select" className="px-2 py-2 w-24 text-sm text-neutral-200 bg-neutral-900 rounded-lg border border-neutral-700 appearance-none outline-none ring-0 border-neutral-600" placeholder=" ">
        <option value={1}>None</option>  
      </select>
      <label htmlFor="select" className="absolute text-sm text-neutral-200 duration-300 transform -translate-y-4 left-1 top-2 z-10 scale-75 origin-[0] bg-neutral-900 px-2">Select chart</label>
    </div>
  );
}