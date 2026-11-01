/* Client-side validation for the contact page. No message is sent until a backend is configured. */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const required = [...form.querySelectorAll('[required]')];
    const invalid = required.filter((field) => !field.value.trim() || !field.checkValidity());
    required.forEach((field) => field.removeAttribute('aria-invalid'));
    if (invalid.length) {
      invalid.forEach((field) => field.setAttribute('aria-invalid', 'true'));
      status.textContent = 'لطفاً نام، ایمیل معتبر، موضوع و پیام را کامل کنید.';
      invalid[0].focus();
      return;
    }
    status.textContent = 'پیام شما در این نسخه ارسال نشد؛ برای فعال‌سازی ارسال، اطلاعات تماس رسمی یا سرویس دریافت فرم باید به سایت افزوده شود.';
  });
})();
