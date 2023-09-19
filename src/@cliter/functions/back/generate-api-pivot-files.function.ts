/* eslint-disable no-await-in-loop */
import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, PropertyType, TemplateElement } from '../../types';
import { TemplateGenerator, getManyToManyRelationshipProperties } from '../../utils';
import * as path from 'node:path';

export const generateApiPivotFiles = (generateCommandState: GenerateCommandState): void =>
{
    for (const property of getManyToManyRelationshipProperties(generateCommandState.schema.aggregateProperties))
    {
        if (!property.relationship?.pivot) throw new Error('Pivot property is not defined in relationship many to many property ' + property.name);

        TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.apiContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
        );

        TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_API,
            path.join('src', cliterConfig.apiContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
            {
                boundedContextName: property.relationship.pivot.boundedContextName,
                moduleName        : property.relationship.pivot.moduleName,
                moduleNames       : property.relationship.pivot.moduleNames,
                excludeFiles      : generateCommandState.schema.excluded,
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
