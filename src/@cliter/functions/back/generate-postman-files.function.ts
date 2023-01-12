// imports
import { GenerateCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generatePostmanFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await TemplateGenerator.createDirectory('', 'postman');
    await TemplateGenerator.generateStaticContents(
        generateCommandState.command,
        TemplateElement.BACK_POSTMAN,
        '',
        'postman',
        {
            boundedContextName: generateCommandState.schema.boundedContextName,
            moduleName        : generateCommandState.schema.moduleName,
            moduleNames       : generateCommandState.schema.moduleNames,
            force             : generateCommandState.flags.force,
            verbose           : generateCommandState.flags.verbose,
            excludeFiles      : generateCommandState.schema.excluded,
            templateData      : { ...generateCommandState },
        },
    );
};
