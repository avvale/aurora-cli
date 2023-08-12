import { GenerateCommandState } from '../../types';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';
import * as path from 'node:path';

export const addReferences = (generateCommandState: GenerateCommandState): void =>
{
    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.appContainer),
        cliterConfig.apiContainer,
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.moduleNames.toLowerCase(),
        generateCommandState.schema.aggregateName,
        generateCommandState.schema.properties.hasI18n,
    );
    codeWriter.generateBackBoundedContextReferences(generateCommandState.schema.properties);
    codeWriter.declareBackApplicationItemsInModule();
    codeWriter.declareBackBoundedContextModuleInApplicationModule();
    codeWriter.declareBackApplicationItemsExports();
};
