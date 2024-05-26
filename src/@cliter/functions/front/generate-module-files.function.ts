import { join } from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, PropertyType, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateModuleFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    // create directory application container, normally src/app/modules/admin/apps
    await TemplateGenerator.createDirectory(
        join('src', cliterConfig.dashboardContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create module files
    await TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.FRONT_MODULE,
        join('src', cliterConfig.dashboardContainer),
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
                propertyType: PropertyType,
            },
        },
    );
};
