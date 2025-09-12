import { useEffect, useState } from 'react';

interface BatteryInfo {
  isLowBattery: boolean;
  isCharging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

export function useLowPowerMode() {
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>(null);
  const [performanceReduced, setPerformanceReduced] = useState(false);

  useEffect(() => {
    const detectLowPower = async () => {
      // Check battery level
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          const batteryData = {
            isLowBattery: battery.level < 0.2, // Less than 20%
            isCharging: battery.charging,
            level: battery.level,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime
          };
          
          setBatteryInfo(batteryData);
          
          // Low power mode if battery is low and not charging
          if (batteryData.isLowBattery && !batteryData.isCharging) {
            setLowPowerMode(true);
          }
        } catch (error) {
          console.warn('Battery API not available:', error);
        }
      }

      // Check for reduced motion preference (often enabled in low power mode)
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setLowPowerMode(true);
      }

      // Check for slow connection (might indicate power saving)
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection && connection.effectiveType) {
        const isSlowConnection = ['slow-2g', '2g'].includes(connection.effectiveType);
        if (isSlowConnection) {
          setLowPowerMode(true);
        }
      }

      // Performance-based detection
      if ('performance' in window && 'now' in performance) {
        const start = performance.now();
        
        // Run a simple computation
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
          sum += Math.random();
        }
        
        const end = performance.now();
        const duration = end - start;
        
        // If computation takes significantly longer, might be low power mode
        if (duration > 20) {
          setPerformanceReduced(true);
          setLowPowerMode(true);
        }
      }
    };

    detectLowPower();

    // Listen for battery changes
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        battery.addEventListener('levelchange', detectLowPower);
        battery.addEventListener('chargingchange', detectLowPower);
      });
    }

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setLowPowerMode(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    lowPowerMode,
    batteryInfo,
    performanceReduced,
    shouldReduceAnimations: lowPowerMode || performanceReduced
  };
}
