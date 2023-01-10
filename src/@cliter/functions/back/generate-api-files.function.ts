// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import { TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateApiFiles = async (): Promise<void> =>
{
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.apiContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    await TemplateGenerator.generateStaticContents(
        TemplateElement.BACK_API,
        path.join('src', cliterConfig.apiContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
