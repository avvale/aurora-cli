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

export interface NewApplicationCommandState extends CommandState
{
    appName: string;
}

export interface GeneratePipelineCommandState extends CommandState
{
    from: string;
    to: string;
    service: string;
}
