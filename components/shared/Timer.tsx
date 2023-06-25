'use client'

import React, { useState, useContext, useEffect } from 'react';
import TimerContextProvider, { TimerContext } from '../../context/timerContext';

const TIME_SECONDS_TO_COUNTDOWN = 24;
const TIME_TO_COUNTDOWN = TIME_SECONDS_TO_COUNTDOWN * 1000;
const WIDTH_INTERVAL = TIME_TO_COUNTDOWN / 100;
const MILLISECOND_INTERVAL = 1;

const CAUTION_TIME = 14000;
const WARNING_TIME = 8000;
const DANGER_TIME = 3000;

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
  const [referenceTime, updateReferenceTime] = useState(Date.now());
  const [progressColor, updateProgressColor] = useState(colorGreen);
  const [progress, updateProgress] = useState(100);
  const [stop, updateStop] = useState(false);
  const [offset, updateOffset] = useState(circumference * ((progress) / 100));
  const [localTime, updateLocalTime] = useState(TIME_TO_COUNTDOWN);

  const { updateView, reset} = props;

  useEffect(() => {
    const countDownUntilZero = () => {
      if (reset) {
        updateProgress(0);
        updateOffset(0);
        updateLocalTime(0);
        return 0;
      }
      updateLocalTime(prevTime => {
        const now = Date.now();
        let interval = now - referenceTime;
        
        if (prevTime <= CAUTION_TIME && progressColor === colorGreen) {
          updateProgressColor(colorYellow)
        }
        if (prevTime <= WARNING_TIME && progressColor === colorYellow) {
          updateProgressColor(colorOrange)
        }
        if (prevTime <= DANGER_TIME && progressColor === colorOrange) {
          updateProgressColor(colorRed)
        }
        if (prevTime <= 0) {
          
          updateStop(true)
          updateProgress(100);
          // nasty error with rerendering multiple components, this delays this execution off the main thread
          if (!stop) setTimeout(updateView,0);
          return 0;
        }
        updateReferenceTime(now);
        const newProgress = (prevTime - interval) / (TIME_SECONDS_TO_COUNTDOWN * 10);
        const newOffset = circumference * ((newProgress) / 100);
        updateProgress(newProgress);
        updateOffset(newOffset);
        const timeDiff = prevTime - interval;
        
        // hack, using context moves the passage of time at 3x the speed
        window.localStorage.setItem('time', timeDiff.toString())
        updateLocalTime(timeDiff);;
        return prevTime - interval;
      });
    }
    setTimeout(countDownUntilZero, MILLISECOND_INTERVAL);
  })

  return (
    <div>
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
        '><span>{`${(localTime / 1000).toFixed(0)}`}</span></div>
      
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
    </div>
  )
}

// export const TimerMobile = (props: {
//   reset: boolean;
// }) => {

//   const [time, updateTime] = useState(TIME_TO_COUNTDOWN);
//   const [referenceTime, updateReferenceTime] = useState(Date.now());
//   const [width, updateWidth] = useState(100);
//   const [widthColor, updateWidthColor] = useState(colorGreen);

//   const { reset} = props;

//   useEffect(() => {
//     const countDownUntilZero = () => {
//       if (reset) {
//         updateTime(0);
//         updateWidth(0);
//         return 0;
//       }
//       updateTime(prevTime => {
//         const now = Date.now();
//         let interval = now - referenceTime;
//         if (prevTime <= DANGER_TIME && widthColor === colorOrange) {
//           updateWidthColor(colorRed)
//         }
//         if (prevTime <= WARNING_TIME && widthColor === colorYellow) {
//           updateWidthColor(colorOrange)
//         }
//         if (prevTime <= CAUTION_TIME && widthColor === colorGreen) {
//           updateWidthColor(colorYellow)
//         }
//         if (prevTime <= 0) {
//           updateWidth(0);
//           return 0;
//         }
//         updateReferenceTime(now);
//         updateWidth((prevTime - interval) / WIDTH_INTERVAL);
//         return prevTime - interval;
//       });
//     }
//     setTimeout(countDownUntilZero, MILLISECOND_INTERVAL);
//   })

//   return (
//     <div className='md:hidden mt-4 min-w-full min-h-[12px] relative bg-gray rounded'>
//       <div
//         className='timer absolute z-10 top-0 bottom-0 right-0 left-0'
//         style={{
//           width: `${width}%`,
//           backgroundColor: `${widthColor}`
//         }}
//       />
//     </div>
//   )
// }


// export const Timer = (props: {
//   updateView: () => void;
//   reset: boolean;
// }) => {
//   const { updateView, reset } = props;
//   return (
//     <TimerContextProvider>
//       <TimerContainer updateView={updateView} reset={reset}/>
//   </TimerContextProvider>)
// }

