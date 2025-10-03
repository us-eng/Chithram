
import React, { useState, useEffect } from 'react';

export const useOnScreen = <T extends Element,>(ref: React.RefObject<T>, rootMargin: string = '0px'): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          // Optional: unobserve after it's visible once
          // observer.unobserve(entry.target);
        } else {
            setIntersecting(false);
        }
      },
      {
        rootMargin,
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
