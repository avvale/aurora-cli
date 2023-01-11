// node
import * as path from 'node:path';

// imports
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateTranslationFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    // create directory application container, normally src/assets/i18n/module_name
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.dashboardTranslations),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create module translations
    await TemplateGenerator.generateStaticContents(
        TemplateElement.FRONT_MODULE_TRANSLATIONS,
        path.join('src', cliterConfig.dashboardTranslations),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
