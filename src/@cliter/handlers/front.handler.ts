import * as fs from 'node:fs';
import * as path from 'node:path';
import { GenerateCommandState, TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { generateJsonLockFile } from '../functions/common';
import { addReferences, generateModuleFiles, generateTranslationFiles } from '../functions/front';

export class FrontHandler
{
    static async generateModule(generateCommandState: GenerateCommandState): Promise<void>
    {
        // generate dashboard module translations empty
        await generateTranslationFiles(generateCommandState);

        // generate dashboard module files
        await generateModuleFiles(generateCommandState);

        // create references, write imports in ts files
        addReferences(generateCommandState);

        // Operations.createJsonLockFile();
    }
}
