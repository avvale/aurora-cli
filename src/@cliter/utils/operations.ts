// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { Command } from '@oclif/core';
import { StateService } from '../functions/state.service';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { cliterConfig } from '../config/cliter.config';

export class Operations
{
    public static readonly stateService = container.resolve(StateService);

    static async generatePackage(): Promise<void>
    {
        if (!Operations.stateService.packageName) throw new Error('To create package is required package name');

        // create directory for application
        if (!fs.existsSync(Operations.stateService.packageName || '')) fs.mkdirSync(Operations.stateService.packageName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_PACKAGE, path.join(Operations.stateService.packageName), '.');
    }

    static async generateDashboard(): Promise<void>
    {
        if (!Operations.stateService.dashboardName) throw new Error('To create dashboard is required dashboard name');

        // create directory for dashboard
        if (!fs.existsSync(Operations.stateService.dashboardName)) fs.mkdirSync(Operations.stateService.dashboardName, { recursive: true });

        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_APPLICATION,
            path.join(Operations.stateService.dashboardName),
            '.',
            { useTemplateEngine: false },
        );
    }

    /* static async generateFrontModule(): Promise<void>
    {
        // generate dashboard module translations empty
        await Operations.generateFrontTranslationsModule();

        // generate dashboard module files
        await Operations.generateFrontModuleFiles();

        // create references, write imports in ts files
        Operations.createFrontReferences();

        Operations.createJsonLockFile();
    } */

    static async installBackPackage(packageName: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_PACKAGES,
            '.',
            '.',
            {
                templateElementPath: path.join(packageName.toKebabCase()),
            },
        );
    }

    static async installFrontPackage(packageName: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_PACKAGES,
            '.',
            '.',
            {
                templateElementPath: path.join(packageName.toKebabCase()),
            },
        );
    }

    static parseFlagOfBoundedContextAndModule(command: Command, module: string): { boundedContextName: string; moduleName: string }
    {
        const boundedContextSection = module.split('/');
        if (boundedContextSection.length !== 2) command.error('Must input bounded context and module name, with format: bounded-context/module');

        return {
            boundedContextName: boundedContextSection[0],
            moduleName        : boundedContextSection[1],
        };
    }

    // TODO, función duplicada en el back handler
    static createJsonLockFile(): void
    {
        const jsonPath = path.join(process.cwd(), 'cliter', Operations.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath, { recursive: true });

        const jsonLockFile = {
            version: cliterConfig.lockJsonVersion,
            files  : Operations.stateService.newLockFiles,
        };

        fs.writeFileSync(path.join(jsonPath, `${Operations.stateService.schema.moduleName}-lock.json`), JSON.stringify(jsonLockFile, null, 4), 'utf8');
    }
}
