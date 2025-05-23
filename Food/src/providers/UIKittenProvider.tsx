import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

interface Props {
  children: React.ReactNode;
}

export const UIKittenProvider: React.FC<Props> = ({ children }) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {children}
    </ApplicationProvider>
  );
}; 