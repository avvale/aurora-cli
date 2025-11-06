/* eslint-disable no-await-in-loop */
import { join } from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, PropertyType, RelationshipType, TemplateElement } from '../../types';
import { TemplateGenerator, getManyToManyRelationshipProperties } from '../../utils';

export const generateModulePivotFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    if (!Array.isArray(generateCommandState.schema.aggregateProperties)) return;

    for (const property of getManyToManyRelationshipProperties(generateCommandState.schema.aggregateProperties))
    {
        if (!property.relationship?.pivot) throw new Error('Pivot property is not defined in relationship many to many property ' + property.name);

        // create directory application container, normally src/app/modules/admin/apps
        TemplateGenerator.createDirectory(
            join('src', cliterConfig.dashboardContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
        );

        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.FRONT_MODULE,
            join('src', cliterConfig.dashboardContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
            {
                boundedContextName: property.relationship.pivot.boundedContextName,
                moduleName        : property.relationship.pivot.moduleName,
                moduleNames       : property.relationship.pivot.moduleNames,
                excludedFiles     : [
                    ...(Array.isArray(generateCommandState.schema.excludedFiles) ? generateCommandState.schema.excludedFiles : []),
                    // avoid creating files for pivot only with delimited context name, these files have been created with an earlier module
                    `src/app/modules/admin/apps/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}-detail.component.html`,
                    `src/app/modules/admin/apps/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}-detail.component.ts`,
                    `src/app/modules/admin/apps/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}-list.component.html`,
                    `src/app/modules/admin/apps/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}-list.component.ts`,
                    `src/app/modules/admin/apps/${property.relationship.pivot.boundedContextName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}/${property.relationship.pivot.moduleName.toKebabCase()}.resolvers.ts`,
                ],
                excludedOperations: generateCommandState.schema.excludedOperations,
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
