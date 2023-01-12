// node
import * as path from 'node:path';

// imports
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateApiFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.apiContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    await TemplateGenerator.generateStaticContents(
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
            templateData      : { ...generateCommandState },
        },
    );
};
