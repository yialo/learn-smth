import { z } from 'zod';

export const ENV = {
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV as typeof process.env.NODE_ENV,

  BACKEND_ORIGIN: (() => {
    const schema = z.string().url();
    const origin = schema.parse(process.env.NEXT_PUBLIC_STRAPI_ORIGIN);
    return origin;
  })(),
};
