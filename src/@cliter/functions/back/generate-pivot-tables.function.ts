/* eslint-disable no-await-in-loop */
import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, PropertyType, RelationshipType, TemplateElement } from '../../types';
import { TemplateGenerator, getRelationshipManyToManyProperties } from '../../utils';

export const generatePivotTables = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    for (const property of getRelationshipManyToManyProperties(generateCommandState.schema.aggregateProperties))
    {
        // create module files
        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_PIVOT,
            path.join('src', cliterConfig.appContainer),
            generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
            {
                boundedContextName: property.relationship?.pivot?.boundedContextName,
                moduleName        : property.relationship?.pivot?.moduleName,
                moduleNames       : property.relationship?.pivot?.moduleNames,
                force             : generateCommandState.flags.force,
                verbose           : generateCommandState.flags.verbose,
                excludeFiles      : generateCommandState.schema.excluded,
                lockFiles         : generateCommandState.lockFiles,
                templateData      : {
                    ...generateCommandState,
                    relationshipType: RelationshipType,
                    schema          : property.relationship?.pivot,
                },
                currentProperty: property,
            },
        );

        // create value objects for pivot table
        await TemplateGenerator.generateValueObjects(
            generateCommandState,
            path.join('src', cliterConfig.appContainer),
            generateCommandState.schema.boundedContextName.toLowerCase().toKebabCase(),
            [
                {
                    name    : `${generateCommandState.schema.moduleName}${generateCommandState.schema.moduleName.toPascalCase()}Id`,
                    type    : PropertyType.ID,
                    length  : 36,
                    nullable: false,
                },
                {
                    name    : `${generateCommandState.schema.moduleName}-${property?.relationship?.singularName?.toPascalCase()}Id`,
                    type    : PropertyType.ID,
                    length  : 36,
                    nullable: false,
                },
            ],
            generateCommandState.schema.moduleName,
        );
    }
};
