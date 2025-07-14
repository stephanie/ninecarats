import { useEffect, useState } from 'react';

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      // Tablet breakpoint: 768px to 1023px
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };

    // Check on mount
    checkIsTablet();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsTablet);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsTablet);
  }, []);

  return isTablet;
} 