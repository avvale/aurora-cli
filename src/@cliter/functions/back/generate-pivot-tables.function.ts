// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import { TemplateGenerator } from '../../utils';

export const generatePivotTables = async (): Promise<void> =>
{
    await TemplateGenerator.generatePivotTables(
        path.join('src', cliterConfig.applicationsContainer),
        BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
