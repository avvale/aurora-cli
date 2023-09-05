import { GenerateCommandState } from '../../types';
import { cliterConfig } from '../../config';
import { CodeWriter, getRelationshipManyToManyProperties, hasI18nProperties } from '../../utils';
import * as path from 'node:path';

export const addPivotReferences = (generateCommandState: GenerateCommandState): void =>
{
    for (const property of getRelationshipManyToManyProperties(generateCommandState.schema.aggregateProperties))
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
        codeWriter.generateBackBoundedContextReferences(property.relationship.pivot.aggregateProperties);
        codeWriter.declareBackApplicationItemsInModule();
        codeWriter.declareBackBoundedContextModuleInApplicationModule();
        codeWriter.declareBackApplicationItemsExports();
    }
};
