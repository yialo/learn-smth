export interface Task {
  id: string;
  title: string;
  state: 'INBOX' | 'PINNED' | 'ARCHIVED';
}
