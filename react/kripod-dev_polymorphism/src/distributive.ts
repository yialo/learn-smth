type User = {
  id: string;
  name: string;
  age: number;
};

type Course = {
  id: string;
  title: string;
  price: number;
};

export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
// {}
type UserOrCourseWithoutId = Omit<User | Course, 'id'>;
// Omit<User, 'id'> | Omit<Course, 'id>
type DistributiveUserOrCourseWithoutId = DistributiveOmit<User | Course, 'id'>;

type DistributiveKeyof<T> = T extends unknown ? keyof T : never;
// "id"
type KeyofUserOrCourse = keyof (User | Course);
// "id" | "name" | "age" | "title" | "price"
type DistributiveKeyofUserOrCourse = DistributiveKeyof<User | Course>;
