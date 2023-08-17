import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator, hasI18nProperties } from '../../utils';

export const generateI18nApiFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    if (hasI18nProperties(generateCommandState.schema.aggregateProperties))
    {
        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_I18N_API,
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
                templateData      : { ...generateCommandState },
            },
        );
    }
};
