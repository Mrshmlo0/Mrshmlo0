# 📱 دليل تحويل المنصة إلى تطبيق هواتف أصلي (Android APK & iOS IPA)

---

## 🌟 نبذة عن معمارية الموبايل (Mobile Architecture)

تم بناء هذه المنصة باستخدام تقنيات الـ **Progressive Web App (PWA)** و **Capacitor Core** لتتمكن من تشغيلها كـ:
1. **تطبيق ويب كامل على المتصفح (Web SaaS Platform).**
2. **تطبيق هاتف مثبت بضغطة زر واحدة (PWA Standalone App) على هواتف Android و iPhone بدون انتظار موافقة المتاجر.**
3. **تطبيق أصلي Native (ملف APK و AAB لمتجر Google Play وملف IPA لمتجر Apple App Store).**

---

## 🚀 الطريقة الأولى: التثبيت الفوري للعميل (PWA - في 5 ثوانٍ)

* **لهواتف iPhone (iOS):**
  العميل يفتح رابط موقعك من متصفح Safari، ثم يضغط زر المشاركة (Share) ويختار **"إضافة إلى الشاشة الرئيسية (Add to Home Screen)"**. سيظهر كأيقونة تطبيق كاملة بدون شريط متصفح وبشاشته الكاملة.
* **لهواتف Android:**
  العميل يفتح الرابط من Chrome، وتظهر له رسالة تلقائية أسفل الشاشة: **"تثبيت التطبيق على جهازك (Install App)"**، وبضغطة واحدة يثبت في قائمة التطبيقات.

---

## 📦 الطريقة الثانية: تصدير ملفات APK و iOS عبر Capacitor (خلال 3 دقائق)

إذا كنت ترغب في نشر التطبيق على متجري **Google Play** و **Apple App Store**، اتبع هذه الأوامر البسيطة:

### 1. تثبيت حزم كاباسيتور:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
```

### 2. تهيئة المشروع:
```bash
npx cap init "OmniAI Pro" "com.omniai.app" --web-dir "dist"
```

### 3. بناء الملفات وتوليد مشروعي الأندرويد والآيفون:
```bash
npm run build
npx cap add android
npx cap add ios
```

### 4. تصدير ملف APK للأندرويد:
```bash
npx cap open android
```
> سيفتح لك المشروع مباشرة في برنامج **Android Studio**؛ اضغط على **Build > Build APK(s)** لتحصل على ملف الـ APK المباشر لنشره على جوجل بلاي أو إرساله للعملاء!

### 5. تصدير تطبيق الآيفون:
```bash
npx cap open ios
```
> سيفتح لك المشروع في **Xcode** لتوقيع التطبيق ورفعه على **Apple App Store**.

---

## 💡 نصائح لتحقيق أقصى ربح من تطبيق الموبايل:
* اجعل تحميل التطبيق مجانياً مع 50 نقطة تجريبية.
* ضع خيار ترقية الباقة الشهرية (In-App Subscriptions أو Stripe Checkout) بـ 19$ و 49$ و 149$/شهرياً.
* أرسل إشعارات ترويجية (Push Notifications) للمستخدمين عند توفر تريندات تسويقية جديدة.
