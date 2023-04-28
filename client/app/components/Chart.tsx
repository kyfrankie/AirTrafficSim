"use client";

import { useContext, useCallback } from 'react';
import { context } from '../context';

export default function Chart() {

  const { height, setHeight } = useContext(context);

  const dragHeight = useCallback(
    (e:any) => {
      const h = e.clientY;
      if (h > window.innerHeight/2 && h < window.innerHeight-56) {
        setHeight(h);
      }
    },
    [height]
  );
  
  return (
    <div className='flex-1 relative'>
      <div className="absolute inset-x-1/2 -ml-4 top-0 w-8 h-1.5 bg-neutral-500/60 rounded-full cursor-row-resize" draggable={true} onDrag={dragHeight}/>
    </div>
  );
}