document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const msg = document.getElementById('formMessage');

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirm: document.getElementById('confirm'),
    terms: document.getElementById('terms'),
    interestsBlock: document.getElementById('interestsBlock'),
  };

  const errs = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    phone: document.getElementById('phoneError'),
    password: document.getElementById('passwordError'),
    confirm: document.getElementById('confirmError'),
    interests: document.getElementById('interestsError'),
    terms: document.getElementById('termsError'),
  };

  const strengthBar = document.getElementById('passwordStrengthBar');
  const strengthText = document.getElementById('passwordStrengthText');

  const STORAGE_KEY = 'signup-draft';

  function setFieldError(el, errEl, message) {
    try { el.setCustomValidity(message || ''); } catch (e) { /* some elements may not support */ }
    errEl.textContent = message || '';
  }
  function validateName() {
    const v = fields.name.value.trim();
    if (!v) {
      setFieldError(fields.name, errs.name, '請輸入姓名');
      return false;
    }
    setFieldError(fields.name, errs.name, '');
    return true;
  }

  function validateEmail() {
    const v = fields.email.value.trim();
    if (!v) {
      setFieldError(fields.email, errs.email, '請輸入 Email');
      return false;
    }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!ok) {
      setFieldError(fields.email, errs.email, 'Email 格式錯誤');
      return false;
    }
    setFieldError(fields.email, errs.email, '');
    return true;
  }

  function validatePhone() {
    const v = fields.phone.value.replace(/\D/g, '');
    if (!v) {
      setFieldError(fields.phone, errs.phone, '請輸入手機號碼');
      return false;
    }
    if (!/^\d{10}$/.test(v)) {
      setFieldError(fields.phone, errs.phone, '手機需為 10 碼數字');
      return false;
    }
    setFieldError(fields.phone, errs.phone, '');
    return true;
  }

  function validatePassword() {
    const v = fields.password.value;
    if (!v) {
      setFieldError(fields.password, errs.password, '請輸入密碼');
      updateStrength('');
      return false;
    }
    if (v.length < 8) {
      setFieldError(fields.password, errs.password, '密碼至少 8 碼');
      updateStrength(v);
      return false;
    }
    if (!(/[A-Za-z]/.test(v) && /\d/.test(v))) {
      setFieldError(fields.password, errs.password, '密碼需英數混合');
      updateStrength(v);
      return false;
    }
    setFieldError(fields.password, errs.password, '');
    updateStrength(v);
    return true;
  }

  function validateConfirm() {
    if (fields.confirm.value !== fields.password.value) {
      setFieldError(fields.confirm, errs.confirm, '兩次密碼不一致');
      return false;
    }
    setFieldError(fields.confirm, errs.confirm, '');
    return true;
  }

  function validateInterests() {
    const inputs = Array.from(fields.interestsBlock.querySelectorAll('input[name="interests"]'));
    const checked = inputs.filter(i => i.checked).length;
    const firstInput = inputs[0] || null;
    if (checked < 1) {
      // set custom validity on a checkbox input so constraint validation can pick it up
      if (firstInput) firstInput.setCustomValidity('請至少選一個興趣');
      errs.interests.textContent = '請至少選一個興趣';
      return false;
    }
    if (firstInput) firstInput.setCustomValidity('');
    errs.interests.textContent = '';
    return true;
  }

  function validateTerms() {
    if (!fields.terms.checked) {
      setFieldError(fields.terms, errs.terms, '請同意服務條款');
      return false;
    }
    setFieldError(fields.terms, errs.terms, '');
    return true;
  }

  function scorePassword(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return 1; // 弱
    if (score <= 3) return 2; // 中
    return 3; // 強
  }

  function updateStrength(value) {
    const pw = (typeof value === 'string') ? value : fields.password.value;
    const s = pw ? scorePassword(pw) : 0;
    strengthBar.classList.remove('weak', 'medium', 'strong');
    if (s === 0) {
      strengthBar.style.width = '0%';
      strengthText.textContent = '強度：';
      strengthText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();
      return;
    }
    if (s === 1) {
      strengthBar.classList.add('weak');
      strengthBar.style.width = '33%';
      strengthText.textContent = '強度：弱';
      strengthText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-weak').trim();
    } else if (s === 2) {
      strengthBar.classList.add('medium');
      strengthBar.style.width = '66%';
      strengthText.textContent = '強度：中';
      strengthText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-medium').trim();
    } else {
      strengthBar.classList.add('strong');
      strengthBar.style.width = '100%';
      strengthText.textContent = '強度：強';
      strengthText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-strong').trim();
    }
  }

  fields.name.addEventListener('blur', validateName);
  fields.name.addEventListener('input', () => { validateName(); saveDraft(); });

  fields.email.addEventListener('blur', validateEmail);
  fields.email.addEventListener('input', () => { validateEmail(); saveDraft(); });

  fields.phone.addEventListener('blur', validatePhone);
  fields.phone.addEventListener('input', () => { validatePhone(); saveDraft(); });

  fields.password.addEventListener('blur', validatePassword);
  fields.password.addEventListener('input', () => { validatePassword(); validateConfirm(); saveDraft(); });

  fields.confirm.addEventListener('blur', validateConfirm);
  fields.confirm.addEventListener('input', () => { validateConfirm(); saveDraft(); });

  fields.terms.addEventListener('change', () => { validateTerms(); saveDraft(); });

  fields.interestsBlock.addEventListener('change', (e) => {
    if (e.target && e.target.name === 'interests') {
      Array.from(fields.interestsBlock.querySelectorAll('label')).forEach(lbl => {
        const input = lbl.querySelector('input');
        if (input && input.checked) lbl.classList.add('selected'); else lbl.classList.remove('selected');
      });
      validateInterests();
      saveDraft();
    }
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    msg.textContent = '';
    const validators = [validateName, validateEmail, validatePhone, validatePassword, validateConfirm, validateInterests, validateTerms];
    let firstInvalid = null;
    for (const fn of validators) {
      const ok = fn();
      if (!ok && !firstInvalid) {
        if (fn === validateInterests) {
          firstInvalid = fields.interestsBlock.querySelector('input[name="interests"]');
        } else {
          const key = fn.name.replace('validate', '').toLowerCase();
          firstInvalid = fields[key] || firstInvalid;
        }
      }
    }
    if (firstInvalid) {
      try { firstInvalid.focus(); } catch (e) {}
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      msg.textContent = '註冊成功！';
      form.reset();
      updateStrength('');
      Array.from(fields.interestsBlock.querySelectorAll('label')).forEach(lbl => lbl.classList.remove('selected'));
      clearDraft();
      fields.name.focus();
      setTimeout(() => { if (msg.textContent === '註冊成功！') msg.textContent = ''; }, 3000);
    }, 1000);
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    Object.values(errs).forEach(e => e.textContent = '');
    updateStrength('');
    Array.from(fields.interestsBlock.querySelectorAll('label')).forEach(lbl => lbl.classList.remove('selected'));
    Array.from(fields.interestsBlock.querySelectorAll('input[name="interests"]')).forEach(i => i.setCustomValidity(''));
    clearDraft();

    msg.textContent = '表單已重設';
    try { fields.name.focus(); } catch (e) {}
    setTimeout(() => {
      if (msg.textContent === '表單已重設') msg.textContent = '';
    }, 3000);
  });

  function saveDraft() {
    const data = {
      name: fields.name.value,
      email: fields.email.value,
      phone: fields.phone.value,
      password: fields.password.value,
      confirm: fields.confirm.value,
      terms: fields.terms.checked,
      interests: Array.from(fields.interestsBlock.querySelectorAll('input[name="interests"]:checked')).map(i => i.value),
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function clearDraft() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (!d) return;
      fields.name.value = d.name || '';
      fields.email.value = d.email || '';
      fields.phone.value = d.phone || '';
      fields.password.value = d.password || '';
      fields.confirm.value = d.confirm || '';
      fields.terms.checked = !!d.terms;
      Array.from(fields.interestsBlock.querySelectorAll('input[name="interests"]')).forEach(inp => {
        inp.checked = (d.interests || []).includes(inp.value);
        if (inp.checked) inp.parentElement.classList.add('selected'); else inp.parentElement.classList.remove('selected');
      });
      updateStrength(fields.password.value);
    } catch (e) { /* ignore */ }
  }

  restoreDraft();
});