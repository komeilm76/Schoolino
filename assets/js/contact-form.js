/* Contact form: inline validation, live counter, copy-to-clipboard.
   There is no backend on this site, so the form never claims a message was
   sent. It validates, then produces a clean, copyable message. */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submit = document.getElementById('submit-button');
  const submitLabel = document.getElementById('submit-label');
  const copyButton = document.getElementById('copy-button');
  const counter = document.getElementById('message-counter');
  const message = document.getElementById('message');

  const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
  const MAX_MESSAGE = 1000;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (v) => {
      if (!v) return 'نام و نام خانوادگی را وارد کنید.';
      if (v.length < 3) return 'نام باید حداقل ۳ نویسه باشد.';
      return '';
    },
    email: (v) => {
      if (!v) return 'ایمیل را وارد کنید.';
      if (!EMAIL.test(v)) return 'ایمیل معتبر نیست؛ نمونه: name@example.com';
      return '';
    },
    subject: (v) => (v ? '' : 'موضوع پیام را انتخاب کنید.'),
    message: (v) => {
      if (!v) return 'متن پیام را بنویسید.';
      if (v.length < 20) return `پیام باید حداقل ۲۰ نویسه باشد (${fa(v.length)} نویسه نوشته‌اید).`;
      return '';
    },
  };

  const controls = Object.keys(rules).map((id) => document.getElementById(id));
  let attempted = false;

  function setError(control, text) {
    const field = control.closest('.field');
    const slot = field.querySelector('.field-error span');
    field.dataset.invalid = String(Boolean(text));
    control.setAttribute('aria-invalid', String(Boolean(text)));
    slot.textContent = text;
  }

  function validate(control) {
    const text = rules[control.id](control.value.trim());
    setError(control, text);
    return !text;
  }

  function updateCounter() {
    const length = [...message.value].length;
    counter.textContent = `${fa(length)} / ${fa(MAX_MESSAGE)}`;
    counter.dataset.state = length > MAX_MESSAGE ? 'over' : length > MAX_MESSAGE * 0.9 ? 'near' : 'ok';
  }

  function setStatus(text, tone) {
    status.textContent = text;
    if (tone) status.dataset.tone = tone;
    else delete status.dataset.tone;
  }

  function composedMessage() {
    const subjectSelect = document.getElementById('subject');
    const subjectText = subjectSelect.value
      ? subjectSelect.options[subjectSelect.selectedIndex].textContent.trim()
      : '—';
    return [
      `نام: ${document.getElementById('name').value.trim() || '—'}`,
      `ایمیل: ${document.getElementById('email').value.trim() || '—'}`,
      `موضوع: ${subjectText}`,
      '',
      message.value.trim() || '—',
    ].join('\n');
  }

  // Validate on blur; once the user has submitted, re-validate as they type.
  controls.forEach((control) => {
    control.addEventListener('blur', () => {
      if (control.value.trim() || attempted) validate(control);
    });
    const live = () => { if (attempted || control.closest('.field').dataset.invalid === 'true') validate(control); };
    control.addEventListener('input', live);
    control.addEventListener('change', live);
  });

  message.addEventListener('input', updateCounter);
  updateCounter();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    attempted = true;

    const results = controls.map((control) => ({ control, ok: validate(control) }));
    const firstBad = results.find((r) => !r.ok);

    if (firstBad) {
      const count = results.filter((r) => !r.ok).length;
      setStatus(`لطفاً ${fa(count)} فیلد را اصلاح کنید تا پیام آماده شود.`, 'error');
      firstBad.control.focus();
      return;
    }

    submit.dataset.busy = 'true';
    submitLabel.textContent = 'در حال آماده‌سازی…';
    setStatus('');

    // Local preparation only — no network request is made.
    window.setTimeout(() => {
      delete submit.dataset.busy;
      submitLabel.textContent = 'پیام آماده است';
      setStatus('پیام شما بررسی شد و آماده است. چون سایت به سامانه دریافت پیام متصل نیست، چیزی ارسال نشده است؛ با دکمه «کپی متن پیام» آن را بردارید و از راه ارتباطی رسمی آوین بفرستید.', 'ok');
    }, 550);
  });

  copyButton.addEventListener('click', async () => {
    const text = composedMessage();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        const ok = document.execCommand('copy');
        helper.remove();
        if (!ok) throw new Error('copy-unavailable');
      }
      setStatus('متن پیام کپی شد. آن را از راه ارتباطی رسمی آوین ارسال کنید.', 'ok');
    } catch {
      setStatus('کپی خودکار در این مرورگر ممکن نیست. متن فیلدها را دستی انتخاب و کپی کنید.', 'error');
      message.focus();
      message.select();
    }
  });
})();