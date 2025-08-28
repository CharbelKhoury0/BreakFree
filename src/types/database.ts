export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'user' | 'admin';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'user' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'user' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          slug: string;
          author_id: string;
          published: boolean;
          featured_image: string | null;
          tags: string[];
          meta_title: string | null;
          meta_description: string | null;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          slug: string;
          author_id: string;
          published?: boolean;
          featured_image?: string | null;
          tags?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          slug?: string;
          author_id?: string;
          published?: boolean;
          featured_image?: string | null;
          tags?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      generate_slug: {
        Args: { title: string };
        Returns: string;
      };
      increment_blog_views: {
        Args: { blog_id: string };
        Returns: void;
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
export type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export interface BlogWithAuthor extends Blog {
  profiles: Profile;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BlogFilters {
  published?: boolean;
  authorId?: string;
  tags?: string[];
  search?: string;
}