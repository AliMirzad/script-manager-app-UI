import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// کامپوننت‌ها
import Login from './components/Login';
import CreateScriptModal from './components/CreateScriptModal';

// سرویس‌ها و تایپ‌ها
import { scriptService } from './services/scriptService';
import type { Script } from './types/script';

// استایل‌ها
import './App.css';

// تابع کمکی برای باز کردن توکن
function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

function Dashboard() {
    // 1. تعریف متغیرها (State)
    const [scripts, setScripts] = useState<Script[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. گرفتن اطلاعات یوزر از توکن
    const token = localStorage.getItem('token');
    const user = token ? parseJwt(token) : null;
    const username = user ? user.sub : 'کاربر مهمان';

    // 3. لود کردن اسکریپت‌ها
    useEffect(() => {
        loadScripts();
    }, []);

    const loadScripts = async () => {
        try {
            const data = await scriptService.getAll();
            setScripts(data);
        } catch (error) {
            console.error(error);
            toast.error("خطا در دریافت اطلاعات. شاید توکن منقضی شده؟");
        } finally {
            setLoading(false);
        }
    };

    // 4. تابع خروج
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    // 5. ظاهر صفحه (UI)
    return (
        <div className="dashboard-layout">
            {/* نوار بالای صفحه */}
            <nav className="top-nav">
                <div className="brand">
                    <h1>مدیریت اسکریپت‌ها ⚡️</h1>

                    {/* دکمه افزودن اسکریپت جدید */}
                    <button
                        className="btn-primary"
                        style={{marginRight: '20px', fontSize: '0.9rem'}}
                        onClick={() => setIsModalOpen(true)}
                    >
                        + اسکریپت جدید
                    </button>
                </div>

                {/* ✅ بخش اصلاح شده برای هماهنگی با CSS جدید */}
                <div className="user-profile">
                    <div className="user-avatar">
                        {username.charAt(0).toUpperCase()}
                    </div>

                    <div className="user-info-text">
                        <span className="user-name">{username}</span>
                        <span className="user-role">توسعه‌دهنده ارشد</span>
                    </div>

                    <div className="separator"></div>

                    <button onClick={handleLogout} className="btn-logout">
                        خروج
                    </button>
                </div>
            </nav>

            {/* لیست کارت‌ها */}
            {loading ? (
                <div style={{textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: 'var(--primary)'}}>
                    در حال دریافت اطلاعات... ⏳
                </div>
            ) : scripts.length === 0 ? (
                <div className="empty-state">
                    <h2>هنوز هیچ اسکریپتی نیست! 📂</h2>
                    <p>برای شروع دکمه <b>"+ اسکریپت جدید"</b> را بزنید.</p>
                </div>
            ) : (
                <div className="grid-container">
                    {scripts.map((script) => (
                        <div key={script.id} className="script-card">
                            <div className="card-header">
                                <h3 className="card-title">{script.title}</h3>
                                <span className="card-id">#{script.id}</span>
                            </div>

                            <div className="tags">
                                <span className="tag tag-service">
                                    🔌 {script.serviceName}
                                </span>
                                <span className="tag tag-jira">
                                    🎫 {script.jiraTaskId}
                                </span>
                            </div>

                            <div className="code-preview">
                                <code>{script.content}</code>
                            </div>
                        </div>
                    ))}
                    
                </div>
            )}

            {/* مودال (پاپ‌آپ) */}
            {isModalOpen && (
                <CreateScriptModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => loadScripts()}
                />
            )}
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <ToastContainer position="top-right" rtl />
        </Router>
    );
}

export default App;