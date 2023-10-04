import { GenerateCommandState } from '../../types';
import { cliterConfig } from '../../config';
import { CodeWriter, createProject, declareBackApiItemsExports, declareBackAppItemsExports, hasI18nProperties } from '../../utils';
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

    codeWriter.generateBackAppBoundedContextReferences(
        generateCommandState.schema.aggregateProperties,
        generateCommandState.schema.excluded,
    );

    codeWriter.declareBackApplicationItemsInModule();
    codeWriter.declareBackBoundedContextModuleInApplicationModule();

    const project = createProject();

    declareBackAppItemsExports(
        project,
        path.join('src'),
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.aggregateName,
        generateCommandState.schema.excluded,
    );

    declareBackApiItemsExports(
        project,
        path.join('src'),
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.excluded,
    );
};
