// Performance monitoring utilities

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer?: PerformanceObserver;

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe paint metrics
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        }
      });
      this.observer.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Time to First Byte
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        this.metrics.ttfb = timing.responseStart - timing.navigationStart;
      });
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  logMetrics(): void {
    console.group('🚀 Performance Metrics');
    console.log('First Contentful Paint (FCP):', this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'Not available');
    console.log('Largest Contentful Paint (LCP):', this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'Not available');
    console.log('First Input Delay (FID):', this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'Not available');
    console.log('Cumulative Layout Shift (CLS):', this.metrics.cls ? this.metrics.cls.toFixed(4) : 'Not available');
    console.log('Time to First Byte (TTFB):', this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'Not available');
    console.groupEnd();
  }

  // Report metrics to analytics service
  reportMetrics(endpoint?: string): void {
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics: this.metrics,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      }).catch(console.error);
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Resource loading optimization
export const preloadResource = (href: string, as: string, type?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

export const prefetchResource = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string): void => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Font loading optimization
export const preloadFont = (href: string, type = 'font/woff2'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = 'font';
  link.type = type;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

// Bundle size tracking
export const trackBundleSize = (): void => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') && !resource.name.includes('node_modules')
      );
      
      let totalSize = 0;
      jsResources.forEach(resource => {
        if (resource.transferSize) {
          totalSize += resource.transferSize;
        }
      });
      
      console.log(`📦 Total JS Bundle Size: ${(totalSize / 1024).toFixed(2)} KB`);
    });
  }
};

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-report metrics after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logMetrics();
      trackBundleSize();
    }, 2000);
  });
}