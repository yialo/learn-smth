import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Task } from './types';
import { TaskItem } from './self';

const actionsData = {
  onArchive: fn(),
  onPin: fn(),
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

const createTaskMock = (state: Task['state']): Task => ({
  id: '1',
  title: 'Test Task',
  state,
});

export const Default: Story = {
  args: {
    task: createTaskMock('INBOX'),
  },
};

export const Pinned: Story = {
  args: {
    task: createTaskMock('PINNED'),
  },
};

export const Archived: Story = {
  args: {
    task: createTaskMock('ARCHIVED'),
  },
};
