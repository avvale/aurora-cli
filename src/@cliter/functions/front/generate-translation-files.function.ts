import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';
import * as path from 'node:path';

export const generateTranslationFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    // create directory application container, normally src/assets/i18n/module_name
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.dashboardTranslations),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create module translations
    await TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.FRONT_MODULE_TRANSLATIONS,
        path.join('src', cliterConfig.dashboardTranslations),
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
};
