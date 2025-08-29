import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Track location changes to show loading
  useEffect(() => {
    setIsLoading(false);
  }, [location]);

  const startTransition = () => {
    setIsLoading(true);
  };

  const endTransition = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    startTransition,
    endTransition
  };
};