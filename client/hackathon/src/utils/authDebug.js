// Authentication Debug Utilities

export const testAuthenticationStatus = async () => {
  console.log('🔍 Testing Authentication Status...');
  
  try {
    // Test with user profile endpoint (should require auth)
    const response = await fetch('http://localhost:8000/api/v1/user/profile', {
      method: 'GET',
      credentials: 'include',
    });
    
    console.log('👤 User profile test - Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Authentication working! User data:', data);
      return { authenticated: true, user: data };
    } else {
      const error = await response.json();
      console.error('❌ Authentication failed:', error);
      return { authenticated: false, error: error };
    }
  } catch (error) {
    console.error('❌ Network error during auth test:', error);
    return { authenticated: false, error: error.message };
  }
};

export const inspectCookies = () => {
  console.log('🍪 Current cookies:', document.cookie);
  
  // Look for common auth cookie names
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  console.log('🍪 Parsed cookies:', cookies);
  
  // Check for auth-related cookies
  const authCookies = Object.keys(cookies).filter(key => 
    key.toLowerCase().includes('token') || 
    key.toLowerCase().includes('auth') ||
    key.toLowerCase().includes('access')
  );
  
  console.log('🔑 Authentication cookies found:', authCookies);
  return { cookies, authCookies };
};

export const testAdminEndpoint = async () => {
  console.log('🧪 Testing admin endpoint directly...');
  
  try {
    const response = await fetch('http://localhost:8000/api/v1/admin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        test: true,
        user: 'test-user-id',
        role: 'admin',
        gender: 'male',
        contactInfo: {
          phone: '+1234567890',
          address: 'Test Address'
        },
        location: 'Test Location'
      }),
    });
    
    console.log('🎯 Admin endpoint test - Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Admin endpoint accessible:', data);
      return { success: true, data };
    } else {
      const error = await response.json();
      console.error('❌ Admin endpoint error:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('❌ Network error during admin endpoint test:', error);
    return { success: false, error: error.message };
  }
};

// Run all debug tests
export const runFullAuthDebug = async () => {
  console.log('🚀 Starting Full Authentication Debug...');
  console.log('================================================');
  
  // 1. Inspect cookies
  const cookieInfo = inspectCookies();
  
  // 2. Test authentication status
  const authStatus = await testAuthenticationStatus();
  
  // 3. Test admin endpoint
  const adminTest = await testAdminEndpoint();
  
  console.log('================================================');
  console.log('📊 Debug Summary:');
  console.log('🍪 Has auth cookies:', cookieInfo.authCookies.length > 0);
  console.log('🔐 User authenticated:', authStatus.authenticated);
  console.log('🏥 Admin endpoint accessible:', adminTest.success);
  console.log('================================================');
  
  return {
    cookies: cookieInfo,
    authentication: authStatus,
    adminEndpoint: adminTest
  };
};
