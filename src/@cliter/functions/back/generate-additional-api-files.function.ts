import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { TemplateGenerator } from '../../utils';
import { GenerateCommandState, ResolverType, TemplateElement } from '../../types';

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
                boundedContextName: generateCommandState.schema.boundedContextName,
                moduleName        : generateCommandState.schema.moduleName,
                moduleNames       : generateCommandState.schema.moduleNames,
                force             : generateCommandState.flags.force,
                verbose           : generateCommandState.flags.verbose,
                excludeFiles      : generateCommandState.schema.excluded,
                lockFiles         : generateCommandState.lockFiles,
                templateData      : {
                    ...generateCommandState,
                    resolverType        : ResolverType,
                    currentAdditionalApi: additionalApi,
                },
            },
        );
    }
};
