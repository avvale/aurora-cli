import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';
import { GenerateCommandState } from '../../types';

export const addReferences = (generateCommandState: GenerateCommandState): void =>
{
    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.applicationsContainer),
        cliterConfig.apiContainer,
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.moduleNames.toLowerCase(),
        generateCommandState.schema.aggregateName,
    );

    codeWriter.generateDashboardInterface(
        generateCommandState.schema.properties,
        { overwrite: generateCommandState.flags.overwriteInterface },
    );
    codeWriter.generateFrontRoutes();
    codeWriter.declareDashboardComponents();
    codeWriter.declareDashboardBoundedContext();
    codeWriter.generateFrontNavigation();
    codeWriter.registerFrontNavigation();
    codeWriter.generateDashboardTranslations(generateCommandState.schema.properties, 'en');
    codeWriter.generateDashboardTranslations(generateCommandState.schema.properties, 'es');
    codeWriter.generateDashboardNavigationTranslation('en');
    codeWriter.generateDashboardNavigationTranslation('es');
};