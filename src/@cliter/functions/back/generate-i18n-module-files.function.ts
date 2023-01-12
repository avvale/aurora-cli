// node
import * as path from 'node:path';

// imports
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

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
                force       : generateCommandState.flags.force,
                verbose     : generateCommandState.flags.verbose,
                excludeFiles: generateCommandState.schema.excluded,
                templateData: { ...generateCommandState },
            },
        );
    }
};
