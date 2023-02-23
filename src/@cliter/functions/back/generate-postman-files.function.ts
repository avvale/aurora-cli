// imports
import * as path from 'node:path';
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generatePostmanFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.createDirectory('', path.join('postman', generateCommandState.schema.boundedContextName));
    await TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.BACK_POSTMAN,
        '',
        path.join('postman', generateCommandState.schema.boundedContextName),
        {
            boundedContextName: generateCommandState.schema.boundedContextName,
            moduleName        : generateCommandState.schema.moduleName,
            moduleNames       : generateCommandState.schema.moduleNames,
            force             : generateCommandState.flags.force,
            verbose           : generateCommandState.flags.verbose,
            excludeFiles      : generateCommandState.schema.excluded,
            lockFiles         : generateCommandState.lockFiles,
            templateData      : { ...generateCommandState },
        },
    );
};
