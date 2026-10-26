# موقع المركز الصحي — النسخة المنشورة

**الموقع المباشر:** https://alsndlmsn.github.io/health-center-site/
**المستودع:** https://github.com/alsndlmsn/health-center-site

| الرابط | الملف |
|---|---|
| https://alsndlmsn.github.io/health-center-site/downloads/HealthCenter-Portable-1.0.0.exe | تطبيق المركز الصحي 1.0.0 (91.6 م.ب) |
| https://alsndlmsn.github.io/health-center-site/downloads/دليل-الاستخدام-نظام-المركز-الصحي.pdf | دليل الاستخدام (66 صفحة) |

## تحديث الموقع لإصدار جديد

من جذر المشروع:

```bash
npm run site:release -- --publish
```

يبني نسخة Portable، ويقارن بصمتها بما هو منشور، ويحدّث اسم الملف والإصدار والتاريخ والحجم
في `script.js` و`index.html`، ثم يتفحص الموقع بخادم محلي (بما فيه بصمة SHA-256) وينشره على
GitHub Pages. لإعادة نشر تعديلات الموقع فقط دون بناء: `npm run site:publish`.

معاينة ما سيتغير دون كتابة أي ملف: `node scripts/release-site.js --version 1.1.0 --dry-run`.

موقع تسويقي عربي (RTL) لنظام إدارة المركز الصحي، متوافق مع الهاتف والكمبيوتر، وزرّاه
ينزّلان ملفات حقيقية موجودة داخل المجلد نفسه.

## المحتويات

| الملف | الوصف |
|---|---|
| `index.html` | الصفحة الكاملة (عربي، RTL، متجاوبة) |
| `styles.css` | التنسيقات مع استعلامات وسائط للهاتف والكمبيوتر |
| `script.js` | إعدادات الإصدار وروابط التنزيل وفحص توفّر الملفات |
| `assets/` | الشعار واللقطات |
| `downloads/HealthCenter-Portable-1.0.0.exe` | **تطبيق المركز الصحي** — الإصدار الأخير المعتمد (91.6 م.ب) |
| `downloads/دليل-الاستخدام-نظام-المركز-الصحي.pdf` | دليل الاستخدام (66 صفحة، 7.3 م.ب) |
| `.nojekyll` | يمنع Jekyll من تجاهل ملفات المشروع على GitHub Pages |

## بيانات الإصدار

- الإصدار: **1.0.0**
- تاريخ البناء: **25 أكتوبر 2026**
- بصمة SHA-256 لملف التطبيق:
  `b05dc7d0abfda15c8593d2688dc23959131c8c7fdbdef005d5ef3a5488aa8a62`
- التطبيق يعمل على Windows 10/11 (ملف EXE واحد، لا يحتاج تثبيتًا).

## التجربة محليًا (بدون إنترنت)

افتح `index.html` مباشرة بنقرة مزدوجة — الأزرار تنزّل الملفين من مجلد `downloads/`.
الفحص التلقائي لتوفّر الملفات يعمل فقط عند العرض عبر خادم (http/https)، وهذا طبيعي.

## النشر على GitHub Pages

1. أنشئ مستودعًا جديدًا على GitHub (عام) — مثلًا `health-center-site`.
2. ارفع **محتويات هذا المجلد** (لا المجلد نفسه) إلى فرع `main`:
   ```bash
   git init
   git add .
   git commit -m "Health Center site: app + user guide downloads"
   git branch -M main
   git remote add origin https://github.com/USERNAME/health-center-site.git
   git push -u origin main
   ```
3. من المستودع: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
4. بعد دقيقة تقريبًا يصبح الرابط: `https://USERNAME.github.io/health-center-site/`

ملاحظات الحدود:

- الحد الأقصى لكل ملف في GitHub هو **100 م.ب**، وملف التطبيق **91.6 م.ب** فهو مقبول داخل
  المستودع (قد يظهر تحذير حجم عند الرفع، وهذا لا يمنع النشر).
- إن رفض GitHub الملف لأي سبب، ارفعه إلى **Releases** بدلًا من المستودع:
  1. Releases → Draft a new release → أرفق `HealthCenter-Portable-1.0.0.exe`.
  2. انسخ رابط الأصل المباشر (ينتهي بـ `.exe`).
  3. ضع الرابط في `RELEASE_URL` داخل `script.js` ثم ارفع الصفحة.
     سيستخدم الموقع رابط الإصدار، ويمكنك عندها حذف `downloads/HealthCenter-Portable-1.0.0.exe`.
- ملف المُثبِّت `HealthCenter-Setup-1.0.0.exe` (100.3 م.ب) **يتجاوز حد GitHub للملف الواحد**،
  لذلك لا يُنشر على Pages ويُوزَّع مع مجلد التسليم أو عبر Releases.

## اختبار الروابط بعد النشر

```bash
node scripts/verify-site.js --base https://USERNAME.github.io/health-center-site
```

يفحص: الصفحة وRTL، كل الأصول، رأس ملف EXE (`MZ`) وحجمه وبصمته، نوع PDF وبداية الملف،
روابط الأقسام، ورقم واتساب.

## ملاحظة مهمة عن الهاتف

الصفحة تعمل على Android وiPhone، ويمكن تنزيل ملف EXE من الهاتف، لكن **التطبيق نفسه لا يعمل
إلا على Windows**. الصفحة تعرض تنبيهًا واضحًا بذلك على الهاتف.
