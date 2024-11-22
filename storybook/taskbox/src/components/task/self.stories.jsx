import { fn } from '@storybook/test';

import { Task } from './self';
import { TASK_STATE } from './config';

const actionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

export default {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
  excludeStories: /.*data$/,
  args: {
    ...actionsData,
  },
};

export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task 1',
      state: TASK_STATE.INBOX,
    },
  },
};

export const Pinned = {
  args: {
    task: {
      id: '2',
      title: 'Test Task 2',
      state: TASK_STATE.PINNED,
    },
  },
};

export const Archived = {
  args: {
    task: {
      id: '3',
      title: 'Test Task 3',
      state: TASK_STATE.ARCHIVED,
    },
  },
};
