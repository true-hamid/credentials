import React from 'react';
import NetworkContext from './NetworkContext';
import { NetworkProviderProps } from '@types';



export default (props: NetworkProviderProps) => {
  const { children, value } = props;

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
};
