/* eslint-disable unicorn/no-static-only-class */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { addPackageFiles, addPivotReferences, addReferences, generateAdditionalApiFiles, generateApiFiles, generateApiPivotFiles, generateAppFiles, generateAppI18nFiles, generateAppPivotFiles, generatePostmanFiles, generateTestingFiles } from '../functions/back';
import { generateJsonLockFile } from '../functions/common';
import { GlobalState } from '../store';
import { AddCommandState, GenerateCommandState, NewBackCommandState, TemplateElement } from '../types';
import { YamlManager } from '../utils';
import { TemplateGenerator } from '../utils/template-generator';

export class BackHandler
{
    static async new(newBackCommandState: NewBackCommandState): Promise<void>
    {
        if (!newBackCommandState.appName) throw new Error('To create back application is required app name');

        // create directory for application
        if (!fs.existsSync(newBackCommandState.appName)) fs.mkdirSync(newBackCommandState.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(
            newBackCommandState.command,
            TemplateElement.BACK_APPLICATION,
            path.join(newBackCommandState.appName),
            '.',
            {
                force  : newBackCommandState.flags.force,
                verbose: newBackCommandState.flags.verbose,
            },
        );
    }

    static async generateModule(
        generateCommandState: GenerateCommandState,
        {
            hasGenerateTestingFiles = false,
        }:
        {
            hasGenerateTestingFiles?: boolean;
        } = {},
    ): Promise<void>
    {
        // generate @app module files
        await generateAppFiles(generateCommandState);

        // generate @app pivot files
        await generateAppPivotFiles(generateCommandState);

        // generate @app i18n module files
        await generateAppI18nFiles(generateCommandState);

        // generate @api files
        await generateApiFiles(generateCommandState);

        // generate @api pivot files
        await generateApiPivotFiles(generateCommandState);

        // generate additional api filles
        await generateAdditionalApiFiles(generateCommandState);

        // create references, write imports in ts files
        addReferences(generateCommandState);

        // create references for pivot tables, write imports in ts files
        addPivotReferences(generateCommandState);

        // flag to generate e2e tests, this test can overwrite custom tests
        if (hasGenerateTestingFiles) await generateTestingFiles(generateCommandState);

        // generate postman files
        await generatePostmanFiles(generateCommandState);

        // create yaml file
        YamlManager.generateYamlConfigFile(generateCommandState.schema);

        generateJsonLockFile(
            generateCommandState,
            GlobalState.hasValue('lockFiles') ? GlobalState.getValue('lockFiles') : [],
        );
    }

    static async addPackage(addCommandState: AddCommandState): Promise<void>
    {
        await addPackageFiles(addCommandState);
    }
}
