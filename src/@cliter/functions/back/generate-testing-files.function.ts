import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter, TemplateGenerator } from '../../utils';
import { GenerateCommandState, TemplateElement } from '../../types';

export const generateTestingFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.BACK_TEST,
        path.join('test'),
        '',
        {
            boundedContextName: generateCommandState.schema.boundedContextName,
            moduleName        : generateCommandState.schema.moduleName,
            moduleNames       : generateCommandState.schema.moduleNames,
            force             : generateCommandState.flags.force,
            verbose           : generateCommandState.flags.verbose,
            excludeFiles      : generateCommandState.schema.excluded,
            lockFiles         : generateCommandState.lockFiles,
            templateData      : {
                ...generateCommandState,
            },
        },
    );

    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.appContainer),
        cliterConfig.apiContainer,
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.moduleNames.toLowerCase(),
        generateCommandState.schema.aggregateName,
        generateCommandState.schema.properties.hasI18n,
    );

    codeWriter.generateTestingForeignReferences(generateCommandState.schema.properties);
};
