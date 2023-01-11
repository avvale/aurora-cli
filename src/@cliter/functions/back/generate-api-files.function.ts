// node
import * as path from 'node:path';

// imports
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateApiFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.createDirectory(
        path.join('src', cliterConfig.apiContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );

    await TemplateGenerator.generateStaticContents(
        TemplateElement.BACK_API,
        path.join('src', cliterConfig.apiContainer),
        generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
    );
};
