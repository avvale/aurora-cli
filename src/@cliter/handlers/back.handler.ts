// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as child from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { Command } from '@oclif/core';
import { StateService } from '../services/state.service';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { CodeWriter } from '../utils/code-writer';
import { cliterConfig } from '../config/cliter.config';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

export class BackHandler
{
    public static readonly stateService = container.resolve(StateService);

    /**
     * Generate server application
     * @return {Promise<void>} void
     */
    static async generateApplication(): Promise<void>
    {
        if (!BackHandler.stateService.appName) throw new Error('To create application is required app name');

        // create directory for application
        if (!fs.existsSync(BackHandler.stateService.appName)) fs.mkdirSync(BackHandler.stateService.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_APPLICATION, path.join(BackHandler.stateService.appName), '.');
    }

    static async generateApplicationEnvFile(applicationName: string): Promise<void>
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_ENV, '', applicationName);
    }
}
