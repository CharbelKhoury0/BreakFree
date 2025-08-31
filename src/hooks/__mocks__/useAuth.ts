export const useAuth = jest.fn(() => ({
  user: null,
  profile: null,
  signOut: jest.fn(),
  updateProfile: jest.fn(),
  isAdmin: false,
}));