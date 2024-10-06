const getFormFieldElements = (fieldId) => {
  const input = document.getElementById(fieldId);
  const control = input.parentElement;
  const message = control.querySelector('small');

  return { input, control, message };
};

const markFieldAsValid = (field) => {
  field.control.classList.add('success');
  field.control.classList.remove('error');
  field.message.textContent = '';
};

const markFieldAsInvalid = (field, message) => {
  field.control.classList.remove('success');
  field.control.classList.add('error');
  field.message.textContent = message;
};

const usernameField = getFormFieldElements('username');

usernameField.input.addEventListener('blur', (event) => {
  const username = event.target.value.trim();

  if (username) {
    markFieldAsValid(usernameField);
  } else {
    markFieldAsInvalid(usernameField, 'Придумайте логин');
  }
});

const emailField = getFormFieldElements('email');

const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Введите email' };
  }

  const getInvalidResult = () => ({
    isValid: false,
    message: 'Неправильный email',
  });

  if (email.length > 254) {
    return getInvalidResult();
  }

  if (/[`'"\s]/.test(email)) {
    return getInvalidResult();
  }

  const hasAtSymbol = email.includes('@');

  if (!hasAtSymbol) {
    return getInvalidResult();
  }

  const splittedEmail = email.split('@');

  if (splittedEmail.some((part) => !part)) {
    return getInvalidResult();
  }

  const [local, domain] = splittedEmail;

  if (!/^[a-zA-Z\d-.]+$/.test(domain)) {
    return getInvalidResult();
  }

  if (local.length > 63) {
    return getInvalidResult();
  }

  return { isValid: true };
};

emailField.input.addEventListener('focusout', (event) => {
  const email = event.target.value.trim();

  const { isValid, message } = validateEmail(email);

  if (!isValid) {
    markFieldAsInvalid(emailField, message);
  } else {
    markFieldAsValid(emailField);
  }
});

const enterPasswordField = getFormFieldElements('password');

enterPasswordField.input.addEventListener('focusout', (event) => {
  const password = event.target.value;

  if (!password) {
    markFieldAsInvalid(enterPasswordField, 'Придумайте пароль');
  } else if (password.length < 8) {
    markFieldAsInvalid(
      enterPasswordField,
      'Меньше 8 символов, придумайте длиннее',
    );
  } else {
    markFieldAsValid(enterPasswordField);
  }
});

const confirmPasswordField = getFormFieldElements('password2');

confirmPasswordField.input.addEventListener('focusout', (event) => {
  const password = event.target.value;

  if (!password) {
    markFieldAsInvalid(confirmPasswordField, 'Повторите пароль');
  } else if (password !== enterPasswordField.input.value) {
    markFieldAsInvalid(confirmPasswordField, 'Пароли не совпадают');
  } else {
    markFieldAsValid(confirmPasswordField);
  }
});
