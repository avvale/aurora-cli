import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, TemplateElement } from '../../types';
import { TemplateGenerator, getValueObjectsProperties } from '../../utils';
import * as path from 'node:path';

export const generateAppFiles = (generateCommandState: GenerateCommandState): void =>
{
    if (generateCommandState.schema.excludedFiles?.includes('src/@app/**')) return;

    // create directory application container, normally src/@app
    TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.appContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create module files
    TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.BACK_APP,
        path.join('src', cliterConfig.appContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
        {
            boundedContextName: generateCommandState.schema.boundedContextName,
            moduleName        : generateCommandState.schema.moduleName,
            moduleNames       : generateCommandState.schema.moduleNames,
            excludeFiles      : generateCommandState.schema.excludedFiles,
            excludedOperations: generateCommandState.schema.excludedOperations,
            force             : generateCommandState.flags.force,
            verbose           : generateCommandState.flags.verbose,
            lockFiles         : generateCommandState.lockFiles,
            templateData      : {
                ...generateCommandState,
                relationshipType: RelationshipType,
            },
        },
    );

    // create value objects in module folder
    TemplateGenerator.generateValueObjects(
        generateCommandState.command,
        path.join('src', cliterConfig.appContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
        getValueObjectsProperties(generateCommandState.schema.aggregateProperties),
        {
            boundedContextName: generateCommandState.schema.boundedContextName,
            moduleName        : generateCommandState.schema.moduleName,
            moduleNames       : generateCommandState.schema.moduleNames,
            excludeFiles      : generateCommandState.schema.excludedFiles,
            force             : generateCommandState.flags.force,
            verbose           : generateCommandState.flags.verbose,
            lockFiles         : generateCommandState.lockFiles,
            templateData      : {
                ...generateCommandState,
            },
        },
    );
};
