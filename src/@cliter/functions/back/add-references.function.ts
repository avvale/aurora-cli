import { GenerateCommandState } from '../../types';
import { cliterConfig } from '../../config';
import { CodeWriter, createProject, declareBackApplicationItemsExports, hasI18nProperties } from '../../utils';
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
        hasI18nProperties(generateCommandState.schema.aggregateProperties),
    );
    codeWriter.generateBackBoundedContextReferences(generateCommandState.schema.aggregateProperties);
    codeWriter.declareBackApplicationItemsInModule();
    codeWriter.declareBackBoundedContextModuleInApplicationModule();


    const project = createProject();

    declareBackApplicationItemsExports(
        project,
        path.join('src'),
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.aggregateName,
        generateCommandState.schema.excluded,
    );
};
