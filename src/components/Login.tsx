import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // درخواست لاگین به بکند
      const response = await axios.post('/api/auth/authenticate', {
        username,
        password
      });

      // ذخیره توکن
      localStorage.setItem('token', response.data.token);

      toast.success("خوش آمدید! 👋");

      // ریدارکت به داشبورد
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);

    } catch (error) {
      console.error("Login Error:", error);
      toast.error("نام کاربری یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>ورود به پنل 🔐</h2>
          <p>برای مدیریت اسکریپت‌ها وارد شوید</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>نام کاربری</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="مثلاً admin"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>رمز عبور</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;