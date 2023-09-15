import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';
import { GenerateCommandState } from '../../types';
import { hasI18nProperties } from '../../utils/properties.functions';

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

    codeWriter.generateFrontInterface(
        generateCommandState.schema.aggregateProperties,
        {
            overwrite: generateCommandState.flags.overwriteInterface,
        },
    );
    codeWriter.generateFrontRoutes();
    codeWriter.declareFrontBoundedContext();
    codeWriter.generateFrontNavigation(
        cliterConfig,
        path.join('src'),
        generateCommandState.schema.boundedContextName,
        generateCommandState.schema.moduleName,
        generateCommandState.schema.moduleNames,
        generateCommandState.schema.front?.outlineIcon,
    );
    codeWriter.registerFrontNavigation();
    codeWriter.generateFrontTranslations(generateCommandState.schema.aggregateProperties, 'en');
    codeWriter.generateFrontTranslations(generateCommandState.schema.aggregateProperties, 'es');
    codeWriter.generateFrontNavigationTranslation('en');
    codeWriter.generateFrontNavigationTranslation('es');
};
