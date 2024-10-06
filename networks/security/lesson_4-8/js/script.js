const espaceHtml = (query) => {
  return query.replace(/[^\w. ]/gi, (char) => '&#' + char.charCodeAt(0) + ';');
};

const fieldIds = ['user-name', '', 'user-mail', 'user-message'];

for (const fieldId of fieldIds) {
  const field = document.getElementById(fieldId);

  if (field) {
    field.addEventListener('input', (event) => {
      const input = event.target.value;
      const escapedInput = espaceHtml(input);
      console.log(`[${fieldId}] Escaped input:`, escapedInput);
    });
  }
}
