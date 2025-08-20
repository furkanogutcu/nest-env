import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

import { ENVService } from './env.service';
import { ENVModuleOptions } from './interfaces';

@Module({})
export class ENVModule {
  static forRoot<T extends z.ZodType>(options: ENVModuleOptions<T>): DynamicModule {
    const isGlobal = options.isGlobal ?? true;

    const configModuleOptions: ConfigModuleOptions = {
      validate: (env) => options.schema.parse(env) as any,
      envFilePath: options.envFilePath,
      isGlobal,
      cache: options.cache,
    };

    return {
      global: isGlobal,
      module: ENVModule,
      imports: [ConfigModule.forRoot(configModuleOptions)],
      providers: [ENVService],
      exports: [ENVService],
    };
  }
}
