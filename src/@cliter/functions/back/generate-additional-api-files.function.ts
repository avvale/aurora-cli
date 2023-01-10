// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import { TemplateGenerator } from '../../utils';

export const generateAdditionalApiFiles = async (): Promise<void> =>
{
    TemplateGenerator.generateAdditionalApiFiles(
        path.join('src', cliterConfig.apiContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
