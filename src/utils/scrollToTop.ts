/**
 * Utility function to scroll to the top of the page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * Higher-order function that wraps an existing click handler with scroll-to-top functionality
 * @param originalHandler - The original click handler function
 * @returns A new function that calls the original handler and then scrolls to top
 */
export const withScrollToTop = (originalHandler?: () => void) => {
  return () => {
    if (originalHandler) {
      originalHandler();
    }
    scrollToTop();
  };
};

/**
 * React Router navigation with scroll to top
 * @param navigate - React Router navigate function
 * @param path - The path to navigate to
 */
export const navigateWithScrollToTop = (navigate: (path: string) => void, path: string) => {
  navigate(path);
  // Small delay to ensure navigation completes before scrolling
  setTimeout(() => {
    scrollToTop();
  }, 100);
};