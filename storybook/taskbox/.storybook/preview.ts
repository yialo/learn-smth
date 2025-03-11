import { Preview } from '@storybook/react';

export default {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/,
      },
    },
  },
} satisfies Preview;
