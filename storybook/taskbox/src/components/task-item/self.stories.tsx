import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TaskItem } from './self';

const actionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

export default {
  component: TaskItem,
  title: 'TaskItem',
  tags: ['autodocs'],
  excludeStories: /.*data$/,
  args: {
    ...actionsData,
  },
} satisfies Meta<typeof TaskItem>;

type Story = StoryObj<typeof TaskItem>;

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task 1',
      state: 'INBOX',
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      id: '2',
      title: 'Test Task 2',
      state: 'PINNED',
    },
  },
};

export const Archived = {
  args: {
    task: {
      id: '3',
      title: 'Test Task 3',
      state: 'ARCHIVED',
    },
  },
};
