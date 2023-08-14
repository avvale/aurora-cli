import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';
import { GenerateCommandState } from '../../types';

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

    codeWriter.generateFrontInterface(
        generateCommandState.schema.properties,
        { overwrite: generateCommandState.flags.overwriteInterface },
    );
    codeWriter.generateFrontRoutes();
    codeWriter.declareFrontBoundedContext();
    codeWriter.generateFrontNavigation();
    codeWriter.registerFrontNavigation();
    codeWriter.generateFrontTranslations(generateCommandState.schema.properties, 'en');
    codeWriter.generateFrontTranslations(generateCommandState.schema.properties, 'es');
    codeWriter.generateFrontNavigationTranslation('en');
    codeWriter.generateFrontNavigationTranslation('es');
};
