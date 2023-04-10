// container
import 'reflect-metadata';
import { singleton } from 'tsyringe';

// imports
import { Command } from '@oclif/core';
import { LiteralObject, LockFile, ModuleDefinitionSchema, ResolverType, RelationshipType, SqlType } from '../types';
import { CliterConfig, cliterConfig } from '../config/cliter.config';
import { AdditionalApi } from '../utils/additional-api';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

@singleton()
export class StateService
{
    public config: CliterConfig = cliterConfig;
    public appName?: string;
    public packageName?: string;
    public dashboardName?: string;
    public command!: Command;
    public currentAdditionalApi?: AdditionalApi;
    public schema!: ModuleDefinitionSchema;
    public lockFiles: LockFile[] = [];
    public flags!: LiteralObject;
    public relationshipType = RelationshipType;
    public resolverType = ResolverType;
    public sqlType = SqlType;
    private _originFiles: string[] = []; // origin files generated

    get uuid(): string
    {
        return uuidv4();
    }

    get appKey(): string
    {
        return crypto.randomBytes(24).toString('hex');
    }

    // originFiles
    get originFiles(): string[]
    {
        this._originFiles = this._originFiles.filter(file => fs.existsSync(path.join(process.cwd(), file)));
        return this._originFiles;
    }

    set originFiles(originFiles: string[])
    {
        this._originFiles = originFiles;
    }
}
