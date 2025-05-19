import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconProps } from 'react-native-vector-icons/Icon';
 
export const Icon: React.FC<IconProps> = (props) => {
  return <MaterialCommunityIcons {...props} />;
}; 