import { IStaggerStyleProps } from 'native-base/lib/typescript/components/composites/Transitions/Stagger';
import { StyleSheet } from 'react-native';

interface StaggerStyles {
  initial: IStaggerStyleProps;
  animate: IStaggerStyleProps;
  exit: IStaggerStyleProps;
}

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 30,
  },
});

export const staggerStyles: StaggerStyles = {
  initial: {
    opacity: 0,
    scale: 0,
    translateY: 34,
  },
  animate: {
    translateY: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.8,
      stagger: {
        offset: 30,
        reverse: true,
      },
    },
  },
  exit: {
    translateY: 34,
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 100,
      stagger: {
        offset: 30,
        reverse: true,
      },
    },
  },
};
