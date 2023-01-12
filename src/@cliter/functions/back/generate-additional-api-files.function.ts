import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { TemplateGenerator } from '../../utils';
import { GenerateCommandState, TemplateElement } from '../../types';

export const generateAdditionalApiFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    for (const additionalApi of generateCommandState.schema.additionalApis)
    {
        // create module files
        TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_ADDITIONAL_API,
            path.join('src', cliterConfig.apiContainer), // relativeTargetBasePath,
            generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(), // relativeTargetPath,
            {
                force       : generateCommandState.flags.force,
                verbose     : generateCommandState.flags.verbose,
                excludeFiles: generateCommandState.schema.excluded,
                templateData: {
                    ...generateCommandState,
                    currentAdditionalApi: additionalApi,
                },
            },
        );
    }
};
