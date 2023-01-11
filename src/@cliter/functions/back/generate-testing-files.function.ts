// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import { CodeWriter, TemplateGenerator } from '../../utils';
import { TemplateElement } from '../../types';

export const generateTestingFiles = async (): Promise<void> =>
{
    await TemplateGenerator.generateStaticContents(TemplateElement.BACK_TEST, path.join('test'), '');

    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.applicationsContainer),
        cliterConfig.apiContainer,
        BackHandler.stateService.schema.boundedContextName.toLowerCase(),
        BackHandler.stateService.schema.moduleName.toLowerCase(),
        BackHandler.stateService.schema.moduleNames.toLowerCase(),
        BackHandler.stateService.schema.aggregateName,
    );

    codeWriter.generateTestingForeignReferences(BackHandler.stateService.schema.properties);
};
