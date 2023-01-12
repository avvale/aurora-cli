/* eslint-disable unicorn/no-static-only-class */
import { addReferences, generateModuleFiles, generateTranslationFiles } from '../functions/front';
import { GenerateCommandState } from '../types';
import { generateJsonLockFile } from '../functions/common';
import { GlobalState } from '../store';

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

        generateJsonLockFile(
            generateCommandState,
            GlobalState.hasValue('lockFiles') ? GlobalState.getValue('lockFiles') : [],
        );
    }
}
