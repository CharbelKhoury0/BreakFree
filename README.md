BreakFree

# BreakFree - Addiction Recovery Website with Blog CMS

A comprehensive addiction recovery website built with React, TypeScript, and Supabase, featuring a complete blog CMS system.

## Features

### Frontend
- **Modern React Application**: Built with TypeScript, Tailwind CSS, and Framer Motion
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Authentication System**: Complete user registration, login, and profile management
- **Blog Management**: Full-featured blog editor with rich content creation
- **Protected Routes**: Role-based access control for admin features
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML

### Backend (Supabase)
- **PostgreSQL Database**: Robust relational database with proper indexing
- **Row Level Security (RLS)**: Fine-grained access control policies
- **Real-time Subscriptions**: Live updates for collaborative features
- **Authentication**: Built-in user management with JWT tokens
- **File Storage**: Secure file uploads and management
- **Edge Functions**: Serverless functions for custom business logic

### Email Marketing (MailerLite)
- **Newsletter Subscriptions**: Automated email capture forms
- **Lead Segmentation**: Custom fields for recovery stage and interests
- **Free Ebook Delivery**: Automated lead magnets with email delivery
- **Source Tracking**: Track where subscribers come from
- **Error Handling**: Graceful handling of duplicates and API errors

### Blog CMS Features
- **Rich Content Editor**: Full-featured blog post creation and editing
- **Draft/Publish Workflow**: Save drafts and publish when ready
- **SEO Management**: Meta titles, descriptions, and URL slugs
- **Tag System**: Categorize and filter blog posts
- **Image Management**: Featured images and inline media
- **User Roles**: Admin and author permissions
- **Search & Filtering**: Full-text search and tag-based filtering
- **Pagination**: Efficient content loading with pagination
- **View Tracking**: Blog post analytics and view counts

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd breakfree
npm install
```

2. **Set up Supabase**:
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`

3. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your Supabase and MailerLite credentials
```

   Required variables:
   ```env
   # Supabase
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # MailerLite (optional - for email subscriptions)
   VITE_MAILERLITE_API_KEY=your_mailerlite_api_key
   VITE_MAILERLITE_GROUP_ID=your_default_group_id
   ```

4. **Run database migrations**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and run the SQL from `supabase/migrations/create_blogs_system.sql`

5. **Set up MailerLite (optional)**:
   - See `MAILERLITE_SETUP.md` for detailed setup instructions
   - Required for email subscriptions and lead capture

6. **Start the development server**:
```bash
npm run dev
```

## Database Schema

### Tables

#### `profiles`
- User profile information linked to Supabase auth
- Roles: 'user' (default) or 'admin'
- Automatic profile creation on user registration

#### `blogs`
- Complete blog post data with SEO fields
- Author relationship to profiles
- Published/draft status
- Tag system and view tracking
- Automatic slug generation

### Security (RLS Policies)

#### Public Access
- Anyone can read published blog posts
- Public access to author profiles (limited fields)

#### Authenticated Users
- Can create new blog posts
- Can edit/delete their own posts
- Can update their own profile

#### Admin Users
- Full access to all blog posts
- Can manage user roles
- Can access admin dashboard

## API Documentation

### Authentication Endpoints

```typescript
// Sign up new user
AuthService.signUp(email: string, password: string, fullName?: string)

// Sign in existing user
AuthService.signIn(email: string, password: string)

// Sign out current user
AuthService.signOut()

// Get current user
AuthService.getCurrentUser()

// Update user profile
AuthService.updateProfile(updates: Partial<Profile>)
```

### Blog CRUD Operations

```typescript
// Create new blog post (authenticated)
BlogService.createBlog(blogData: Omit<BlogInsert, 'author_id'>)

// Update existing blog post (author/admin only)
BlogService.updateBlog(id: string, updates: BlogUpdate)

// Delete blog post (author/admin only)
BlogService.deleteBlog(id: string)

// Get single blog post by ID
BlogService.getBlogById(id: string, incrementViews?: boolean)

// Get single blog post by slug
BlogService.getBlogBySlug(slug: string, incrementViews?: boolean)

// Get paginated blogs with filters
BlogService.getBlogs(page: number, pageSize: number, filters: BlogFilters)

// Get published blogs (public)
BlogService.getPublishedBlogs(page: number, pageSize: number, search?: string, tags?: string[])

// Get user's own blogs
BlogService.getUserBlogs(page: number, pageSize: number)

// Search blogs
BlogService.searchBlogs(query: string, page: number, pageSize: number)

// Get all available tags
BlogService.getAllTags()
```

### MailerLite Email Operations

```typescript
// Subscribe to newsletter
mailerLiteService.subscribeToNewsletter(email: string, source?: string)

// Subscribe with free ebook capture
mailerLiteService.subscribeToFreeEbook({
  firstName: string,
  email: string,
  recoveryStage?: string,
  primaryChallenge?: string
})

// Subscribe with interest tracking
mailerLiteService.subscribeWithInterest({
  email: string,
  name?: string,
  interest: string,
  source: string
})
```

### Response Format

All API responses follow a consistent format:

```typescript
// Single item response
{
  data: T | null;
  error: any;
}

// Paginated response
{
  data: {
    data: T[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  error: any;
}
```

## Usage Examples

### Creating a Blog Post

```typescript
import { BlogService } from './services/blogService';

const createPost = async () => {
  const { data, error } = await BlogService.createBlog({
    title: "My First Blog Post",
    content: "This is the content of my blog post...",
    excerpt: "A brief description",
    slug: "my-first-blog-post",
    published: true,
    tags: ["recovery", "motivation"],
    meta_title: "My First Blog Post - BreakFree",
    meta_description: "Learn about recovery in this inspiring post"
  });

  if (error) {
    console.error('Failed to create blog:', error);
  } else {
    console.log('Blog created:', data);
  }
};
```

### Fetching Published Blogs

```typescript
import { BlogService } from './services/blogService';

const loadBlogs = async () => {
  const { data, error } = await BlogService.getPublishedBlogs(
    1, // page
    10, // page size
    "recovery", // search term
    ["motivation", "tips"] // tags filter
  );

  if (error) {
    console.error('Failed to load blogs:', error);
  } else {
    console.log('Blogs loaded:', data);
    // data.data contains the blog posts
    // data.totalPages, data.hasNextPage, etc. for pagination
  }
};
```

### User Authentication

```typescript
import { useAuth } from './hooks/useAuth';

const MyComponent = () => {
  const { user, signIn, signOut, loading } = useAuth();

  const handleLogin = async () => {
    const { error } = await signIn('user@example.com', 'password');
    if (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
    </div>
  );
};
```

### Email Subscription

```typescript
import { mailerLiteService } from './services/mailerlite';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const result = await mailerLiteService.subscribeToNewsletter(
      email, 
      'website_footer'
    );
    
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      console.error('Subscription failed:', result.message);
    }
  };

  return (
    <form onSubmit={handleSubscribe}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'success' && <p>Successfully subscribed!</p>}
      {status === 'error' && <p>Subscription failed. Please try again.</p>}
    </form>
  );
};
```

## Security Considerations

### Input Validation
- All user inputs are validated on both client and server side
- SQL injection protection through parameterized queries
- XSS prevention through proper escaping

### Authentication & Authorization
- JWT tokens with automatic refresh
- Row Level Security (RLS) policies enforce data access rules
- Role-based permissions for admin features

### Data Protection
- Sensitive data encrypted at rest
- HTTPS enforced for all communications
- User passwords hashed with bcrypt

## Deployment

### Frontend Deployment
The application is configured for deployment on various platforms:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Setup
1. Create Supabase project
2. Go to your Supabase dashboard → SQL Editor
3. Copy and paste the entire contents of `supabase/migrations/create_complete_system.sql`
4. Click "Run" to execute the migration
3. Configure RLS policies
4. Set up environment variables

### Environment Variables
Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_MAILERLITE_API_KEY`: Your MailerLite API key
- `VITE_MAILERLITE_GROUP_ID`: Your MailerLite group ID

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Supabase.