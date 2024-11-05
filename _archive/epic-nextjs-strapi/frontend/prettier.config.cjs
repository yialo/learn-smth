/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  importOrder: [
    '',
    '<BUILTIN_MODULES>',
    '',
    '^(react|react-dom/.+)$',
    '^next(/.+)?$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/',
    '',
    '^[.]',
  ],
  importOrderTypeScriptVersion: '5.5.4',
  tailwindFunctions: ['cn', 'cva'],
};
