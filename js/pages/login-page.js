// Login page - Google Auth
import { initContent } from '../content.js';
import { loginWithGoogle, onAuthChange } from '../auth.js';
import { icons } from '../icons.js';

async function init() {
  await initContent();

  // If already logged in, redirect to admin
  onAuthChange((user) => {
    if (user) {
      window.location.href = 'admin.html';
    }
  });

  document.getElementById('app').innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center text-white">
            ${icons.Lock(32)}
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Admin Login</h2>
        <p class="text-center text-sm text-gray-500 mb-6">Sign in with your authorized Google account</p>

        <div id="login-error" class="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium text-center hidden"></div>

        <button id="google-login-btn"
          class="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Sign in with Google
        </button>

        <div class="mt-6 pt-6 border-t border-gray-100">
          <a
            href="index.html"
            class="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            ${icons.ArrowLeft(16)} Back to Home
          </a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('google-login-btn').addEventListener('click', async () => {
    const btn = document.getElementById('google-login-btn');
    const errorEl = document.getElementById('login-error');
    errorEl.classList.add('hidden');

    btn.disabled = true;
    btn.innerHTML = `${icons.Loader2(20, 'animate-spin')} Signing in...`;

    try {
      await loginWithGoogle();
      window.location.href = 'admin.html';
    } catch (err) {
      errorEl.textContent = err.message || 'Login failed. Please try again.';
      errorEl.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Sign in with Google`;
    }
  });
}

init();
