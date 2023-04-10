/* eslint-disable no-await-in-loop */
import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, TemplateElement } from '../../types';
import { FileManager, TemplateGenerator } from '../../utils';

export const generatePivotTables = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    for (const property of generateCommandState.schema.properties.withRelationshipManyToMany)
    {
        // only create table if has in pivotPath
        if (property.pivotPath === `${generateCommandState.schema.boundedContextName}/${generateCommandState.schema.moduleName}`)
        {
            // create module files
            await TemplateGenerator.generateStaticContents(
                generateCommandState.command,
                TemplateElement.BACK_PIVOT,
                path.join('src', cliterConfig.appContainer),
                generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
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
                        relationship: RelationshipType,
                    },
                    currentProperty: property,
                },
            );

            /* FileManager.generateContents(
                generateCommandState.command,
                path.join(TemplateGenerator.templatePath,  ...TemplateElement.BACK_PIVOT.split('/')),
                path.join('src', cliterConfig.appContainer), // relativeTargetBasePath
                generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(), // relativeTargetPath,
                {
                    boundedContextName: generateCommandState.schema.boundedContextName,
                    moduleName        : generateCommandState.schema.moduleName,
                    moduleNames       : generateCommandState.schema.moduleNames,
                    force             : generateCommandState.flags.force,
                    verbose           : generateCommandState.flags.verbose,
                    excludeFiles      : generateCommandState.schema.excluded,
                    lockFiles         : generateCommandState.lockFiles,
                    templateData      : { ...generateCommandState },
                    currentProperty   : property,
                },
            ); */
        }
    }
};
