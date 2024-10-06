const SALT = 'sugaracademy';

const bytesToHex = (bytes) => bytes.toString(16).padStart(2, '0');

const sha256 = async (message) => {
  const utf8 = new TextEncoder().encode(message);

  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map(bytesToHex).join('');
};

const passwordInput = document.getElementById('password');
const passwordResult = document.getElementById('result');

passwordInput.addEventListener('input', async (event) => {
  const password = event.target.value;

  if (!password) {
    passwordResult.textContent = '';
    return;
  }

  passwordResult.textContent = 'Encoding...';
  const passwordHash = await sha256(`${password}${SALT}`);
  passwordResult.textContent = passwordHash;
});
