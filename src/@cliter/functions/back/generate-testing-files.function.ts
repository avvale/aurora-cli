import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter, TemplateGenerator, hasI18nProperties } from '../../utils';
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

    // TODO, revisar si es necesrios agregar las referencias los modulos de las relaciones
    // pare que aunque no de modifique el fichero lo detecta como cambiado cuando revisamos los cambios
    /* const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.appContainer),
        cliterConfig.apiContainer,
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.moduleNames.toLowerCase(),
        generateCommandState.schema.aggregateName,
        hasI18nProperties(generateCommandState.schema.aggregateProperties),
    ); */

    // codeWriter.generateBackTestingForeignReferences(generateCommandState.schema.aggregateProperties);
};
