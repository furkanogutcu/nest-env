import { z } from 'zod';

export interface ENVModuleOptions<T extends z.ZodType> {
  schema: T;
  envFilePath?: string | string[];
  isGlobal?: boolean;
  cache?: boolean;
}
