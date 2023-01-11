// node
import * as path from 'node:path';

// imports
import { cliterConfig } from '../../config';
import { GenerateCommandState } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generatePivotTables = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.generatePivotTables(
        path.join('src', cliterConfig.applicationsContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
