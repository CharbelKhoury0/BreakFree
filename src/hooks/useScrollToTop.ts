/**
 * Custom hook for scroll-to-top functionality
 * Provides a reusable function to scroll to the top of the page with smooth behavior
 */
export const useScrollToTop = () => {
  return () => {
    window.scrollTo({ 
      top: 0, 
      left: 0,
      behavior: 'smooth' 
    });
  };
};

/**
 * Enhanced hook that combines navigation with scroll-to-top
 * Useful for components that need both navigation and scroll functionality
 */
export const useNavigateWithScroll = () => {
  const scrollToTop = useScrollToTop();
  
  return (callback?: () => void) => {
    return () => {
      // Execute any custom callback first
      if (callback) {
        callback();
      }
      
      // Scroll to top
      scrollToTop();
    };
  };
};

export default useScrollToTop;