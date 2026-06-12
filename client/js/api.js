const API_URL = 'http://localhost:2180/api';

async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);

        const data = await response.json();

        // 🚨 Handle server errors properly
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;

    } catch (error) {
        console.error('API Error:', error.message);
        showToast(error.message, 'danger');

        return {
            success: false,
            message: error.message
        };
    }
}

// 🎩 High-End Toast System
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'toast-container';
        document.body.appendChild(div);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : (type === 'danger' ? 'fa-circle-exclamation' : 'fa-info-circle');
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}