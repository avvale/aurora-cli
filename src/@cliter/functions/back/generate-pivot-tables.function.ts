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
                path.join(TemplateGenerator.templatePath,  ...TemplateElement.BACK_PIVOT.split('/')),
                path.join('src', cliterConfig.applicationsContainer), // relativeTargetBasePath
                generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(), // relativeTargetPath,
                { currentProperty: property },
            );
        }
    }
};
