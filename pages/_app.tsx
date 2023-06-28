import '../app/globals.css';
import { ReactNode } from 'react';

// TBD - update types
export default function App(props: {
    Component: any
    pageProps: any
}) {
  const { Component, pageProps } = props;
  
  return <Component {...pageProps} />    
 } 