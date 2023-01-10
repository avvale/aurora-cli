// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import { TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateModuleFiles = async (): Promise<void> =>
{
    // create directory application container, normally src/@apps
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.applicationsContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create module files
    await TemplateGenerator.generateStaticContents(
        TemplateElement.BACK_MODULE,
        path.join('src', cliterConfig.applicationsContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    // create value objects in module folder
    await TemplateGenerator.generateValueObjects(
        path.join('src', cliterConfig.applicationsContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
