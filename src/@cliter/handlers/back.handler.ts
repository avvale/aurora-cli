/* eslint-disable unicorn/no-static-only-class */
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { generateJsonLockFile } from '../functions/common';
import { addReferences, generateAdditionalApiFiles, generateApiFiles, generateI18NApiFiles, generateI18nAppFiles, generateAppFiles, generatePivotTables, generatePostmanFiles, generateTestingFiles, generateYamlConfigFile } from '../functions/back';
import { GenerateCommandState, NewBackCommandState } from '../types';
import { GlobalState } from '../store';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class BackHandler
{
    static async new(newBackCommandState: NewBackCommandState): Promise<void>
    {
        if (!newBackCommandState.appName) throw new Error('To create application is required app name');

        // create directory for application
        if (!fs.existsSync(newBackCommandState.appName)) fs.mkdirSync(newBackCommandState.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(
            newBackCommandState.command,
            TemplateElement.BACK_APPLICATION,
            path.join(newBackCommandState.appName),
            '.',
            {
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
        // generate module files
        await generateAppFiles(generateCommandState);

        // generate pivot tables
        await generatePivotTables(generateCommandState);

        // generate i18n module files
        await generateI18nAppFiles(generateCommandState);

        // generate @api files
        await generateApiFiles(generateCommandState);

        // generate additional api filles
        await generateAdditionalApiFiles(generateCommandState);

        // generate @api i18n files
        await generateI18NApiFiles(generateCommandState);

        // create references, write imports in ts files
        addReferences(generateCommandState);

        // flag to generate e2e tests, this test can overwrite custom tests
        if (hasGenerateTestingFiles) await generateTestingFiles(generateCommandState);

        // generate postman files
        await generatePostmanFiles(generateCommandState);

        // create yaml file
        generateYamlConfigFile(generateCommandState);

        generateJsonLockFile(
            generateCommandState,
            GlobalState.hasValue('lockFiles') ? GlobalState.getValue('lockFiles') : [],
        );
    }
}
