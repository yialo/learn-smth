const searchField = document.querySelector('.search-field');

const escapeJs = (query) => {
  return query.replace(/[^\w. ]/gi, (char) => {
    const slicedChar = char.charCodeAt(0).toString(16).padStart(4, '0');
    return '\\u' + slicedChar;
  });
};

searchField.addEventListener('input', (event) => {
  const query = event.target.value;
  const escapedQuery = escapeJs(query);
  console.log('Escaped search query:', escapedQuery);
});
