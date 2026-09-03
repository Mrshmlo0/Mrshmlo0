import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, Check, KeyRound, Crown } from 'lucide-react';

export function AuthModal({ isOpen, onClose, currentUser, setCurrentUser, onAdminUnlocked, initialMode = 'login' }) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'register' | 'admin_pin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setPinError(false);
      setAdminPin('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleCustomerLogin = (e) => {
    e?.preventDefault();
    const cleanName = fullName.trim() || email.split('@')[0] || 'المشترك المحترم';
    setCurrentUser({
      name: cleanName,
      email: email || 'customer@omniai.com',
      role: 'customer',
      plan: 'باقة المحترفين (Pro)',
      isLoggedIn: true
    });
    alert(`👋 أهلاً بك يا ${cleanName}! تم تسجيل دخولك بنجاح.`);
    onClose();
  };

  const handleAdminPinSubmit = (e) => {
    e?.preventDefault();
    if (adminPin === '2026' || adminPin === 'admin' || adminPin === '1234') {
      setCurrentUser({
        name: 'صاحب المشروع والمدير التنفيذي',
        email: 'founder@omniai.com',
        role: 'owner',
        plan: 'مالك المنظومة (Unlimited Founder Access)',
        isLoggedIn: true
      });
      setPinError(false);
      onAdminUnlocked();
      onClose();
      alert('👑 تم فتح لوحة تحكم صاحب المشروع بنجاح!');
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode Switcher */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-indigo-600/30">
            {authMode === 'admin_pin' ? <KeyRound className="w-6 h-6 text-amber-300" /> : <User className="w-6 h-6" />}
          </div>

          <h3 className="text-xl font-black text-white">
            {authMode === 'admin_pin'
              ? 'دخول صاحب المشروع السري 👑'
              : authMode === 'login'
              ? 'تسجيل دخول المشترك'
              : 'إنشاء حساب عميل جديد'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'admin_pin'
              ? 'أدخل الرمز السري الخاص بك لفتح لوحة الأرباح والبيزنس'
              : 'سجل حسابك لحفظ أعمالك ومتابعة رصيد نقاطك'}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setAuthMode('login'); setPinError(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                authMode === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              دخول عميل
            </button>
            <button
              onClick={() => { setAuthMode('register'); setPinError(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                authMode === 'register' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              حساب جديد
            </button>
            <button
              onClick={() => { setAuthMode('admin_pin'); setPinError(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                authMode === 'admin_pin' ? 'bg-amber-600 text-white shadow' : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>رمز المالك</span>
            </button>
          </div>
        </div>

        {/* Admin PIN Form */}
        {authMode === 'admin_pin' ? (
          <form onSubmit={handleAdminPinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                الرمز السري الخاص بالمالك والمؤسس:
              </label>
              <div className="relative">
                <KeyRound className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="أدخل الرمز السري..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  autoFocus
                />
              </div>
              {pinError && (
                <p className="text-xs text-rose-400 mt-1.5 font-bold">⚠️ الرمز السري غير صحيح! يرجى التأكد من الرمز الخاص بك.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs rounded-xl shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Crown className="w-4 h-4 text-amber-200" />
              <span>فتح لوحة الإدارة والأرباح 👑</span>
            </button>
          </form>
        ) : (
          /* Customer Login / Register Form */
          <form onSubmit={handleCustomerLogin} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل:</label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: محمد علي"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني:</label>
              <div className="relative">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">كلمة المرور:</label>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{authMode === 'login' ? 'تسجيل الدخول ومتابعة العمل' : 'إنشاء الحساب والحصول على 300 نقطة هدية'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
