import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { 
  Blog, 
  BlogInsert, 
  BlogUpdate, 
  BlogWithAuthor, 
  PaginatedResponse, 
  BlogFilters 
} from '../types/database';

export class BlogService {
  /**
   * Create a new blog post
   */
  static async createBlog(blogData: Omit<BlogInsert, 'author_id'>): Promise<{ data: Blog | null; error: any }> {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert({
          ...blogData,
          author_id: user.id
        })
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Update an existing blog post
   */
  static async updateBlog(id: string, updates: BlogUpdate): Promise<{ data: Blog | null; error: any }> {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      // Check if user owns the blog or is admin
      const { data: blog, error: fetchError } = await supabase
        .from('blogs')
        .select('author_id, profiles!inner(role)')
        .eq('id', id)
        .single();

      if (fetchError) {
        return { data: null, error: fetchError };
      }

      const userProfile = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      const isOwner = blog.author_id === user.id;
      const isAdmin = userProfile.data?.role === 'admin';

      if (!isOwner && !isAdmin) {
        return { data: null, error: { message: 'Unauthorized to update this blog' } };
      }



      const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Delete a blog post
   */
  static async deleteBlog(id: string): Promise<{ error: any }> {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        return { error: { message: 'User not authenticated' } };
      }

      // Check if user owns the blog or is admin
      const { data: blog, error: fetchError } = await supabase
        .from('blogs')
        .select('author_id')
        .eq('id', id)
        .single();

      if (fetchError) {
        return { error: fetchError };
      }

      const userProfile = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      const isOwner = blog.author_id === user.id;
      const isAdmin = userProfile.data?.role === 'admin';

      if (!isOwner && !isAdmin) {
        return { error: { message: 'Unauthorized to delete this blog' } };
      }

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      return { error };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Get a single blog post by ID
   */
  static async getBlogById(id: string, incrementViews = false): Promise<{ data: BlogWithAuthor | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles (
            id,
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        return { data: null, error };
      }

      // Increment view count if requested and blog is published
      if (incrementViews && data.published) {
        await supabase.rpc('increment_blog_views', { blog_id: id });
      }

      return { data: data as BlogWithAuthor, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }



  /**
   * Get paginated list of blogs with filters
   */
  static async getBlogs(
    page = 1,
    pageSize = 10,
    filters: BlogFilters = {}
  ): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }> {
    if (!isSupabaseConfigured) {
      // Return empty data when Supabase is not configured
      const emptyResponse: PaginatedResponse<BlogWithAuthor> = {
        data: [],
        count: 0,
        page,
        pageSize,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
      return { data: emptyResponse, error: null };
    }
    
    try {
      let query = supabase
        .from('blogs')
        .select(`
          *,
          profiles (
            id,
            full_name,
            email,
            avatar_url
          )
        `, { count: 'exact' });

      // Apply filters
      if (filters.published !== undefined) {
        query = query.eq('published', filters.published);
      }

      if (filters.authorId) {
        query = query.eq('author_id', filters.authorId);
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
      }

      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        return { data: null, error };
      }

      const totalPages = Math.ceil((count || 0) / pageSize);

      const paginatedResponse: PaginatedResponse<BlogWithAuthor> = {
        data: data as BlogWithAuthor[],
        count: count || 0,
        page,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      };

      return { data: paginatedResponse, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Get user's own blogs
   */
  static async getUserBlogs(
    page = 1,
    pageSize = 10
  ): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      return this.getBlogs(page, pageSize, { authorId: user.id });
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Get published blogs (public endpoint)
   */
  static async getPublishedBlogs(
    page = 1,
    pageSize = 10,
    search?: string,
    tags?: string[]
  ): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }> {
    return this.getBlogs(page, pageSize, {
      published: true,
      search,
      tags
    });
  }

  /**
   * Debug function to get all blog records
   */
  static async getAllBlogsDebug(): Promise<{ data: BlogWithAuthor[] | null; error: any }> {
    try {
      console.log('🔍 Fetching all blog records from Supabase...');
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles (
            id,
            full_name,
            email,
            avatar_url,
            role
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching blog records:', error);
        return { data: null, error };
      }

      console.log(`📊 Found ${data?.length || 0} blog records:`);
      
      if (data && data.length > 0) {
        data.forEach((blog, index) => {
          console.log(`\n📝 Blog ${index + 1}:`);
          console.log(`   ID: ${blog.id}`);
          console.log(`   Title: ${blog.title}`);
          console.log(`   Author: ${blog.profiles?.full_name || blog.profiles?.email || 'Unknown'}`);
          console.log(`   Published: ${blog.published ? '✅ Yes' : '❌ No'}`);
          console.log(`   Created: ${new Date(blog.created_at).toLocaleDateString()}`);
          console.log(`   Tags: ${blog.tags?.join(', ') || 'None'}`);
          console.log(`   Views: ${blog.view_count || 0}`);
          if (blog.excerpt) {
            console.log(`   Excerpt: ${blog.excerpt.substring(0, 100)}${blog.excerpt.length > 100 ? '...' : ''}`);
          }
        });
      } else {
        console.log('📭 No blog records found in the database.');
      }

      return { data: data as BlogWithAuthor[], error: null };
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      return { data: null, error };
    }
  }

  /**
   * Get blog tags (for filtering)
   */
  static async getAllTags(): Promise<{ data: string[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('tags')
        .eq('published', true);

      if (error) {
        return { data: null, error };
      }

      // Flatten and deduplicate tags
      const allTags = data
        .flatMap(blog => blog.tags || [])
        .filter((tag, index, array) => array.indexOf(tag) === index)
        .sort();

      return { data: allTags, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Search blogs
   */
  static async searchBlogs(
    query: string,
    page = 1,
    pageSize = 10
  ): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }> {
    return this.getPublishedBlogs(page, pageSize, query);
  }
}