import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import { useAuth } from '../../hooks/useAuth';
import { usePageTransition } from '../../hooks/usePageTransition';

// Mock the hooks
jest.mock('../../hooks/useAuth');
jest.mock('../../hooks/usePageTransition');
jest.mock('../../utils/scrollToTop');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUsePageTransition = usePageTransition as jest.MockedFunction<typeof usePageTransition>;

// Mock component wrapper
const NavigationWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navigation Component', () => {
  const mockSignOut = jest.fn();
  const mockUpdateProfile = jest.fn();
  const mockStartTransition = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUsePageTransition.mockReturnValue({
      isLoading: false,
      startTransition: mockStartTransition,
      endTransition: jest.fn(),
    });

    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  afterEach(() => {
    // Clean up any body styles that might be set during tests
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.position = '';
    document.documentElement.style.width = '';
    document.documentElement.style.height = '';
  });

  describe('When user is not logged in', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
      user: null,
      session: null,
      profile: null,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signInWithGoogle: jest.fn(),
      signOut: mockSignOut,
      updateProfile: mockUpdateProfile,
      isAdmin: false,
    });
    });

    test('renders navigation with logo and menu button', () => {
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      expect(screen.getByText('BreakFree')).toBeDefined();
      expect(screen.getByLabelText('Toggle mobile menu')).toBeDefined();
    });

    test('shows Sign In button in mobile menu when not logged in', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Check if Sign In button is visible
      await waitFor(() => {
        expect(screen.getByText('Sign In')).toBeDefined();
      });
    });

    test('mobile menu opens and closes correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      
      // Open menu
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(screen.getByLabelText('Close mobile menu')).toBeDefined();
      });

      // Close menu
      const closeButton = screen.getByLabelText('Close mobile menu');
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByLabelText('Close mobile menu')).toBeNull();
      });
    });

    test('applies scroll lock when mobile menu is open', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      
      // Open menu
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
        expect(document.body.style.position).toBe('fixed');
      });
    });

    test('removes scroll lock when mobile menu is closed', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      
      // Open menu
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      // Close menu
      const closeButton = screen.getByLabelText('Close mobile menu');
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('');
        expect(document.body.style.position).toBe('');
      });
    });
  });

  describe('When user is logged in', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
      email_confirmed_at: '2023-01-01T00:00:00Z',
      phone_confirmed_at: null,
      confirmation_sent_at: null,
      recovery_sent_at: null,
      email_change_sent_at: null,
      new_email: null,
      invited_at: null,
      action_link: null,
      email_change: null,
      phone_change: null,
      phone: null,
      confirmed_at: '2023-01-01T00:00:00Z',
      email_change_confirm_status: 0,
      banned_until: null,
      reauthentication_sent_at: null,
      is_anonymous: false,
      role: 'authenticated',
      last_sign_in_at: '2023-01-01T00:00:00Z',
      identities: [],
      factors: []
    } as any;

    const mockProfile = {
      id: '123',
      email: 'test@example.com',
      full_name: 'Test User',
      role: 'user' as const,
      avatar_url: null,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    };

    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: mockUser,
        session: { user: mockUser } as any,
        profile: mockProfile,
        loading: false,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signInWithGoogle: jest.fn(),
        signOut: mockSignOut,
        updateProfile: mockUpdateProfile,
        isAdmin: false,
      });
    });

    test('shows profile section in mobile menu when logged in', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Check if profile section is visible
      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeDefined();
        expect(screen.getByText('Member')).toBeDefined();
        expect(screen.getByText('View Profile')).toBeDefined();
        expect(screen.getByText('Sign Out')).toBeDefined();
      });
    });

    test('does not show Sign In button when logged in', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Check that Sign In button is not present
      await waitFor(() => {
        expect(screen.queryByText('Sign In')).toBeNull();
      });
    });

    test('calls signOut when Sign Out button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Click Sign Out button
      const signOutButton = await screen.findByText('Sign Out');
      await user.click(signOutButton);

      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  describe('When user is admin', () => {
    const mockUser = {
      id: '123',
      email: 'admin@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
      email_confirmed_at: '2023-01-01T00:00:00Z',
      phone_confirmed_at: null,
      confirmation_sent_at: null,
      recovery_sent_at: null,
      email_change_sent_at: null,
      new_email: null,
      invited_at: null,
      action_link: null,
      email_change: null,
      phone_change: null,
      phone: null,
      confirmed_at: '2023-01-01T00:00:00Z',
      email_change_confirm_status: 0,
      banned_until: null,
      reauthentication_sent_at: null,
      is_anonymous: false,
      role: 'authenticated',
      last_sign_in_at: '2023-01-01T00:00:00Z',
      identities: [],
      factors: []
    } as any;

    const mockProfile = {
      id: '123',
      email: 'admin@example.com',
      full_name: 'Admin User',
      role: 'admin' as const,
      avatar_url: null,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    };

    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: mockUser,
        session: { user: mockUser } as any,
        profile: mockProfile,
        loading: false,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signInWithGoogle: jest.fn(),
        signOut: mockSignOut,
        updateProfile: mockUpdateProfile,
        isAdmin: true,
      });
    });

    test('shows admin dashboard link when user is admin', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Check if admin dashboard link is visible
      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeDefined();
      });
    });
  });

  describe('Navigation interactions', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
        profile: null,
        loading: false,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signInWithGoogle: jest.fn(),
        signOut: mockSignOut,
        updateProfile: mockUpdateProfile,
        isAdmin: false,
      });
    });

    test('shows dropdown menu items when Programs is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Click Programs to open dropdown
      const programsButton = await screen.findByText('Programs');
      await user.click(programsButton);

      // Check if dropdown items are visible
      await waitFor(() => {
        expect(screen.getByText('1-on-1 Mentorship')).toBeDefined();
        expect(screen.getByText('Community')).toBeDefined();
        expect(screen.getByText('Recovery Sessions')).toBeDefined();
        expect(screen.getByText('Ebooks')).toBeDefined();
        expect(screen.getByText('Tools')).toBeDefined();
      });
    });

    test('shows dropdown menu items when Resources is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(menuButton);

      // Click Resources to open dropdown
      const resourcesButton = await screen.findByText('Resources');
      await user.click(resourcesButton);

      // Check if dropdown items are visible
      await waitFor(() => {
        expect(screen.getByText('Addiction Calculator')).toBeDefined();
        expect(screen.getByText('Free Ebook')).toBeDefined();
        expect(screen.getByText('Blog')).toBeDefined();
      });
    });
  });

  describe('Responsive behavior', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
        profile: null,
        loading: false,
        signIn: jest.fn(),
        signUp: jest.fn(),
        signInWithGoogle: jest.fn(),
        signOut: mockSignOut,
        updateProfile: mockUpdateProfile,
        isAdmin: false,
      });
    });

    test('mobile menu is hidden on desktop', () => {
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Mobile menu button should be hidden on desktop (md:hidden class)
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      expect(menuButton.className).toContain('md:hidden');
    });

    test('desktop menu is hidden on mobile', () => {
      render(
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      );

      // Desktop menu should be hidden on mobile (hidden md:flex class)
      const desktopMenu = screen.getByText('Programs').closest('div');
      expect(desktopMenu?.parentElement?.className).toContain('hidden');
      expect(desktopMenu?.parentElement?.className).toContain('md:flex');
    });
  });
});