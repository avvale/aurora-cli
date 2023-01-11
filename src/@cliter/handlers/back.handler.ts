// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { StateService } from '../functions/state.service';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { generateJsonLockFile } from '../functions/common';
import { addReferences, generateAdditionalApiFiles, generateApiFiles, generateI18NApiFiles, generateI18nModuleFiles, generateModuleFiles, generatePivotTables, generatePostmanFiles, generateTestingFiles, generateYamlConfigFile } from '../functions/back';
import { GenerateCommandState } from '../types/commands';

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

    static async generateModule(generateCommandState: GenerateCommandState): Promise<void>
    {
        // generate module files
        await generateModuleFiles(generateCommandState);

        // generate pivot tables
        await generatePivotTables(generateCommandState);

        // generate i18n module files
        await generateI18nModuleFiles(generateCommandState);

        // generate @api files
        await generateApiFiles(generateCommandState);

        // generate additional api filles
        await generateAdditionalApiFiles();

        // generate @api i18n files
        await generateI18NApiFiles();

        // create references, write imports in ts files
        addReferences();

        // flag to generate e2e tests, this test can overwrite custom tests
        if (BackHandler.stateService.flags.tests)
        {
            // generate testing files
            await generateTestingFiles();
        }

        // generate postman files
        await generatePostmanFiles();

        // create yaml file
        generateYamlConfigFile();

        generateJsonLockFile();
    }
}
