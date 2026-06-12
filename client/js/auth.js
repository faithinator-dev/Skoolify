// Auth logic
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button');

    // Visual feedback
    submitBtn.disabled = true;
    submitBtn.innerText = 'Signing in...';

    const result = await apiRequest('/auth/login', 'POST', { email, password });

    if (result.token) {
        // 1. Store the token
        localStorage.setItem('token', result.token);
        // 2. Store basic user info if returned
        if (result.role) localStorage.setItem('role', result.role);
        
        // 3. Redirect based on role
        if (result.role === 'super_admin') {
            window.location.href = 'super-admin.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        alert(result.message || 'Login failed. Please check your credentials.');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Sign in';
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Simple route protection
if (!localStorage.getItem('token') && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
}