/* eslint-disable unicorn/no-static-only-class */
import { TemplateGenerator } from '../utils/template-generator';
import { addPackageFiles, addReferences, generateModuleFiles, generateModulePivotFiles, generateTranslationFiles } from '../functions/front';
import { AddCommandState, GenerateCommandState, NewFrontCommandState, TemplateElement } from '../types';
import { generateJsonLockFile } from '../functions/common';
import { GlobalState } from '../store';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class FrontHandler
{
    static async new(newFrontCommandState: NewFrontCommandState): Promise<void>
    {
        if (!newFrontCommandState.appName) throw new Error('To create front application is required app name');

        // create directory for dashboard
        if (!fs.existsSync(newFrontCommandState.appName)) fs.mkdirSync(newFrontCommandState.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(
            newFrontCommandState.command,
            TemplateElement.FRONT_APPLICATION,
            path.join(newFrontCommandState.appName),
            '.',
            {
                verbose          : newFrontCommandState.flags.verbose,
                force            : newFrontCommandState.flags.force,
                useTemplateEngine: false,
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
        // generate front module translations empty
        await generateTranslationFiles(generateCommandState);

        // generate front module files
        await generateModuleFiles(generateCommandState);

        // generate module pivot files
        await generateModulePivotFiles(generateCommandState);

        // create references, write imports in ts files
        addReferences(generateCommandState);

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
