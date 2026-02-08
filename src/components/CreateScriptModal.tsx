import { useState } from 'react';
import { toast } from 'react-toastify';
import { scriptService } from '../services/scriptService';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateScriptModal({ onClose, onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [jiraTaskId, setJiraTaskId] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // اعتبارسنجی ساده
        if (!title || !content || !serviceName) {
            toast.warning("لطفاً فیلدهای اجباری را پر کنید!");
            return;
        }

        setLoading(true);
        try {
            await scriptService.create({
                title,
                content,
                jiraTaskId,
                serviceName
            });
            toast.success("اسکریپت با موفقیت ساخته شد! 🎉");
            onSuccess(); // رفرش کردن لیست در کامپوننت پدر
            onClose();   // بستن مودال
        } catch (error) {
            console.error(error);
            toast.error("خطا در ساخت اسکریپت.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>📝 اسکریپت جدید</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>عنوان اسکریپت *</label>
                        <input
                            className="form-input"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="مثلاً: اصلاح دیتای مشتریان"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>نام سرویس *</label>
                        <input
                            className="form-input"
                            value={serviceName}
                            onChange={e => setServiceName(e.target.value)}
                            placeholder="مثلاً: User-Service"
                        />
                    </div>

                    <div className="form-group">
                        <label>شماره تسک جیرا</label>
                        <input
                            className="form-input"
                            value={jiraTaskId}
                            onChange={e => setJiraTaskId(e.target.value)}
                            placeholder="مثلاً: JIRA-123"
                        />
                    </div>

                    <div className="form-group">
                        <label>کد SQL *</label>
                        <textarea
                            className="form-input"
                            style={{minHeight: '120px', fontFamily: 'monospace', direction: 'ltr'}}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="UPDATE table SET ..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            انصراف
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'در حال ثبت...' : 'ذخیره اسکریپت'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}