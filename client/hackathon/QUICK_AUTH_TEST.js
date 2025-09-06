// QUICK AUTHENTICATION TEST
// Copy and paste this into your browser console on the admin/register page

console.log('🔍 AUTHENTICATION DEBUG TEST');
console.log('================================');

// 1. Check localStorage
console.log('📦 localStorage user:', localStorage.getItem('user'));
console.log('📦 localStorage userRole:', localStorage.getItem('userRole'));

// 2. Check cookies
console.log('🍪 All cookies:', document.cookie);

// 3. Test authentication with user/profile endpoint
fetch('http://localhost:8000/api/v1/user/profile', {
  method: 'GET',
  credentials: 'include'
})
.then(response => {
  console.log('👤 User profile test status:', response.status);
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then(err => {
      throw new Error(`${response.status}: ${err.message || 'Unknown error'}`);
    });
  }
})
.then(data => {
  console.log('✅ User profile test SUCCESS:', data);
})
.catch(error => {
  console.error('❌ User profile test FAILED:', error.message);
});

// 4. Test admin endpoint directly
fetch('http://localhost:8000/api/v1/admin/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({
    test: true,
    user: 'dummy-id',
    role: 'admin',
    gender: 'male',
    contactInfo: {
      phone: '+1234567890',
      address: 'Test Address'
    },
    location: 'Test Location'
  })
})
.then(response => {
  console.log('🏥 Admin endpoint test status:', response.status);
  return response.json();
})
.then(data => {
  if (data.success) {
    console.log('✅ Admin endpoint test SUCCESS:', data);
  } else {
    console.error('❌ Admin endpoint test FAILED:', data);
  }
})
.catch(error => {
  console.error('❌ Admin endpoint test ERROR:', error);
});

console.log('================================');
console.log('📋 Instructions:');
console.log('1. If user profile test FAILS → You need to login again');
console.log('2. If no cookies shown → Authentication cookies not set');
console.log('3. If admin endpoint shows same error → Backend auth issue');
