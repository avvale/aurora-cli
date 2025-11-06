/* eslint-disable no-await-in-loop */
import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, PropertyType, TemplateElement } from '../../types';
import { TemplateGenerator, getManyToManyRelationshipProperties } from '../../utils';
import * as path from 'node:path';

export const generateApiPivotFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    if (generateCommandState.schema.excludedFiles?.includes('src/@api/**')) return;
    if (!Array.isArray(generateCommandState.schema.aggregateProperties)) return;

    for (const property of getManyToManyRelationshipProperties(generateCommandState.schema.aggregateProperties))
    {
        if (!property.relationship?.pivot) throw new Error('Pivot property is not defined in relationship many to many property ' + property.name);

        TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.apiContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
        );

        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_API,
            path.join('src', cliterConfig.apiContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
            {
                boundedContextName: property.relationship.pivot.boundedContextName,
                moduleName        : property.relationship.pivot.moduleName,
                moduleNames       : property.relationship.pivot.moduleNames,
                excludedFiles     : [
                    ...(Array.isArray(generateCommandState.schema.excludedFiles) ? generateCommandState.schema.excludedFiles : []),
                    // avoid creating files for pivot only with delimited context name, these files have been created with an earlier module
                    `src/@api/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.boundedContextName.toKebabCase()}.module.ts`,
                    `src/@api/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.boundedContextName.toKebabCase()}.seeder.ts`,
                ],
                excludedOperations: property.relationship.pivot.excludedOperations,
                force             : generateCommandState.flags.force,
                verbose           : generateCommandState.flags.verbose,
                lockFiles         : generateCommandState.lockFiles,
                templateData      : {
                    ...generateCommandState,
                    propertyType    : PropertyType,
                    relationshipType: RelationshipType,
                    schema          : property.relationship?.pivot, // overwrite schema property
                },
            },
        );
    }
};
