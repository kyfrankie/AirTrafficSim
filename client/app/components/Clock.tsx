"use client";

import { useContext } from 'react';
import { context } from '../context';
import { JulianDate } from 'cesium';

export default function Clock() {

  const { currentTime } = useContext(context);

  return (
    <span className="text-sm text-neutral-200 whitespace-pre-line text-center mx-2.5">
      {JulianDate.toIso8601(currentTime, 0).replace("T", "\n")}
    </span>
  );
}