import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateI18NApiFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    if (generateCommandState.schema.properties.hasI18n)
    {
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_I18N_API,
            path.join('src', cliterConfig.apiContainer),
            generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
        );
    }
};
