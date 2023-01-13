import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';
import * as path from 'node:path';

export const generateAppFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    // create directory application container, normally src/@apps
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.applicationsContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create module files
    await TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.BACK_MODULE,
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
            templateData      : { ...generateCommandState },
        },
    );

    // create value objects in module folder
    await TemplateGenerator.generateValueObjects(
        generateCommandState,
        path.join('src', cliterConfig.applicationsContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
        generateCommandState.schema.properties.valueObjects,
        generateCommandState.schema.moduleName,
    );
};
