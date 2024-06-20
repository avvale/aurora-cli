import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';
import { GenerateCommandState } from '../../types';
import { getManyToManyRelationshipProperties, hasI18nProperties } from '../../utils/properties.functions';

export const addPivotTableReferences = (generateCommandState: GenerateCommandState): void =>
{
    if (!Array.isArray(generateCommandState.schema.aggregateProperties)) return;

    for (const property of getManyToManyRelationshipProperties(generateCommandState.schema.aggregateProperties))
    {
        if (!property.relationship?.pivot) throw new Error('Pivot property is not defined in relationship many to many property ' + property.name);

        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.appContainer),
            cliterConfig.apiContainer,
            property.relationship.pivot.boundedContextName.toLowerCase(),
            property.relationship.pivot.moduleName.toLowerCase(),
            property.relationship.pivot.moduleNames.toLowerCase(),
            property.relationship.pivot.aggregateName,
            hasI18nProperties(property.relationship.pivot.aggregateProperties),
        );

        codeWriter.generateFrontInterface(
            property.relationship.pivot.aggregateProperties,
            {
                overwrite: generateCommandState.flags.overwriteInterface,
            },
        );
    }
};
