'use client'

import React, { useState, useEffect } from 'react';


const TIME_TO_COUNTDOWN = 10 * 1000;
const WIDTH_INTERVAL = TIME_TO_COUNTDOWN / 100;
const MILLISECOND_INTERVAL = 1;

const colorGreen = '#00DF59'
const colorYellow = '#F9C717';
const colorOrange = '#F99117';
const colorRed = '#F91717'

export const Timer = (props: {
  updateView: () => void;
  reset: boolean;
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  const [time, updateTime] = useState(TIME_TO_COUNTDOWN);
  const [referenceTime, updateReferenceTime] = useState(Date.now());
  const [progressColor, updateProgressColor] = useState(colorGreen);
  const [progress, updateProgress] = useState(100);
  const [offset, updateOffset] = useState(circumference * ((progress)/100));

  const { updateView, reset} = props;

  useEffect(() => {
    const countDownUntilZero = () => {
      if (reset) {
        updateProgress(0);
        updateOffset(0);
        updateTime(0);
        return 0;
      }
      updateTime(prevTime => {
        const now = Date.now();
        let interval = now - referenceTime;
        
        if (prevTime <= 7000 && progressColor === colorGreen) {
          updateProgressColor(colorYellow)
        }
        if (prevTime <= 4000 && progressColor === colorYellow) {
          updateProgressColor(colorOrange)
        }
        if (prevTime <= 2000 && progressColor === colorOrange) {
          updateProgressColor(colorRed)
        }
        if (prevTime <= 0) {
          updateProgress(100);
          updateView();
          return 0;
        }
        updateReferenceTime(now);
        const newProgress = (prevTime - interval) / 100;
        updateProgress(newProgress);
        updateOffset(circumference * ((newProgress) / 100));
        updateTime(prevTime - interval);
        return prevTime - interval;
      });
    }
    setTimeout(countDownUntilZero, MILLISECOND_INTERVAL);
  })

  return (
    <div className='sm:hidden md:block relative'>
      <div className='
          absolute
          h-full
          w-full
          flex
          justify-center
          items-center
          text-meta
          font-faktProBlack
          text-xl
        '><span>{`${(time / 1000).toFixed(0)}`}</span></div>
      
      <svg
        className='relative'
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)"}}
      >
        <circle
          className='timer'
          r={radius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke={progressColor}
          strokeWidth="10px">
        </circle>
        <circle
          r={radius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke={'#EEF2FF'}
          strokeWidth="10px"
          strokeDasharray={`${circumference}px`}
          strokeDashoffset={`${offset}px`}
        >
        </circle>
    </svg>
    </div>

  )
}

export const TimerMobile = (props: {
  updateView: () => void;
  reset: boolean;
}) => {

  const [time, updateTime] = useState(TIME_TO_COUNTDOWN);
  const [referenceTime, updateReferenceTime] = useState(Date.now());
  const [width, updateWidth] = useState(100);
  const [widthColor, updateWidthColor] = useState(colorGreen);

  const { updateView, reset} = props;

  useEffect(() => {
    const countDownUntilZero = () => {
      if (reset) {
        updateTime(0);
        updateWidth(0);
        return 0;
      }
      updateTime(prevTime => {
        const now = Date.now();
        let interval = now - referenceTime;
        if (prevTime <= 2000 && widthColor === colorOrange) {
          updateWidthColor(colorRed)
        }
        if (prevTime <= 4000 && widthColor === colorYellow) {
          updateWidthColor(colorOrange)
        }
        if (prevTime <= 7000 && widthColor === colorGreen) {
          updateWidthColor(colorYellow)
        }
        if (prevTime <= 0) {
          updateWidth(0);
          updateView();
          return 0;
        }
        updateReferenceTime(now);
        updateWidth((prevTime - interval) / WIDTH_INTERVAL);
        return prevTime - interval;
      }, [reset]);
    }
    setTimeout(countDownUntilZero, MILLISECOND_INTERVAL);
  })

  return (
    <div className='md:hidden mt-4 min-w-full min-h-[12px] relative bg-gray rounded'>
      <div
        className='timer absolute z-10 top-0 bottom-0 right-0 left-0'
        style={{
          width: `${width}%`,
          backgroundColor: `${widthColor}`
        }}
      />
    </div>
  )
}