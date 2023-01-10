// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import { TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateI18nModuleFiles = async (): Promise<void> =>
{
    if (BackHandler.stateService.schema.properties.hasI18n)
    {
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_I18N_MODULE,
            path.join('src', cliterConfig.applicationsContainer),
            BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );
    }
};
