import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, TemplateElement } from '../../types';
import { TemplateGenerator, hasI18nProperties } from '../../utils';
import * as path from 'node:path';

export const generateAppI18nFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    if (generateCommandState.schema.excludedFiles?.includes('src/@app/**')) return;

    if (hasI18nProperties(generateCommandState.schema.aggregateProperties))
    {
        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_I18N_APP,
            path.join('src', cliterConfig.appContainer),
            generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
            {
                boundedContextName: generateCommandState.schema.boundedContextName,
                moduleName        : generateCommandState.schema.moduleName,
                moduleNames       : generateCommandState.schema.moduleNames,
                force             : generateCommandState.flags.force,
                verbose           : generateCommandState.flags.verbose,
                excludedFiles     : generateCommandState.schema.excludedFiles,
                excludedOperations: generateCommandState.schema.excludedOperations,
                lockFiles         : generateCommandState.lockFiles,
                templateData      : {
                    ...generateCommandState,
                    relationshipType: RelationshipType,
                },
            },
        );
    }
};
