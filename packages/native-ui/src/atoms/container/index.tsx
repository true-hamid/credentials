import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

type ContainerProps = {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
};

export const Container = ({
  children,
  header,
  footer,
  scrollable,
}: ContainerProps) => {
  const ViewConatiner = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? {
        contentContainerStyle: styles.scrollableContainer,
      }
    : {
        style: styles.container,
      };
  return (
    <ViewConatiner {...containerProps}>
      <View>{header}</View>
      <View>{children}</View>
      <View>{footer}</View>
    </ViewConatiner>
  );
};

const styles = StyleSheet.create({
  scrollableContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
});
