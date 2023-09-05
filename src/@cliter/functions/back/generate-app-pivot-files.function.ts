/* eslint-disable no-await-in-loop */
import { cliterConfig } from '../../config';
import { GenerateCommandState, RelationshipType, TemplateElement } from '../../types';
import { TemplateGenerator, getRelationshipManyToManyProperties, getValueObjectsProperties } from '../../utils';
import * as path from 'node:path';

export const generateAppPivotFiles = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    for (const property of getRelationshipManyToManyProperties(generateCommandState.schema.aggregateProperties))
    {
        if (!property.relationship?.pivot) throw new Error('Pivot property is not defined in relationship many to many property ' + property.name);

        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.apiContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create module files
        await TemplateGenerator.generateStaticContents(
            generateCommandState.command,
            TemplateElement.BACK_APP,
            path.join('src', cliterConfig.appContainer),
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
                    relationshipType: RelationshipType,
                    schema          : property.relationship?.pivot, // overwrite schema property
                },
                currentProperty: property,
            },
        );

        // create value objects in module folder
        await TemplateGenerator.generateValueObjects(
            generateCommandState.command,
            path.join('src', cliterConfig.appContainer),
            property.relationship.pivot.boundedContextName.toLowerCase().toKebabCase(),
            getValueObjectsProperties(property.relationship.pivot.aggregateProperties),
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
                    schema: property.relationship?.pivot, // overwrite schema property
                },
            },
        );
    }
};
