import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Task } from './config';
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

const createTaskMock = (): Task => ({
  id: '1',
  title: 'Test Task',
  state: 'INBOX',
});

export const Default: Story = {
  args: {
    task: createTaskMock(),
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...createTaskMock(),
      state: 'PINNED',
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...createTaskMock(),
      state: 'ARCHIVED',
    },
  },
};
