import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://gitlab.com/api/graphql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/graphql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
