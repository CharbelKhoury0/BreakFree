export const usePageTransition = jest.fn(() => ({
  isLoading: false,
  startTransition: jest.fn(),
  endTransition: jest.fn(),
}));