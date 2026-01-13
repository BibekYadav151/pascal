import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  ...props
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span className={className} {...props}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;