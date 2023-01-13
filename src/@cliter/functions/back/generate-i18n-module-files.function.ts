import { cliterConfig } from '../../config';
import { GenerateCommandState, SqlRelationship, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';
import * as path from 'node:path';

export const generateI18nModuleFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    if (generateCommandState.schema.properties.hasI18n)
    {
        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_I18N_MODULE,
            path.join('src', cliterConfig.applicationsContainer),
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
                    relationship: SqlRelationship,
                },
            },
        );
    }
};
