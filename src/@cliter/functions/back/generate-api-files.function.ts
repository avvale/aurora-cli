// node
import * as path from 'node:path';

// imports
import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, PropertyType, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateApiFiles = (generateCommandState: GenerateCommandState): void =>
{
    if (generateCommandState.schema.excluded?.includes('src/@api/**')) return;

    TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.apiContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.BACK_API,
        path.join('src', cliterConfig.apiContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
        {
            boundedContextName: generateCommandState.schema.boundedContextName,
            moduleName        : generateCommandState.schema.moduleName,
            moduleNames       : generateCommandState.schema.moduleNames,
            force             : generateCommandState.flags.force,
            verbose           : generateCommandState.flags.verbose,
            excludeFiles      : generateCommandState.schema.excluded,
            lockFiles         : generateCommandState.lockFiles,
            templateData      : {
                ...generateCommandState,
                propertyType    : PropertyType,
                relationshipType: RelationshipType,
            },
        },
    );
};
