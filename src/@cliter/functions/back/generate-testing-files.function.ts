import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter, TemplateGenerator } from '../../utils';
import { GenerateCommandState, TemplateElement } from '../../types';

export const generateTestingFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.generateStaticContents(
        TemplateElement.BACK_TEST,
        path.join('test'),
        '',
    );

    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.applicationsContainer),
        cliterConfig.apiContainer,
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.moduleNames.toLowerCase(),
        generateCommandState.schema.aggregateName,
    );

    codeWriter.generateTestingForeignReferences(generateCommandState.schema.properties);
};
