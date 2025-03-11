import { Preview } from '@storybook/react';

import '../src/index.css';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/,
      },
    },
  },
} satisfies Preview;
