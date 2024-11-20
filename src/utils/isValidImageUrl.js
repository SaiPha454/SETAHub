export function isValidImageUrl(url) {
    try {
      // Parse the URL
      const parsedUrl = new URL(url);
  
      // Ensure the URL has a valid domain (host must exist)
      if (!parsedUrl.hostname) {
        return false;
      }
  
      // Check for valid image file extensions
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
      const pathname = parsedUrl.pathname.toLowerCase();
  
      return validExtensions.some(extension => pathname.endsWith(extension));
    } catch (e) {
      // If URL parsing fails, it's not a valid URL
      return false;
    }
  }
  