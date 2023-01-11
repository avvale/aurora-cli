import { Command } from '@oclif/core';
import { LiteralObject } from './literal-object';
import { LockFile } from './lock-file';
import { ModuleDefinitionSchema } from './module-definition-schema';

export interface CommandState
{
    command: Command;
    flags: LiteralObject;
}

export interface GenerateCommandState extends CommandState
{
    lockFiles: LockFile[];
    schema: ModuleDefinitionSchema;
}
