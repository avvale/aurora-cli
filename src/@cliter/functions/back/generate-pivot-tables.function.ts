import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, TemplateElement } from '../../types';
import { FileManager, TemplateGenerator } from '../../utils';

export const generatePivotTables = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    for (const property of generateCommandState.schema.properties.withRelationshipManyToMany)
    {
        // only create table if has in pivotPath
        if (property.pivotPath === `${generateCommandState.schema.boundedContextName}/${generateCommandState.schema.moduleName}`)
        {
            FileManager.generateContents(
                generateCommandState.command,
                path.join(TemplateGenerator.templatePath,  ...TemplateElement.BACK_PIVOT.split('/')),
                path.join('src', cliterConfig.applicationsContainer), // relativeTargetBasePath
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
            );
        }
    }
};
