import { singleton } from 'tsyringe';
import { Command } from '@oclif/command';
import { LiteralObject, LockFile, ModuleDefinitionSchema, SqlRelationship, SqlType } from './../types';
import { CliterConfig, cliterConfig } from './../config/cliter.config';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@singleton()
export class StateService
{
    public config: CliterConfig = cliterConfig;
    public appName?: string;
    public packageName?: string;
    public command!: Command;
    public schema!: ModuleDefinitionSchema;
    public lockFiles: LockFile[] = [];
    public newLockFiles: LockFile[] = [];
    public flags!: LiteralObject;
    public relationship = SqlRelationship;
    public sqlType = SqlType;
    private _originFiles: string[] = [];                // origin files generated

    get uuid(): string
    {
        return uuidv4();
    }

    get appKey(): string
    {
        return crypto.randomBytes(24).toString('hex');
    }

    // originFiles
    set originFiles(originFiles: string[])
    {
        this._originFiles = originFiles;
    }
    get originFiles(): string[]
    {
        this._originFiles = this._originFiles.filter(file => fs.existsSync(path.join(process.cwd(), file)));
        return this._originFiles;
    }
}