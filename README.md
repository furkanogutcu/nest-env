# nest-env

[![npm version](https://img.shields.io/npm/v/@furkanogutcu/nest-env.svg)](https://www.npmjs.com/package/@furkanogutcu/nest-env)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A NestJS package for type-safe environment configuration using Zod schemas.

## Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Installation

```bash
npm install @furkanogutcu/nest-env
```

or

```bash
yarn add @furkanogutcu/nest-env
```

## Features

- Built-in environment validation using [Zod](https://github.com/colinhacks/zod)
- Custom schema support
- TypeScript support
- Simple API
- Configurable options

## Usage

### 1. Define your environment schema

Create a file for your environment schema:

```typescript
// env.schema.ts
import { z } from 'zod';

export const ENVSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['production', 'development']).default('production'),
  DATABASE_URL: z.string(),
  // Add more environment variables as needed
});

export type EnvironmentConfig = z.infer<typeof ENVSchema>;
```

### 2. Import ENVModule and pass your schema

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ENVModule } from '@furkanogutcu/nest-env';
import { ENVSchema } from './env.schema';

@Module({
  imports: [
    ENVModule.forRoot({
      schema: ENVSchema,
      envFilePath: '.env',
      isGlobal: true,
    }),
    // ... other modules
  ],
})
export class AppModule {}
```

### 3. Use ENVService to access your typed environment variables

```typescript
// app.service.ts
import { Injectable } from '@nestjs/common';
import { ENVService } from '@furkanogutcu/nest-env';
import { ENVSchema, EnvironmentConfig } from './env.schema';

@Injectable()
export class AppService {
  constructor(private readonly envService: ENVService<EnvironmentConfig>) {}

  getPort(): number {
    return this.envService.get('PORT');
  }
}
```

## Configuration Options

The `ENVModule.forRoot()` method accepts the following options:

| Option        | Type                 | Description                                          | Required |
| ------------- | -------------------- | ---------------------------------------------------- | -------- |
| `schema`      | `z.ZodType`          | Your Zod schema for environment validation           | ✓        |
| `isGlobal`    | `boolean`            | If true, registers as a global module. Default: true | ✗        |
| `envFilePath` | `string \| string[]` | Path(s) to your .env file(s)                         | ✗        |
| `cache`       | `boolean`            | If true, caches environment variables                | ✗        |

## Development

### Requirements

- Node.js 18+
- npm or yarn

### Getting Started

Clone the project

```bash
  git clone https://github.com/furkanogutcu/nest-env.git
```

Go to the project directory

```bash
  cd nest-env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## License

This project is licensed under the [MIT License](LICENSE).
