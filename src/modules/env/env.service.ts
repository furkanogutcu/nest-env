import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

@Injectable()
export class ENVService<T extends z.ZodType = z.ZodType> {
  constructor(private readonly configService: ConfigService) {}

  get<K extends keyof z.infer<T>>(key: K): z.infer<T>[K] {
    return this.configService.get<z.infer<T>[K]>(key as string);
  }
}
