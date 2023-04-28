"use client";

import { useContext, useCallback } from 'react';
import { context } from '../context';

export default function InfoPannel() {

  const { width, setWidth} = useContext(context);


  const dragWidth = useCallback(
    (e:any) => {
      const w = (e.clientX / window.innerWidth) * 100;
      if (w > 50 && w < 75) {
        setWidth(w);
      }
    },
    [width]
  );

  
  return (
    <div className='flex relative' style={{width: 100-width+'%'}}>
      <div className="absolute inset-y-1/2 -mt-4 left-0 w-1.5 h-8 bg-neutral-500/60 rounded-full cursor-col-resize" draggable={true} onDrag={dragWidth}/>
    </div>
  );
}