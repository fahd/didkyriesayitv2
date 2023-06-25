import React, { useState, createContext, ReactNode } from "react";
export const TimerContext = createContext<TimerProps | null>(null);

type TimerProps = {
  updateGlobalTime: any;
  globalTime: number;
}

export default function TimerContextProvider (props: {
  children: ReactNode
}) {
  const { children } = props;
  const [globalTime, updateGlobalTime] = useState(0);
  
  return (
    <TimerContext.Provider value={{globalTime, updateGlobalTime}}>
      {children}
    </TimerContext.Provider>
  );
}
