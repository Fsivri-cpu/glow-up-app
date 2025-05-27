import { useCallback } from 'react';
import {
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  WithTimingConfig,
  WithSpringConfig,
} from 'react-native-reanimated';

/**
 * Animation timing configurations
 */
export const timingConfigs = {
  default: {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  } as WithTimingConfig,
  
  slow: {
    duration: 500,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  } as WithTimingConfig,
  
  quick: {
    duration: 200,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  } as WithTimingConfig,
  
  bounce: {
    duration: 400,
    easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
  } as WithTimingConfig,
};

/**
 * Animation spring configurations
 */
export const springConfigs = {
  default: {
    damping: 10,
    stiffness: 100,
    mass: 1,
    overshootClamping: false,
  } as WithSpringConfig,
  
  gentle: {
    damping: 15,
    stiffness: 80,
    mass: 1,
    overshootClamping: false,
  } as WithSpringConfig,
  
  bouncy: {
    damping: 8,
    stiffness: 120,
    mass: 1,
    overshootClamping: false,
  } as WithSpringConfig,
};

/**
 * Hook for fade in/out animations
 */
export function useFadeAnimation(initialValue = 0) {
  const opacity = useSharedValue(initialValue);
  
  const fadeIn = useCallback((config = timingConfigs.default, delay = 0) => {
    opacity.value = withDelay(
      delay,
      withTiming(1, config)
    );
  }, [opacity]);
  
  const fadeOut = useCallback((config = timingConfigs.default, delay = 0) => {
    opacity.value = withDelay(
      delay,
      withTiming(0, config)
    );
  }, [opacity]);
  
  return {
    opacity,
    fadeIn,
    fadeOut,
  };
}

/**
 * Hook for scale animations
 */
export function useScaleAnimation(initialValue = 1) {
  const scale = useSharedValue(initialValue);
  
  const scaleTo = useCallback((value: number, config = springConfigs.default, delay = 0) => {
    scale.value = withDelay(
      delay,
      withSpring(value, config)
    );
  }, [scale]);
  
  const pulse = useCallback((intensity = 1.1, duration = 300) => {
    scale.value = withTiming(intensity, { duration: duration / 2 });
    
    setTimeout(() => {
      scale.value = withTiming(1, { duration: duration / 2 });
    }, duration / 2);
  }, [scale]);
  
  return {
    scale,
    scaleTo,
    pulse,
  };
}

/**
 * Hook for slide animations
 */
export function useSlideAnimation(initialX = 0, initialY = 0) {
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  
  const slideTo = useCallback((
    x: number, 
    y: number, 
    config = timingConfigs.default,
    delay = 0
  ) => {
    translateX.value = withDelay(delay, withTiming(x, config));
    translateY.value = withDelay(delay, withTiming(y, config));
  }, [translateX, translateY]);
  
  const slideInFromRight = useCallback((distance = 100, config = timingConfigs.default) => {
    translateX.value = distance;
    translateX.value = withTiming(0, config);
  }, [translateX]);
  
  const slideInFromLeft = useCallback((distance = -100, config = timingConfigs.default) => {
    translateX.value = distance;
    translateX.value = withTiming(0, config);
  }, [translateX]);
  
  const slideInFromTop = useCallback((distance = -100, config = timingConfigs.default) => {
    translateY.value = distance;
    translateY.value = withTiming(0, config);
  }, [translateY]);
  
  const slideInFromBottom = useCallback((distance = 100, config = timingConfigs.default) => {
    translateY.value = distance;
    translateY.value = withTiming(0, config);
  }, [translateY]);
  
  return {
    translateX,
    translateY,
    slideTo,
    slideInFromRight,
    slideInFromLeft,
    slideInFromTop,
    slideInFromBottom,
  };
}

/**
 * Hook for staggered animations (for lists)
 */
export function useStaggeredAnimation(itemCount: number) {
  const getStaggeredDelay = useCallback((index: number, baseDelay = 50) => {
    return index * baseDelay;
  }, []);
  
  const animateSequence = useCallback((
    animationFn: (index: number, delay: number) => void,
    baseDelay = 50
  ) => {
    for (let i = 0; i < itemCount; i++) {
      const delay = getStaggeredDelay(i, baseDelay);
      animationFn(i, delay);
    }
  }, [itemCount, getStaggeredDelay]);
  
  return {
    getStaggeredDelay,
    animateSequence,
  };
}
