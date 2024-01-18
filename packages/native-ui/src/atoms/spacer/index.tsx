import React from 'react';
import { View } from 'react-native';
import { Sizes, normalize } from '@utils/native';
import { SpacerProps } from '@types';
import { StyleSheet } from 'react-native';

/**
 * @Component Spacer
 * @description Spacer for the application
 * @props size [possible sizes of the app, e.g xxl, lg]
 * ## Usage
 * ```tsx
 * <Spacer size={'sm'}/>
 * <Spacer horizontal size={'xxl'}/>
 */
export const Spacer = (props: SpacerProps): JSX.Element => {
  const { size: sizeName = 's', vertical = true, ...rest } = props;
  const requiredSize = Sizes[sizeName as keyof typeof Sizes] ? Sizes[sizeName as keyof typeof Sizes] : Sizes['xs'];
  const size = normalize(requiredSize);
  const styles = getStyles(size, vertical);
  return <View {...rest} style={styles.container} />;
};

const getStyles = (size: number, vertical: boolean) =>
  StyleSheet.create({
    container: {
      height: vertical ? size : 0,
      width: vertical ? 0 : size,
    },
  });
