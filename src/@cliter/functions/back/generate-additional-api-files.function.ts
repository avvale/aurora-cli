import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { TemplateGenerator } from '../../utils';
import { GenerateCommandState, TemplateElement } from '../../types';

export const generateAdditionalApiFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    for (const additionalApi of TemplateGenerator.stateService.schema.additionalApis)
    {
        // set additional api to create, to be available in template
        TemplateGenerator.stateService.currentAdditionalApi = additionalApi;

        // create module files
        TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_ADDITIONAL_API,
            path.join('src', cliterConfig.apiContainer), // relativeTargetBasePath,
            generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(), // relativeTargetPath,
        );
    }
};
