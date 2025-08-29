import { supabase } from '../lib/supabase';

export interface ImageUploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  quality?: number;
}

export interface ImageUploadResult {
  url: string;
  path: string;
}

class ImageService {
  private readonly defaultOptions: Required<ImageUploadOptions> = {
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    quality: 0.8
  };

  /**
   * Validates an image file
   */
  validateImage(file: File, options?: ImageUploadOptions): string | null {
    const opts = { ...this.defaultOptions, ...options };

    // Check file type
    if (!opts.allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${opts.allowedTypes.join(', ')}`;
    }

    // Check file size
    const maxSizeInBytes = opts.maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `File size too large. Maximum size: ${opts.maxSizeInMB}MB`;
    }

    return null;
  }

  /**
   * Compresses and optimizes an image with progress callback
   */
  private async compressImage(
    file: File, 
    quality: number = 0.8,
    onProgress?: (progress: number) => void
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      // Skip compression for small files (< 100KB)
      if (file.size < 100 * 1024) {
        onProgress?.(100);
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      const img = new Image();
      
      img.onload = () => {
        try {
          onProgress?.(25); // Image loaded
          
          // Calculate new dimensions (max 400x400 for avatars)
          const maxSize = 400;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          onProgress?.(50); // Canvas prepared

          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          onProgress?.(75); // Image drawn
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                onProgress?.(100); // Compression complete
                resolve(compressedFile);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            file.type,
            quality
          );
        } catch (error) {
          reject(error);
        } finally {
          // Clean up object URL
          URL.revokeObjectURL(img.src);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Uploads a profile picture to Supabase Storage with progress tracking
   */
  async uploadProfilePicture(
    file: File, 
    userId: string, 
    options?: ImageUploadOptions,
    onProgress?: (progress: number) => void
  ): Promise<ImageUploadResult> {
    // Validate the image
    const validationError = this.validateImage(file, options);
    if (validationError) {
      throw new Error(validationError);
    }

    try {
      onProgress?.(10); // Validation complete
      
      // Compress the image with progress tracking
      const compressedFile = await this.compressImage(
        file, 
        options?.quality,
        (compressionProgress) => {
          // Map compression progress to 10-60% of total progress
          onProgress?.(10 + (compressionProgress * 0.5));
        }
      );
      
      onProgress?.(60); // Compression complete
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;
      
      onProgress?.(70); // Preparing upload
      
      // Upload to Supabase Storage with upsert (replaces existing file)
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: true // This replaces existing files automatically
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      onProgress?.(90); // Upload complete

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      onProgress?.(100); // Process complete

      return {
        url: urlData.publicUrl,
        path: fileName
      };
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }

  /**
   * Deletes a user's profile picture efficiently
   */
  async deleteProfilePicture(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Try to delete common avatar file extensions directly (more efficient)
      const commonExtensions = ['jpg', 'jpeg', 'png', 'webp'];
      const deletePromises = commonExtensions.map(ext => 
        supabase.storage
          .from('avatars')
          .remove([`${userId}/avatar.${ext}`])
      );

      // Execute all deletions in parallel
      await Promise.allSettled(deletePromises);

      // If direct deletion didn't work, fall back to listing and deleting
      const { data: files, error: listError } = await supabase.storage
        .from('avatars')
        .list(userId);

      if (listError) {
        return { success: false, error: `Failed to list files: ${listError.message}` };
      }

      if (files && files.length > 0) {
        // Delete remaining files
        const filePaths = files.map(file => `${userId}/${file.name}`);
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove(filePaths);

        if (deleteError) {
          return { success: false, error: `Failed to delete files: ${deleteError.message}` };
        }
      }

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: `Deletion failed: ${errorMessage}` };
    }
  }

  /**
   * Gets the public URL for a profile picture
   */
  getProfilePictureUrl(path: string): string {
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
}

export const imageService = new ImageService();