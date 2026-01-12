// Configuration for API endpoints
// Using Supabase for direct database access
// Backend API is available for legacy endpoints if needed

const config = {
  // Development - Backend available for legacy endpoints
  development: {
    API_URL: 'http://localhost:5001/api',
    USE_SUPABASE: true
  },
  
  // Production - Backend available for legacy endpoints
  production: {
    API_URL: 'https://superbot-animated-ui.onrender.com/api',
    USE_SUPABASE: true
  }
};

// Get current environment
const env = import.meta.env.MODE || 'development';

// Export the appropriate configuration
export const API_BASE = import.meta.env.VITE_API_URL || config[env].API_URL;
export const USE_SUPABASE = config[env].USE_SUPABASE;

// Log the configuration being used (for debugging)
console.log('🌐 API Config:', {
  apiUrl: API_BASE,
  useSupabase: USE_SUPABASE,
  environment: env
}); 